"use client";

import React from "react";
import Weather from "./weather";
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import Image from "next/image";

const products = [
    {
        id: 1,
        title: "Glaze Donut",
        description: "Sweet glazed donut.",
        price: 2.0,
        image: "/images/glazeDonut.jpeg",
    },
    {
        id: 2,
        title: "Chocolate Donut",
        description: "Dark Chocolate donut.",
        price: 2.75,
        image: "/images/chocolateDonut.jpeg", 
    },
    {
        id: 3,
        title: "Sprinkles Donut",
        description: "Pink colourful sprinkles.",
        price: 2.5,
        image: "/images/sprinkles.jpeg", 
    },
    {
        id: 4,
        title: "Jam Donut",
        description: "Strawberry Jam donut.",
        price: 3.0,
        image: "/images/jamDonut.jpeg", 
    },
    {
        id: 5,
        title: "Assorted Donuts",
        description: "Variety of Donuts, 12 Pack.",
        price: 20.0,
        image: "/images/assortedDonuts.jpeg", 
    },
];

// Function to add items to the cart
async function putInCart(pname) {
    console.log("Adding to cart:", pname);

    try {
        const response = await fetch(`/api/putInCart?pname=${encodeURIComponent(pname)}`);
        const data = await response.json();
        console.log("Cart Response:", data);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}

export default function CustomerPage() {
    return (
        <Container>
            {/* Weather Component */}
            <Weather />

            {/* Product Grid */}
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            {/* Product Image */}
                            <CardMedia>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={300}
                                    height={300}
                                />
                            </CardMedia>

                            {/* Product Details */}
                            <CardContent>
                                <Typography variant="h6">{product.title}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>€ {product.price.toFixed(2)}</Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => putInCart(product.title)}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
