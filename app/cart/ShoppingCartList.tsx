'use client';

import { useState, useEffect } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadCart() {
      try {
        const response = await fetch('/api/users/2/cart', { cache: 'no-store' });
        if (response.ok) {
          const data: Product[] = await response.json();
          setCartProducts(data);
        }
      } catch (err) {
        console.error('Error loading cart', err);
      }
    }
    loadCart();
  }, []);

  async function removeFromCart(productId: string) {
    const response = await fetch(`/api/users/2/cart`, {
      cache: 'no-store',
      method: 'DELETE',
      body: JSON.stringify({
        productId,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updatedCartProducts = await response.json();
    setCartProducts(updatedCartProducts);
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <ul className="space-y-4">
        {cartProducts.map(product => (
          <li key={product.id} className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center">
              <Link href={`/products/${product.id}`} className="flex-1">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 font-semibold">${product.price}</p>
                </div>
              </Link>
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(product.id);
                }}
              >
                Remove from Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}