import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: 'HalfDigit | AI Engineering | Abhay Sahu',
  description: 'Enterprise AI Solutions by Abhay Sahu',
  // icons: {
  //   icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
  // },
}



export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
