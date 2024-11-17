import { connectToDatabase } from "@/lib/mongoDB"; // Adjust the path based on your folder structure

export async function POST(req) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return new Response("Email and password are required");
    }

    try {
        const { db } = await connectToDatabase();

        // Check if the user exists
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return new Response("Invalid email or password");
        }

        // Directly compare the plain text password
        if (password !== user.password) {
            return new Response("Invalid email or password");
        }

        // Return user type for redirection
        return new Response(JSON.stringify({ accountType: user.accountType }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Login error:", error);
        return new Response("Server error");
    }
}
