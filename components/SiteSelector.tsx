
import React from 'react';
import { PopularSite } from '../types';

interface SiteSelectorProps {
  sites: PopularSite[];
  currentUrl: string;
  theme: 'light' | 'dark';
  onSelect: (url: string, startYear: number) => void;
  onRandomSelect: () => void; // New prop for random site selection
}

const SiteSelector: React.FC<SiteSelectorProps> = ({ sites, currentUrl, theme, onSelect, onRandomSelect }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
      {sites.map((site) => {
        const isActive = currentUrl.toLowerCase().includes(site.url.toLowerCase());
        const activeClasses = isActive 
          ? 'bg-violet-600 border-violet-500 text-white shadow-md' 
          : theme === 'dark'
            ? 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-200 hover:bg-white/5'
            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-sm';

        return (
          <button
            key={site.id}
            onClick={() => onSelect(site.url, site.startYear)}
            className={`h-8 px-3 rounded-md text-[10px] font-bold tracking-tight transition-all shrink-0 whitespace-nowrap border flex items-center justify-center box-border ${activeClasses}`}
          >
            {site.name}
          </button>
        );
      })}
      {/* Random Site Button */}
      <button
        onClick={onRandomSelect}
        className={`h-8 px-3 rounded-md text-[10px] font-bold tracking-tight transition-all shrink-0 whitespace-nowrap border flex items-center justify-center box-border
          ${theme === 'dark'
            ? 'bg-orange-600/20 border-orange-500/50 text-orange-400 hover:text-orange-300 hover:bg-orange-600/30 shadow-md'
            : 'bg-orange-100 border-orange-200 text-orange-600 hover:text-orange-700 hover:bg-orange-200 shadow-sm'
          }`}
      >
        Random
      </button>
    </div>
  );
};

export default SiteSelector;
