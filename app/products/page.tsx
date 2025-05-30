import ProductsList from "../ProductsList";
import { Product } from '../product-data';
import { notFound } from 'next/navigation';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Derive origin for server-side calls
  const origin = process.env.NEXT_PUBLIC_BASE_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  let products: Product[];
  try {
    const res = await fetch(`${origin}/api/products`, { cache: 'no-store' });
    if (res.status === 404) {
      notFound();
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    products = await res.json();
  } catch (err) {
    console.error('ProductsPage fetch error:', err);
    return <div className="text-red-500">Error loading products.</div>;
  }
  let cartProducts: Product[] = [];
  try {
    const res2 = await fetch(`${origin}/api/users/2/cart`, { cache: 'no-store' });
    if (!res2.ok) throw new Error(`Cart fetch failed: ${res2.status}`);
    cartProducts = await res2.json();
  } catch (err) {
    console.error('ProductsPage cart fetch error:', err);
  }

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}