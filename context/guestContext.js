"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    const guestIdFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("guestId"));

    console.log("Raw guestIdFromCookie:", guestIdFromCookie);

    const parsedGuestId = guestIdFromCookie?.split("=")[1];

    console.log("Parsed guestId:", parsedGuestId);

    setGuestId(parsedGuestId);
  }, []);

  return (
    <GuestContext.Provider value={{ guestId }}>
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
