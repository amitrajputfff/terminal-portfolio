import { useState, useCallback } from 'react';
import { CommandItem } from '../types';

export const useCommandHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const addToHistory = useCallback((command: string) => {
    if (command.trim()) {
      setHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down'): string => {
    if (history.length === 0) return '';

    let newIndex = historyIndex;

    if (direction === 'up') {
      newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      if (newIndex === history.length - 1 && historyIndex === history.length - 1) {
        newIndex = -1;
      }
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : history[newIndex];
  }, [history, historyIndex]);

  return { history, addToHistory, navigateHistory, historyIndex };
};
