import Fuse from 'fuse.js';
import { Command } from '../types';

export const fuzzyMatch = (
  input: string,
  commandRegistry: Map<string, Command>
): Command | null => {
  const commands = Array.from(commandRegistry.values());
  
  const fuse = new Fuse(commands, {
    keys: ['name', 'aliases'],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(input);
  
  if (results.length > 0 && results[0].score && results[0].score < 0.3) {
    return results[0].item;
  }

  return null;
};

export const getSuggestions = (
  input: string,
  commandRegistry: Map<string, Command>,
  limit: number = 3
): Command[] => {
  const commands = Array.from(commandRegistry.values());
  
  const uniqueCommands = commands.filter(
    (cmd, index, self) => index === self.findIndex(c => c.name === cmd.name)
  );

  const fuse = new Fuse(uniqueCommands, {
    keys: ['name', 'aliases', 'description'],
    threshold: 0.5,
    includeScore: true,
  });

  const results = fuse.search(input);
  
  return results.slice(0, limit).map(result => result.item);
};
