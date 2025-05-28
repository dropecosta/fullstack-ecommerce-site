import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/db';

type Params = {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  const userId = params.id;
  // Fetch the user's cart by custom product IDs
  const cartDoc = await db.collection('carts').findOne({ userId });
  if (!cartDoc?.cartIds?.length) {
    return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  // Fetch products by custom 'id' field
  const cartProducts = await db
    .collection('products')
    .find({ id: { $in: cartDoc.cartIds } })
    .toArray();
  return new Response(JSON.stringify(cartProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

type CartBody = {
  productId: string;
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  const userId = params.id;
  const { productId } = await request.json();
  try {
    // Add the product ID string to cartIds
    await db.collection('carts').updateOne(
      { userId },
      { $addToSet: { cartIds: productId } },
      { upsert: true }
    );
    // Fetch updated cart document
    const updatedCart = await db.collection('carts').findOne({ userId });
    const cartIds = updatedCart?.cartIds || [];
    // Fetch product documents
    const cartProducts = await db
      .collection('products')
      .find({ id: { $in: cartIds } })
      .toArray();
    return new Response(JSON.stringify(cartProducts), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('POST /cart error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  const userId = params.id;
  const { productId } = await request.json();
  try {
    // Remove the product ID string from cartIds
    await db.collection('carts').updateOne(
      { userId },
      { $pull: { cartIds: productId } }
    );
    // Fetch updated cart document
    const updatedCart = await db.collection('carts').findOne({ userId });
    const cartIds = updatedCart?.cartIds || [];
    const cartProducts = await db
      .collection('products')
      .find({ id: { $in: cartIds } })
      .toArray();
    return new Response(JSON.stringify(cartProducts), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('DELETE /cart error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
// End of file