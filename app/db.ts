import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const MONGODB_USER = '';
  const MONGODB_PASSWORD = '';
  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.af7ycek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  //const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vqdwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db('ecommenrce-nextjs');

  return { client, db: client.db('ecommenrce-nextjs') }
}