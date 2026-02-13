import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { generateTimeline } from '../../utils/ascii';

export const timelineCommand: Command = {
  name: 'timeline',
  description: 'View career timeline',
  category: 'fun',
  aliases: ['history', 'journey'],
  execute: () => {
    const events = [
      {
        year: '2024',
        title: 'LiaPlus AI - Software Development Engineer I',
        description: [
          'Voice AI Platform with Pipecat & LiveKit',
          'Sub-500ms WebRTC streaming latency',
          'Dynamic workflow editor (40% faster config)',
          'AWS deployment with Docker & Jenkins',
        ],
      },
      {
        year: '2024',
        title: 'Agrigravity Technologies - Frontend Developer',
        description: [
          'React & Next.js applications',
          'Performance optimization & state management',
          'Agile development & rapid delivery',
        ],
      },
      {
        year: '2021',
        title: 'B.Tech Computer Science - Manav Rachna',
        description: [
          'Data Structures & Algorithms',
          'AI & Machine Learning',
          '95th Percentile in JEE Mains',
        ],
      },
    ];

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">CAREER TIMELINE</div>
          <pre className="text-foreground font-mono text-sm whitespace-pre">
{generateTimeline(events)}
          </pre>
          <div className="mt-4 text-muted text-sm">
            💡 See detailed experience: <span className="text-primary">experience</span>
          </div>
        </div>
      ),
    };
  },
};

export const matrixCommand: Command = {
  name: 'matrix',
  description: 'Toggle matrix rain effect',
  category: 'fun',
  execute: () => {
    return {
      content: (
        <div className="space-y-2">
          <div className="text-success">Matrix rain effect toggled!</div>
          <div className="text-muted text-sm">
            💡 Try the <span className="text-primary">matrix</span> theme for the full experience
          </div>
        </div>
      ),
    };
  },
};

export const fortuneCommand: Command = {
  name: 'fortune',
  description: 'Display random programming wisdom',
  category: 'fun',
  aliases: ['quote', 'wisdom'],
  execute: () => {
    const fortunes = [
      {
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
      },
      {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
      },
      {
        quote: "Code is like humor. When you have to explain it, it's bad.",
        author: "Cory House"
      },
      {
        quote: "Make it work, make it right, make it fast.",
        author: "Kent Beck"
      },
      {
        quote: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs"
      },
      {
        quote: "Debugging is twice as hard as writing the code in the first place.",
        author: "Brian Kernighan"
      },
      {
        quote: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
      },
      {
        quote: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds"
      },
      {
        quote: "The function of good software is to make the complex appear to be simple.",
        author: "Grady Booch"
      },
      {
        quote: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
        author: "Patrick McKenzie"
      },
      {
        quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
        author: "Harold Abelson"
      },
      {
        quote: "The most disastrous thing that you can ever learn is your first programming language.",
        author: "Alan Kay"
      },
      {
        quote: "Walking on water and developing software from a specification are easy if both are frozen.",
        author: "Edward V. Berard"
      },
      {
        quote: "It's not a bug – it's an undocumented feature.",
        author: "Anonymous"
      },
      {
        quote: "Before software can be reusable it first has to be usable.",
        author: "Ralph Johnson"
      }
    ];

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">🔮 FORTUNE</div>
          <div className="border-l-4 border-accent pl-4 py-2">
            <div className="text-foreground italic mb-2">"{randomFortune.quote}"</div>
            <div className="text-muted text-sm">— {randomFortune.author}</div>
          </div>
          <div className="text-muted text-xs">
            Run <span className="text-primary">fortune</span> again for more wisdom
          </div>
        </div>
      ),
    };
  },
};

