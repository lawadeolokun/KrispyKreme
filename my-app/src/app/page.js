"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <Box>    
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

