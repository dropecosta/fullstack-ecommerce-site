import ShoppingCartList from "./ShoppingCartList";

export default async function CartPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  // Fetch cart via API with no-cache option
  const response = await fetch(`${baseUrl}/api/users/2/cart`, { cache: 'no-cache' });
  const cartProducts = await response.json();

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  );
}