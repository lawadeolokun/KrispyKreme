const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://b00153847:lawadeolokun@krispykreme.g9lb6.mongodb.net/?retryWrites=true&w=majority&appName=KrispyKreme';
const client = new MongoClient(uri);

export async function connectToDatabase() {
    await client.connect();
    const db = client.db("KrispyKreme"); 
    return db;
}

// Exported POST function for user registration
export async function POST(req) {
    try {
        // Parse the request body
        const { name, email, password } = await req.json();

        // Check if all fields are provided
        if (!name || !email || !password) {
            return new Response("All fields are required");
        }

        // Connect to the database
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return new Response("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        await collection.insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        console.log("User registered successfully");
        return new Response("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        return new Response("An error occurred while registering the user");
    }
}
