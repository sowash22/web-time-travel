
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="p-8 pb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">Web Time</h1>
          <h1 className="text-xl font-bold tracking-tight text-violet-400 leading-none">Machine</h1>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium">Explore the web's evolution.</p>
    </div>
  );
};

export default Header;
