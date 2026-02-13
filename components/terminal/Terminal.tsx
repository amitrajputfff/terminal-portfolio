'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useTerminal } from '@/context/TerminalContext';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { executeCommand, initializeCommands, getAllCommands } from '@/commands';
import { MatrixRain } from '@/components/effects/MatrixRain';
import { BootSequence } from '@/components/effects/BootSequence';
import { VoiceAgent } from '@/components/voice/VoiceAgent';
import { resumeData } from '@/config/resume.config';

initializeCommands();

interface LocationData {
  city: string;
  temp: number | null;
  loading: boolean;
}

const useLocationWeather = () => {
  const [location, setLocation] = useState<LocationData>({
    city: 'Loading...',
    temp: null,
    loading: true,
  });

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const geoResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const geoData = await geoResponse.json();
        const city = geoData.city || geoData.locality || 'Unknown';

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();
        const temp = Math.round(weatherData.current_weather?.temperature || 0);

        setLocation({ city, temp, loading: false });
      } catch {
        setLocation({ city: 'Unknown', temp: null, loading: false });
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocation({ city: 'Location denied', temp: null, loading: false });
        }
      );
    } else {
      setLocation({ city: 'Geolocation unavailable', temp: null, loading: false });
    }
  }, []);

  return location;
};

const useCurrentTime = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const WelcomeBanner: React.FC = memo(() => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-8 mb-6">
        <pre className="text-primary font-mono text-xl md:text-2xl whitespace-pre font-bold">
{`
 █████╗ ███╗   ███╗██╗████████╗
██╔══██╗████╗ ████║██║╚══██╔══╝
███████║██╔████╔██║██║   ██║   
██╔══██║██║╚██╔╝██║██║   ██║   
██║  ██║██║ ╚═╝ ██║██║   ██║   
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   
`}
        </pre>
        <pre className="text-primary font-mono text-xl md:text-2xl whitespace-pre font-bold">
{`
██████╗ ██╗  ██╗ █████╗ ████████╗██╗
██╔══██╗██║  ██║██╔══██╗╚══██╔══╝██║
██████╔╝███████║███████║   ██║   ██║
██╔══██╗██╔══██║██╔══██║   ██║   ██║
██████╔╝██║  ██║██║  ██║   ██║   ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
`}
        </pre>
      </div>
      <div className="space-y-1 text-base">
        <div className="text-foreground">
          Welcome to <span className="text-primary font-bold">{resumeData.name}</span>'s Terminal Portfolio
        </div>
        <div className="text-muted text-sm">
          Type '<span className="text-primary">?</span>' or '<span className="text-primary">help</span>' to view a list of available commands.
        </div>
        <div className="text-accent text-xs mt-2">
          🤖 Try <span className="text-primary">agent</span> to chat with AI assistant | 
          🎤 Try <span className="text-primary">voice</span> for voice commands | 
          🎮 Try <span className="text-primary">hack</span> or <span className="text-primary">fortune</span> for fun
        </div>
      </div>
    </div>
  );
});

WelcomeBanner.displayName = 'WelcomeBanner';

const OutputLine: React.FC<{ command: string; output: React.ReactNode; directory?: string }> = memo(({ command, output, directory }) => (
  <div className="mb-3">
    <div className="flex flex-row mb-1 items-center">
      <div className="text-muted selection:bg-selection">
        visitor<span className="text-primary">@</span>{resumeData.name.toLowerCase().replace(' ', '-')}.me
      </div>
      <div className="text-muted mx-1">:</div>
      <div className="text-accent">~{directory && directory !== '/home/amit' ? directory.replace('/home/amit', '') : ''}</div>
      <div className="text-primary ml-1">$</div>
      <div className="ml-2 font-mono text-foreground selection:bg-selection">
        {command}
      </div>
    </div>
    <div className="font-mono text-left selection:bg-selection text-sm">
      {output}
    </div>
  </div>
));

OutputLine.displayName = 'OutputLine';

