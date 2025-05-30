import ProductsList from "../ProductsList";
import { Product } from '../product-data';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Resolve base URL dynamically: local development, env var, or Vercel URL
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL.replace(/https?:\/\//, '')
    : process.env.VERCEL_URL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ?? (host ? `${protocol}://${host}` : 'http://localhost:3000');

  // Fetch products list
  const resProducts = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  const products: Product[] = resProducts.ok ? await resProducts.json() : [];
  // Fetch current cart items
  const resCart = await fetch(`${baseUrl}/api/users/2/cart`, { cache: 'no-store' });
  const cartProducts: Product[] = resCart.ok ? await resCart.json() : [];

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}