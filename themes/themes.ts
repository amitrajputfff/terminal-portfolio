import { Theme } from '../types';

export const proHackerTheme: Theme = {
  name: 'pro-hacker',
  displayName: 'Pro Hacker',
  colors: {
    background: '#000000',
    backgroundGradient: '#000000',
    foreground: '#ffffff',
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#888888',
    error: '#ff0000',
    success: '#00ff00',
    warning: '#ffff00',
    muted: '#666666',
    selection: 'rgba(255, 255, 255, 0.2)',
    cursor: '#ffffff',
    cursorGlow: '0 0 5px #ffffff',
    border: '#333333',
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

export const lightTheme: Theme = {
  name: 'light',
  displayName: 'Light',
  colors: {
    background: '#ffffff',
    backgroundGradient: '#ffffff',
    foreground: '#000000',
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    error: '#ff0000',
    success: '#00aa00',
    warning: '#ff8800',
    muted: '#888888',
    selection: 'rgba(0, 0, 0, 0.1)',
    cursor: '#000000',
    cursorGlow: '0 0 5px rgba(0, 0, 0, 0.3)',
    border: '#cccccc',
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

export const cyberpunkTheme: Theme = {
  name: 'cyberpunk',
  displayName: 'Cyberpunk',
  colors: {
    background: '#0d0221',
    backgroundGradient: 'linear-gradient(135deg, #0d0221 0%, #1a0b2e 50%, #2d1b4e 100%)',
    foreground: '#ff2a6d',
    primary: '#ff2a6d',
    secondary: '#05d9e8',
    accent: '#d1f7ff',
    error: '#ff0055',
    success: '#05d9e8',
    warning: '#f7b731',
    muted: '#6c5b7b',
    selection: 'rgba(255, 42, 109, 0.3)',
    cursor: '#ff2a6d',
    cursorGlow: '0 0 10px #ff2a6d, 0 0 20px #ff2a6d',
    border: '#ff2a6d33',
  },
  effects: {
    glassmorphism: true,
    scanlines: true,
  },
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const draculaTheme: Theme = {
  name: 'dracula',
  displayName: 'Dracula',
  colors: {
    background: '#282a36',
    backgroundGradient: 'linear-gradient(135deg, #282a36 0%, #1e1f29 100%)',
    foreground: '#f8f8f2',
    primary: '#bd93f9',
    secondary: '#ff79c6',
    accent: '#50fa7b',
    error: '#ff5555',
    success: '#50fa7b',
    warning: '#f1fa8c',
    muted: '#6272a4',
    selection: 'rgba(189, 147, 249, 0.3)',
    cursor: '#bd93f9',
    cursorGlow: '0 0 8px #bd93f9',
    border: '#bd93f933',
  },
  effects: {},
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const nordTheme: Theme = {
  name: 'nord',
  displayName: 'Nord',
  colors: {
    background: '#2e3440',
    backgroundGradient: 'linear-gradient(135deg, #2e3440 0%, #3b4252 100%)',
    foreground: '#eceff4',
    primary: '#88c0d0',
    secondary: '#81a1c1',
    accent: '#8fbcbb',
    error: '#bf616a',
    success: '#a3be8c',
    warning: '#ebcb8b',
    muted: '#4c566a',
    selection: 'rgba(136, 192, 208, 0.3)',
    cursor: '#88c0d0',
    cursorGlow: '0 0 8px #88c0d0',
    border: '#88c0d033',
  },
  effects: {},
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const matrixTheme: Theme = {
  name: 'matrix',
  displayName: 'Matrix',
  colors: {
    background: '#000000',
    backgroundGradient: '#000000',
    foreground: '#00ff00',
    primary: '#00ff00',
    secondary: '#00cc00',
    accent: '#00ff66',
    error: '#ff0000',
    success: '#00ff00',
    warning: '#ffff00',
    muted: '#008800',
    selection: 'rgba(0, 255, 0, 0.3)',
    cursor: '#00ff00',
    cursorGlow: '0 0 15px #00ff00, 0 0 30px #00ff00, 0 0 45px #00ff00',
    border: '#00ff0033',
  },
  effects: {
    matrixRain: true,
    crtEffect: true,
    scanlines: true,
  },
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.3s ease',
  },
};

export const monokaiTheme: Theme = {
  name: 'monokai',
  displayName: 'Monokai',
  colors: {
    background: '#272822',
    backgroundGradient: 'linear-gradient(135deg, #272822 0%, #1e1f1c 100%)',
    foreground: '#f8f8f2',
    primary: '#66d9ef',
    secondary: '#a6e22e',
    accent: '#f92672',
    error: '#f92672',
    success: '#a6e22e',
    warning: '#e6db74',
    muted: '#75715e',
    selection: 'rgba(102, 217, 239, 0.3)',
    cursor: '#66d9ef',
    cursorGlow: '0 0 8px #66d9ef',
    border: '#66d9ef33',
  },
  effects: {},
  fonts: {
    primary: 'JetBrains Mono',
    mono: 'Fira Code',
  },
  transitions: {
    theme: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
