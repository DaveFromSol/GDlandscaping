import React, { useState, useRef, useEffect } from 'react';

const AdminAddressAutocomplete = ({ value, onChange, onSelect, placeholder, className }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);
    setActiveIndex(-1);
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
    if (onSelect) onSelect({ fullAddress: full, street, city, state, zip, lat: parseFloat(result.lat), lon: parseFloat(result.lon) });
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const formatDisplayName = (r) => {
    const addr = r.address || {};
    const street = [addr.house_number, addr.road].filter(Boolean).join(' ');
    const city = addr.city || addr.town || addr.village || addr.hamlet || '';
    const state = addr.state || '';
    const zip = addr.postcode || '';
    if (street) return { primary: street, secondary: [city, state, zip].filter(Boolean).join(', ') };
    return { primary: city || r.display_name.split(',')[0], secondary: [state, zip].filter(Boolean).join(' ') };
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || '123 Main St, Berlin, CT 06037'}
          className={className}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div style={{ width: 15, height: 15, border: '2px solid #d1d5db', borderTopColor: '#16a34a', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
          </div>
        )}
        {!loading && value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Suggestions</span>
          </div>
          {suggestions.map((r, i) => {
            const { primary, secondary } = formatDisplayName(r);
            return (
              <div
                key={r.place_id}
                onMouseDown={() => handleSelect(r)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 last:border-0 transition-colors ${
                  activeIndex === i ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{primary}</div>
                  {secondary && <div className="text-xs text-gray-500 truncate mt-0.5">{secondary}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAddressAutocomplete;
