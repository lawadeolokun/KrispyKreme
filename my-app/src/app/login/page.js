"use client";

import React, { useState } from "react";
import validator from "email-validator";
import {
    Container,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import escapeHtml from "escape-html";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    // Dialog handlers
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: escapeHtml(value) });
    };

    // Validation function
    const validateForm = () => {
        let errorMessage = "";

        // Validate email
        if (!validator.validate(formData.email)) {
            errorMessage += "Invalid email format. ";
        }

        // Validate password
        if (!formData.password || formData.password.length < 6) {
            errorMessage += "Password must be at least 6 characters long. ";
        }

        return errorMessage;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateForm();
        setError(errorMessage);

        if (errorMessage.length > 0) {
            handleClickOpen();
        } else {
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const text = await response.text();
                    setResponseMessage(text);
                } else {
                    const data = await response.json();
                    setResponseMessage(`Login successful! Account type: ${data.accountType}`);
                }
            } catch (error) {
                console.error("Error logging in:", error);
                setResponseMessage("An error occurred while logging in.");
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 20 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
            {responseMessage && <Typography color="textSecondary">{responseMessage}</Typography>}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{error}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

