import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
    try {
        console.log("Starting registration process...");

        const { name, email, password, accountType } = await req.json();

        // Validate input
        if (!name || !email || !password || !accountType) {
            console.log("Missing fields" , { name, email, password, accountType });
            return new Response("All fields are required");
        }

        console.log("Connecting to database...");
        const db = await connectToDatabase();
        console.log("Database connected");

        const usersCollection = db.collection("users");

        console.log("Checking if user exists...");
        const existingUser = await usersCollection.findOne({ email });
        console.log("Existing user check complete:", existingUser);

        if (existingUser) {
            console.log("User already exists");
            return new Response("User already exists");
        }

        console.log("Inserting new user...");
        const result = await usersCollection.insertOne({
            name,
            email,
            password, // Store plain password for simplicity; consider hashing in production.
            accountType,
            createdAt: new Date(),
        });

        console.log("Insert result:", result);

        return new Response("User registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        return new Response("An error occurred while registering the user");
    }
}
