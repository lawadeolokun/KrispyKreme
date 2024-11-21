"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
    const router = useRouter();

    return (
        <Box>
            <Container maxWidth="md" style={{ marginTop: "20px", textAlign: "center" }}>
    			<Image
        		src="/images/krispyKreme.png"
        		alt="Krispy Kreme"
				width={500} 
        		height={300} 
        		style={{ borderRadius: "10px", marginBottom: "20px" }} 
    			/>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Krispy Kreme
                </Typography>
                <Typography variant="body1" style={{ marginBottom: "20px" }}>
                    Here at Krispy Kreme we have a variety of Donuts.
                </Typography>


               
            </Container>
        </Box>
    );
}