const SuspendedScreen: React.FC<{ onReactivate: () => void }> = ({ onReactivate }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="text-xl text-white font-mono">
          [ SYSTEM SUSPENDED ]
        </div>
        <div className="text-muted text-sm">
          Awaiting user reactivation{dots}
        </div>
        <button
          onClick={onReactivate}
          className="group transition-all duration-300"
          aria-label="Reactivate system"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white opacity-50 hover:opacity-100 transition-opacity"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
            }}
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v6l5 3 1-1.5-4-2.5V7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M12 7v5l4 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const Terminal: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const { commandHistory: terminalHistory, addCommand, clearHistory, isFirstVisit, markVisited } = useTerminal();
  const { addToHistory, navigateHistory, history } = useCommandHistory();
  const { isListening, transcript, isSupported: isVoiceSupported, startListening, stopListening } = useSpeechRecognition();
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/home/amit');
  const [suggestions, setSuggestions] = useState<Array<{name: string; description: string}>>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [isSuspended, setIsSuspended] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [agentConversation, setAgentConversation] = useState<Array<{role: string; content: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const location = useLocationWeather();
  const currentTime = useCurrentTime();

  useEffect(() => {
    const booted = localStorage.getItem('terminal-booted');
    if (!booted) {
      setShowBootSequence(true);
    } else {
      setHasBooted(true);
    }
  }, []);

  useEffect(() => {
    if (hasBooted && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const cmdParam = urlParams.get('cmd');
      
      if (cmdParam) {
        setTimeout(() => {
          const result = executeCommand(cmdParam, {
            clearScreen: clearHistory,
            setTheme,
            currentTheme: theme.name,
            addOutput: (output) => addCommand('', output),
            currentDirectory,
            setCurrentDirectory,
            getHistory: () => history,
          });

          if (result.clearScreen) {
            clearHistory();
          } else {
            addCommand(cmdParam, result.content);
          }

          window.history.replaceState({}, '', window.location.pathname);
        }, 500);
      }
    }
  }, [hasBooted]);

  const handleBootComplete = () => {
    localStorage.setItem('terminal-booted', 'true');
    setShowBootSequence(false);
    setHasBooted(true);
  };

  const cycleTheme = () => {
    const currentIndex = availableThemes.indexOf(theme.name);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setTheme(availableThemes[nextIndex]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleVoiceMode = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSuspend = () => {
    setIsSuspended(true);
  };

  const handleReactivate = () => {
    setIsSuspended(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (transcript && !isListening) {
      setCurrentCommand(transcript.trim().toLowerCase());
      setTimeout(() => {
        handleCommandExecution();
      }, 100);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    if (isFirstVisit) {
      markVisited();
    }
  }, [isFirstVisit, markVisited]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [terminalHistory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCommandExecution = useCallback(async () => {
    if (!currentCommand.trim()) return;

    // Handle agent mode
    if (isAgentMode) {
      if (currentCommand.trim().toLowerCase() === 'exit' || 
          currentCommand.trim().toLowerCase() === 'quit') {
        setIsAgentMode(false);
        setAgentConversation([]);
        addCommand('agent > exit', <div className="text-muted">Exiting AI agent mode...</div>);
        setCurrentCommand('');
        return;
      }

      // Send to AI agent
      const userMessage = currentCommand.trim();
      addCommand(`agent > ${userMessage}`, <div className="text-muted">Thinking...</div>);
      setCurrentCommand('');

      try {
        const response = await fetch('/api/voice-agent/llm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: userMessage,
            conversationHistory: agentConversation,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get AI response');
        }

        const data = await response.json();
        const aiResponse = data.response;
        const commandToExecute = data.command;

        // Update conversation history
        setAgentConversation(data.conversationHistory);

        // Show AI response
        addCommand('', (
          <div className="space-y-2">
            <div className="text-accent font-semibold">AI Agent:</div>
            <div className="text-foreground">{aiResponse}</div>
            {commandToExecute && (
              <div className="mt-2 p-2 bg-primary/10 border border-primary/30 rounded">
                <div className="text-primary text-sm">Executing: <code>{commandToExecute}</code></div>
              </div>
            )}
          </div>
        ));

        // Execute command if present
        if (commandToExecute) {
          setTimeout(() => {
            const result = executeCommand(commandToExecute, {
              clearScreen: clearHistory,
              setTheme,
              currentTheme: theme.name,
              addOutput: (output) => addCommand('', output),
              currentDirectory,
              setCurrentDirectory,
              getHistory: () => history,
            });
            addCommand(commandToExecute, result.content);
          }, 500);
        }
      } catch (error) {
        console.error('Agent error:', error);
        addCommand('', (
          <div className="text-error">
            Error: Failed to get AI response. Check your API configuration.
          </div>
        ));
      }
      return;
    }

    addToHistory(currentCommand);

    // Check if it's the agent command
    if (currentCommand.trim().toLowerCase() === 'agent' || 
        currentCommand.trim().toLowerCase() === 'ai' || 
        currentCommand.trim().toLowerCase() === 'assistant' ||
        currentCommand.trim().toLowerCase() === 'aria') {
      setIsAgentMode(true);
      setAgentConversation([]);
      addCommand(currentCommand, (
        <div className="space-y-2">
          <div className="text-primary font-bold">🤖 AI AGENT MODE ACTIVATED</div>
          <div className="text-success">You're now chatting with the AI agent!</div>
          <div className="text-muted text-sm mt-2">
            Ask me anything about Amit's experience, skills, or projects.
          </div>
          <div className="text-muted text-xs mt-2 space-y-1">
            <div>• I can answer questions about Amit's background</div>
            <div>• I can execute terminal commands for you</div>
            <div>• Type <span className="text-primary">exit</span> or <span className="text-primary">quit</span> to leave agent mode</div>
          </div>
        </div>
      ));
      setCurrentCommand('');
      return;
    }

    const result = executeCommand(currentCommand, {
      clearScreen: clearHistory,
      setTheme,
      currentTheme: theme.name,
      addOutput: (output) => addCommand('', output),
      currentDirectory,
      setCurrentDirectory,
      getHistory: () => history,
    });

    if (result.clearScreen) {
      clearHistory();
    } else {
      addCommand(currentCommand, result.content);
    }

    setCurrentCommand('');
    setSuggestions([]);
    setSelectedSuggestion(0);
  }, [currentCommand, isAgentMode, agentConversation, addToHistory, addCommand, clearHistory, setTheme, theme, currentDirectory, history]);

  const handleAgentCommand = useCallback((command: string) => {
    setCurrentCommand(command);
    setTimeout(() => {
      const result = executeCommand(command, {
        clearScreen: clearHistory,
        setTheme,
        currentTheme: theme.name,
        addOutput: (output) => addCommand('', output),
        currentDirectory,
        setCurrentDirectory,
        getHistory: () => history,
      });

      if (result.clearScreen) {
        clearHistory();
      } else {
        addCommand(command, result.content);
      }
      setCurrentCommand('');
    }, 100);
  }, [clearHistory, setTheme, theme, addCommand, currentDirectory, history]);

  // Real-time auto-suggestions as user types
  useEffect(() => {
    if (currentCommand.trim().length > 0) {
      const allCommands = getAllCommands();
      const matches = allCommands
        .filter(cmd => 
          cmd.name.toLowerCase().startsWith(currentCommand.toLowerCase()) ||
          cmd.aliases?.some(alias => alias.toLowerCase().startsWith(currentCommand.toLowerCase()))
        )
        .slice(0, 5);
      
      setSuggestions(matches.map(cmd => ({
        name: cmd.name,
        description: cmd.description
      })) as any);
    } else {
      setSuggestions([]);
    }
  }, [currentCommand]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandExecution();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const cmd = navigateHistory('up');
      setCurrentCommand(cmd);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const cmd = navigateHistory('down');
      setCurrentCommand(cmd);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentCommand(suggestions[selectedSuggestion].name);
        setSuggestions([]);
        setSelectedSuggestion(0);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearHistory();
    } else if (e.key === 'm' && e.ctrlKey) {
      e.preventDefault();
      toggleVoiceMode();
    }
  };

  if (isSuspended) {
    return <SuspendedScreen onReactivate={handleReactivate} />;
  }

  if (showBootSequence) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  if (!hasBooted) {
    return null;
  }

  return (
    <>      
      <div 
      className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col"
      style={{ 
        background: theme.colors.backgroundGradient || theme.colors.background,
        transition: theme.transitions.theme,
      }}
    >
      <MatrixRain enabled={theme.effects.matrixRain} />
      
      {/* Nav Header */}
      <nav className="relative z-30 flex items-center justify-between px-4 py-2 border-b border-border bg-background bg-opacity-50 backdrop-blur-sm">
        {/* Left: Location & Weather */}
        <div className="flex items-center gap-2 text-muted text-xs min-w-[140px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>
            {location.loading ? 'Loading...' : `${location.city}${location.temp !== null ? ` ${location.temp}°C` : ''}`}
          </span>
        </div>

        {/* Center: Name & Time */}
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold text-sm tracking-wide">{resumeData.name}</span>
          
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 min-w-[140px] justify-end">
          {/* Theme Toggle */}
          <span className="text-muted text-xs font-mono">{currentTime}</span>
          
          {/* Voice Mode Toggle */}
          {isVoiceSupported && (
            <button
              onClick={toggleVoiceMode}
              className={`${isListening ? 'text-error animate-pulse' : 'text-muted hover:text-primary'} transition-colors p-1`}
              title={isListening ? "Listening... (Ctrl+M to stop)" : "Voice mode (Ctrl+M)"}
              aria-label={isListening ? "Stop voice recognition" : "Start voice recognition"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>
          )}
          
          <button
            onClick={cycleTheme}
            className="text-muted hover:text-primary transition-colors p-1"
            title={`Theme: ${theme.displayName} (click to cycle)`}
            aria-label="Toggle theme"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="text-muted hover:text-primary transition-colors p-1"
            title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>
      
      <div 
        ref={terminalRef}
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 md:px-8 md:py-12"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <WelcomeBanner />

          {terminalHistory.map((item, index) => (
            <OutputLine key={index} command={item.command} output={item.output} directory={currentDirectory} />
          ))}

          <div className="flex flex-row items-center">
            <div className="text-muted selection:bg-selection">
              {isAgentMode ? (
                <span className="text-accent font-bold">agent</span>
              ) : (
                <>visitor<span className="text-primary">@</span>{resumeData.name.toLowerCase().replace(' ', '-')}.me</>
              )}
            </div>
            {!isAgentMode && (
              <>
                <div className="text-muted mx-1">:</div>
                <div className="text-accent">~{currentDirectory !== '/home/amit' ? currentDirectory.replace('/home/amit', '') : ''}</div>
              </>
            )}
            <div className="text-primary ml-1">{isAgentMode ? '>' : '$'}</div>
            <input
              ref={inputRef}
              className="bg-transparent outline-none border-none font-mono ml-2 text-foreground flex-1 min-w-0 caret-cursor"
              style={{
                caretColor: theme.colors.cursor,
              }}
              type="text"
              value={currentCommand}
              autoFocus
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isAgentMode ? "Ask me anything... (type 'exit' to quit)" : ""}
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          {suggestions.length > 0 && (
            <div className="mt-2 ml-2 text-sm">
              <div className="text-muted text-xs mb-1.5">Suggestions:</div>
              <div className="space-y-0.5">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.name}
                    className="flex items-start gap-4 cursor-pointer transition-colors"
                  >
                    <span className="text-foreground min-w-[120px]">{suggestion.name}</span>
                    <span className="text-muted opacity-60 text-xs">- {suggestion.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Spacer for better scroll experience */}
          <div className="h-32"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-30 flex items-center justify-between px-4 py-2 border-t border-border bg-background bg-opacity-50 backdrop-blur-sm">
        <div className="w-8"></div>
        <div className="text-muted text-xs">
          © 2026 {resumeData.name} | All Rights Reserved
        </div>
        <button
          onClick={handleSuspend}
          className="text-muted hover:text-error transition-colors p-1"
          title="Suspend system"
          aria-label="Power off"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </button>
      </footer>

      {theme.effects.scanlines && (
        <div className="scanlines pointer-events-none fixed inset-0 z-20" />
      )}

      {theme.effects.crtEffect && (
        <div className="crt-effect pointer-events-none fixed inset-0 z-20" />
      )}
    </div>
    </>
  );
};
