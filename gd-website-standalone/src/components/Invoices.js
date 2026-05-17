import React, { useState, useEffect, useRef } from 'react';
import {
  collection, addDoc, updateDoc, doc, onSnapshot,
  orderBy, query, serverTimestamp, getDocs
} from 'firebase/firestore';
import { useFirebase } from '../contexts/FirebaseContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SERVICE_TYPES = [
  'Lawn Maintenance',
  'Leaf Cleanup',
  'Snow Removal',
  'Landscaping',
  'Tree Service',
  'Hardscaping',
  'Other',
];

const emptyLine = () => ({ description: '', quantity: 1, unitPrice: '', total: 0 });

const emptyForm = () => ({
  customerId: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: '',
  serviceType: 'Lawn Maintenance',
  lineItems: [emptyLine()],
  taxPercent: 0,
  dueDate: '',
  notes: '',
});

const fmt = (n) => Number(n || 0).toFixed(2);
const calcLine = (item) => Number(item.quantity || 0) * Number(item.unitPrice || 0);

const statusColors = {
  unpaid: { bg: '#fef3c7', text: '#92400e', label: 'Unpaid' },
  paid:   { bg: '#d1fae5', text: '#065f46', label: 'Paid' },
  void:   { bg: '#f3f4f6', text: '#6b7280', label: 'Void' },
};

