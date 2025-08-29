import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const PublicRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Block access to login/signup if already logged in
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
