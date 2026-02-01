import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (url: string) => void;
  initialValue: string;
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue, theme }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const placeholder = isFocused 
    ? "Type any URL..." 
    : `${initialValue || 'Enter custom URL...'}`;

  return (
    <form onSubmit={handleSubmit} className="w-full h-8 flex items-center">
      <div className="relative flex items-center h-full w-full translate-y-[1px]">
        {/* Overlay text showing current site when not focused */}
        {!isFocused && inputValue && (
          <div 
            className={`absolute left-3 right-12 pointer-events-none flex items-center h-full text-xs font-mono font-normal tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            <span className="truncate font-mono">{inputValue}</span>
            <span className={`ml-2 text-[10px] font-normal ${
              theme === 'dark' ? 'text-white/[0.5]' : 'text-black/[0.5]'
            }`}>
               click to change
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={isFocused ? inputValue : ''}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full h-full px-3 border rounded-lg text-xs transition-all font-mono tracking-tight box-border leading-none focus:outline-none focus:ring-1 focus:ring-violet-500/40 ${
            theme === 'dark' 
              ? 'bg-white/[0.03] border-white/10 text-gray-200 placeholder-gray-500 focus:bg-white/[0.06]' 
              : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white shadow-sm'
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