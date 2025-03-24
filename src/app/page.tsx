import { getDashboardData } from '@/app/actions/dashboard';
import { auth } from '@/auth';
import DashboardPage from '@/components/pages/dashboard/dashboard';
import { SidebarAppProvider } from '@/lib/providers/sidebar-app-provider';

export default async function Home() {
  const session = await auth();
  const data = await getDashboardData(session?.user?.id as string);
  return (
    <SidebarAppProvider>
      <DashboardPage data={data} />
    </SidebarAppProvider>
  );
}
