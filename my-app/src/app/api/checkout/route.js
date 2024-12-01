import { connectToDatabase } from "@/lib/mongoDB";

export async function POST(req) {
    try {
        const { email, cartItems } = await req.json();

        if (!email || !cartItems || !Array.isArray(cartItems)) {
            return new Response("Invalid request data", { status: 400 });
        }

        // Calculate total
        const calculatedTotal = cartItems.reduce((sum, item) => {
            if (!item.price || !item.quantity) throw new Error("Invalid cart item");
            return sum + item.price * item.quantity;
        }, 0);

        console.log(`Checkout data received. Calculated Total: €${calculatedTotal.toFixed(2)}`);

        // Insert order into the database
        const db = await connectToDatabase();
        const ordersCollection = db.collection("orders");
        const order = { email, cartItems, total: calculatedTotal, createdAt: new Date() };
        const result = await ordersCollection.insertOne(order);

        console.log("Order inserted with ID:", result.insertedId);

        console.log(`Thank you for your order! Here is your order:
        ${cartItems
            .map(
                (item) =>
                    `- ${item.title}: €${item.price.toFixed(2)} x ${item.quantity} = €${(
                        item.price * item.quantity
                    ).toFixed(2)}`
            )
            .join("\n")}
        
        Total: €${calculatedTotal.toFixed(2)}

        `);

        return new Response("Order confirmed successfully");
    } catch (error) {
        console.error("Checkout process failed:", error);
        return new Response("Failed to confirm order. Please try again.", { status: 500 });
    }
}

