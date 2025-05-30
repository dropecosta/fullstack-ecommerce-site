import ProductsList from "../ProductsList";
import { connectToDb } from "../db";
import type { Product } from '../product-data';

// Force runtime data fetching
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Fetch data directly from DB with proper typing
  const { db } = await connectToDb();
  const products: Product[] = await db.collection<Product>('products').find({}).toArray();
  let cartProducts: Product[] = [];
  const cartDoc = await db.collection('carts').findOne({ userId: '2' });
  if (cartDoc?.cartIds?.length) {
    cartProducts = await db.collection<Product>('products').find({ id: { $in: cartDoc.cartIds } }).toArray();
  }

  return (
    <div className="container mx-auto p-8"> 
      <h1 className="text-4xl font-bold mb-8">Products</h1> 
      <ProductsList products={products} initialCartProducts={cartProducts} />
    </div>
  );
}