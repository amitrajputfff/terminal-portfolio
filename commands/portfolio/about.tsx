import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { copyToClipboard } from '../../utils/clipboard';

export const aboutCommand: Command = {
  name: 'about',
  description: 'Learn more about Amit',
  category: 'portfolio',
  aliases: ['bio', 'info'],
  execute: () => {
    return {
      content: (
        <div className="space-y-2">
          <div>
            Hello! I'm{' '}
            <span className="text-primary font-bold">{resumeData.name}</span>
          </div>
          <div className="text-secondary">{resumeData.title}</div>
          <div className="mt-4">{resumeData.summary}</div>
          <div className="mt-4">
            <span className="text-accent">📍</span> {resumeData.contact.location}
          </div>
          <div className="mt-4 text-muted">
            Type <span className="text-primary">'experience'</span> to see my work history
            <br />
            Type <span className="text-primary">'skills'</span> to see my technical skills
            <br />
            Type <span className="text-primary">'recruiter'</span> for a quick overview
          </div>
        </div>
      ),
    };
  },
};

export const socialsCommand: Command = {
  name: 'socials',
  description: 'View social media links',
  category: 'portfolio',
  aliases: ['social', 'links', 'contact'],
  execute: () => {
    const handleCopy = async (text: string, label: string) => {
      const success = await copyToClipboard(text);
      if (success) {
        console.log(`${label} copied to clipboard!`);
      }
    };

    return {
      content: (
        <div className="space-y-2">
          <div className="text-primary font-bold">Let's Connect!</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-accent">📧</span>
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="text-secondary hover:text-primary transition-colors"
              >
                {resumeData.contact.email}
              </a>
              <button
                onClick={() => handleCopy(resumeData.contact.email, 'Email')}
                className="text-muted hover:text-primary text-xs ml-2"
              >
                [copy]
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">📞</span>
              <span className="text-secondary">{resumeData.contact.phone}</span>
              <button
                onClick={() => handleCopy(resumeData.contact.phone, 'Phone')}
                className="text-muted hover:text-primary text-xs ml-2"
              >
                [copy]
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">💼</span>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">🐙</span>
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      ),
    };
  },
};
