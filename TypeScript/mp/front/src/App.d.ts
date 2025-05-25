import { ReactNode } from 'react';

interface ColorModeContextType {
  toggleColorMode: () => void;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

export const ColorModeContext: React.Context<ColorModeContextType>;
export const LanguageContext: React.Context<LanguageContextType>;

export default function App(): JSX.Element; 