"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, BrainCircuit } from "lucide-react"; 

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
    `hover:text-sky-400 transition-colors ${
      pathname === path ? "text-sky-400 font-semibold" : "text-slate-300"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand with "Neural Architect" Logo */}
        <Link href="/" className="text-lg font-bold text-slate-100 flex items-center gap-2.5 hover:opacity-90 transition-opacity group">
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500/50 transition-colors shadow-lg shadow-blue-900/10">
            {/* The Logo Icon */}
            <BrainCircuit size={20} className="text-blue-400" />
          </div>
          <span className="tracking-tight group-hover:text-white transition-colors">HalfDigit</span>
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
              className={`flex items-center gap-1.5 ${linkClass("/projects")}`}
            >
              My Projects <ChevronDown size={14} />
            </button>

            {open && (
              <div
                id="projects-menu"
                role="menu"
                className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2 min-w-[13rem] z-50 overflow-hidden"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Live Modules
                </div>
                
                {/* 01. Titanic */}
                <Link
                  href="/titanic"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm ${
                    pathname === "/titanic" ? "bg-blue-600/10 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  01. Titanic Survival
                </Link>

                {/* 02. Speech-to-Text (NEW) */}
                <Link
                  href="/speech-to-text"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm ${
                    pathname === "/speech-to-text" ? "bg-blue-600/10 text-blue-400 font-medium" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  02. Audio Extraction
                </Link>

                <div className="my-1 border-t border-slate-800"></div>
                
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  In Development
                </div>

                <span className="block px-4 py-2 text-sm text-slate-500 cursor-not-allowed">
                  03. Loan Approval
                </span>
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