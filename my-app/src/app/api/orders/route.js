require("dotenv").config();
import { connectToDatabase } from "@/lib/mongoDB";

export async function GET() {
    try {
        const db = await connectToDatabase();
        const ordersCollection = db.collection("orders");

        // Fetch all orders
        const orders = await ordersCollection.find().toArray();

        const formattedOrders = orders.map((order) => ({
            _id: order._id, // Order ID
            productName: order.cartItems.map((item) => item.title).join(", "),
            customerEmail: order.email,
            timePlaced: order.createdAt, // Timestamp of the order
        }));

        return new Response(JSON.stringify({ orders: formattedOrders }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response("Error fetching orders", { status: 500 });
    }
}
