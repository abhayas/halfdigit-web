import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: 'Halfdigit | AI Engineering',
  description: 'Enterprise AI Solutions by Abhay Sahu',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
  },
}



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
