import { useState, useRef, useCallback } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface UseVoiceAgentReturn {
  messages: Message[];
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  startConversation: () => void;
  stopConversation: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
  isSupported: boolean;
  lastCommand: string | null;
}

export const useVoiceAgent = (onCommandExecute?: (command: string) => void): UseVoiceAgentReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const conversationHistoryRef = useRef<Array<{ role: string; content: string }>>([]);
  
  const { 
    isListening, 
    transcript, 
    isSupported, 
    startListening, 
    stopListening 
  } = useSpeechRecognition();

  const playAudio = useCallback(async (base64Audio: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
        audioRef.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          resolve();
        };
        
        audio.onerror = (error) => {
          setIsSpeaking(false);
          console.error('Audio playback error:', error);
          reject(error);
        };
        
        setIsSpeaking(true);
        audio.play().catch(reject);
      } catch (error) {
        setIsSpeaking(false);
        reject(error);
      }
    });
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    conversationHistoryRef.current.push({ role: 'user', content: text });

    setIsThinking(true);

    try {
      // Get LLM response
      const llmResponse = await fetch('/api/voice-agent/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          conversationHistory: conversationHistoryRef.current,
        }),
      });

      if (!llmResponse.ok) {
        throw new Error('Failed to get LLM response');
      }

      const llmData = await llmResponse.json();
      const responseText = llmData.response;
      const commandToExecute = llmData.command;

      // Update conversation history
      conversationHistoryRef.current = llmData.conversationHistory;

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      setIsThinking(false);

      // Execute command if present
      if (commandToExecute && onCommandExecute) {
        setLastCommand(commandToExecute);
        onCommandExecute(commandToExecute);
      }

      // Generate and play TTS
      const ttsResponse = await fetch('/api/voice-agent/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: responseText }),
      });

      if (!ttsResponse.ok) {
        throw new Error('Failed to generate speech');
      }

      const ttsData = await ttsResponse.json();
      await playAudio(ttsData.audio);

    } catch (error) {
      console.error('Voice agent error:', error);
      setIsThinking(false);
      setIsSpeaking(false);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API configuration.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [onCommandExecute, playAudio]);

  // Auto-send when speech recognition finishes
  const prevTranscript = useRef('');
  const handleTranscript = useCallback(() => {
    if (transcript && !isListening && transcript !== prevTranscript.current) {
      prevTranscript.current = transcript;
      sendMessage(transcript);
    }
  }, [transcript, isListening, sendMessage]);

  // Effect to handle transcript changes
  if (transcript && !isListening && transcript !== prevTranscript.current) {
    handleTranscript();
  }

  const startConversation = useCallback(() => {
    if (!isSpeaking && !isThinking) {
      startListening();
    }
  }, [isSpeaking, isThinking, startListening]);

  const stopConversation = useCallback(() => {
    stopListening();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setIsThinking(false);
  }, [stopListening]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    conversationHistoryRef.current = [];
    setLastCommand(null);
  }, []);

  return {
    messages,
    isListening,
    isSpeaking,
    isThinking,
    startConversation,
    stopConversation,
    sendMessage,
    clearConversation,
    isSupported,
    lastCommand,
  };
};
