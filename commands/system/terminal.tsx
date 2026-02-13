import React from 'react';
import { Command } from '../../types';
import {
  normalizePath,
  pathExists,
  isDirectory,
  isFile,
  getDirectoryContents,
  getFileContent,
} from '../../utils/fileSystem';

export const lsCommand: Command = {
  name: 'ls',
  description: 'List directory contents',
  category: 'system',
  aliases: ['dir'],
  usage: 'ls [path] [-la]',
  execute: (args, ctx: any) => {
    const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    
    const targetPath = args.find(arg => !arg.startsWith('-')) || ctx.currentDirectory || '/home/amit';
    const fullPath = normalizePath(ctx.currentDirectory || '/home/amit', targetPath);

    if (!pathExists(fullPath)) {
      return {
        content: (
          <div className="text-error">
            ls: cannot access '{targetPath}': No such file or directory
          </div>
        ),
      };
    }

    if (!isDirectory(fullPath)) {
      return {
        content: <div className="text-foreground">{targetPath}</div>,
      };
    }

    const contents = getDirectoryContents(fullPath);
    
    if (longFormat) {
      return {
        content: (
          <div className="font-mono">
            <div className="text-muted mb-1">total {contents.length}</div>
            {contents.map((item, i) => {
              const itemPath = fullPath === '/' ? `/${item}` : `${fullPath}/${item}`;
              const isDir = isDirectory(itemPath);
              return (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-muted">
                    {isDir ? 'drwxr-xr-x' : '-rw-r--r--'}
                  </span>
                  <span className="text-muted">1</span>
                  <span className="text-muted">amit</span>
                  <span className="text-muted">amit</span>
                  <span className="text-muted text-right w-12">
                    {isDir ? '4096' : Math.floor(Math.random() * 9999)}
                  </span>
                  <span className="text-muted">Feb 13 22:00</span>
                  <span className={isDir ? 'text-accent' : 'text-foreground'}>
                    {isDir ? `${item}/` : item}
                  </span>
                </div>
              );
            })}
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="flex flex-wrap gap-4">
          {contents.map((item, i) => {
            const itemPath = fullPath === '/' ? `/${item}` : `${fullPath}/${item}`;
            const isDir = isDirectory(itemPath);
            return (
              <span
                key={i}
                className={isDir ? 'text-accent font-bold' : 'text-foreground'}
              >
                {isDir ? `${item}/` : item}
              </span>
            );
          })}
        </div>
      ),
    };
  },
};

export const cdCommand: Command = {
  name: 'cd',
  description: 'Change directory',
  category: 'system',
  usage: 'cd [directory]',
  execute: (args, ctx: any) => {
    const targetPath = args[0] || '/home/amit';
    const fullPath = normalizePath(ctx.currentDirectory || '/home/amit', targetPath);

    if (!pathExists(fullPath)) {
      return {
        content: (
          <div className="text-error">
            cd: {targetPath}: No such file or directory
          </div>
        ),
      };
    }

    if (!isDirectory(fullPath)) {
      return {
        content: (
          <div className="text-error">
            cd: {targetPath}: Not a directory
          </div>
        ),
      };
    }

    if (ctx.setCurrentDirectory) {
      ctx.setCurrentDirectory(fullPath);
    }

    return {
      content: '',
    };
  },
};

export const pwdCommand: Command = {
  name: 'pwd',
  description: 'Print working directory',
  category: 'system',
  execute: (args, ctx: any) => {
    return {
      content: (
        <div className="text-foreground">
          {ctx.currentDirectory || '/home/amit'}
        </div>
      ),
    };
  },
};

export const catCommand: Command = {
  name: 'cat',
  description: 'Display file contents',
  category: 'system',
  usage: 'cat <file>',
  execute: (args, ctx: any) => {
    if (args.length === 0) {
      return {
        content: (
          <div className="text-warning">Usage: cat &lt;file&gt;</div>
        ),
      };
    }

    const targetPath = args[0];
    const fullPath = normalizePath(ctx.currentDirectory || '/home/amit', targetPath);

    if (!pathExists(fullPath)) {
      return {
        content: (
          <div className="text-error">
            cat: {targetPath}: No such file or directory
          </div>
        ),
      };
    }

    if (isDirectory(fullPath)) {
      return {
        content: (
          <div className="text-error">
            cat: {targetPath}: Is a directory
          </div>
        ),
      };
    }

    const content = getFileContent(fullPath);

    return {
      content: (
        <pre className="text-foreground whitespace-pre-wrap text-sm">
          {content}
        </pre>
      ),
    };
  },
};

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display current user',
  category: 'system',
  execute: () => {
    return {
      content: <div className="text-primary">amit</div>,
    };
  },
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Display a line of text',
  category: 'system',
  usage: 'echo <text>',
  execute: (args) => {
    return {
      content: (
        <div className="text-foreground">{args.join(' ')}</div>
      ),
    };
  },
};

export const dateCommand: Command = {
  name: 'date',
  description: 'Display current date and time',
  category: 'system',
  execute: () => {
    const now = new Date();
    return {
      content: (
        <div className="text-foreground">
          {now.toString()}
        </div>
      ),
    };
  },
};

export const unameCommand: Command = {
  name: 'uname',
  description: 'Print system information',
  category: 'system',
  usage: 'uname [-a]',
  execute: (args) => {
    const all = args.includes('-a');
    
    if (all) {
      return {
        content: (
          <div className="text-foreground">
            Linux terminal-portfolio 5.15.0-terminal #1 SMP Thu Feb 13 22:00:00 UTC 2026 x86_64 GNU/Linux
          </div>
        ),
      };
    }

    return {
      content: <div className="text-foreground">Linux</div>,
    };
  },
};

