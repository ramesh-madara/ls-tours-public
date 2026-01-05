import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { toggleTheme, setTheme } from '@/store/slices/uiSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    // Initialize theme on mount
    const stored = localStorage.getItem('ls-tours-theme');
    if (stored === 'dark' || stored === 'light') {
      dispatch(setTheme(stored));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme('dark'));
    }
  }, [dispatch]);

  useEffect(() => {
    // Update DOM when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () => dispatch(toggleTheme());

  return { theme, toggle, setTheme: (t: 'light' | 'dark') => dispatch(setTheme(t)) };
};
