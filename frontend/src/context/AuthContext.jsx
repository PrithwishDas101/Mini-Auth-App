import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me"); // optional route or just skip if you don’t have it
      if (res.data.success) setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Signup
  const signup = async (email, username, password) => {
    try {
      const res = await axiosInstance.post("/auth/signup", { email, username, password });
      return res.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  // Signin
  const signin = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/signin", { email, password });
      if (res.data.success) {
        const token = res.data.token;
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setUser({ 
            email: decoded.email, 
            username: decoded.username,
            _id: decoded.userId
          });
        }
        localStorage.setItem("token", res.data.token);
        // Return both success and whether username is set
        return { ...res.data, usernameSet: !!res.data.token && JSON.parse(atob(res.data.token.split('.')[1])).username };
      }
      return res.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  // Signout
  const signout = async () => {
    await axiosInstance.post("/auth/signout");
    setUser(null);
  };

  // Set username for user without one
  const setUsernameForUser = (newUsername) => {
    if (user) {
      setUser({ ...user, username: newUsername });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout, setUsernameForUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);