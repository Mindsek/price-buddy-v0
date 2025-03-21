'use client';

import { ReactNode } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { BaseSidebar } from '@/components/layout/sidebar/base-sidebar';

export function OfflineLayoutProvider({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <BaseSidebar />
      <SidebarInset>
        <div className='flex-1 overflow-hidden'>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
