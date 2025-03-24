import { ReactNode } from 'react';

import { SidebarAppProvider } from '@/lib/providers/sidebar-app-provider';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return <SidebarAppProvider>{children}</SidebarAppProvider>;
}
