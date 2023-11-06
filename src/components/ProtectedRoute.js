import React from 'react';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, isLogedIn, ...props  }) {
  console.log(isLogedIn);
  return (
    isLogedIn ? Component : <Navigate to="/" replace/>
)}
