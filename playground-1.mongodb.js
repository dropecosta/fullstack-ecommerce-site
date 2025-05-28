const { MongoClient } = require('mongodb');

// playground-1.mongodb.js

async function main() {
const MONGODB_USER = '';
const MONGODB_PASSWORD = '';
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.af7ycek.mongodb.net/?retryWrites=true&w=majority`;

    // Create a new MongoClient
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');

        // Specify database and collection
        const db = client.db('ecommenrce-nextjs');
        const users = db.collection('products');

        // 1. Insert a document
        const insertResult = await users.insertMany([
            {
                id: '123',
                name: 'Hat',
                imageUrl: 'hat.jpg',
                description: 'Cheer the team on in style with our unstructured, low crown, six-panel baseball cap made of 100% organic cotton twill. Featuring our original Big Star Collectibles artwork, screen-printed with PVC- and phthalate-free inks. Complete with matching sewn ventilation eyelets, and adjustable fabric closure.',
                price: 29
            },
            {
                id: '234',
                name: 'Mug',
                imageUrl: 'mug.jpg',
                description: 'Enjoy your morning coffee or tea in the company of your favorite Big Star Collectible character. Our strong ceramic mug, with its comfortable D-shaped handle, is microwave and dishwasher safe, and available in one size: 11 oz (3.2” diameter x 3.8” h).',
                price: 16
            },
            {
                id: '345',
                name: 'Shirt',
                imageUrl: 'shirt.jpg',
                description: 'Our t-shirts are made from ring-spun, long-staple organic cotton that\'s ethically sourced from member farms of local organic cotton cooperatives. Original artwork is screen-printed using PVC- and phthalate-free inks. Features crew-neck styling, shoulder-to-shoulder taping, and a buttery soft feel. Machine-wash warm, tumble-dry low.',
                price: 26
            },
            {
                id: '456',
                name: 'Apron',
                imageUrl: 'apron.jpg',
                description: 'Everyone’s a chef in our eco-friendly apron made from 55% organic cotton and 45% recycled polyester. Showcasing your favorite Big Star Collectibles design, the apron is screen-printed in PVC- and phthalate-free inks. Apron measures 24 inches wide by 30 inches long and is easily adjustable around the neck and waist with one continuous strap. Machine-wash warm, tumble-dry low.',
                price: 24
            }
        ]);
        console.log('Inserted documents count:', insertResult.insertedCount);

        // IDs of the inserted documents
        console.log('Inserted document IDs:', insertResult.insertedIds);

        // Find documents
        const foundUsers = await users.find({}).toArray();
        console.log('All products:', foundUsers);

    } catch (err) {
        console.error(err);
    } finally {
        // Ensure the client will close when you finish/error
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main().catch(console.error);