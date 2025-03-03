"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guestId, setGuestId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    const getCookie = (name) => {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];
      
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    };
    
    try {
      const guestIdFromCookie = getCookie("guestId");
      setGuestId(guestIdFromCookie || null);
    } catch (error) {
      console.error("Error parsing guest cookie:", error);
      setGuestId(null);
    } finally {
      setLoading(false);
    }
  }, []);
  

  const isGuest = !!guestId;
  
  return (
    <GuestContext.Provider value={{ 
      guestId, 
      loading, 
      isGuest  
    }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};