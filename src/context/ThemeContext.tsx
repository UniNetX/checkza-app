import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type BoardTheme = 'classic' | 'wood' | 'blue' | 'green' | 'brown';
type PieceStyle = 'alpha' | 'uscf' | 'case' | 'merida' | 'pirouetti';
type SoundLevel = 'off' | 'low' | 'medium' | 'high';

interface Settings {
  theme: Theme;
  boardTheme: BoardTheme;
  pieceStyle: PieceStyle;
  soundLevel: SoundLevel;
  showCoordinates: boolean;
  showMoveNumbers: boolean;
  autoFlipBoard: boolean;
  highlightLegalMoves: boolean;
  showCapturedPieces: boolean;
  enableAnimations: boolean;
  groupMode: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetToDefaults: () => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  boardTheme: 'classic',
  pieceStyle: 'alpha',
  soundLevel: 'medium',
  showCoordinates: true,
  showMoveNumbers: true,
  autoFlipBoard: false,
  highlightLegalMoves: true,
  showCapturedPieces: true,
  enableAnimations: true,
  groupMode: true,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSetting: () => {},
  resetToDefaults: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings });

  useEffect(() => {
    document.body.dataset.theme = 'dark';
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    localStorage.setItem('checkza-settings', JSON.stringify({ ...settings, theme: 'dark' }));
  }, [settings]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    if (key === 'theme') return; // Prevent theme switching
    setSettings(prev => ({ ...prev, [key]: value, theme: 'dark' }));
  };

  const resetToDefaults = () => {
    setSettings({ ...defaultSettings });
  };

  return (
    <SettingsContext.Provider value={{ settings: { ...settings, theme: 'dark' }, updateSetting, resetToDefaults }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

// Legacy theme context for backward compatibility
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 