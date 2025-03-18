import { getSupermarkets } from "@/app/actions/supermarkets";
import SupermarketsPage from "@/components/pages/supermarkets/supermarkets";
export default async function Supermarkets() {
  const supermarkets = await getSupermarkets();
  return <SupermarketsPage supermarkets={supermarkets} />;
}
