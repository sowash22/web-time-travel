
import React, { useEffect, useState } from 'react';

interface BrowserWindowProps {
  url: string;
  year: number;
  iframeUrl: string;
  loading: boolean;
  theme: 'light' | 'dark';
  onLoadComplete: () => void;
}

const LOADING_MESSAGES = [
  "Reticulating Splines...".toUpperCase(),
  "Charging Flux Capacitor...".toUpperCase(),
  "Warming Up The 56K Modem...".toUpperCase(),
  "Connecting To AOL... Stay Off The Phone!".toUpperCase(),
  "Polishing 'Under Construction' GIFs...".toUpperCase(),
  "Asking Jeeves For Directions...".toUpperCase(),
  "Rewriting Internet History...".toUpperCase(),
  "Calibrating The DeLorean...".toUpperCase(),
  "Downloading More RAM...".toUpperCase(),
  "Searching For The Dancing Baby...".toUpperCase(),
  "Realigning Space-Time Continuum...".toUpperCase(),
  "Buffers: 0% ... 15% ... 42%...".toUpperCase(),
  "Feeding The Web Crawlers...".toUpperCase(),
  "Booting Netscape Navigator...".toUpperCase(),
  "Optimizing For 800X600 Resolution...".toUpperCase(),
  "Syncing With The Digital Past...".toUpperCase(),
  "Consulting The Oracle Of Geocities...".toUpperCase(),
  "Locating The 'Skip Intro' Button...".toUpperCase(),
  "Defragmenting The Hard Drive...".toUpperCase(),
  "Initiating Chrono-Navigation Sequence...".toUpperCase(),
  "Scanning Temporal Anomalies...".toUpperCase(),
  "Adjusting Paradox Stabilizers...".toUpperCase(),
  "Preparing For Quantum Leap...".toUpperCase(),
  "Spooling Up Historical Data Stream...".toUpperCase(),
  "Engaging Temporal Distortion Field...".toUpperCase(),
  "Warping Through Web Eras...".toUpperCase(),
  "Manifesting Digital Echoes...".toUpperCase(),
  "Calculating Anachronism Quotient...".toUpperCase(),
  "Loading Pixels From The Past...".toUpperCase(),
  "Bypassing Y2K Protocol...".toUpperCase(),
  "Decompressing Ancient Websites...".toUpperCase(),
  "Projecting Into The Hyper-Past...".toUpperCase(),
  "Retrieving Archived Realities...".toUpperCase(),
  "Unearthing Digital Artifacts...".toUpperCase(),
  "Navigating The Ether-Waves Of Yesteryear...".toUpperCase(),
  "Establishing Temporal Bridge...".toUpperCase(),
  "Decrypting Historical Packets...".toUpperCase(),
  "Reconstructing Lost Web Pages...".toUpperCase(),
  "Time-Traveling Data Transfer In Progress...".toUpperCase(),
  "Hold On Tight, It's A Bumpy Ride!...".toUpperCase(),
  "Fast-Forwarding To The Past...".toUpperCase(),
  "Rewinding To Web 1.0...".toUpperCase(),
  "Loading The Echoes Of Geocities...".toUpperCase(),
  "Preparing For Dial-Up Speeds...".toUpperCase(),
  "Unlocking The Digital Vault...".toUpperCase(),
  "Channeling The Ancients (Of The Internet)...".toUpperCase(),
  "Re-rendering Yesterday's Tomorrow...".toUpperCase(),
  "Synchronizing With Vintage Servers...".toUpperCase(),
  "Accessing The Chrono-Web Archive...".toUpperCase(),
  "Almost There... Just A Few Millennia To Go...".toUpperCase(),
];

const BrowserWindow: React.FC<BrowserWindowProps> = ({ url, year, iframeUrl, loading, theme, onLoadComplete }) => {
  const [key, setKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.2));
  const handleZoomReset = () => {
    if (window.innerWidth < 768) {
      setZoomLevel(1);
    } else {
      setZoomLevel(1);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setZoomLevel(0.6);
    }
  }, []);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [iframeUrl]);

  useEffect(() => {
    let interval: number;
    if (loading) {
      const updateMessage = () => {
        const randomIndex = Math.floor(Math.random() * LOADING_MESSAGES.length);
        setCurrentMessage(LOADING_MESSAGES[randomIndex]);
      };
      
      updateMessage(); // Set initial message immediately
      interval = window.setInterval(updateMessage, 2000); // Change every 2 seconds
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className={`flex-1 flex flex-col p-1 sm:p-2 transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-slate-200'}`}>
      <div className={`flex-1 flex flex-col rounded-xl overflow-hidden shadow-2xl border ${theme === 'dark' ? 'bg-[#0f172a] border-white/5' : 'bg-white border-slate-300/50'}`}>
        
        {/* Refined Browser Top Bar */}
        <div className={`h-10 flex items-center px-4 gap-4 shrink-0 ${theme === 'dark' ? 'bg-white/[0.03]' : 'bg-slate-50'}`}>
          {/* Traffic Lights */}
          <div className="flex gap-1.5 items-center shrink-0">
            <div className={`w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-rose-500/30' : 'bg-rose-400'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-amber-500/30' : 'bg-amber-400'}`}></div>
            <div className={`w-2.5 h-2.5 rounded-full ${theme === 'dark' ? 'bg-emerald-500/30' : 'bg-emerald-400'}`}></div>
          </div>
          
          {/* Stylized URL Bar */}
          <div className={`flex-1 flex items-center h-7 border rounded-md px-3 gap-2 overflow-hidden shadow-inner ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white border-slate-200'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-gray-600' : 'text-slate-400'} shrink-0`}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span className={`text-[11px] font-mono truncate select-all tracking-tight ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              https://{url}
            </span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button onClick={handleZoomOut} className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button onClick={handleZoomReset} className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}>
               <span className={`text-xs font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{Math.round(zoomLevel * 100)}%</span>
            </button>
            <button onClick={handleZoomIn} className={`p-1 rounded-md ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
          </div>

          {/* Year Info Badge Only */}
          <div className="shrink-0 flex items-center">
            <div className={`flex items-center px-3 py-1 border rounded-md ${theme === 'dark' ? 'bg-violet-500/10 border-violet-500/20' : 'bg-violet-50 border-violet-200 shadow-sm'}`}>
              <span className={`text-[11px] font-black font-mono leading-none ${theme === 'dark' ? 'text-violet-400' : 'text-violet-600'}`}>{year}</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative flex-1 bg-white overflow-x-hidden overflow-y-auto">
          {loading && (
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center space-y-6 backdrop-blur-md transition-opacity duration-500 ${theme === 'dark' ? 'bg-[#020617]/95' : 'bg-slate-50/95'}`}>
              <div className="relative">
                <div className="w-20 h-20 border-2 border-violet-500/10 border-t-violet-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-center max-w-sm px-8">
                <div className="text-lg font-bold tracking-tight h-12 flex items-center justify-center italic text-violet-500">
                  {currentMessage}
                </div>
                <div className={`text-[9px] mt-6 font-mono font-bold uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-gray-600' : 'text-slate-400'}`}>
                  Time traveling to {year}
                </div>
              </div>
            </div>
          )}
          
          <iframe
            key={key}
            src={iframeUrl}
            onLoad={onLoadComplete}
            style={{
              width: `${100 / zoomLevel}%`,
              height: `${100 / zoomLevel}%`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
            }}
            className="border-none bg-white"
            title={`${url} in ${year}`}
            sandbox="allow-forms allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
