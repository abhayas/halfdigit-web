"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
// 1. Added User and LogOut icons
import { ChevronDown, BrainCircuit, FileText, Menu, X, User, LogOut } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';
// 2. Imported NextAuth hooks
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 3. Initialize NextAuth Session
  const { data: session, status } = useSession();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // --- TRACKING HELPERS ---
  const handleResumeClick = (source) => {
    sendGAEvent({ event: 'resume_download', value: source });
  };

  const openChatBot = (source) => {
    sendGAEvent({ event: 'chatbot_opened', value: source });
    window.dispatchEvent(new Event('openChatBot'));
    setMobileMenuOpen(false);
  };

  const linkClass = (path) =>
    `transition-colors text-sm font-medium ${
      pathname === path ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="text-lg font-bold text-slate-900 flex items-center gap-2.5 hover:opacity-90 transition-opacity group">
          <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-blue-50 border border-blue-100 group-hover:border-blue-300 transition-colors shadow-sm">
            <BrainCircuit size={20} className="text-blue-600" />
          </div>
          <span className="tracking-tight group-hover:text-blue-700 transition-colors">HalfDigit</span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {/* Desktop Dropdown */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              className={`flex items-center gap-1.5 ${linkClass("/projects")}`}
            >
              My Projects <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-white border border-slate-200 rounded-lg shadow-xl py-2 min-w-[14rem] z-50 overflow-hidden ring-1 ring-slate-900/5">
                <div className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Live Modules
                </div>
                <Link href="/titanic" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                  01. Titanic Survival
                </Link>
                <Link href="/speech-to-text" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                  02. Audio Extraction
                </Link>
                <button 
                  onClick={() => openChatBot('desktop_dropdown')} 
                  className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  03. Portfolio AI Assistant
                </button>
              </div>
            )}
          </div>

          <a 
            href="/Abhay_Sahu_Accenture_AI_ML_Engineer.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleResumeClick('navbar_desktop')}
            className="transition-colors text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5"
          >
            Resume <FileText size={14} className="opacity-70" /> 
          </a>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>

          {/* --- NEW: DESKTOP AUTH SECTION --- */}
          <div className="pl-4 border-l border-slate-200 flex items-center">
            {status === 'loading' ? (
              <div className="w-20 h-8 bg-slate-100 animate-pulse rounded-lg"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-200">
                  <User size={14} className="text-blue-600" />
                  {/* Shows just the first name to save space */}
                  <span>{session.user?.name?.split(' ')[0]}</span> 
                  {session.user?.role === 'admin' && (
                    <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Admin</span>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 shadow-lg">
          <Link href="/" className={`block ${linkClass("/")}`}>
            Home
          </Link>
          
          <div className="space-y-2 pl-2 border-l-2 border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projects</span>
            <Link href="/titanic" className="block text-sm text-slate-600 hover:text-blue-600">
              Titanic Survival
            </Link>
            <Link href="/speech-to-text" className="block text-sm text-slate-600 hover:text-blue-600">
              Audio Extraction
            </Link>
            <button 
              onClick={() => openChatBot('mobile_menu')} 
              className="block text-sm text-slate-600 hover:text-blue-600 text-left w-full"
            >
              AI Assistant
            </button>
          </div>

          <a 
            href="/Abhay_Sahu_Accenture_AI_ML_Engineer.pdf" 
            target="_blank"
            onClick={() => handleResumeClick('navbar_mobile')} 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <FileText size={16} /> Resume
          </a>

          <Link href="/contact" className={`block ${linkClass("/contact")}`}>
            Contact
          </Link>

          {/* --- NEW: MOBILE AUTH SECTION --- */}
          <div className="pt-4 mt-2 border-t border-slate-100">
            {status === 'loading' ? (
              <div className="w-full h-10 bg-slate-100 animate-pulse rounded-lg"></div>
            ) : session ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User size={16} className="text-blue-600" />
                  {session.user?.name}
                  {session.user?.role === 'admin' && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>
                  )}
                </div>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="flex items-center gap-1.5 text-sm font-medium text-red-600"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="block w-full text-center bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}