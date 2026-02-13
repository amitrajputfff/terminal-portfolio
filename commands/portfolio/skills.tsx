import React from 'react';
import { Command } from '../../types';
import { resumeData } from '../../config/resume.config';
import { generateSkillBar } from '../../utils/ascii';
import { hasFlag } from '../../utils/commandParser';

export const skillsCommand: Command = {
  name: 'skills',
  description: 'View technical skills',
  category: 'portfolio',
  aliases: ['tech', 'stack'],
  usage: 'skills [--graph] [--category <name>]',
  execute: (args) => {
    const showGraph = hasFlag(args, 'graph') || hasFlag(args, 'g');

    if (showGraph) {
      return {
        content: (
          <div className="font-mono text-sm">
            <div className="text-primary font-bold mb-2">SKILL LEVELS</div>
            
            <div className="mt-4">
              <div className="text-secondary mb-1">Languages</div>
              {resumeData.skills.languages.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-secondary mb-1">Frontend</div>
              {resumeData.skills.frontend.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-secondary mb-1">Backend</div>
              {resumeData.skills.backend.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-secondary mb-1">Databases</div>
              {resumeData.skills.databases.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-secondary mb-1">Voice AI</div>
              {resumeData.skills.voiceAI.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-secondary mb-1">DevOps & Cloud</div>
              {resumeData.skills.devops.map((skill) => (
                <div key={skill.name} className="text-foreground">
                  {generateSkillBar(skill.name, skill.level)}
                </div>
              ))}
            </div>

            <div className="mt-4 text-muted text-xs">
              Tip: Use 'skills' without --graph for a categorized list
            </div>
          </div>
        ),
      };
    }

    return {
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">TECHNICAL SKILLS</div>
          
          <div>
            <span className="text-secondary">Languages:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.languages.map(s => s.name).join(', ')}
            </div>
          </div>

          <div>
            <span className="text-secondary">Frontend:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.frontend.map(s => s.name).join(', ')}
            </div>
          </div>

          <div>
            <span className="text-secondary">Backend:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.backend.map(s => s.name).join(', ')}
            </div>
          </div>

          <div>
            <span className="text-secondary">Databases:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.databases.map(s => s.name).join(', ')}
            </div>
          </div>

          <div>
            <span className="text-secondary">Voice AI:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.voiceAI.map(s => s.name).join(', ')}
            </div>
          </div>

          <div>
            <span className="text-secondary">DevOps & Cloud:</span>
            <div className="ml-4 text-foreground">
              {resumeData.skills.devops.map(s => s.name).join(', ')}
            </div>
          </div>

          <div className="mt-4 text-muted text-sm">
            💡 Try <span className="text-primary">skills --graph</span> for a visual representation
          </div>
        </div>
      ),
    };
  },
};
