import NavBar from "@/components/dashboardUI/NavBar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
