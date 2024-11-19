"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <Box>
            <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
                        Krispy Kreme
                    </Typography>
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

            
            <Container maxWidth="md" style={{ marginTop: "20px", textAlign: "center" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Krispy Kreme
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "20px" }}>
                    Enjoy the best donuts in town! Use the links above to navigate to the respective pages.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "10px" }}
                    onClick={() => router.push("/register")}
                >
                    Register Now
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "10px" }}
                    onClick={() => router.push("/login")}
                >
                    Login
                </Button>
            </Container>
        </Box>
    );
}

