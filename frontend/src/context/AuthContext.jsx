import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance, { setAccessToken, setLogoutHandler } from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessTokenState, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const login = (token, userData) => {
    setAccessTokenState(token);
    setAccessToken(token);
    setUser(userData);
  };

  const logout = () => {
    setAccessTokenState(null);
    setAccessToken(null);
    setUser(null);
  };

  // Register logout handler for interceptor
  setLogoutHandler(logout);

  // Bootstrap refresh
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await axiosInstance.post("/auth/refresh");
        const newToken = res.data.accessToken;

        setAccessTokenState(newToken);
        setAccessToken(newToken);
      } catch {
        // silent fail
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessTokenState,
        user,
        login,
        logout,
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}