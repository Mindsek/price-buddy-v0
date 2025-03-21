'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';

export function OfflineLayoutProvider({ children }: { children: ReactNode }) {
  const session = {
    user: {
      id: 'offline',
      name: 'Offline User',
      email: 'offline.user@example.com',
      image: '',
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  };

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
}
