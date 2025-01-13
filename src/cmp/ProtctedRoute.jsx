
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ Cmp }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  useEffect(() => {
    // If not authenticated, navigate to the login page
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, render the component, otherwise, it will be redirected by useEffect
  return isAuthenticated ? <Cmp /> : null;
}

export default ProtectedRoute;