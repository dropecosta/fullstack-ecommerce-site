import { connectToDb } from "../../db";

// Disable prerendering and force dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
  const { client, db } = await connectToDb();
  let products = await db.collection('products').find({}).toArray();

  if (products.length === 0) {
    const legacyDb = client.db('ecommenrce-nextjs');
    products = await legacyDb.collection('products').find({}).toArray();
  }

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}