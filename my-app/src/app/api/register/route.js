import { connectToDatabase } from "@/lib/mongoDB";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Validate input
        if (!name || !email || !password) {
            return new Response("All fields are required");
        }

        // Connect to the database using your `mongoDB.js`
        const db = await connectToDatabase();

        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return new Response("User already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return new Response("User registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        return new Response("Server error occurred");
    }
}
