import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { TerminalProvider } from '@/context/TerminalContext';

export const metadata: Metadata = {
  title: 'Amit Bhati - Full Stack Engineer | Voice AI Systems',
  description: 'Terminal Portfolio of Amit Bhati - Full Stack Engineer with expertise in React, Node.js, Python, Voice AI, and Cloud Technologies. 1.5+ years of production experience.',
  keywords: 'Amit Bhati, Full Stack Engineer, Voice AI, React, Next.js, Node.js, Python, WebRTC, AWS, Software Engineer, Portfolio',
  authors: [{ name: 'Amit Bhati' }],
  creator: 'Amit Bhati',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Amit Bhati - Full Stack Engineer',
    description: 'Terminal Portfolio showcasing expertise in Voice AI, Full Stack Development, and Cloud Technologies',
    siteName: 'Amit Bhati Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amit Bhati - Full Stack Engineer',
    description: 'Terminal Portfolio showcasing expertise in Voice AI, Full Stack Development, and Cloud Technologies',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#00ff41',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TerminalProvider>
            {children}
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
