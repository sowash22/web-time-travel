
import React from 'react';

interface TimelineProps {
  min: number;
  max: number;
  value: number;
  theme: 'light' | 'dark';
  onChange: (year: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ min, max, value, theme, onChange }) => {
  // Generate markers showing 2026 at the end
  const markers = [1995, 2000, 2005, 2010, 2015, 2020, 2026];
  const visibleMarkers = markers.filter(m => m >= min && m <= max);

  /**
   * thumbWidth = 18px (from index.html CSS)
   */
  const thumbWidth = 18;

  const percentage = (value - min) / (max - min);
  // Standard range alignment logic to keep thumb centered on value
  const leftPos = `calc(${percentage * 100}% + ${(0.5 - percentage) * thumbWidth}px)`;

  return (
    <div className="w-full flex flex-col select-none">
      {/* Container padding removed to align with parent edges */}
      <div className="relative flex items-center h-8 px-0">
        
        {/* The Track Line - Now spans full width */}
        <div className="absolute inset-x-0 flex items-center pointer-events-none h-full">
          <div className={`w-full h-[2px] rounded-full transition-colors ${
            theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'
          }`} />
        </div>

        {/* Inline Year Markers - Now spans full width */}
        <div className="absolute inset-x-0 h-full flex items-center pointer-events-none">
          {visibleMarkers.map(m => {
            const pos = ((m - min) / (max - min)) * 100;
            
            // Adjust translation so the first/last labels are perfectly flush with edges
            let transform = 'translateX(-50%)';
            if (m === min) transform = 'translateX(0)';
            if (m === max) transform = 'translateX(-100%)';

            return (
              <div 
                key={m}
                className="absolute flex items-center justify-center h-full"
                style={{ left: `${pos}%`, transform }}
              >
                <span className={`px-1 text-[9px] font-black mono tracking-tighter z-10 transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-500 bg-[#0f172a]' 
                    : 'text-slate-400 bg-white'
                }`}>
                  {m}
                </span>
              </div>
            );
          })}
        </div>

        {/* Range Input (The interactive slider) */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="relative z-20 w-full h-full appearance-none cursor-pointer bg-transparent"
        />
        
        {/* Active Marker Floating Indicator */}
        <div 
          className="absolute top-[24px] pointer-events-none transition-all duration-75 z-30"
          style={{ 
            left: leftPos,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex flex-col items-center">
            <span className={`text-[11px] font-black mono tracking-tight leading-none ${
              theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
            }`}>
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
