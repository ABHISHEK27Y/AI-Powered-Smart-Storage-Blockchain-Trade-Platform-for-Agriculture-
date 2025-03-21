import { useState, useEffect } from 'react';

export function useColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('colorMode') as 'light' | 'dark' || 'light'
  );

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return { mode, toggleColorMode };
}