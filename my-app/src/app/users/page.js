import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function UsersDashboard() {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Customer Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the Krispy Kreme users dashboard!
            </Typography>
        </Container>
    );
}
