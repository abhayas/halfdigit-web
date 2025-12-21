import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Halfdigit | AI & ML Portfolio",
  description: "AI/ML engineering portfolio by Abhay Sahu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
