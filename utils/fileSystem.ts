export const fileSystem = {
  '/': {
    type: 'directory' as const,
    children: ['home', 'etc', 'var', 'usr', 'bin'],
  },
  '/home': {
    type: 'directory' as const,
    children: ['amit'],
  },
  '/home/amit': {
    type: 'directory' as const,
    children: ['projects', 'skills.txt', 'about.txt', 'README.md'],
  },
  '/home/amit/projects': {
    type: 'directory' as const,
    children: ['voice-auth', 'terminal-portfolio', 'liasplus-ai'],
  },
  '/home/amit/projects/voice-auth': {
    type: 'directory' as const,
    children: ['README.md', 'main.py'],
  },
  '/home/amit/projects/terminal-portfolio': {
    type: 'directory' as const,
    children: ['package.json', 'README.md'],
  },
  '/home/amit/projects/liasplus-ai': {
    type: 'directory' as const,
    children: ['workflow.py', 'config.yaml'],
  },
  '/etc': {
    type: 'directory' as const,
    children: ['passwd', 'hosts'],
  },
  '/var': {
    type: 'directory' as const,
    children: ['log'],
  },
  '/var/log': {
    type: 'directory' as const,
    children: ['system.log'],
  },
  '/usr': {
    type: 'directory' as const,
    children: ['bin', 'local'],
  },
  '/usr/bin': {
    type: 'directory' as const,
    children: ['python', 'node', 'npm', 'docker', 'git'],
  },
  '/bin': {
    type: 'directory' as const,
    children: ['bash', 'sh', 'ls', 'cat'],
  },
};

export const fileContents: Record<string, string> = {
  '/home/amit/about.txt': `Amit Bhati - Full Stack Engineer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Role: Full Stack Engineer specializing in Voice AI Systems
Experience: 1.5+ years in production environments
Location: Faridabad, Haryana, India

Core Competencies:
• Voice AI & Real-time Systems (Pipecat, LiveKit, WebRTC)
• Full Stack Development (React, Node.js, Python)
• Cloud Infrastructure (AWS, Azure, GCP)
• DevOps & CI/CD (Docker, Jenkins, ArgoCD)

Key Achievement:
→ Achieved sub-500ms latency in real-time Voice AI platform
→ Accelerated workflow configuration by 40%
→ Solved 410+ LeetCode problems

Current: Software Development Engineer I at LiaPlus AI`,

  '/home/amit/skills.txt': `Technical Skills Inventory
━━━━━━━━━━━━━━━━━━━━━━━━

[Languages]
├── JavaScript/TypeScript  ████████████████████░ 85%
├── Python                 ████████████████░░░░░ 70%
├── Go (gRPC)             ██████████░░░░░░░░░░░ 45%
└── Java                   ███████████░░░░░░░░░░ 50%

[Frontend]
├── React.js              █████████████████████░ 90%
├── Next.js               ████████████████████░░ 85%
└── Tailwind CSS          █████████████████████░ 90%

[Backend]
├── Node.js               ████████████████████░░ 85%
├── Python (Flask)        ████████████████░░░░░░ 70%
├── REST APIs             █████████████████████░ 90%
└── WebRTC                ████████████████████░░ 85%

[Voice AI]
├── Pipecat               ████████████████████░░ 85%
├── LiveKit               ████████████████████░░ 80%
└── WebRTC                ████████████████████░░ 85%

[DevOps]
├── Docker                ████████████████████░░ 85%
├── AWS                   ████████████████████░░ 80%
└── CI/CD                 ████████████████████░░ 80%`,

  '/home/amit/README.md': `# Amit Bhati - Portfolio

## Quick Links
- Email: amitr3245@gmail.com
- Phone: +91 7042404233
- GitHub: github.com/amit-bhati
- LinkedIn: linkedin.com/in/amit-bhati

## Commands
Try: ls, cd, cat, pwd, whoami, help

## Current Status
🟢 Available for opportunities
🎯 Focusing on: Voice AI, Full Stack Development
📍 Location: Faridabad, Haryana`,

  '/home/amit/projects/voice-auth/README.md': `Voice Authentication System
Built with: Python, ML, MFCC
Accuracy: 85%+
Latency: <5 seconds`,

  '/home/amit/projects/voice-auth/main.py': `#!/usr/bin/env python3
# Voice Authentication System
# MFCC-based biometric authentication

import numpy as np
from mfcc import extract_features

def authenticate(voice_sample):
    features = extract_features(voice_sample)
    # Model inference
    confidence = model.predict(features)
    return confidence > 0.85`,

  '/home/amit/projects/terminal-portfolio/README.md': `Terminal Portfolio v2.0
Built with: Next.js 15, TypeScript, Tailwind CSS
Features: 6 themes, 20+ commands, File system simulation`,

  '/home/amit/projects/terminal-portfolio/package.json': `{
  "name": "terminal-portfolio",
  "version": "2.0.0",
  "description": "Hacker-themed terminal portfolio"
}`,

  '/home/amit/projects/liasplus-ai/workflow.py': `# AI Call Workflow Editor
# Dynamic workflow orchestration for Voice AI

class WorkflowEngine:
    def __init__(self):
        self.latency = "sub-500ms"
        self.improvement = "40%"
    
    def execute(self, workflow):
        # Execute AI call workflow
        pass`,

  '/home/amit/projects/liasplus-ai/config.yaml': `project: LiaPlus AI
role: Software Development Engineer I
tech:
  - Pipecat
  - LiveKit
  - WebRTC
  - Python
  - Node.js`,

  '/etc/passwd': `root:x:0:0:root:/root:/bin/bash
amit:x:1000:1000:Amit Bhati:/home/amit:/bin/bash
visitor:x:1001:1001:Guest User:/home/visitor:/bin/bash`,

  '/etc/hosts': `127.0.0.1   localhost
127.0.1.1   terminal-portfolio
::1         localhost ip6-localhost ip6-loopback`,

  '/var/log/system.log': `[2026-02-13 22:00:00] System initialized
[2026-02-13 22:00:01] Terminal portfolio v2.0 started
[2026-02-13 22:00:02] Theme: pro-hacker loaded
[2026-02-13 22:00:03] All systems operational`,
};

