import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Trello 2.5",
  description: "A kanban board clone with guest and OAuth2.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          {children} <Analytics />
        </Providers>
      </body>
    </html>
  );
}
