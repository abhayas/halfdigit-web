"use client";

import Link from "next/link";
// 1. Removed Vercel 'track' import since you are on the free plan
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, BrainCircuit, FileText, Menu, X } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // 2. Updated Helper for Resume (Standardized)
  const handleResumeClick = (source) => {
    sendGAEvent({ event: 'resume_download', value: source });
  };

  // 3. Updated Helper for ChatBot (Now tracks clicks!)
  const openChatBot = (source) => {
    // Track the click before opening
    sendGAEvent({ event: 'chatbot_opened', value: source });
    
    // Original logic
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
                
                {/* Updated ChatBot Link (Desktop) */}
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
            href="/Abhay_Sahu_Accenture_AI_Engineer.pdf" 
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
            
            {/* Updated ChatBot Link (Mobile) */}
            <button 
              onClick={() => openChatBot('mobile_menu')} 
              className="block text-sm text-slate-600 hover:text-blue-600 text-left w-full"
            >
              AI Assistant
            </button>
          </div>

          {/* Fixed Mobile Resume Link (Switched from Vercel to Google) */}
          <a 
            href="/Abhay_Sahu_Accenture_AI_Engineer.pdf" 
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
        </div>
      )}
    </nav>
  );
}