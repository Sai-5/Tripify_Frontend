import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin, isUser } from "../utils/auth";

const ProtectedRoute = ({ children, requiredRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "admin" && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "user" && !isUser()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
