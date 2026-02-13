export const parseCommand = (input: string): [string, ...string[]] => {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);
  return [parts[0] || '', ...parts.slice(1)];
};

export const hasFlag = (args: string[], flag: string): boolean => {
  return args.includes(`--${flag}`) || args.includes(`-${flag[0]}`);
};

export const getArgValue = (args: string[], flag: string): string | undefined => {
  const longIndex = args.indexOf(`--${flag}`);
  const shortIndex = args.indexOf(`-${flag[0]}`);
  const index = longIndex !== -1 ? longIndex : shortIndex;
  
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  
  return undefined;
};
