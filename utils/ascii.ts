export const generateAsciiName = (name: string): string => {
  const asciiMap: { [key: string]: string[] } = {
    'A': [
      '   █████╗  ',
      '  ██╔══██╗ ',
      '  ███████║ ',
      '  ██╔══██║ ',
      '  ██║  ██║ ',
      '  ╚═╝  ╚═╝ '
    ],
    'M': [
      '  ███╗   ███╗',
      '  ████╗ ████║',
      '  ██╔████╔██║',
      '  ██║╚██╔╝██║',
      '  ██║ ╚═╝ ██║',
      '  ╚═╝     ╚═╝'
    ],
    'I': [
      '  ██╗',
      '  ██║',
      '  ██║',
      '  ██║',
      '  ██║',
      '  ╚═╝'
    ],
    'T': [
      '  ████████╗',
      '  ╚══██╔══╝',
      '     ██║   ',
      '     ██║   ',
      '     ██║   ',
      '     ╚═╝   '
    ],
  };

  const lines: string[] = ['', '', '', '', '', ''];
  
  for (const char of name.toUpperCase()) {
    if (asciiMap[char]) {
      asciiMap[char].forEach((line, index) => {
        lines[index] += line;
      });
    }
  }

  return lines.join('\n');
};

export const generateSkillBar = (skill: string, level: number, width: number = 25): string => {
  const filled = Math.floor((level / 100) * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `  ${skill.padEnd(15)} ${bar} ${level}%`;
};

export const generateBox = (content: string[], width: number = 60): string => {
  const topBorder = '┌' + '─'.repeat(width - 2) + '┐';
  const bottomBorder = '└' + '─'.repeat(width - 2) + '┘';
  const emptyLine = '│' + ' '.repeat(width - 2) + '│';
  
  const lines = [topBorder, emptyLine];
  
  content.forEach(line => {
    const paddedLine = line.padEnd(width - 4);
    lines.push(`│ ${paddedLine} │`);
  });
  
  lines.push(emptyLine, bottomBorder);
  
  return lines.join('\n');
};

export const generateDoubleBox = (title: string, content: string[], width: number = 60): string => {
  const topBorder = '╔' + '═'.repeat(width - 2) + '╗';
  const titleSep = '╠' + '═'.repeat(width - 2) + '╣';
  const bottomBorder = '╚' + '═'.repeat(width - 2) + '╝';
  const emptyLine = '║' + ' '.repeat(width - 2) + '║';
  
  const paddedTitle = title.padEnd(width - 4);
  const lines = [topBorder, `║ ${paddedTitle} ║`, titleSep, emptyLine];
  
  content.forEach(line => {
    const paddedLine = line.padEnd(width - 4);
    lines.push(`║ ${paddedLine} ║`);
  });
  
  lines.push(emptyLine, bottomBorder);
  
  return lines.join('\n');
};

export const generateTimeline = (events: Array<{ year: string; title: string; description: string[] }>): string => {
  const lines: string[] = [];
  
  events.forEach((event, index) => {
    const isLast = index === events.length - 1;
    lines.push(`${event.year} ─────●${'─'.repeat(50)}`);
    lines.push(`          │ ${event.title}`);
    event.description.forEach(desc => {
      lines.push(`          │ ${desc}`);
    });
    if (!isLast) {
      lines.push(`          │`);
    }
  });
  
  return lines.join('\n');
};