export const getCurrentPath = (path: string): string => {
  if (path === '~') return '/home/amit';
  if (path.startsWith('~/')) return `/home/amit/${path.slice(2)}`;
  if (!path.startsWith('/')) return path;
  return path;
};

export const normalizePath = (currentDir: string, targetPath: string): string => {
  if (targetPath === '~') return '/home/amit';
  if (targetPath.startsWith('~/')) return `/home/amit/${targetPath.slice(2)}`;
  if (targetPath === '.') return currentDir;
  if (targetPath === '..') {
    const parts = currentDir.split('/').filter(Boolean);
    parts.pop();
    return '/' + parts.join('/') || '/';
  }
  if (targetPath.startsWith('/')) return targetPath;
  
  const combined = currentDir === '/' ? `/${targetPath}` : `${currentDir}/${targetPath}`;
  const parts = combined.split('/').filter(Boolean);
  const normalized: string[] = [];
  
  for (const part of parts) {
    if (part === '..') {
      normalized.pop();
    } else if (part !== '.') {
      normalized.push(part);
    }
  }
  
  return '/' + normalized.join('/') || '/';
};

export const pathExists = (path: string): boolean => {
  return path in fileSystem || path in fileContents;
};

export const isDirectory = (path: string): boolean => {
  return path in fileSystem && fileSystem[path as keyof typeof fileSystem].type === 'directory';
};

export const isFile = (path: string): boolean => {
  return path in fileContents;
};

export const getDirectoryContents = (path: string): string[] => {
  if (path in fileSystem && fileSystem[path as keyof typeof fileSystem].type === 'directory') {
    return fileSystem[path as keyof typeof fileSystem].children;
  }
  return [];
};

export const getFileContent = (path: string): string => {
  return fileContents[path] || '';
};
