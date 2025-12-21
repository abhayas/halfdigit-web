"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `hover:text-sky-400 ${
      pathname === path ? "text-sky-400 font-semibold" : "text-slate-300"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-lg font-semibold text-slate-100">
          Halfdigit
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/titanic" className={linkClass("/titanic")}>
            Titanic Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
