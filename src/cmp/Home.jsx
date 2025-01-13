import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../assets/hero.webp'; // Adjust the path as necessary

const Home = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(34, 34, 34, 0.7)), url(${heroImage})`, // Darker gradient with image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        Welcome to AI Image Generator
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Create stunning images with the power of AI.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default Home;