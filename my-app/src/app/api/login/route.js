require("dotenv").config();

import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        console.log("Received email:", email);
        console.log("Received password:", password);

        if (!email || !password) {
            console.log("Missing email or password");
            return new Response("Email and password are required");
        }

        // Connect to the database
        const db = await connectToDatabase();
        console.log("Connected to database:", db.databaseName);

        // Check if the `users` collection exists
        const users = await db.collection("users").find().toArray();
        console.log("Users in the collection:", users);

        // Check if the user exists
        const user = await db.collection("users").findOne({ email });
        console.log("Found user:", user);

        if (!user) {
            console.log("User not found for email:", email);
            return new Response("Invalid email or password");
        }

        // Compare passwords
        if (user.password !== password) {
            console.log("Password does not match for email:", email);
            return new Response("Invalid email or password");
        }

        // Success
        console.log("Login successful for user:", email);
        return new Response(JSON.stringify({ accountType: user.accountType }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Login error:", error);
        return new Response("Server error");
    }
}