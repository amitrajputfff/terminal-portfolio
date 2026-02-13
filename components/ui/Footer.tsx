'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-border transition-colors"
            title="Power Off"
            onClick={() => window.location.reload()}
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        <div className="text-sm text-muted">
          © {new Date().getFullYear()} Abhinav Jaiswal | All Rights Reserved
        </div>

        <div className="w-8"></div>
      </div>
    </footer>
  );
};
