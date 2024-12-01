require("dotenv").config();

import { connectToDatabase } from "@/lib/mongoDB";

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("shopping_cart");

        // Fetch all items for the user
        const items = await collection.find().toArray();

        // Ensure each item has a title, price, and quantity
        const formattedItems = items.map((item) => ({
            title: item.title || "Unknown Item",
            price: item.price || 0,
            quantity: item.quantity || 1,
        }));

        console.log("Fetched cart items:", formattedItems);

        return new Response(JSON.stringify({ items: formattedItems }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return new Response("Error fetching cart items", { status: 500 });
    }
}
