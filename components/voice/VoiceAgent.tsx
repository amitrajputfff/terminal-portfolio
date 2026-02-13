'use client';

import React, { useEffect, useRef } from 'react';
import { useVoiceAgent } from '@/hooks/useVoiceAgent';

interface VoiceAgentProps {
  onCommandExecute: (command: string) => void;
  onClose: () => void;
}

export const VoiceAgent: React.FC<VoiceAgentProps> = ({ onCommandExecute, onClose }) => {
  const {
    messages,
    isListening,
    isSpeaking,
    isThinking,
    startConversation,
    stopConversation,
    sendMessage,
    clearConversation,
    isSupported,
  } = useVoiceAgent(onCommandExecute);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isSupported) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <div className="bg-background border border-error p-8 rounded-lg max-w-md">
          <div className="text-error font-bold text-xl mb-4">❌ Voice Agent Not Supported</div>
          <div className="text-foreground mb-4">
            Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-error/20 hover:bg-error/30 text-error rounded border border-error/40 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const getStatusText = () => {
    if (isListening) return '🎤 Listening...';
    if (isThinking) return '🤔 Thinking...';
    if (isSpeaking) return '🔊 Speaking...';
    return '💬 Ready to chat';
  };

  const getStatusColor = () => {
    if (isListening) return 'text-error';
    if (isThinking) return 'text-warning';
    if (isSpeaking) return 'text-accent';
    return 'text-success';
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="bg-background border border-primary rounded-lg w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </div>
            <div>
              <div className="text-primary font-bold text-lg">AI Voice Agent</div>
              <div className={`text-sm ${getStatusColor()}`}>{getStatusText()}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearConversation}
              className="px-3 py-1 text-sm text-muted hover:text-foreground transition-colors"
              title="Clear conversation"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-muted hover:text-error transition-colors"
              title="Close agent"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted py-12">
              <div className="text-4xl mb-4">🎙️</div>
              <div className="text-lg text-foreground mb-2">Welcome to the AI Voice Agent!</div>
              <div className="text-sm mb-4">Ask me anything about Amit's experience, skills, or projects.</div>
              <div className="text-xs space-y-1">
                <div>💡 Try: "Tell me about Amit's experience"</div>
                <div>💡 Try: "What are his skills?"</div>
                <div>💡 Try: "Show me his projects"</div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary/20 text-foreground border border-primary/40'
                      : 'bg-accent/20 text-foreground border border-accent/40'
                  }`}
                >
                  <div className="text-xs text-muted mb-1">
                    {message.role === 'user' ? 'You' : 'AI Agent'}
                  </div>
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Voice Button */}
          <div className="flex justify-center">
            <button
              onClick={isListening ? stopConversation : startConversation}
              disabled={isSpeaking || isThinking}
              className={`
                w-16 h-16 rounded-full flex items-center justify-center transition-all
                ${isListening 
                  ? 'bg-error/20 border-2 border-error animate-pulse' 
                  : 'bg-primary/20 border-2 border-primary hover:bg-primary/30'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={isListening ? 'Stop listening' : 'Start voice conversation'}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isListening ? (
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                ) : (
                  <>
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Text Input */}
          <form onSubmit={handleTextSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Or type your message..."
              disabled={isSpeaking || isThinking}
              className="flex-1 px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted focus:outline-none focus:border-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSpeaking || isThinking}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded border border-primary/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>

          {/* Instructions */}
          <div className="text-xs text-muted text-center">
            Press and hold the microphone to speak, or type your message
          </div>
        </div>
      </div>
    </div>
  );
};
