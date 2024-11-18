import { connectToDatabase } from "@/lib/mongoDB";

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const ordersCollection = db.collection("orders"); // Collection for orders

        // Fetch all orders
        const orders = await ordersCollection.find({}).toArray();

        return new Response(JSON.stringify({ orders }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response("Failed to fetch orders");
    }
}
