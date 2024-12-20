import NavBar from "@/components/dashboardUI/NavBar";
import localFont from "next/font/local";

export default function RootLayout({ children }) {
  return <body>
    <NavBar />
    {children}</body>;
}