export const cowsayCommand: Command = {
  name: 'cowsay',
  description: 'Make a cow say something',
  category: 'fun',
  usage: 'cowsay <message>',
  execute: (args) => {
    const message = args.length > 0 ? args.join(' ') : 'Hello! Type "cowsay <your message>" to make me speak!';
    
    const generateCow = (msg: string) => {
      const maxWidth = 40;
      const words = msg.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      words.forEach(word => {
        if ((currentLine + word).length > maxWidth) {
          lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      });
      
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      const longestLine = Math.max(...lines.map(l => l.length));
      const topBorder = ' ' + '_'.repeat(longestLine + 2);
      const bottomBorder = ' ' + '-'.repeat(longestLine + 2);
      
      const paddedLines = lines.map(line => {
        const padding = ' '.repeat(longestLine - line.length);
        return `| ${line}${padding} |`;
      });

      const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

      return `${topBorder}\n${paddedLines.join('\n')}\n${bottomBorder}${cow}`;
    };

    return {
      content: (
        <div className="space-y-2">
          <pre className="text-foreground font-mono text-sm whitespace-pre">
            {generateCow(message)}
          </pre>
          <div className="text-muted text-xs">
            💡 Try: <span className="text-primary">cowsay hire me!</span>
          </div>
        </div>
      ),
    };
  },
};

export const hackCommand: Command = {
  name: 'hack',
  description: 'Hack into a system (just for fun!)',
  category: 'fun',
  usage: 'hack <target>',
  aliases: ['pwn', 'exploit'],
  execute: (args) => {
    const target = args.length > 0 ? args.join(' ') : 'localhost';
    
    const steps = [
      `[${new Date().toISOString()}] Initializing hack sequence...`,
      `[${new Date().toISOString()}] Scanning ${target} for vulnerabilities...`,
      `[${new Date().toISOString()}] Found open ports: 22, 80, 443, 8080`,
      `[${new Date().toISOString()}] Attempting SQL injection...`,
      `[${new Date().toISOString()}] ⚠️  WAF detected! Bypassing...`,
      `[${new Date().toISOString()}] Exploiting CVE-2024-FAKE...`,
      `[${new Date().toISOString()}] Establishing reverse shell...`,
      `[${new Date().toISOString()}] Escalating privileges...`,
      `[${new Date().toISOString()}] root@${target}:~# whoami`,
      `[${new Date().toISOString()}] root`,
    ];

    return {
      content: (
        <div className="space-y-2">
          <div className="text-error font-bold">⚠️  UNAUTHORIZED ACCESS ATTEMPT ⚠️</div>
          <pre className="text-success font-mono text-xs whitespace-pre space-y-1">
            {steps.map((step, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {step}
              </div>
            ))}
          </pre>
          <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded">
            <div className="text-success font-bold">✓ ACCESS GRANTED</div>
            <div className="text-success text-sm">Full system access obtained to: {target}</div>
          </div>
          <div className="text-muted text-xs mt-4">
            ⚠️ Just kidding! This is purely for entertainment. <br />
            <span className="text-primary">Amit builds secure systems</span>, not breaks them! 🔒
          </div>
          <div className="text-muted text-xs mt-2">
            💡 For real security skills, check: <span className="text-primary">certifications</span>
          </div>
        </div>
      ),
    };
  },
};

export const shareCommand: Command = {
  name: 'share',
  description: 'Generate shareable link with pre-loaded command',
  category: 'fun',
  usage: 'share <command>',
  execute: (args) => {
    if (args.length === 0) {
      return {
        content: (
          <div className="space-y-3">
            <div className="text-primary font-bold">📤 SHARE COMMAND</div>
            <div className="text-foreground">
              Generate a shareable link that opens the terminal with a specific command pre-loaded!
            </div>
            
            <div className="mt-4">
              <div className="text-accent font-semibold mb-2">Usage:</div>
              <div className="bg-background/50 p-3 rounded border border-primary/20">
                <code className="text-primary">share &lt;command&gt;</code>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-accent font-semibold mb-2">Examples:</div>
              <div className="space-y-2 text-sm">
                <div>• <span className="text-primary">share neofetch</span> - Share link that shows your neofetch</div>
                <div>• <span className="text-primary">share skills --graph</span> - Share visual skills chart</div>
                <div>• <span className="text-primary">share recruiter</span> - Perfect for LinkedIn!</div>
                <div>• <span className="text-primary">share hack google</span> - Share the fun hack simulation</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-accent/10 rounded border border-accent/20">
              <div className="text-accent text-sm">
                💡 <strong>Pro tip:</strong> Use this to share impressive commands on social media!
              </div>
            </div>
          </div>
        ),
      };
    }

    const command = args.join(' ');
    const encodedCommand = encodeURIComponent(command);
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}?cmd=${encodedCommand}`;
    
    const copyToClipboard = () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
      }
    };

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">📤 SHAREABLE LINK GENERATED</div>
          
          <div className="space-y-2">
            <div className="text-muted text-sm">Command:</div>
            <div className="bg-background/50 p-3 rounded border border-primary/20">
              <code className="text-primary">{command}</code>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-muted text-sm">Shareable URL:</div>
            <div className="bg-background/50 p-3 rounded border border-primary/20 break-all">
              <a href={shareUrl} className="text-accent hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                {shareUrl}
              </a>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded border border-primary/40 transition-colors text-sm font-medium"
            >
              📋 Copy Link
            </button>
          </div>

          <div className="mt-4 text-muted text-xs space-y-1">
            <div>✓ Anyone with this link will see the command executed automatically</div>
            <div>✓ Perfect for sharing on LinkedIn, Twitter, or with recruiters</div>
            <div>✓ Commands run in a safe, read-only environment</div>
          </div>

          <div className="mt-4 p-3 bg-success/10 rounded border border-success/30">
            <div className="text-success text-sm">
              🚀 <strong>Share this link to show off your terminal portfolio!</strong>
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const agentCommand: Command = {
  name: 'agent',
  description: 'Chat with AI assistant (CLI mode)',
  category: 'fun',
  aliases: ['ai', 'assistant', 'aria'],
  execute: (args, ctx) => {
    // This will be handled specially in Terminal component
    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">🤖 AI AGENT</div>
          <div className="text-foreground">Entering AI chat mode...</div>
          <div className="text-muted text-sm">
            You can now have a conversation with the AI agent right in the terminal.
          </div>
          <div className="text-muted text-xs mt-2">
            Type <span className="text-primary">exit</span> or <span className="text-primary">quit</span> to return to normal mode
          </div>
        </div>
      ),
    };
  },
};

export const voiceCommand: Command = {
  name: 'voice',
  description: 'Toggle voice command mode',
  category: 'fun',
  aliases: ['speech', 'mic'],
  execute: (args, ctx) => {
    if (typeof window === 'undefined') {
      return {
        content: (
          <div className="text-error">Voice commands are only available in the browser.</div>
        ),
      };
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      return {
        content: (
          <div className="space-y-2">
            <div className="text-error">❌ Voice recognition not supported</div>
            <div className="text-muted text-sm">
              Voice commands require a modern browser (Chrome, Edge, or Safari).
            </div>
            <div className="text-muted text-sm">
              Try using Chrome or Edge for the best experience.
            </div>
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">🎤 VOICE COMMAND MODE</div>
          <div className="text-success">✓ Voice recognition is supported!</div>
          
          <div className="border-l-2 border-primary pl-4 space-y-2">
            <div className="text-foreground">
              Click the 🎤 microphone button in the terminal header to activate voice commands.
            </div>
            <div className="text-muted text-sm">
              Or press <span className="text-primary">Ctrl+M</span> to toggle voice mode
            </div>
          </div>

          <div className="mt-4">
            <div className="text-accent font-semibold mb-2">How to use:</div>
            <div className="space-y-1 text-sm text-muted">
              <div>1. Click the microphone icon or press Ctrl+M</div>
              <div>2. Speak your command clearly (e.g., "help", "about", "skills")</div>
              <div>3. The command will execute automatically</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-accent font-semibold mb-2">Pro tips:</div>
            <div className="space-y-1 text-sm text-muted">
              <div>• Works best in quiet environments</div>
              <div>• Speak clearly and at normal pace</div>
              <div>• Try commands like: "neofetch", "skills", "experience"</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/20">
            <div className="text-primary text-sm">
              💡 <strong>Fun fact:</strong> This showcases Amit's Voice AI expertise!
            </div>
            <div className="text-muted text-xs mt-1">
              Built with Web Speech API - the same tech behind voice assistants
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const easterEggCommand: Command = {
  name: 'easteregg',
  description: 'Hidden easter egg',
  category: 'fun',
  aliases: ['secret', 'egg'],
  execute: () => {
    const secrets = [
      '🎮 Fun fact: Amit solved 410+ LeetCode problems!',
      '🏆 Achievement unlocked: 3rd Place at UCMAS International!',
      '⚡ Secret: Sub-500ms is not just fast, it\'s blazing!',
      '🎯 Pro tip: The best code is no code at all.',
      '🚀 Hidden stat: 40% improvement in workflow = hours saved!',
    ];

    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];

    return {
      content: (
        <div className="space-y-2">
          <div className="text-accent font-bold">🎉 You found a secret!</div>
          <div className="text-foreground">{randomSecret}</div>
          <div className="text-muted text-sm mt-2">
            There are {secrets.length} secrets total. Keep exploring!
          </div>
        </div>
      ),
    };
  },
};
