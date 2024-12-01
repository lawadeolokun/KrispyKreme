import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://b00153847:lawadeolokun@krispykreme.g9lb6.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKreme';
let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
    const client = await clientPromise;
    const db = client.db("KrispyKreme");
    return db;
}