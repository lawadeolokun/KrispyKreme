"use client";

import React from "react";
import Weather from "./Weather";
import { Container, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import Image from "next/image";

const products = [
    {
        id: 1,
        title: "Glaze Donut",
        description: "A deliciously sweet glazed donut.",
        price: 5.0,
        image: "/images/glazeDonut.jpeg",
    },
    {
        id: 2,
        title: "Chocolate Donut",
        description: "Rich chocolate donut with a hint of cocoa.",
        price: 6.5,
        image: "/images/chocolateDonut.jpeg", 
    },
    {
        id: 3,
        title: "Sprinkles Donut",
        description: "Fun donut with colorful sprinkles.",
        price: 7.0,
        image: "/images/sprinklesDonut.jpeg", 
    },
];

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
                                    src={product.image} // Path to the product image
                                    alt={product.title} // Alt text for accessibility
                                    width={300} // Width of the image
                                    height={300} // Height of the image
                                />
                            </CardMedia>

                            {/* Product Details */}
                            <CardContent>
                                <Typography variant="h6">{product.title}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>${product.price.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

