import { NextRequest } from 'next/server';
import { connectToDb } from '../../../db';
import { ObjectId } from 'mongodb';

type Params = {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  const productId = params.id;

  const product = await db.collection('products').findOne({ id: productId });

  if (!product) {
    return new Response('Product not found!', {
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

// DELETE product by MongoDB _id
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  let objectId;
  // Try URL param first
  try {
    objectId = new ObjectId(params.id);
  } catch {
    // Fallback: parse JSON body for _id
    try {
      const body = await request.json();
      objectId = new ObjectId(body._id || body.id);
    } catch {
      return new Response('Invalid ID', { status: 400 });
    }
  }
  const result = await db.collection('products').deleteOne({ _id: objectId });
  if (result.deletedCount === 0) {
    return new Response('Product not found', { status: 404 });
  }
  // Cascade delete: remove this product ID from all carts
  await db.collection('carts').updateMany(
    {},
    // cast to any to satisfy TS types
    { $pull: { cartIds: params.id } } as any
  );
  return new Response(null, { status: 204 });
}