import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  subscribeToAuth
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (formData) => {
    const currentUser = await loginUser(formData);
    setUser(currentUser);
    return currentUser;
  };

  const register = async (formData) => {
    const currentUser = await registerUser(formData);
    setUser(currentUser);
    return currentUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