export const psCommand: Command = {
  name: 'ps',
  description: 'Report process status',
  category: 'system',
  execute: () => {
    const processes = [
      { pid: 1, cmd: 'systemd', cpu: '0.1', mem: '0.5' },
      { pid: 1337, cmd: 'terminal-portfolio', cpu: '2.3', mem: '45.2' },
      { pid: 2048, cmd: 'voice-ai-service', cpu: '5.7', mem: '128.4' },
      { pid: 3141, cmd: 'nodejs', cpu: '1.2', mem: '89.3' },
      { pid: 4242, cmd: 'docker-daemon', cpu: '0.8', mem: '156.7' },
    ];

    return {
      content: (
        <div className="font-mono text-sm">
          <div className="flex gap-4 text-accent mb-1">
            <span className="w-16">PID</span>
            <span className="w-16">CPU%</span>
            <span className="w-16">MEM%</span>
            <span className="flex-1">COMMAND</span>
          </div>
          {processes.map((proc) => (
            <div key={proc.pid} className="flex gap-4 text-foreground">
              <span className="w-16">{proc.pid}</span>
              <span className="w-16">{proc.cpu}</span>
              <span className="w-16">{proc.mem}</span>
              <span className="flex-1">{proc.cmd}</span>
            </div>
          ))}
        </div>
      ),
    };
  },
};

export const topCommand: Command = {
  name: 'top',
  description: 'Display system resource usage',
  category: 'system',
  execute: () => {
    return {
      content: (
        <div className="font-mono text-sm space-y-2">
          <div className="text-accent">
            System Monitor - Terminal Portfolio v2.0
          </div>
          <div className="text-muted">
            Uptime: 2 hours, 13 minutes | Load: 0.45, 0.32, 0.28
          </div>
          <div className="text-foreground">
            CPU Usage: [████████████░░░░░░░░] 60%
            <br />
            Memory: [██████████████░░░░░░] 70% (5.6G / 8.0G)
            <br />
            Swap: [████░░░░░░░░░░░░░░░░] 20% (0.4G / 2.0G)
          </div>
          <div className="mt-2 text-success">
            ✓ Voice AI Service: Running (Sub-500ms latency)
            <br />
            ✓ Workflow Engine: Active (40% faster processing)
            <br />
            ✓ WebRTC Streaming: Operational
          </div>
        </div>
      ),
    };
  },
};

export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  category: 'system',
  execute: (args, ctx: any) => {
    const history = ctx.getHistory ? ctx.getHistory() : [];
    
    return {
      content: (
        <div className="font-mono text-sm space-y-1">
          {history.length === 0 ? (
            <div className="text-muted">No command history yet</div>
          ) : (
            history.map((cmd: string, i: number) => (
              <div key={i} className="text-foreground">
                <span className="text-muted w-12 inline-block">{i + 1}</span>
                {cmd}
              </div>
            ))
          )}
        </div>
      ),
    };
  },
};

export const findCommand: Command = {
  name: 'find',
  description: 'Search for files',
  category: 'system',
  usage: 'find <pattern>',
  execute: (args) => {
    if (args.length === 0) {
      return {
        content: <div className="text-warning">Usage: find &lt;pattern&gt;</div>,
      };
    }

    const pattern = args[0].toLowerCase();
    const results = [
      '/home/amit/about.txt',
      '/home/amit/skills.txt',
      '/home/amit/README.md',
      '/home/amit/projects/voice-auth',
      '/home/amit/projects/terminal-portfolio',
      '/home/amit/projects/liasplus-ai',
    ].filter(path => path.toLowerCase().includes(pattern));

    return {
      content: (
        <div className="space-y-1">
          {results.length === 0 ? (
            <div className="text-muted">No matches found</div>
          ) : (
            results.map((path, i) => (
              <div key={i} className="text-accent">{path}</div>
            ))
          )}
        </div>
      ),
    };
  },
};

export const grepCommand: Command = {
  name: 'grep',
  description: 'Search for patterns in text',
  category: 'system',
  usage: 'grep <pattern> <file>',
  execute: (args, ctx: any) => {
    if (args.length < 2) {
      return {
        content: <div className="text-warning">Usage: grep &lt;pattern&gt; &lt;file&gt;</div>,
      };
    }

    const pattern = args[0];
    const file = args[1];
    const fullPath = normalizePath(ctx.currentDirectory || '/home/amit', file);
    
    if (!isFile(fullPath)) {
      return {
        content: <div className="text-error">grep: {file}: No such file</div>,
      };
    }

    const content = getFileContent(fullPath);
    const lines = content.split('\n');
    const matches = lines.filter(line => 
      line.toLowerCase().includes(pattern.toLowerCase())
    );

    return {
      content: (
        <div className="space-y-1">
          {matches.length === 0 ? (
            <div className="text-muted">No matches found</div>
          ) : (
            matches.map((line, i) => (
              <div key={i} className="text-foreground">{line}</div>
            ))
          )}
        </div>
      ),
    };
  },
};

export const treeCommand: Command = {
  name: 'tree',
  description: 'List directory tree structure',
  category: 'system',
  usage: 'tree [path]',
  execute: (args, ctx: any) => {
    return {
      content: (
        <pre className="text-foreground font-mono text-sm">
{`/home/amit
├── about.txt
├── skills.txt
├── README.md
└── projects/
    ├── voice-auth/
    │   ├── README.md
    │   └── main.py
    ├── terminal-portfolio/
    │   ├── package.json
    │   └── README.md
    └── liasplus-ai/
        ├── workflow.py
        └── config.yaml

3 directories, 8 files`}
        </pre>
      ),
    };
  },
};
