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

  // Updated link styles for Light Theme
  const linkClass = (path) =>
    `transition-colors text-sm font-medium ${
      pathname === path ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand with "Neural Architect" Logo - Light Theme */}
        <Link href="/" className="text-lg font-bold text-slate-900 flex items-center gap-2.5 hover:opacity-90 transition-opacity group">
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-blue-50 border border-blue-100 group-hover:border-blue-300 transition-colors shadow-sm">
            {/* The Logo Icon */}
            <BrainCircuit size={20} className="text-blue-600" />
          </div>
          <span className="tracking-tight group-hover:text-blue-700 transition-colors">HalfDigit</span>
        </Link>

        {/* Links */}
        <div className="flex gap-6 items-center">
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
              My Projects <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            {open && (
              <div
                id="projects-menu"
                role="menu"
                className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-white border border-slate-200 rounded-lg shadow-xl py-2 min-w-[14rem] z-50 overflow-hidden ring-1 ring-slate-900/5"
              >
                <div className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Live Modules
                </div>
                
                {/* 01. Titanic */}
                <Link
                  href="/titanic"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === "/titanic" ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  01. Titanic Survival
                </Link>

                {/* 02. Speech-to-Text (NEW) */}
                <Link
                  href="/speech-to-text"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === "/speech-to-text" ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  02. Audio Extraction
                </Link>

                <div className="my-1 border-t border-slate-100"></div>
                
                <div className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  In Development
                </div>

                <span className="block px-4 py-2 text-sm text-slate-400 cursor-not-allowed italic">
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