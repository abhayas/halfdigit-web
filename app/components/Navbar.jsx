"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
        <div className="flex gap-6 text-sm items-center">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {/* My Projects dropdown */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setOpen((s) => !s)}
              aria-haspopup="true"
              aria-expanded={open}
              aria-controls="projects-menu"
              className={`flex items-center gap-2 ${linkClass("/projects")}`}
            >
              My Projects <ChevronDown size={14} />
            </button>

            {open && (
              <div
                id="projects-menu"
                role="menu"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-slate-900/95 border border-slate-800 rounded shadow-lg py-1 px-2 min-w-[9rem] z-50"
              >
                <Link
                  href="/titanic"
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm text-center rounded whitespace-nowrap ${
                    pathname === "/titanic" ? "text-sky-400 font-semibold" : "text-slate-300"
                  } hover:bg-slate-800`}
                >
                  Titanic Demo
                </Link>
                {/* Add more project links here as needed */}
              </div>
            )}
          </div>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
