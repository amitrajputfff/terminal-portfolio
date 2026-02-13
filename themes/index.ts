import { Theme } from '../types';
import { proHackerTheme, lightTheme, cyberpunkTheme, draculaTheme, nordTheme, matrixTheme, monokaiTheme } from './themes';

export const themes: Theme[] = [
  proHackerTheme,
  lightTheme,
  cyberpunkTheme,
  draculaTheme,
  nordTheme,
  matrixTheme,
  monokaiTheme,
];

export const getThemeByName = (name: string): Theme | undefined => {
  return themes.find(theme => theme.name === name);
};

export const defaultTheme = proHackerTheme;

export { proHackerTheme, lightTheme, cyberpunkTheme, draculaTheme, nordTheme, matrixTheme, monokaiTheme };
