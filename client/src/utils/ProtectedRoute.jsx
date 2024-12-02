import { Route, Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const context = useContext(AuthContext);

  const isAuthenticated = context.isAuthenticated;
  return <>{isAuthenticated ? children : <Navigate to={"/login"} />}</>;
};

export default ProtectedRoute;  
