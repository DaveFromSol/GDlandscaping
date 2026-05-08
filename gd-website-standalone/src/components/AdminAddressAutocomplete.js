import React, { useState, useRef, useEffect } from 'react';

const AdminAddressAutocomplete = ({ value, onChange, onSelect, placeholder, className }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
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
      try {
        const res = await fetch(`/api/address-autocomplete?input=${encodeURIComponent(val)}`);
        const data = await res.json();
        setSuggestions(data.predictions || []);
        setOpen((data.predictions || []).length > 0);
      } catch { setSuggestions([]); setOpen(false); }
    }, 300);
  };

  const handleSelect = (prediction) => {
    const address = prediction.description.replace(', USA', '');
    onChange(address);
    if (onSelect) {
      // Parse street, city, state, zip from description
      const parts = prediction.description.split(', ');
      onSelect({
        fullAddress: address,
        street: parts[0] || '',
        city: parts[1] || '',
        state: parts[2]?.split(' ')[0] || '',
        zip: parts[2]?.split(' ')[1] || ''
      });
    }
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
      {open && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          backgroundColor: 'white', border: '1px solid #d1d5db',
          borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          zIndex: 1000, marginTop: '4px', overflow: 'hidden'
        }}>
          {suggestions.map((p) => (
            <div
              key={p.place_id}
              onMouseDown={() => handleSelect(p)}
              style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <span style={{ color: '#111827' }}>📍 {p.description.replace(', USA', '')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAddressAutocomplete;
