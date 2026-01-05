import { Moon, Sun } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="relative overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : -180,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </Button>
  );
};
