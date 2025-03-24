import { getProducts } from '@/app/actions/products';
import { getSupermarkets } from '@/app/actions/supermarkets';
import { auth } from '@/auth';
import { ProductsPage } from '@/components/pages/products/products';

export default async function Products() {
  const session = await auth();
  const supermarkets = await getSupermarkets(session?.user?.id as string);
  const products = await getProducts(session?.user?.id as string);
  return <ProductsPage products={products} supermarkets={supermarkets} />;
}
