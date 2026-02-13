import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { generateDoubleBox } from '../../utils/ascii';

export const recruiterCommand: Command = {
  name: 'recruiter',
  description: 'Quick overview for recruiters',
  category: 'recruiter',
  aliases: ['quick', 'overview'],
  execute: () => {
    return {
      content: (
        <div className="font-mono">
          <pre className="text-foreground whitespace-pre">
{`╔══════════════════════════════════════════════════════════╗
║  🎯 RECRUITER QUICK VIEW                                 ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ${resumeData.name} | ${resumeData.title.slice(0, 40)}  ║
║                                                          ║
║  ⚡ KEY METRICS                                          ║
║  • ${resumeData.metrics.experience} production experience                      ║
║  • ${resumeData.metrics.leetcode} LeetCode problems solved                         ║
║  • ${resumeData.metrics.latency} WebRTC latency achieved                     ║
║  • ${resumeData.metrics.improvement} faster workflow configuration                     ║
║                                                          ║
║  🛠️  TOP SKILLS                                          ║
║  React • Next.js • Node.js • Python • Voice AI • AWS     ║
║                                                          ║
║  📄 ACTIONS                                              ║
║  Type: resume --download | hire | socials | impact      ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝`}
          </pre>
          <div className="mt-4 text-muted text-sm">
            💡 Quick commands: <span className="text-primary">hire</span> | <span className="text-primary">impact</span> | <span className="text-primary">experience</span>
          </div>
        </div>
      ),
    };
  },
};

export const hireCommand: Command = {
  name: 'hire',
  description: 'Why you should hire Amit',
  category: 'recruiter',
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold">WHY HIRE AMIT BHATI?</div>
          
          <div className="space-y-3">
            <div>
              <div className="text-secondary font-bold">🚀 Proven Impact</div>
              <div className="ml-4 text-foreground text-sm">
                • Achieved sub-500ms latency in real-time Voice AI systems
                <br />
                • Accelerated workflow configuration by 40%
                <br />
                • Built production-grade systems serving real users
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold">💡 Full-Stack Versatility</div>
              <div className="ml-4 text-foreground text-sm">
                • Frontend: React, Next.js, state management, performance optimization
                <br />
                • Backend: Node.js, Python, REST APIs, WebRTC, gRPC
                <br />
                • DevOps: AWS, Docker, Jenkins, CI/CD pipelines
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold">🎯 Problem Solver</div>
              <div className="ml-4 text-foreground text-sm">
                • 410+ LeetCode problems - strong DSA fundamentals
                <br />
                • Built MFCC-based voice authentication with 85%+ accuracy
                <br />
                • Experience with complex real-time systems
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold">📈 Quick Learner</div>
              <div className="ml-4 text-foreground text-sm">
                • Mastered Voice AI (Pipecat, LiveKit, WebRTC) in months
                <br />
                • Adapted to multiple tech stacks across roles
                <br />
                • Google Cybersecurity & Meta Frontend certified
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold">🤝 Team Player</div>
              <div className="ml-4 text-foreground text-sm">
                • Collaborated in agile sprints
                <br />
                • Delivered production-ready features rapidly
                <br />
                • Strong communication and documentation skills
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 border border-accent rounded">
            <div className="text-accent font-bold">Ready to Connect?</div>
            <div className="text-foreground text-sm mt-2">
              📧 {resumeData.contact.email}
              <br />
              📞 {resumeData.contact.phone}
              <br />
              💼 {resumeData.contact.linkedin}
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const impactCommand: Command = {
  name: 'impact',
  description: 'View quantified achievements',
  category: 'recruiter',
  aliases: ['metrics', 'results'],
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold">QUANTIFIED IMPACT</div>
          
          <div className="space-y-3">
            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">Performance Optimization</div>
              <div className="text-foreground">
                Achieved <span className="text-success font-bold">sub-500ms latency</span> in real-time Voice AI platform using WebRTC streaming
              </div>
            </div>

            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">Development Velocity</div>
              <div className="text-foreground">
                Accelerated AI call workflow configuration by <span className="text-success font-bold">40%</span> through dynamic editor implementation
              </div>
            </div>

            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">System Reliability</div>
              <div className="text-foreground">
                Reduced deployment failures using Docker + Jenkins CI/CD on AWS EC2
              </div>
            </div>

            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">ML Model Accuracy</div>
              <div className="text-foreground">
                Built voice biometric system with <span className="text-success font-bold">85%+ accuracy</span> and <span className="text-success font-bold">&lt;5s</span> verification time
              </div>
            </div>

            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">Problem Solving</div>
              <div className="text-foreground">
                Solved <span className="text-success font-bold">410+ LeetCode</span> problems, demonstrating strong algorithmic thinking
              </div>
            </div>

            <div className="border-l-2 border-success pl-4">
              <div className="text-accent font-bold">Academic Excellence</div>
              <div className="text-foreground">
                Achieved <span className="text-success font-bold">95th Percentile</span> in JEE Mains
              </div>
            </div>
          </div>

          <div className="mt-4 text-muted text-sm">
            💡 See full experience: <span className="text-primary">experience</span>
          </div>
        </div>
      ),
    };
  },
};

export const stackCommand: Command = {
  name: 'stack',
  description: 'View technology stack summary',
  category: 'recruiter',
  aliases: ['tech'],
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold">TECHNOLOGY STACK</div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-secondary font-bold mb-2">Frontend</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● React.js</div>
                <div className="text-accent">● Next.js</div>
                <div className="text-accent">● TypeScript</div>
                <div className="text-accent">● Tailwind CSS</div>
                <div className="text-accent">● State Management</div>
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold mb-2">Backend</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● Node.js</div>
                <div className="text-accent">● Python (Flask)</div>
                <div className="text-accent">● REST APIs</div>
                <div className="text-accent">● WebRTC</div>
                <div className="text-accent">● gRPC</div>
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold mb-2">Databases</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● MongoDB</div>
                <div className="text-accent">● PostgreSQL</div>
                <div className="text-accent">● Redis</div>
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold mb-2">DevOps & Cloud</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● AWS (EC2, CloudFront)</div>
                <div className="text-accent">● Docker</div>
                <div className="text-accent">● Jenkins / ArgoCD</div>
                <div className="text-accent">● CI/CD Pipelines</div>
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold mb-2">Voice AI</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● Pipecat</div>
                <div className="text-accent">● LiveKit</div>
                <div className="text-accent">● WebRTC</div>
                <div className="text-accent">● Real-time Systems</div>
              </div>
            </div>

            <div>
              <div className="text-secondary font-bold mb-2">Languages</div>
              <div className="space-y-1 text-sm">
                <div className="text-accent">● JavaScript / TypeScript</div>
                <div className="text-accent">● Python</div>
                <div className="text-accent">● Go</div>
                <div className="text-accent">● Java</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-muted text-sm">
            💡 Detailed breakdown: <span className="text-primary">skills --graph</span>
          </div>
        </div>
      ),
    };
  },
};
