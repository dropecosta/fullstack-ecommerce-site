import { NextRequest } from 'next/server';
import { connectToDb } from '../../../db';
import { ObjectId, UpdateFilter, Document } from 'mongodb';

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

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { db } = await connectToDb();
  let objectId;
  try {
    objectId = new ObjectId(params.id);
  } catch {
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
  const pullFilter = { $pull: { cartIds: params.id } };
  await db.collection('carts').updateMany(
    {},
    pullFilter as unknown as UpdateFilter<Document>
  );
  return new Response(null, { status: 204 });
}