import { getProducts } from '@/app/actions/products';
import { getSupermarkets } from '@/app/actions/supermarkets';
import { ProductsPage } from '@/components/pages/products/products';

export default async function Products() {
  const supermarkets = await getSupermarkets();
  const products = await getProducts();
  return <ProductsPage products={products} supermarkets={supermarkets} />;
}
