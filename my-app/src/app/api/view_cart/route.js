import { connectToDatabase } from "@/lib/mongoDB";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("shopping_cart");

        // Fetch all items from the shopping_cart collection
        const items = await collection.find().toArray();

        // Send the items back as JSON
        return new Response(JSON.stringify({ items }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return new Response("Error fetching cart items", { status: 500 });
    }
}
