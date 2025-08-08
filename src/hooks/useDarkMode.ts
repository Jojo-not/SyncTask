import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.documentElement.classList;

    if (darkMode) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [darkMode]);

  return [darkMode, setDarkMode] as const;
}