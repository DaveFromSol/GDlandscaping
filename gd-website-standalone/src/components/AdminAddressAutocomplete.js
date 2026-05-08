import React, { useState, useRef, useEffect } from 'react';

const AdminAddressAutocomplete = ({ value, onChange, onSelect, placeholder, className }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    clearTimeout(debounceRef.current);
    if (val.length < 3) { setSuggestions([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=6&countrycodes=us&addressdetails=1&q=${encodeURIComponent(val)}`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
      } catch {
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const handleSelect = (result) => {
    const addr = result.address || {};
    const street = [addr.house_number, addr.road].filter(Boolean).join(' ');
    const city = addr.city || addr.town || addr.village || addr.hamlet || '';
    const state = addr.state || '';
    const zip = addr.postcode || '';
    const full = [street, city, `${state} ${zip}`.trim()].filter(Boolean).join(', ');

    onChange(full);
    if (onSelect) onSelect({ fullAddress: full, street, city, state, zip });
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder || '123 Main St, Berlin, CT 06037'}
        className={className}
        autoComplete="off"
      />
      {loading && (
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{ width: '14px', height: '14px', border: '2px solid #d1d5db', borderTopColor: '#16a34a', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        </div>
      )}
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          backgroundColor: 'white', border: '1px solid #d1d5db',
          borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          zIndex: 1000, marginTop: '4px', overflow: 'hidden'
        }}>
          {suggestions.map((r) => (
            <div
              key={r.place_id}
              onMouseDown={() => handleSelect(r)}
              style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <span style={{ color: '#111827' }}>📍 {r.display_name.replace(', United States', '')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAddressAutocomplete;
