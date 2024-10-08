import Validator from "@/components/login/Validator";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { Nunito } from "next/font/google";

// Load the Nunito font with specific weights
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Specify font weights you want to use
  variable: "--font-nunito", // Optional: Add CSS variable to control the font
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Validator />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
