import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        // Validate input
        if (!name || !email || !password) {
            return new Response("All fields are required");
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response("Invalid email format");
        }

        // Connect to the database
        const db = await connectToDatabase();

        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return new Response("User already exists");
        }

        // Insert the new user with plain text password
        await db.collection("users").insertOne({
            name,
            email,
            password, // Store the plain text password
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        });

        return new Response("User registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        return new Response("Server error occurred");
    }
}
