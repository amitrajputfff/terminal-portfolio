import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { hasFlag } from '../../utils/commandParser';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'View professional experience',
  category: 'portfolio',
  aliases: ['work', 'jobs', 'exp'],
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold">PROFESSIONAL EXPERIENCE</div>
          
          {resumeData.experience.map((job, index) => (
            <div key={index} className="border-l-2 border-accent pl-4">
              <div className="text-secondary font-bold">{job.company}</div>
              <div className="text-foreground">{job.role}</div>
              <div className="text-muted text-sm">{job.period} • {job.location}</div>
              
              <div className="mt-2 space-y-1">
                {job.achievements.map((achievement, idx) => (
                  <div key={idx} className="text-foreground text-sm">
                    <span className="text-accent">▸</span> {achievement}
                  </div>
                ))}
              </div>

              {job.metrics && (
                <div className="mt-2 flex gap-4 text-xs">
                  {Object.entries(job.metrics).map(([key, value]) => (
                    <span key={key} className="text-accent">
                      {key}: <span className="text-primary">{value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    };
  },
};

export const educationCommand: Command = {
  name: 'education',
  description: 'View educational background',
  category: 'portfolio',
  aliases: ['edu', 'school'],
  execute: () => {
    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">EDUCATION</div>
          
          <div className="border-l-2 border-accent pl-4">
            <div className="text-secondary font-bold">
              {resumeData.education.institution}
            </div>
            <div className="text-foreground">{resumeData.education.degree}</div>
            <div className="text-muted text-sm">{resumeData.education.period}</div>
            
            <div className="mt-2">
              <span className="text-accent">Relevant Coursework:</span>
              <div className="text-foreground text-sm ml-4">
                {resumeData.education.coursework}
              </div>
            </div>
          </div>
        </div>
      ),
    };
  },
};

export const projectsCommand: Command = {
  name: 'projects',
  description: 'View notable projects',
  category: 'portfolio',
  aliases: ['work', 'portfolio'],
  execute: () => {
    return {
      content: (
        <div className="space-y-4">
          <div className="text-primary font-bold">NOTABLE PROJECTS</div>
          
          {resumeData.projects.map((project, index) => (
            <div key={index} className="border-l-2 border-accent pl-4">
              <div className="text-secondary font-bold">{project.name}</div>
              <div className="text-muted text-sm">{project.tech}</div>
              <div className="text-foreground mt-2">{project.description}</div>
              
              {project.metrics && (
                <div className="mt-2 flex gap-4 text-xs">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <span key={key} className="text-accent">
                      {key}: <span className="text-primary">{value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="text-muted text-sm mt-4">
            💡 Visit my GitHub for more projects: {resumeData.contact.github}
          </div>
        </div>
      ),
    };
  },
};

export const achievementsCommand: Command = {
  name: 'achievements',
  description: 'View achievements and awards',
  category: 'portfolio',
  aliases: ['awards', 'wins'],
  execute: () => {
    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">ACHIEVEMENTS</div>
          
          <div className="space-y-2">
            {resumeData.achievements.map((achievement, index) => (
              <div key={index} className="text-foreground">
                <span className="text-accent">🏆</span> {achievement}
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },
};

export const certificationsCommand: Command = {
  name: 'certifications',
  description: 'View professional certifications',
  category: 'portfolio',
  aliases: ['certs', 'certificates'],
  execute: () => {
    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">CERTIFICATIONS</div>
          
          <div className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="text-foreground">
                <span className="text-accent">📜</span> {cert}
              </div>
            ))}
          </div>
        </div>
      ),
    };
  },
};

export const resumeCommand: Command = {
  name: 'resume',
  description: 'Download or view resume',
  category: 'portfolio',
  aliases: ['cv'],
  usage: 'resume [--download]',
  execute: (args) => {
    const download = hasFlag(args, 'download') || hasFlag(args, 'd');
    
    if (download) {
      window.open('/resume.pdf', '_blank');
      return {
        content: (
          <div className="text-success">
            ✓ Opening resume in new tab...
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">RESUME SUMMARY</div>
          
          <div>
            <div className="text-secondary">{resumeData.name}</div>
            <div className="text-muted text-sm">{resumeData.title}</div>
          </div>

          <div className="text-foreground">{resumeData.summary}</div>

          <div className="mt-4 space-y-2 text-sm">
            <div><span className="text-accent">Experience:</span> {resumeData.metrics.experience}</div>
            <div><span className="text-accent">LeetCode:</span> {resumeData.metrics.leetcode} problems solved</div>
            <div><span className="text-accent">Key Achievement:</span> {resumeData.metrics.latency} WebRTC latency</div>
          </div>

          <div className="mt-4 text-muted text-sm">
            💡 Use <span className="text-primary">resume --download</span> to download PDF
          </div>
        </div>
      ),
    };
  },
};
