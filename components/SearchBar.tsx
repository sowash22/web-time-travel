
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (url: string) => void;
  initialValue: string;
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue, theme }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-8 flex items-center">
      <div className="relative flex items-center h-full w-full translate-y-[1px]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter custom URL..."
          className={`w-full h-full px-3 border rounded-lg text-xs transition-all font-mono tracking-tight box-border leading-none focus:outline-none focus:ring-1 focus:ring-violet-500/40 ${
            theme === 'dark' 
              ? 'bg-white/[0.03] border-white/10 text-gray-200 placeholder-gray-700 focus:bg-white/[0.06]' 
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-300 focus:bg-white shadow-sm'
          }`}
        />
        <button 
          type="submit"
          className="absolute right-1 h-6 px-2 text-[9px] font-black bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors uppercase tracking-widest flex items-center justify-center shadow-sm"
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
