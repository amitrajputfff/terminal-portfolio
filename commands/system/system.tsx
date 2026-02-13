import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { generateAsciiName, generateDoubleBox } from '../../utils/ascii';
import { hasFlag } from '../../utils/commandParser';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  category: 'system',
  aliases: ['?', 'commands', 'man'],
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold border-b border-primary pb-2 mb-4">
            ═══ TERMINAL COMMAND REFERENCE v2.0 ═══
          </div>
          
          <div>
            <div className="text-accent font-bold mb-3">🖥️  TERMINAL COMMANDS</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              <div><span className="text-primary">ls</span> <span className="text-muted">[-la]</span> - List directory</div>
              <div><span className="text-primary">cd</span> <span className="text-muted">[dir]</span> - Change directory</div>
              <div><span className="text-primary">pwd</span> - Working directory</div>
              <div><span className="text-primary">cat</span> <span className="text-muted">&lt;file&gt;</span> - Display file</div>
              <div><span className="text-primary">echo</span> <span className="text-muted">&lt;text&gt;</span> - Print text</div>
              <div><span className="text-primary">whoami</span> - Current user</div>
              <div><span className="text-primary">date</span> - Current date/time</div>
              <div><span className="text-primary">uname</span> <span className="text-muted">[-a]</span> - System info</div>
              <div><span className="text-primary">ps</span> - List processes</div>
              <div><span className="text-primary">top</span> - System monitor</div>
              <div><span className="text-primary">history</span> - Command history</div>
              <div><span className="text-primary">find</span> <span className="text-muted">&lt;pattern&gt;</span> - Search files</div>
              <div><span className="text-primary">grep</span> <span className="text-muted">&lt;pattern&gt;</span> - Search in file</div>
              <div><span className="text-primary">tree</span> - Directory tree</div>
            </div>
          </div>

          <div>
            <div className="text-accent font-bold mb-3">📁 PORTFOLIO</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              <div><span className="text-primary">about</span> - Learn about Amit</div>
              <div><span className="text-primary">skills</span> <span className="text-muted">[--graph]</span> - Technical skills</div>
              <div><span className="text-primary">experience</span> - Work history</div>
              <div><span className="text-primary">education</span> - Academic background</div>
              <div><span className="text-primary">projects</span> - Notable projects</div>
              <div><span className="text-primary">achievements</span> - Awards</div>
              <div><span className="text-primary">certifications</span> - Certificates</div>
              <div><span className="text-primary">resume</span> <span className="text-muted">[--download]</span> - View resume</div>
              <div><span className="text-primary">socials</span> - Contact links</div>
            </div>
          </div>

          <div>
            <div className="text-accent font-bold mb-3">💼 RECRUITER</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              <div><span className="text-primary">recruiter</span> - Quick overview</div>
              <div><span className="text-primary">hire</span> - Why hire Amit</div>
              <div><span className="text-primary">impact</span> - Quantified results</div>
              <div><span className="text-primary">stack</span> - Tech stack</div>
            </div>
          </div>

          <div>
            <div className="text-accent font-bold mb-3">⚙️  SYSTEM</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              <div><span className="text-primary">neofetch</span> - System info banner</div>
              <div><span className="text-primary">theme</span> <span className="text-muted">[name|--list]</span> - Change theme</div>
              <div><span className="text-primary">clear</span> - Clear screen</div>
              <div><span className="text-primary">help</span> - Show this help</div>
            </div>
          </div>

          <div>
            <div className="text-accent font-bold mb-3">🎮 FUN</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              <div><span className="text-primary">sudo</span> <span className="text-muted">&lt;cmd&gt;</span> - Try it!</div>
              <div><span className="text-primary">matrix</span> - Toggle matrix rain</div>
              <div><span className="text-primary">timeline</span> - Career timeline</div>
              <div><span className="text-primary">easteregg</span> - Hidden secrets</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-muted text-sm">
            <div className="text-accent mb-2">💡 Tips:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted">
              <div>• Use <span className="text-primary">Tab</span> for autocomplete</div>
              <div>• <span className="text-primary">↑/↓</span> arrows for history</div>
              <div>• Try <span className="text-primary">cd projects</span> then <span className="text-primary">ls</span></div>
              <div>• <span className="text-primary">cat about.txt</span> for quick info</div>
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear terminal screen',
  category: 'system',
  aliases: ['cls'],
  execute: () => {
    return {
      content: '',
      clearScreen: true,
    };
  },
};

