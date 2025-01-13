import React, { useEffect } from 'react';
import GenerateImage from './cmp/GenerateImage.jsx';
import Navbar from './cmp/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './cmp/Home.jsx';
import axios from 'axios';
import Login from './cmp/Login.jsx';
import Signup from './cmp/Signup.jsx';
import ProtctedRoute from './cmp/ProtctedRoute.jsx';
import View from './cmp/View.jsx';
import { Box } from '@mui/material';
import Logout from './cmp/Logout.jsx';

function App() {
  useEffect(() => {
    // Example fetch logic
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/getDetails")
      .then((res) => {
        console.log(res);
      }).catch((e) => {
        console.log("e");
      });
  }, []);

  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/generate' element={<ProtctedRoute Cmp={GenerateImage} />} />
            <Route path='/view' element={<View />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
      
      </Router>
    </>
  );
}

export default App;