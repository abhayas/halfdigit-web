import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 bg-white border-t border-slate-200 text-center">
      <div className="flex justify-center gap-8 mb-4">
        <a href="https://github.com/abhayas" target="_blank" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium">
          <Github size={14} /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/abhaya-sahu/" target="_blank" className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 text-xs font-medium">
          <Linkedin size={14} /> LinkedIn
        </a>
        <a href="mailto:abhayas@zohomail.in" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium">
          <Mail size={14} /> Email
        </a>
        <Link href="/contact" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium">
          <Send size={14} /> Contact Form
        </Link>
      </div>
      <p className="text-slate-400 text-[10px]">© 2025 Abhay Prasad Sahu. Built with Next.js, Tailwind, and Python.</p>
    </footer>
  );
}