
import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10'
          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 shadow-sm'
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4 overflow-hidden">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 transform transition-transform duration-500 ${
            theme === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        
        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 transform transition-transform duration-500 ${
            theme === 'dark' ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle;
