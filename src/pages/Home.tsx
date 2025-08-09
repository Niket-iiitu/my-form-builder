import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box p={4} textAlign="center">
            <Typography variant="h3" gutterBottom>
                🧩 Form Builder
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Build. Preview. Save.
            </Typography>

            <Stack direction="column" spacing={2} mt={4} alignItems="center">
                <Button variant="contained" size="large" onClick={() => navigate('/create')}>
                    ➕ Create New Form
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/preview')}>
                    👀 Preview Current Form
                </Button>
                <Button variant="outlined" size="large" onClick={() => navigate('/myforms')}>
                    📁 View Saved Forms
                </Button>
            </Stack>
        </Box>
    );
};

export default Home;
