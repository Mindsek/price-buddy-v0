import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

import { auth } from '@/auth';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProvider = async ({ children }: AppProvidersProps) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <main className='flex-1 w-full'>{children}</main>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default AppProvider;
