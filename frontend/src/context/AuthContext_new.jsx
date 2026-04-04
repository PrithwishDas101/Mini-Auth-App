import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userEmail = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");
        const verified = localStorage.getItem("verified");
        
        if (userEmail) {
          setUser({
            email: userEmail,
            _id: userId,
            verified: verified === "true"
          });
        }
      }
    } catch (err) {
      console.log("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signup = async (email, password) => {
    const res = await axiosInstance.post("/auth/signup", { email, password });
    return res.data;
  };

  const signin = async (email, password) => {
    const res = await axiosInstance.post("/auth/signin", { email, password });
    if (res.data.success && res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("verified", false);
      
      try {
        const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
        localStorage.setItem("userId", tokenPayload.userId);
        localStorage.setItem("verified", tokenPayload.verified);
        
        setUser({
          email: tokenPayload.email,
          _id: tokenPayload.userId,
          verified: tokenPayload.verified
        });
      } catch (e) {
        console.log("Error decoding token:", e);
        setUser({ email });
      }
    }
    return res.data;
  };

  const signout = async () => {
    try {
      await axiosInstance.post("/auth/signout");
    } catch (err) {
      console.log("Error during signout:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      localStorage.removeItem("verified");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