export const neofetchCommand: Command = {
  name: 'neofetch',
  description: 'Display system information',
  category: 'system',
  aliases: ['fetch', 'info'],
  execute: (args, ctx) => {
    const asciiArt = `
     █████╗ ███╗   ███╗██╗████████╗
    ██╔══██╗████╗ ████║██║╚══██╔══╝
    ███████║██╔████╔██║██║   ██║   
    ██╔══██║██║╚██╔╝██║██║   ██║   
    ██║  ██║██║ ╚═╝ ██║██║   ██║   
    ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   
    `;

    return {
      content: (
        <div className="font-mono">
          <div className="flex gap-8">
            <pre className="text-primary whitespace-pre">{asciiArt}</pre>
            <div className="space-y-1 text-sm flex-1">
              <div><span className="text-accent">user@portfolio</span></div>
              <div className="text-muted">{'─'.repeat(30)}</div>
              <div><span className="text-secondary">OS:</span> Terminal Portfolio v2.0</div>
              <div><span className="text-secondary">Name:</span> {resumeData.name}</div>
              <div><span className="text-secondary">Role:</span> Full Stack Engineer</div>
              <div><span className="text-secondary">Specialization:</span> Voice AI Systems</div>
              <div><span className="text-secondary">Experience:</span> {resumeData.metrics.experience}</div>
              <div><span className="text-secondary">Location:</span> {resumeData.contact.location}</div>
              <div><span className="text-secondary">Stack:</span> React, Node.js, Python</div>
              <div><span className="text-secondary">Theme:</span> {ctx.currentTheme}</div>
              <div><span className="text-secondary">LeetCode:</span> {resumeData.metrics.leetcode} problems</div>
              <div className="text-muted">{'─'.repeat(30)}</div>
              <div className="flex gap-2">
                {['█', '█', '█', '█', '█', '█', '█', '█'].map((block, i) => (
                  <span key={i} className={`text-${['primary', 'secondary', 'accent', 'error', 'success', 'warning', 'muted', 'foreground'][i]}`}>
                    {block}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const themeCommand: Command = {
  name: 'theme',
  description: 'Change terminal theme',
  category: 'system',
  usage: 'theme [name] or theme --list',
  execute: (args, ctx) => {
    if (args.length === 0 || hasFlag(args, 'list') || hasFlag(args, 'l')) {
      return {
        content: (
          <div className="space-y-3">
            <div className="text-primary font-bold">AVAILABLE THEMES</div>
            <div className="space-y-1">
              <div className={ctx.currentTheme === 'pro-hacker' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> pro-hacker - Black & white minimal {ctx.currentTheme === 'pro-hacker' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'light' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> light - Light mode for day use {ctx.currentTheme === 'light' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'cyberpunk' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> cyberpunk - Neon pink and cyan {ctx.currentTheme === 'cyberpunk' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'dracula' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> dracula - Purple and pink palette {ctx.currentTheme === 'dracula' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'nord' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> nord - Cool arctic blue tones {ctx.currentTheme === 'nord' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'matrix' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> matrix - Classic green with rain effect {ctx.currentTheme === 'matrix' && '(current)'}
              </div>
              <div className={ctx.currentTheme === 'monokai' ? 'text-accent' : 'text-foreground'}>
                <span className="text-accent">▸</span> monokai - Warm syntax colors {ctx.currentTheme === 'monokai' && '(current)'}
              </div>
            </div>
            <div className="text-muted text-sm mt-4">
              Usage: <span className="text-primary">theme [name]</span>
            </div>
          </div>
        ),
      };
    }

    const themeName = args[0].toLowerCase();
    const validThemes = ['pro-hacker', 'light', 'cyberpunk', 'dracula', 'nord', 'matrix', 'monokai'];

    if (validThemes.includes(themeName)) {
      ctx.setTheme(themeName);
      return {
        content: (
          <div className="text-success">
            ✓ Theme changed to <span className="text-primary">{themeName}</span>
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="text-error">
          ✗ Invalid theme. Use <span className="text-primary">theme --list</span> to see available themes.
        </div>
      ),
    };
  },
};

export const sudoCommand: Command = {
  name: 'sudo',
  description: 'Execute command with elevated privileges',
  category: 'fun',
  execute: (args) => {
    if (args.length === 0) {
      return {
        content: (
          <div className="text-error">
            sudo: no command specified
          </div>
        ),
      };
    }

    const command = args.join(' ');

    if (command.includes('hire')) {
      return {
        content: (
          <div className="space-y-2">
            <div className="text-warning">[sudo] password for recruiter: ********</div>
            <div className="text-success">✓ Authentication successful</div>
            <div className="text-success">✓ Initiating hiring sequence...</div>
            <div className="text-success">✓ Sending offer letter to {resumeData.contact.email}</div>
            <div className="text-accent mt-2">🎉 Congratulations! You've made an excellent choice.</div>
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="space-y-1">
          <div className="text-warning">[sudo] password for visitor: ________</div>
          <div className="text-error">Sorry, try again.</div>
          <div className="text-muted text-sm mt-2">
            💡 Try: <span className="text-primary">sudo hire amit</span>
          </div>
        </div>
      ),
    };
  },
};
