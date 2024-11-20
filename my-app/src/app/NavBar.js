"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Krispy Kreme
        </Typography>
        <Button color="inherit" onClick={() => router.push("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => router.push("/register")}>
          Register
        </Button>
        <Button color="inherit" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button color="inherit" onClick={() => router.push("/customer")}>
          Customer
        </Button>
        <Button color="inherit" onClick={() => router.push("/manager")}>
          Manager
        </Button>
        <Button color="inherit" onClick={() => router.push("/view_cart")}>
          View Cart
        </Button>
        <Button color="inherit" onClick={() => router.push("/checkout")}>
          Checkout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
