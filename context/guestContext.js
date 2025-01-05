"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [guestId, setGuestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guestIdFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("guestId"))
      ?.split("=")[1];

    setGuestId(guestIdFromCookie || null);
    setLoading(false);
  }, []);

  return (
    <GuestContext.Provider value={{ guestId, loading }}>
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
