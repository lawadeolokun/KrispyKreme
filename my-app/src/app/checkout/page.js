"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [email, setEmail] = useState("adeolokunlawrence@gmail.com"); // Replace with dynamic user email if needed
    const [error, setError] = useState("");

    // Fetch cart items when the component loads
    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await fetch(`/api/view_cart?email=${encodeURIComponent(email)}`);
                if (!response.ok) throw new Error("Failed to fetch cart items");

                const data = await response.json();
                setCartItems(data.items || []);

                // Calculate total
                const calculatedTotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotal(calculatedTotal);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items. Please try again.");
            }
        }

        fetchCartItems();
    }, [email]);

    // Handle checkout process
    async function handleCheckout() {
        try {
            const response = await fetch(`/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, cartItems, total }),
            });

            if (!response.ok) throw new Error("Failed to confirm order");

            const data = await response.json();
            alert("Order confirmed! Check your email for confirmation.");
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Failed to confirm order. Please try again.");
        }
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Checkout
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <List>
                {cartItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.title} secondary={`€${item.price} x ${item.quantity}`} />
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6" style={{ marginTop: "20px" }}>
                Total: €{total.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={handleCheckout}
            >
                Confirm Order
            </Button>
        </Container>
    );
}
