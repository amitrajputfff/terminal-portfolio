import React from 'react';
import { Command, CommandContext, CommandOutput } from '../types';
import { parseCommand } from '../utils/commandParser';
import { fuzzyMatch, getSuggestions } from '../utils/fuzzyMatch';

import { aboutCommand, socialsCommand } from './portfolio/about';
import { skillsCommand } from './portfolio/skills';
import {
  experienceCommand,
  educationCommand,
  projectsCommand,
  achievementsCommand,
  certificationsCommand,
  resumeCommand,
} from './portfolio/portfolio';

import { helpCommand, clearCommand, neofetchCommand, themeCommand, sudoCommand } from './system/system';
import {
  lsCommand,
  cdCommand,
  pwdCommand,
  catCommand,
  whoamiCommand,
  echoCommand,
  dateCommand,
  unameCommand,
  psCommand,
  topCommand,
  historyCommand,
  findCommand,
  grepCommand,
  treeCommand,
} from './system/terminal';

import { recruiterCommand, hireCommand, impactCommand, stackCommand } from './recruiter/recruiter';

import { timelineCommand, matrixCommand, easterEggCommand, fortuneCommand, cowsayCommand, hackCommand, voiceCommand, shareCommand, agentCommand } from './fun/fun';

const commandRegistry = new Map<string, Command>();

export const registerCommand = (cmd: Command) => {
  commandRegistry.set(cmd.name.toLowerCase(), cmd);
  cmd.aliases?.forEach(alias => {
    commandRegistry.set(alias.toLowerCase(), cmd);
  });
};

export const initializeCommands = () => {
  [
    helpCommand,
    clearCommand,
    neofetchCommand,
    themeCommand,
    sudoCommand,
    lsCommand,
    cdCommand,
    pwdCommand,
    catCommand,
    whoamiCommand,
    echoCommand,
    dateCommand,
    unameCommand,
    psCommand,
    topCommand,
    historyCommand,
    findCommand,
    grepCommand,
    treeCommand,
    aboutCommand,
    socialsCommand,
    skillsCommand,
    experienceCommand,
    educationCommand,
    projectsCommand,
    achievementsCommand,
    certificationsCommand,
    resumeCommand,
    recruiterCommand,
    hireCommand,
    impactCommand,
    stackCommand,
    timelineCommand,
    matrixCommand,
    easterEggCommand,
    fortuneCommand,
    cowsayCommand,
    hackCommand,
    voiceCommand,
    shareCommand,
    agentCommand,
  ].forEach(registerCommand);
};

export const executeCommand = (input: string, ctx: CommandContext): CommandOutput => {
  const [name, ...args] = parseCommand(input);
  
  if (!name) {
    return { content: '' };
  }

  const cmd = commandRegistry.get(name.toLowerCase());
  
  if (cmd) {
    return cmd.execute(args, ctx);
  }

  const fuzzyResult = fuzzyMatch(name, commandRegistry);
  if (fuzzyResult) {
    return fuzzyResult.execute(args, ctx);
  }

  const suggestions = getSuggestions(name, commandRegistry, 3);

  if (suggestions.length > 0) {
    return {
      content: (
        <div className="space-y-2">
          <div className="text-error">Command '{name}' not found.</div>
          <div className="text-muted">Did you mean:</div>
          {suggestions.map(cmd => (
            <div key={cmd.name} className="ml-4">
              <span className="text-primary">{cmd.name}</span>
              <span className="text-muted"> - {cmd.description}</span>
            </div>
          ))}
          <div className="text-muted text-sm mt-2">
            Type <span className="text-primary">help</span> for all available commands.
          </div>
        </div>
      ),
    };
  }

  return {
    content: (
      <div className="space-y-2">
        <div className="text-error">Command '{name}' not found.</div>
        <div className="text-muted text-sm">
          Type <span className="text-primary">help</span> for available commands.
        </div>
      </div>
    ),
  };
};

export const getAllCommands = (): Command[] => {
  const uniqueCommands = new Map<string, Command>();
  
  commandRegistry.forEach((cmd) => {
    if (!uniqueCommands.has(cmd.name)) {
      uniqueCommands.set(cmd.name, cmd);
    }
  });
  
  return Array.from(uniqueCommands.values());
};

export const getCommandsByCategory = (category: string): Command[] => {
  return getAllCommands().filter(cmd => cmd.category === category);
};
