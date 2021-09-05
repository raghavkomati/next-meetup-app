import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://max:reactguru@cluster0.rb7ry.mongodb.net/meetups?retryWrites=true&w=majority', { useUnifiedTopology: true } );
        const db = client.db();
        const collection = db.collection('meetups');
        const result = await collection.insertOne(data);

        console.log(result);
        client.close();
        res.status(201).json({ message: 'Meetup inserted!'});
    }
}

export default handler;