import { Children, createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // JWT tokens are in seconds, and Date.now() is in milliseconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const logout = () => {
    localStorage.removeItem("authTokens");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
  );

  const [isAuthenticated, setIsAuthenticated] = useState(!!authTokens);

  useEffect(() => {
    if (authTokens && isTokenExpired(JSON.parse(authTokens).access)) {
      logout();
    }
  }, []);

  const contextData = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
