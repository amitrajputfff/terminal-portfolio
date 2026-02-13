'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CommandItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TerminalContextType {
  commandHistory: CommandItem[];
  addCommand: (command: string, output: React.ReactNode) => void;
  clearHistory: () => void;
  isFirstVisit: boolean;
  markVisited: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [commandHistory, setCommandHistory] = useState<CommandItem[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('terminal-first-visit', true);

  const addCommand = useCallback((command: string, output: React.ReactNode) => {
    const newItem: CommandItem = {
      command,
      output,
      timestamp: Date.now(),
    };
    setCommandHistory(prev => [...prev, newItem]);
  }, []);

  const clearHistory = useCallback(() => {
    setCommandHistory([]);
  }, []);

  const markVisited = useCallback(() => {
    setIsFirstVisit(false);
  }, [setIsFirstVisit]);

  return (
    <TerminalContext.Provider
      value={{
        commandHistory,
        addCommand,
        clearHistory,
        isFirstVisit,
        markVisited,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within TerminalProvider');
  }
  return context;
};
