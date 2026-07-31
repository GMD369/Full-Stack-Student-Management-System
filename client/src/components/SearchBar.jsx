import { useEffect, useState } from 'react';
import { SearchIcon } from './Icons';

export default function SearchBar({ value, onChange, placeholder = 'Search by name, roll no, course...' }) {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text !== value) onChange(text);
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div className="search-input-wrap">
      <SearchIcon width={16} height={16} />
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
