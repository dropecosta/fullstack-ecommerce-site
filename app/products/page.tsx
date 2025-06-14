import ProductsList from "../ProductsList";
import { connectToDb } from '../db';
import type { Product } from '../product-data';

// Force dynamic rendering at runtime
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const { db, client } = await connectToDb();
  // Fetch raw product docs from primary DB
  let rawProducts = await db.collection<Product>('products').find({}).toArray();
  // If none found, attempt fallbacks (correct then legacy misspelled)
  if (!rawProducts.length) {
    for (const fallbackDb of ['ecommerce-nextjs', 'ecommenrce-nextjs']) {
      rawProducts = await client.db(fallbackDb).collection<Product>('products').find({}).toArray();
      if (rawProducts.length) break;
    }
  }
  // Map to plain objects, stripping _id
  const products: Product[] = rawProducts.map(({ id, imageUrl, name, description, price }) => ({ id, imageUrl, name, description, price }));
  // Fetch raw cart items
  const cartDoc = await db.collection('carts').findOne({ userId: '2' });
  let rawCart: Product[] = [];
  if (cartDoc?.cartIds?.length) {
    rawCart = await db.collection<Product>('products').find({ id: { $in: cartDoc.cartIds } }).toArray();
  }
  // Map cart products to plain format
  const cartProducts: Product[] = rawCart.map(({ id, imageUrl, name, description, price }) => ({ id, imageUrl, name, description, price }));

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}