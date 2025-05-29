'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products, initialCartProducts = [] }: { products: Product[], initialCartProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialCartProducts)

  async function addToCart(productId: string) {
    setCartProducts(prev => {
      if (prev.some(p => p.id === productId)) return prev;
      const newProduct = products.find(p => p.id === productId);
      return newProduct ? [...prev, newProduct] : prev;
    });
    const response = await fetch(`/api/users/2/cart`, {
      method: 'POST',
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

  async function removeFromCart(productId: string) {
    setCartProducts(prev => prev.filter(p => p.id !== productId));
    const response = await fetch(`/api/users/2/cart`, {
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

  function productIsInCart(productId: string) {
    return cartProducts.some(cp => cp.id === productId);
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
        >
          <Link href={`/products/${product.id}`}>
            <div className="flex justify-center mb-4 h-48 relative">
              <Image
                src={'/' + product.imageUrl}
                alt="Product image"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-400">${product.price}</p>
          </Link>
          <div className="mt-4">
            {productIsInCart(product.id)
              ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromCart(product.id);
                  }}
                >Remove from Cart</button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                >Add to Cart</button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}