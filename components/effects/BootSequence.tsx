'use client';

import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const bootSteps = [
    'BIOS Version 2.5.0 - Initializing...',
    'CPU: Intel Core i9 @ 5.2GHz - OK',
    'Memory Test: 32GB RAM - PASSED',
    'Graphics: NVIDIA RTX 4090 - DETECTED',
    '',
    'Loading system modules...',
    '[OK] Voice Recognition System',
    '[OK] Command Parser v3.2',
    '[OK] File System Driver',
    '[OK] Network Stack',
    '[OK] Security Module',
    '[OK] Theme Engine',
    '',
    'Initializing portfolio services...',
    '[OK] Resume API',
    '[OK] Skills Database',
    '[OK] Experience Logger',
    '[OK] Project Manager',
    '[OK] Contact Service',
    '',
    'Running system diagnostics...',
    '● LeetCode Solver: 410+ problems ✓',
    '● Voice AI System: Sub-500ms latency ✓',
    '● Full Stack Engine: Ready ✓',
    '● Recruiter Magnet: Active ✓',
    '',
    'All systems operational.',
    'Welcome to Terminal Portfolio v2.0',
    '',
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootSteps[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, bootSteps[currentStep] === '' ? 100 : 150);

      return () => clearTimeout(timer);
    } else if (currentStep === bootSteps.length) {
      setTimeout(() => {
        setShowLogo(true);
      }, 500);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  }, [currentStep, bootSteps, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl px-8">
        {!showLogo ? (
          <div className="space-y-1 font-mono text-sm">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${
                  line.includes('[OK]') || line.includes('✓')
                    ? 'text-green-500'
                    : line.includes('⚠')
                    ? 'text-yellow-500'
                    : line.includes('●')
                    ? 'text-cyan-400'
                    : 'text-gray-400'
                } ${line === '' ? 'h-2' : ''}`}
              >
                {line}
              </div>
            ))}
            {currentStep < bootSteps.length && (
              <div className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1"></div>
            )}
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <pre className="text-green-500 font-mono text-xl md:text-3xl whitespace-pre font-bold mb-6">
{`
 █████╗ ███╗   ███╗██╗████████╗
██╔══██╗████╗ ████║██║╚══██╔══╝
███████║██╔████╔██║██║   ██║   
██╔══██║██║╚██╔╝██║██║   ██║   
██║  ██║██║ ╚═╝ ██║██║   ██║   
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   
`}
            </pre>
            <pre className="text-green-500 font-mono text-xl md:text-3xl whitespace-pre font-bold">
{`
██████╗ ██╗  ██╗ █████╗ ████████╗██╗
██╔══██╗██║  ██║██╔══██╗╚══██╔══╝██║
██████╔╝███████║███████║   ██║   ██║
██╔══██╗██╔══██║██╔══██║   ██║   ██║
██████╔╝██║  ██║██║  ██║   ██║   ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
`}
            </pre>
            <div className="text-green-500 text-lg mt-6 animate-pulse">
              Loading Terminal Portfolio...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
