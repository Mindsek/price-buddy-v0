import { getSupermarkets } from '@/app/actions/supermarkets';
import { auth } from '@/auth';
import { SupermarketsPage } from '@/components/pages/supermarkets/supermarkets';

export default async function Supermarkets() {
  const session = await auth();
  const supermarkets = await getSupermarkets(session?.user?.id as string);
  return <SupermarketsPage supermarkets={supermarkets} />;
}
