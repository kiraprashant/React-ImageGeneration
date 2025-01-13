import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AllViewCard from './AllViewCard';

const View = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getDetails")
      .then((res) => {
        console.log(res.data);
        setDetails(res.data.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
   <Box sx={{ 
    width:"100vw",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',}}>
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem',
      paddingTop: "100px"
    }}>
      <Container>
        <Grid container spacing={3}>
          {details ? (
            details.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AllViewCard item={item} />
              </Grid>
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
    </Box>
  );
};

export default View;
