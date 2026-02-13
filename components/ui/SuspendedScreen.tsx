'use client';

import React, { useEffect, useState } from 'react';

interface SuspendedScreenProps {
  onReactivate: () => void;
}

export const SuspendedScreen: React.FC<SuspendedScreenProps> = ({ onReactivate }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      onReactivate();
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onReactivate();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onReactivate]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      <div className="text-center space-y-8">
        <div className="text-white text-xl mb-8">
          [ SYSTEM SUSPENDED ]
        </div>
        
        <div className="text-white text-base">
          Awaiting user reactivation{dots}
        </div>

        <div className="mt-12">
          <svg 
            className="w-20 h-20 text-white opacity-60 animate-pulse mx-auto"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>

        <div className="text-gray-500 text-sm mt-8">
          Click anywhere or press Enter to resume
        </div>
      </div>
    </div>
  );
};
