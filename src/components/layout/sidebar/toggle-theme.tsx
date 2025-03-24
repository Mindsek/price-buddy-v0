import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      <Sun className='size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='size-5 absolute rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle Theme</span>
    </Button>
  );
};
