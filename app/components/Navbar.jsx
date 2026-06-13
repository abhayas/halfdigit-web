"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, BrainCircuit, FileText, Menu, X, User, LogOut } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
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

          {/* --- DESKTOP AUTH SECTION --- */}
          <div className="pl-4 border-l border-slate-200 flex items-center">
            {status === 'loading' ? (
              <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-full"></div>
            ) : session ? (
              <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 pl-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mr-2">
                  <div className="bg-blue-50 p-1 rounded-full text-blue-600">
                    <User size={14} />
                  </div>
                  <span>{session.user?.name?.split(' ')[0]}</span> 
                  {session.user?.role === 'admin' && (
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide shadow-sm">
                      Admin
                    </span>
                  )}
                </div>
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center group"
                  title="Sign Out"
                >
                  <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="group relative inline-flex items-center gap-2 text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg overflow-hidden"
              >
                <User size={14} className="opacity-80 group-hover:opacity-100" /> Sign In
              </Link>
            )}
          </div>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <Link href="/" className={`block ${linkClass("/")}`}>
            Home
          </Link>
          
          <div className="space-y-3 pl-3 border-l-2 border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projects</span>
            <Link href="/titanic" className="block text-sm font-medium text-slate-600 hover:text-blue-600">
              01. Titanic Survival
            </Link>
            <Link href="/speech-to-text" className="block text-sm font-medium text-slate-600 hover:text-blue-600">
              02. Audio Extraction
            </Link>
            <button 
              onClick={() => openChatBot('mobile_menu')} 
              className="block text-sm font-medium text-slate-600 hover:text-blue-600 text-left w-full"
            >
              03. Portfolio AI Assistant
            </button>
          </div>

          <a 
            href="/Abhay_Sahu_Accenture_AI_ML_Engineer.pdf" 
            target="_blank"
            onClick={() => handleResumeClick('navbar_mobile')} 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 pt-2"
          >
            <FileText size={16} /> Download Resume
          </a>

          <Link href="/contact" className={`block pb-2 ${linkClass("/contact")}`}>
            Contact
          </Link>

          {/* --- MOBILE AUTH SECTION --- */}
          <div className="pt-4 border-t border-slate-100">
            {status === 'loading' ? (
              <div className="w-full h-24 bg-slate-100 animate-pulse rounded-xl"></div>
            ) : session ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{session.user?.name}</span>
                    {session.user?.role === 'admin' ? (
                      <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Admin Account</span>
                    ) : (
                      <span className="text-[10px] text-slate-500">User Account</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 py-2.5 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all text-sm font-bold shadow-sm"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex justify-center items-center gap-2 w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors"
              >
                <User size={16} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}