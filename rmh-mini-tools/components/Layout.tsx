
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onSearchChange: (query: string) => void;
  activeTab: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onSearchChange, activeTab }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/28tMMCYj/Mini-items-logo.png" 
              alt="RMH Mini Tools Logo" 
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                RMH Mini Tools
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Entrepreneur Utilities</p>
            </div>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M3 12h1m8-9a9 9 0 110 18 9 9 0 010-18z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="max-w-4xl mx-auto mt-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search tools..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4">
        {children}
      </main>

      <footer className="py-8 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-slate-500 text-sm">
            Developed by <a href="https://rabbitmarketinghouse.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Rabbit Marketing House</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
