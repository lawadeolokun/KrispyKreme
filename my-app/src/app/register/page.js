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

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        accountType: "customer",
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    // Open/close dialog handlers
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: escapeHtml(value) });
    };

    // Client-side validation function
    const validateForm = () => {
        let errorMessage = "";

        // Validate name
        if (!formData.name || formData.name.trim().length < 3) {
            errorMessage += "Name must be at least 3 characters long. ";
        }

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
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const text = await response.text();
                setResponseMessage(text);
            } catch (error) {
                console.error("Error submitting form:", error);
                setResponseMessage("An error occurred while registering.");
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    margin="normal"
                />
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
                    inputProps={{ maxLength: 20 }}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Register
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
