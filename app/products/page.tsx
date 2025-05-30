import ProductsList from "../ProductsList";

// Add dynamic runtime behavior
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Use full base URL for API calls in server context
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // Fetch products at runtime using full URL
  const response = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
  const products = response.ok ? await response.json() : [];

  const response2 = await fetch(`${baseUrl}/api/users/2/cart`, { cache: 'no-store' });
  const cartProducts = response2.ok ? await response2.json() : [];

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}