import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/lib/firebase/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Princeton Student Search",
  description: "Search for Princeton students by natural language queries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
