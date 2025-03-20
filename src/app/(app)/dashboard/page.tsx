import { getDashboardData } from '@/app/actions/dashboard';
import { auth } from '@/auth';
import DashboardPage from '@/components/pages/dashboard/dashboard';

export default async function Dashboard() {
  const session = await auth();
  const data = await getDashboardData(session?.user?.id as string);
  return <DashboardPage data={data} />;
}
