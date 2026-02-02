
import React, { useState, useEffect, useCallback } from 'react';
import { MIN_YEAR, MAX_YEAR, POPULAR_SITES, ALL_POPULAR_SITES } from './constants';
import { getWaybackUrl, validateUrl } from './services/waybackService';
import Timeline from './components/Timeline';
import SiteSelector from './components/SiteSelector';
import BrowserWindow from './components/BrowserWindow';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [year, setYear] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const yearParam = parseInt(params.get('year') || '', 10);
      if (!isNaN(yearParam) && yearParam >= MIN_YEAR && yearParam <= MAX_YEAR) {
        return yearParam;
      }
    }
    return 1999;
  });
  const [url, setUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get('site');
      if (urlParam && urlParam.trim() !== '') {
        return urlParam;
      }
    }
    return 'google.com';
  });
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showArrivedMessage, setShowArrivedMessage] = useState(false); // New state for "Arrived" message
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    updateView(url, year);
  }, []); // Run once on mount to set the initial iframeUrl

  useEffect(() => {
    let arrivedMessageTimeout: number | undefined;

    if (loading) {
      setShowArrivedMessage(false); // Hide "arrived" message when loading starts
    } else {
      // If not loading, and iframeUrl is present, show "arrived" message briefly
      if (iframeUrl) {
        setShowArrivedMessage(true);
        arrivedMessageTimeout = window.setTimeout(() => {
          setShowArrivedMessage(false);
        }, 3000); // Show for 3 seconds
      }
    }
    return () => {
      if (arrivedMessageTimeout) clearTimeout(arrivedMessageTimeout);
    };
  }, [loading, iframeUrl]); // Watch loading and iframeUrl changes

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const updateView = useCallback((newUrl: string, newYear: number) => {
    setLoading(true);
    const validated = validateUrl(newUrl);
    setUrl(validated);
    setYear(newYear);

    // Update URL query parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('site') !== validated || params.get('year') !== String(newYear)) {
      params.set('site', validated);
      params.set('year', String(newYear));
      const newUrlString = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrlString);
    }
    
    setTimeout(() => {
      setIframeUrl(getWaybackUrl(validated, newYear));
    }, 300);
  }, []);

  const handleYearChange = (newYear: number) => {
    updateView(url, newYear);
  };

  const handleSiteSelect = (newUrl: string, startYear: number) => {
    const targetYear = year < startYear ? startYear : year;
    updateView(newUrl, targetYear);
  };

  const handleSearch = (newUrl: string) => {
    updateView(newUrl, year);
  };

  const handleRandomSite = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ALL_POPULAR_SITES.length);
    const randomSite = ALL_POPULAR_SITES[randomIndex];
    
    const randomYear = Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR + 1)) + MIN_YEAR;

    // Ensure the random year is not before the site's start year
    const targetYear = randomYear < randomSite.startYear ? randomSite.startYear : randomYear;

    updateView(randomSite.url, targetYear);
  }, [updateView]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex flex-col h-screen w-full transition-colors duration-300 overflow-hidden font-sans ${theme === 'dark' ? 'bg-[#020617] text-gray-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Unified Header Control Panel */}
      <header className={`z-20 shrink-0 ${theme === 'dark' ? 'bg-[#0f172a]/60 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl shadow-sm'}`}>
        <div className="max-w-[1600px] mx-auto">
          
          {/* LEVEL 1: Branding & Theme Toggle - Tightened py */}
          <div className="py-4 px-4 flex items-center justify-between">
            <div className="flex items-baseline gap-4">
              <h1 className={`text-xl font-black tracking-tight leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Web Time <span className="text-violet-600">Machine</span>
              </h1>
              <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                travel back in time and explore the web
              </p>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {/* LEVEL 2: Site Selectors & Address Bar - Tightened py */}
          <div className="flex flex-col gap-3 py-2 px-4"> {/* New container for the entire section */}
            <p className={`text-xs font-bold uppercase tracking-[0.2em] px-1 ${theme === 'dark' ? 'text-violet-200' : 'text-violet-600'}`}>
              Step 1. PICK YOUR DESTINATION
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"> {/* Original LEVEL 2 flex container, now nested */}
              {/* Site Selector - Full width on mobile, flex-1 on desktop */}
              <div className="w-full sm:flex-1 overflow-hidden flex flex-col">
                <SiteSelector 
                  sites={POPULAR_SITES} 
                  currentUrl={url} 
                  onSelect={handleSiteSelect}
                  onRandomSelect={handleRandomSite} // Pass the new handler
                  theme={theme}
                />
              </div>
              <span className={`text-xs tracking-[0.2em] px-1 ${theme === 'dark' ? 'text-violet-200' : 'text-violet-600'}`}>or enter manually</span>
              {/* Search Bar - Full width on mobile, fixed width on desktop */}
              <div className="w-full sm:w-[340px] shrink-0 flex items-center">
                <SearchBar onSearch={handleSearch} initialValue={url} theme={theme} />
              </div>
            </div>
          </div>

          {/* LEVEL 3: Timeline Navigation - Tightened py */}
          <div className="flex flex-col gap-1 py-2 px-4">
            <p className={`text-xs font-bold uppercase tracking-[0.2em] px-1 ${theme === 'dark' ? 'text-violet-200' : 'text-violet-600'}`}>
              Step 2. Select the year
            </p>
            <Timeline 
              min={MIN_YEAR} 
              max={MAX_YEAR} 
              value={year} 
              onChange={handleYearChange}
              theme={theme}
            />
          </div>
          <div className="py-1 mb-0 px-4">
            <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 px-1 ${theme === 'dark' ? 'text-violet-200' : 'text-violet-600'}`}>
              {loading ? 'Step 3. HANG TIGHT...' : 'Step 3. WE\'VE ARRIVED!'}
            </p>
          </div>
        </div>
      </header>

      {/* Primary Viewport */}
      <main className={`flex-1 relative flex flex-col ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
        <div className="max-w-[1600px] mx-auto px-0 w-full flex-1 flex flex-col"> {/* Added wrapper div */}
          <BrowserWindow
            url={url}
            year={year}
            iframeUrl={iframeUrl}
            loading={loading}
            theme={theme}
            onLoadComplete={() => setLoading(false)}
            onYearChange={handleYearChange}
            minYear={MIN_YEAR}
            maxYear={MAX_YEAR}
          />
        </div>
      </main>

      {/* Compact Footer - Tightened h */}
      <footer className={`shrink-0 h-5 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617] text-gray-700' : 'bg-slate-50 text-slate-400'}`}>
        <div className="max-w-[1600px] mx-auto px-6 w-full h-full flex items-center justify-between text-[8px] font-bold tracking-[0.2em] uppercase">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} <a href="https://me-topaz-two.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Ashok Marannan</a></span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-emerald-500/50' : 'bg-emerald-500'}`}></div>
            {/* <span className="opacity-50">Archive Sync Online</span> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
