export interface CommandItem {
  command: string;
  output: React.ReactNode;
  timestamp?: number;
}

export interface CommandArg {
  name: string;
  description: string;
  required?: boolean;
}

export interface CommandContext {
  clearScreen: () => void;
  setTheme: (themeName: string) => void;
  currentTheme: string;
  addOutput: (output: React.ReactNode) => void;
  currentDirectory?: string;
  setCurrentDirectory?: (dir: string) => void;
  getHistory?: () => string[];
}

export interface Command {
  name: string;
  description: string;
  category: 'portfolio' | 'system' | 'recruiter' | 'fun';
  aliases?: string[];
  usage?: string;
  args?: CommandArg[];
  execute: (args: string[], ctx: CommandContext) => CommandOutput;
}

export interface CommandOutput {
  content: React.ReactNode;
  isAsync?: boolean;
  clearScreen?: boolean;
}

export interface Theme {
  name: string;
  displayName: string;
  colors: {
    background: string;
    backgroundGradient?: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    muted: string;
    selection: string;
    cursor: string;
    cursorGlow?: string;
    border?: string;
  };
  effects: {
    glassmorphism?: boolean;
    matrixRain?: boolean;
    particles?: boolean;
    scanlines?: boolean;
    crtEffect?: boolean;
  };
  fonts: {
    primary: string;
    mono: string;
  };
  transitions: {
    theme: string;
  };
}
