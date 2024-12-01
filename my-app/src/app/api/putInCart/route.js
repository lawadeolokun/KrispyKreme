require("dotenv").config();

import { connectToDatabase } from "@/lib/mongoDB";

const productDetails = {
    "Glaze Donut": { price: 2.0, pname: "Glaze Donut" },
    "Chocolate Donut": { price: 2.75, pname: "Chocolate Donut" },
    "Sprinkles Donut": { price: 2.5, pname: "Sprinkles Donut" },
    "Jam Donut": { price: 3.0, pname: "Jam Donut" },
    "Assorted Donuts": { price: 20.0, pname: "Assorted Donuts" },
};

export async function GET(req) {
    console.log("In the putInCart API endpoint");

    const { searchParams } = new URL(req.url);
    const pname = searchParams.get("pname");

    if (!pname || !productDetails[pname]) {
        console.error("Invalid product name provided:", pname);
        return new Response("Invalid product name", { status: 400 });
    }

    const product = productDetails[pname];

    try {
        const db = await connectToDatabase();
        const collection = db.collection("shopping_cart");

        const item = {
            title: pname, // Save the product name
            price: product.price, // Save the product price
            quantity: 1, // Default quantity
        };

        await collection.insertOne(item);

        console.log("Product added to cart:", item);
        return new Response(JSON.stringify({ success: true, message: "Item added to cart" }));
    } catch (error) {
        console.error("Error adding to cart:", error);
        return new Response("Failed to add to cart", { status: 500 });
    }
}
