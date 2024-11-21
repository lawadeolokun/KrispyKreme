"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function ViewCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Function to fetch cart items
  async function fetchCartItems() {
    try {
      const response = await fetch("/api/view_cart");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data.items || []);
      const calculatedTotal = (data.items || []).reduce(
        (acc, item) => acc + (item.price || 0),
        0
      );
      setTotal(calculatedTotal);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price (€)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.pname}</TableCell>
                    <TableCell>€ {item.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Total: € {total.toFixed(2)}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          Your cart is empty.
        </Typography>
      )}
    </Container>
  );
}
