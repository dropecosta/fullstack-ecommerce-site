import ShoppingCartList from "./ShoppingCartList";

// Force dynamic rendering, no static cache
export const dynamic = 'force-dynamic';
export default async function CartPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // Fetch cart via API with no-store to always get fresh data
  let cartProducts = [];
  try {
    const response = await fetch(`${baseUrl}/api/users/2/cart`, { cache: 'no-cache' });
    if (response.ok) {
      // parse JSON only if body is non-empty
      const text = await response.text();
      cartProducts = text ? JSON.parse(text) : [];
    }
  } catch {
    cartProducts = [];
  }

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  );
}