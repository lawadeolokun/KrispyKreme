require("dotenv").config();

import { connectToDatabase } from "@/lib/mongoDB";

const productPrices = {
    "Glaze Donut": 2.0,
    "Chocolate Donut": 2.75,
    "Sprinkles Donut": 2.5,
    "Jam Donut": 3.0,
    "Assorted Donuts": 20.0,
};

export async function GET(req) {
    console.log("In the putInCart API endpoint");

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const pname = searchParams.get("pname");

    if (!pname) {
        console.error("Product name not provided");
        return new Response("Product name is required");
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection("shopping_cart");

        // Insert product into shopping cart
        const product = {
            pname,
            price: productPrices[pname] || 0,
            username: "sample@test.com", // Replace with actual user session email
        };
        await collection.insertOne(product);

        console.log("Product added to cart:", product);
        return new Response(JSON.stringify({ success: true, message: "Item added to cart" }));
    } catch (error) {
        console.error("Error adding to cart:", error);
        return new Response("Failed to add to cart");
    }
}