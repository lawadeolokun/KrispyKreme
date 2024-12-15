require("dotenv").config();
import { connectToDatabase } from "@/lib/mongoDB";
import bcrypt from "bcrypt";
import escapeHtml from "escape-html";

export async function POST(req) {
    try {
        const { name, email, password, accountType } = await req.json();

        // Validate inputs
        if (!name || !email || !password || !accountType) {
            return new Response("All fields are required", { status: 400 });
        }
        if (name.trim().length < 3 || password.length < 6) {
            return new Response("Invalid name or password length", { status: 400 });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return new Response("User already exists", { status: 400 });
        }

        // Sanitize and hash password
        const sanitizedData = {
            name: escapeHtml(name),
            email: escapeHtml(email),
        };
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert new user
        await usersCollection.insertOne({
            ...sanitizedData,
            password: hashedPassword,
            accountType,
            createdAt: new Date(),
        });

        return new Response("User registered successfully");
    } catch (error) {
        console.error("Registration error:", error);
        return new Response("Server error", { status: 500 });
    }
}
