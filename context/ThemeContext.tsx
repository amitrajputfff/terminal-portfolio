'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { Theme } from '@/types';
import { defaultTheme, getThemeByName } from '@/themes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useLocalStorage<string>('terminal-theme', defaultTheme.name);
  const theme = getThemeByName(themeName) || defaultTheme;

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--bg-color', theme.colors.background);
    root.style.setProperty('--fg-color', theme.colors.foreground);
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--accent-color', theme.colors.accent);
    root.style.setProperty('--error-color', theme.colors.error);
    root.style.setProperty('--success-color', theme.colors.success);
    root.style.setProperty('--warning-color', theme.colors.warning);
    root.style.setProperty('--muted-color', theme.colors.muted);
    root.style.setProperty('--selection-color', theme.colors.selection);
    root.style.setProperty('--cursor-color', theme.colors.cursor);
    root.style.setProperty('--border-color', theme.colors.border || theme.colors.primary);
    
    if (theme.colors.cursorGlow) {
      root.style.setProperty('--cursor-glow', theme.colors.cursorGlow);
    }
    
    if (theme.colors.backgroundGradient) {
      root.style.setProperty('--bg-gradient', theme.colors.backgroundGradient);
    }

    root.style.setProperty('--theme-transition', theme.transitions.theme);
  }, [theme]);

  const setThemeByName = (name: string) => {
    const newTheme = getThemeByName(name);
    if (newTheme) {
      setThemeName(name);
    }
  };

  const availableThemes = [
    'pro-hacker',
    'light',
    'cyberpunk',
    'dracula',
    'nord',
    'matrix',
    'monokai',
  ];

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeByName, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
