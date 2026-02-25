import { createContext, useState, useContext } from "react";
import axios from "axios";
import { setAccessToken } from "../api/axios";
import { setAccessToken, setLogoutHandler } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessTokenState, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setAccessTokenState(token);
    setAccessToken(token); // axios sync
    setUser(userData);
  };

  const logout = () => {
    setAccessTokenState(null);
    setAccessToken(null); // clear axios
    setUser(null);
  };

  setLogoutHandler(logout);

  const refreshAccessToken = async () => {
    // Will implement later
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessTokenState,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
