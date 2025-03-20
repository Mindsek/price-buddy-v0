import { ReactNode } from 'react';

import { SidebarAppProvider } from '@/lib/providers/SidebarAppProvider';

export default async function AppLayout({ children }: { children: ReactNode }) {
  return <SidebarAppProvider>{children}</SidebarAppProvider>;
}
