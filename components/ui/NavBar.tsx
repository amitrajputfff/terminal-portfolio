'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface NavBarProps {
  onPowerOff: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onPowerOff }) => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);
  const [location, setLocation] = React.useState('Faridabad 17°C');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPowerOff}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-border transition-colors"
            title="Power"
          >
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
            </svg>
          </button>
          <div className="text-sm text-muted">{location}</div>
        </div>

        {/* Center section */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="https://iabhinav.me" className="text-sm text-foreground hover:text-primary transition-colors">
            https://iabhinav.me
          </a>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted">
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })} {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: false 
            })}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="text-sm text-muted hover:text-foreground transition-colors"
              title="Switch Theme"
            >
              Theme
            </button>
            
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1">
                {availableThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      setTheme(themeName);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-border transition-colors ${
                      theme.name === themeName ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {themeName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    {theme.name === themeName && ' ✓'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="text-sm text-muted hover:text-foreground transition-colors"
            title="Fullscreen"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
