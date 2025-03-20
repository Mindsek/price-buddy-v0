import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { auth } from '@/auth';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { LOGIN } from '@/constants/routes';

export const SidebarAppProvider = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const session = await auth();

  if (!session?.user) {
    redirect(LOGIN);
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session as Session} />
      <SidebarInset>
        <div className='flex-1 overflow-hidden'>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
