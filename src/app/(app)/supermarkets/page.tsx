import { getProducts } from '@/app/actions/products';
import { getSupermarkets } from '@/app/actions/supermarkets';
import { SupermarketsPage } from '@/components/pages/supermarkets/supermarkets';

export default async function Supermarkets() {
  const supermarkets = await getSupermarkets();
  const products = await getProducts();
  return <SupermarketsPage supermarkets={supermarkets} products={products} />;
}
