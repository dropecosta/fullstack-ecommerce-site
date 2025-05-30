import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URI, MONGODB_DB } = process.env;
  if (!MONGODB_URI && (!MONGODB_USER || !MONGODB_PASSWORD)) {
    throw new Error('Please define MONGODB_URI or both MONGODB_USER and MONGODB_PASSWORD in .env.local');
  }
  const uri = MONGODB_URI ?? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.af7ycek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const dbName = MONGODB_DB ?? 'ecommerce-nextjs';

  // Configure MongoClient with TLS options to avoid SSL errors in production
  const clientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    // In serverless or certain production environments, allow invalid TLS certificates
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  };
  const client = new MongoClient(uri, clientOptions);

  await client.connect();

  cachedClient = client;
  cachedDb = client.db(dbName);

  return { client, db: client.db(dbName) };
}