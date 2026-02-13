import { Theme } from '../types';

export const lightTheme: Theme = {
  name: 'light',
  displayName: 'Light Mode',
  colors: {
    background: '#ffffff',
    backgroundGradient: '#ffffff',
    foreground: '#000000',
    primary: '#000000',
    secondary: '#333333',
    accent: '#555555',
    error: '#cc0000',
    success: '#00aa00',
    warning: '#aa8800',
    muted: '#777777',
    selection: 'rgba(0, 0, 0, 0.1)',
    cursor: '#000000',
    cursorGlow: '0 0 3px #000000',
    border: '#dddddd',
  },
  effects: {
    scanlines: false,
    crtEffect: false,
  },
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.3s ease',
  },
};