export default function Invoices({ prefilledCustomer = null }) {
  const { db } = useFirebase();
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const invoiceRef = useRef(null);
  const prefilledApplied = useRef(false);

  useEffect(() => {
    const q = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setInvoices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [db]);

  useEffect(() => {
    const q = query(collection(db, 'customers'), orderBy('name', 'asc'));
    return onSnapshot(q, (snap) => {
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [db]);

  // ── prefill from property lookup ──────────────────────────────────────────
  useEffect(() => {
    if (!prefilledCustomer || prefilledApplied.current) return;
    // If it has an `id` it's a matched customer record — select them
    if (prefilledCustomer.id && customers.length > 0) {
      handleCustomerSelect(prefilledCustomer.id);
      setShowForm(true);
      prefilledApplied.current = true;
    } else if (prefilledCustomer.customerAddress && customers.length >= 0) {
      // No match found — just pre-fill the address field
      setForm(f => ({ ...f, customerAddress: prefilledCustomer.customerAddress }));
      setShowForm(true);
      prefilledApplied.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledCustomer, customers]);

  // Reset prefill tracking when prop clears
  useEffect(() => {
    if (!prefilledCustomer) prefilledApplied.current = false;
  }, [prefilledCustomer]);

  // ── line item helpers ──────────────────────────────────────────────────────
  const updateLine = (index, field, value) => {
    const items = form.lineItems.map((item, i) => {
      if (i !== index) return item;
      const updated = { ...item, [field]: value };
      updated.total = calcLine(updated);
      return updated;
    });
    setForm((f) => ({ ...f, lineItems: items }));
  };

  const addLine = () => setForm((f) => ({ ...f, lineItems: [...f.lineItems, emptyLine()] }));

  const removeLine = (index) =>
    setForm((f) => ({ ...f, lineItems: f.lineItems.filter((_, i) => i !== index) }));

  const subtotal = form.lineItems.reduce((s, item) => s + calcLine(item), 0);
  const taxAmt = subtotal * (Number(form.taxPercent) / 100);
  const total = subtotal + taxAmt;

  // ── customer select ────────────────────────────────────────────────────────
  const handleCustomerSelect = (customerId) => {
    const c = customers.find((x) => x.id === customerId);
    if (!c) return;
    const addrParts = [c.address, c.city, c.state, c.zip].filter(Boolean);
    setForm((f) => ({
      ...f,
      customerId,
      customerName: c.name || '',
      customerEmail: c.email || '',
      customerPhone: c.phone || '',
      customerAddress: addrParts.join(', '),
    }));
  };

  // ── save invoice ───────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.customerName || form.lineItems.every((l) => !l.description)) return;
    setSaving(true);
    try {
      const snap = await getDocs(collection(db, 'invoices'));
      const count = snap.size + 1;
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;

      await addDoc(collection(db, 'invoices'), {
        invoiceNumber,
        customerId: form.customerId,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        customerAddress: form.customerAddress,
        serviceType: form.serviceType,
        lineItems: form.lineItems.map((l) => ({ ...l, total: calcLine(l) })),
        subtotal,
        taxPercent: Number(form.taxPercent),
        tax: taxAmt,
        total,
        dueDate: form.dueDate,
        notes: form.notes,
        status: 'unpaid',
        createdAt: serverTimestamp(),
        paidAt: null,
      });

      setForm(emptyForm());
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  // ── status updates ─────────────────────────────────────────────────────────
  const markPaid = (id) =>
    updateDoc(doc(db, 'invoices', id), { status: 'paid', paidAt: serverTimestamp() });

  const markVoid = (id) =>
    updateDoc(doc(db, 'invoices', id), { status: 'void' });

  // ── PDF download ───────────────────────────────────────────────────────────
  const handleDownload = async (invoice) => {
    setDownloading(invoice.id);
    setPreviewInvoice(invoice);
    // Wait for DOM render
    await new Promise((r) => setTimeout(r, 300));
    try {
      const el = invoiceRef.current;
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#fff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgW, Math.min(imgH, pageH));
      pdf.save(`GD-Invoice-${invoice.invoiceNumber}.pdf`);
    } finally {
      setDownloading(null);
      setPreviewInvoice(null);
    }
  };

  // ── invoice print div (hidden, used for pdf capture) ──────────────────────
  const InvoicePrintView = ({ invoice }) => (
    <div
      ref={invoiceRef}
      style={{
        width: '794px',
        minHeight: '1123px',
        padding: '48px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        color: '#111',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/GD.png" alt="Logo" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '22px', color: '#16a34a' }}>G&amp;D Landscaping LLC</div>
            <div style={{ fontSize: '13px', color: '#555' }}>Berlin, CT</div>
            <div style={{ fontSize: '13px', color: '#555' }}>gdlandscapingllc.com</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#16a34a', letterSpacing: '-1px' }}>INVOICE</div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginTop: '4px' }}>{invoice.invoiceNumber}</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
            Date: {invoice.createdAt?.toDate ? invoice.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}
          </div>
          {invoice.dueDate && (
            <div style={{ fontSize: '12px', color: '#666' }}>Due: {invoice.dueDate}</div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #16a34a, #bbf7d0)', borderRadius: '2px', marginBottom: '28px' }} />

      {/* Bill To */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Bill To</div>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>{invoice.customerName}</div>
        {invoice.customerAddress && <div style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>{invoice.customerAddress}</div>}
        {invoice.customerEmail && <div style={{ fontSize: '13px', color: '#444' }}>{invoice.customerEmail}</div>}
        {invoice.customerPhone && <div style={{ fontSize: '13px', color: '#444' }}>{invoice.customerPhone}</div>}
      </div>

      {/* Service Type */}
      {invoice.serviceType && (
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#555' }}>
          <span style={{ fontWeight: 600 }}>Service:</span> {invoice.serviceType}
        </div>
      )}

      {/* Line Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
        <thead>
          <tr style={{ backgroundColor: '#16a34a', color: '#fff' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 600 }}>Description</th>
            <th style={{ padding: '10px 12px', textAlign: 'center', fontSize: '12px', fontWeight: 600, width: '70px' }}>Qty</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '12px', fontWeight: 600, width: '100px' }}>Unit Price</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', fontSize: '12px', fontWeight: 600, width: '100px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {(invoice.lineItems || []).map((item, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9fafb' : '#fff', borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '10px 12px', fontSize: '13px' }}>{item.description}</td>
              <td style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'right' }}>${fmt(item.unitPrice)}</td>
              <td style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'right' }}>${fmt(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '260px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ color: '#555' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>${fmt(invoice.subtotal)}</span>
          </div>
          {Number(invoice.taxPercent) > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ color: '#555' }}>Tax ({invoice.taxPercent}%)</span>
              <span style={{ fontWeight: 600 }}>${fmt(invoice.tax)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#16a34a', color: '#fff', borderRadius: '8px', marginTop: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>Total</span>
            <span style={{ fontWeight: 800, fontSize: '15px' }}>${fmt(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', fontSize: '13px', color: '#444', marginBottom: '24px' }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Notes</div>
          {invoice.notes}
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', fontSize: '13px', color: '#888', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
        Thank you for your business! · gdlandscapingllc.com
      </div>
    </div>
  );

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '20px', padding: '28px 32px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>🧾 Invoices</h2>
            <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: '14px' }}>{invoices.length} total · {invoices.filter(i => i.status === 'unpaid').length} unpaid</p>
          </div>
          <button
            onClick={() => { setForm(emptyForm()); setShowForm(true); }}
            style={{ backgroundColor: 'white', color: '#059669', fontWeight: 700, padding: '10px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            + Create Invoice
          </button>
        </div>
      </div>

      {/* Create Invoice Form */}
      {showForm && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '28px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700 }}>New Invoice</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Customer */}
            <div>
              <label style={labelStyle}>Customer</label>
              <select
                value={form.customerId}
                onChange={(e) => handleCustomerSelect(e.target.value)}
                style={inputStyle}
              >
                <option value="">Select customer...</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div>
              <label style={labelStyle}>Service Type</label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm((f) => ({ ...f, serviceType: e.target.value }))}
                style={inputStyle}
              >
                {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Customer name (editable override) */}
            <div>
              <label style={labelStyle}>Bill To Name</label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                placeholder="Customer name"
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                placeholder="customer@email.com"
                style={inputStyle}
              />
            </div>

            {/* Address */}
            <div>
              <label style={labelStyle}>Address</label>
              <input
                type="text"
                value={form.customerAddress}
                onChange={(e) => setForm((f) => ({ ...f, customerAddress: e.target.value }))}
                placeholder="123 Main St, Berlin, CT"
                style={inputStyle}
              />
            </div>

            {/* Due Date */}
            <div>
              <label style={labelStyle}>Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                style={inputStyle}
              />
            </div>

            {/* Tax */}
            <div>
              <label style={labelStyle}>Tax %</label>
              <input
                type="number"
                value={form.taxPercent}
                min={0}
                max={100}
                onChange={(e) => setForm((f) => ({ ...f, taxPercent: e.target.value }))}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Line Items */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{ fontWeight: 600, fontSize: '14px' }}>Line Items</label>
              <button onClick={addLine} style={smallBtnStyle}>+ Add Line</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={thStyle}>Description</th>
                  <th style={{ ...thStyle, width: '80px' }}>Qty</th>
                  <th style={{ ...thStyle, width: '120px' }}>Unit Price</th>
                  <th style={{ ...thStyle, width: '100px' }}>Total</th>
                  <th style={{ ...thStyle, width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {form.lineItems.map((item, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLine(i, 'description', e.target.value)}
                        placeholder="Service description"
                        style={{ ...inputStyle, margin: 0 }}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => updateLine(i, 'quantity', e.target.value)}
                        style={{ ...inputStyle, margin: 0, textAlign: 'center' }}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={item.unitPrice}
                        min={0}
                        step="0.01"
                        onChange={(e) => updateLine(i, 'unitPrice', e.target.value)}
                        placeholder="0.00"
                        style={{ ...inputStyle, margin: 0, textAlign: 'right' }}
                      />
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 600, fontSize: '14px' }}>
                      ${fmt(calcLine(item))}
                    </td>
                    <td style={tdStyle}>
                      {form.lineItems.length > 1 && (
                        <button onClick={() => removeLine(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '18px' }}>×</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals summary */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>
                <div style={{ color: '#555' }}>Subtotal: <strong>${fmt(subtotal)}</strong></div>
                {Number(form.taxPercent) > 0 && <div style={{ color: '#555' }}>Tax ({form.taxPercent}%): <strong>${fmt(taxAmt)}</strong></div>}
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a', marginTop: '4px' }}>Total: ${fmt(total)}</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              placeholder="Payment instructions, thank-you note, etc."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowForm(false)} style={cancelBtnStyle}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={saveBtnStyle}>
              {saving ? 'Saving...' : 'Save Invoice'}
            </button>
          </div>
        </div>
      )}

      {/* Invoice List */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {invoices.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧾</div>
            <p style={{ margin: 0, fontWeight: 500 }}>No invoices yet. Create your first invoice above.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={thStyle}>Invoice #</th>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Service</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const sc = statusColors[inv.status] || statusColors.unpaid;
                const date = inv.createdAt?.toDate ? inv.createdAt.toDate().toLocaleDateString() : '—';
                return (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ ...tdStyle, fontWeight: 600, color: '#16a34a' }}>{inv.invoiceNumber}</td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500 }}>{inv.customerName}</div>
                      {inv.customerEmail && <div style={{ fontSize: '12px', color: '#9ca3af' }}>{inv.customerEmail}</div>}
                    </td>
                    <td style={{ ...tdStyle, fontSize: '13px', color: '#555' }}>{inv.serviceType}</td>
                    <td style={{ ...tdStyle, fontWeight: 700 }}>${fmt(inv.total)}</td>
                    <td style={tdStyle}>
                      <span style={{ backgroundColor: sc.bg, color: sc.text, padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                        {sc.label}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontSize: '13px', color: '#6b7280' }}>{date}</td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleDownload(inv)}
                          disabled={downloading === inv.id}
                          style={{ ...smallBtnStyle, backgroundColor: '#2563eb', color: 'white' }}
                        >
                          {downloading === inv.id ? '...' : 'PDF'}
                        </button>
                        {inv.status === 'unpaid' && (
                          <>
                            <button onClick={() => markPaid(inv.id)} style={{ ...smallBtnStyle, backgroundColor: '#16a34a', color: 'white' }}>Paid</button>
                            <button onClick={() => markVoid(inv.id)} style={{ ...smallBtnStyle, backgroundColor: '#6b7280', color: 'white' }}>Void</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Hidden invoice print view for PDF capture */}
      {previewInvoice && (
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', zIndex: -1 }}>
          <InvoicePrintView invoice={previewInvoice} />
        </div>
      )}
    </div>
  );
}

// ── shared styles ────────────────────────────────────────────────────────────
const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '6px',
};

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const thStyle = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 600,
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tdStyle = {
  padding: '12px 14px',
  fontSize: '14px',
  verticalAlign: 'middle',
};

const smallBtnStyle = {
  padding: '5px 12px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  backgroundColor: '#f3f4f6',
  color: '#374151',
};

const saveBtnStyle = {
  padding: '10px 24px',
  backgroundColor: '#16a34a',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 700,
  fontSize: '14px',
  cursor: 'pointer',
};

const cancelBtnStyle = {
  padding: '10px 24px',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  border: 'none',
  borderRadius: '10px',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'pointer',
};
