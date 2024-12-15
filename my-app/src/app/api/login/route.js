require("dotenv").config();
import { connectToDatabase } from "@/lib/mongoDB";
import bcrypt from "bcrypt";
import escapeHtml from "escape-html";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response("Email and password are required", { status: 400 });
        }

        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return new Response("Invalid email or password", { status: 401 });
        }

        // Validate password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return new Response("Invalid email or password", { status: 401 });
        }

        return new Response(JSON.stringify({ accountType: user.accountType }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Login error:", error);
        return new Response("Server error", { status: 500 });
    }
}
