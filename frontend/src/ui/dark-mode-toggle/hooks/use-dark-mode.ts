import { useEffect, useState } from 'react';

import type UseDarkModeDefinition from './definitions/use-dark-mode-definition';

const THEME_STORAGE_KEY = 'budgetie-theme';

const useDarkMode = (): UseDarkModeDefinition => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((currentIsDarkMode) => !currentIsDarkMode);
  };

  return {
    darkModeAriaLabel: isDarkMode
      ? 'Switch to light mode'
      : 'Switch to dark mode',
    darkModeIconClassName: isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
    darkModeLabel: isDarkMode ? 'Light mode' : 'Dark mode',
    isDarkMode,
    onToggleDarkMode: handleToggleDarkMode,
  };
};

export default useDarkMode;
