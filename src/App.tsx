import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { TerminalProvider } from './context/TerminalContext';
import { Terminal } from './components/terminal/Terminal';

function App() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <Terminal />
      </TerminalProvider>
    </ThemeProvider>
  );
}

export default App;
