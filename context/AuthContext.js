"use client"
import { fetchUserInfo } from "@/utils/userInfo";
import  { createContext, useContext, useState, useEffect } from "react";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedSession, setAuthenticatedSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const user = await fetchUserInfo();
        setAuthenticatedSession(user);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticatedSession, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);