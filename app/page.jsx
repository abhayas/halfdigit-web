'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layout, Server, Terminal, Activity, ShieldCheck, Database, Github, Linkedin, Mail } from 'lucide-react';

// --- Components ---

const TechBadge = ({ label }) => (
  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
    {label}
  </span>
);

const ProjectModule = ({ title, stack, isLive, description, link, specsLink }) => (
  <div className="group relative bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={16} className="text-slate-400" />
          <h3 className="font-semibold text-slate-800 text-lg">{title}</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
      {isLive ? (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">
          ● LIVE
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
          ◌ BUILDING
        </span>
      )}
    </div>

    <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
      {description}
    </p>

    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
      {/* Primary Action: Initialize / Live Demo */}
      {link ? (
        <Link
          href={link}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-md hover:bg-slate-800 transition-colors shadow-sm"
        >
          Initialize Module <ArrowRight size={14} />
        </Link>
      ) : (
        <button disabled className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-md cursor-not-allowed border border-slate-200">
          Coming Soon...
        </button>
      )}

      {/* Secondary Action: View Specs (Notebook) */}
      {specsLink ? (
        <a
          href={specsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-500 px-4 py-2 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          View Specs <span className="opacity-50 text-xs">↗</span>
        </a>
      ) : (
        <button disabled className="text-sm font-medium text-slate-300 px-4 py-2 cursor-not-allowed">
          No Specs
        </button>
      )}
    </div>
  </div>
);

// --- Main Page Component ---

export default function Home() {

  // Visit Logger Logic
  useEffect(() => {
    const logVisit = async () => {
      try {
        const visitorType = localStorage.getItem("visitor_type") === "owner" ? "owner" : "visitor";
        await fetch("https://halfdigit-api.onrender.com/log-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_path: visitorType + window.location.pathname,
            referrer: document.referrer,
            user_agent: navigator.userAgent
          })
        });
      } catch (err) {
        // fail silently
      }
    };
    logVisit();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">

      {/* 1. HERO SECTION: Full-Stack AI Banner */}
      <section className="relative pt-24 pb-24 px-6 border-b border-slate-900 overflow-hidden bg-slate-950">

        {/* --- BACKGROUND BANNER LAYER --- */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 opacity-[0.1]"
            style={{ backgroundImage: 'linear-gradient(#ffffff33 1px, transparent 1px), linear-gradient(to right, #ffffff33 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
        </div>
        <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply animate-pulse"></div>
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply animate-pulse"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>


        {/* --- FOREGROUND CONTENT LAYER --- */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-slate-800/80 text-blue-300 text-[11px] font-bold tracking-wide uppercase rounded-full border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-900/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Full-Stack Systems: Online
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
            End-to-End <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
              AI Engineering.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            Bridging the gap between model training and user experience. Specializing in <strong className="text-white font-semibold">Next.js, Python, and MLOps</strong> to deliver seamless, real-time machine learning applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#modules" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/40">
              <Terminal size={18} /> Explore Live Demos
            </a>
            <a href="https://github.com/abhayas/DataScience" target="_blank" className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800/50 text-slate-200 border border-slate-700 backdrop-blur-md text-sm font-bold rounded-lg hover:bg-slate-700/50 transition-all">
              <Activity size={18} /> View Technical Specs
            </a>
          </div>

          {/* --- ARCHITECTURE DIAGRAM & EXPLANATION --- */}
          <div className="bg-slate-900/40 rounded-xl border border-slate-800/60 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto shadow-2xl">

            {/* Top Bar: The Visual Flow */}
            <div className="bg-slate-900/80 p-4 border-b border-slate-800 font-mono text-xs text-slate-400 flex flex-wrap justify-center items-center gap-4">
              <span className="text-green-400 font-bold">~/halfdigit-stack</span>
              <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-blue-300"><Layout size={14} /> Client</span>
                <span className="text-slate-600">→</span>
                <span className="flex items-center gap-1.5 text-indigo-300"><Server size={14} /> Model API</span>
                <span className="text-slate-600">→</span>
                <span className="flex items-center gap-1.5 text-cyan-300"><Database size={14} /> Data Store</span>
              </div>
            </div>

            {/* Bottom Grid: The Technical Explanation */}
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/50 text-left">

              {/* Col 1: Client (Frontend) */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">Frontend Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Next.js Edge Runtime</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  Responsive React UI hosted on Vercel. Captures user inputs and forwards formatted JSON payloads to the Flask API via secure TLS.
                </p>
                <a href="https://github.com/abhayas/halfdigit-web" target="_blank" className="inline-flex items-center gap-2 text-xs font-mono text-blue-300 hover:text-blue-200 transition-colors border-t border-slate-800 pt-3 mt-auto">
                  <Github size={12} />
                  <span>/halfdigit-web</span>
                  <ArrowRight size={10} className="-ml-1" />
                </a>
              </div>

              {/* Col 2: API (Backend) */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-2">Inference Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Python Flask API</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  Serverless microservice on Render. Orchestrates ML inference, saves contact data to Neon, and dispatches email notifications via Resend.
                </p>
                <a href="https://github.com/abhayas/halfdigit-api" target="_blank" className="inline-flex items-center gap-2 text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-colors border-t border-slate-800 pt-3 mt-auto">
                  <Github size={12} />
                  <span>/halfdigit-api</span>
                  <ArrowRight size={10} className="-ml-1" />
                </a>
              </div>

              {/* Col 3: Data (No Repo) */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-2">Persistence Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Neon Serverless DB</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  PostgreSQL database storing contact submissions, audit logs, prediction history, and analytics telemetry for system monitoring.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 border-t border-slate-800 pt-3 mt-auto cursor-default">
                  <Database size={12} />
                  <span>Managed Service</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. DEPLOYED MODULES SECTION */}
      <section id="modules" className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Activity size={24} className="text-blue-600" />
                Deployed System Modules
              </h2>
              <p className="text-slate-500 text-sm mt-2">Live production environments demonstrating end-to-end ML capabilities.</p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden md:block bg-white px-3 py-1 rounded border border-slate-200">
              api.halfdigit.com/v1/status: <span className="text-green-600 font-bold">OK</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Module 1: Titanic (Live) */}
            <ProjectModule
              title="01: Passenger Survival Engine"
              stack={['Scikit-learn', 'Flask', 'REST API']}
              isLive={true}
              link="/titanic"
              specsLink="https://github.com/abhayas/DataScience/blob/main/Titanic/Titanic.ipynb"
              description="Production-grade classification system. Features serverless cold-start handling, request logging, and real-time probability inference."
            />

            {/* Module 2: Loan Approval (Coming Soon) */}
            <ProjectModule
              title="02: Deep Learning Risk Assessor"
              stack={['TensorFlow/Keras', 'Python', 'Microservice']}
              isLive={false}
              specsLink="https://github.com/abhayas/DataScience/blob/main/DeepLearning/Loan_Eligibility.ipynb"
              description="Neural Network for financial risk assessment. Currently optimizing model weights for containerized deployment on Render free tier."
            />

            {/* Module 3: RAG (Planned) */}
            <ProjectModule
              title="03: Enterprise Doc Chat (RAG)"
              stack={['OpenAI', 'Vector DB', 'LangChain']}
              isLive={false}
              description="Retrieval-Augmented Generation system allowing secure Q&A against uploaded PDF documentation. Simulating enterprise search."
            />

            {/* Mini Bio / Background */}
            <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-center text-slate-300">
              <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                <Terminal size={16} className="text-blue-400" /> Technical Background
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                17+ Years in IT. Transformed from SharePoint/Power Platform Expert to Data Science, AI Engineering Specialist.
                Microsoft Certified in Azure AI, Power BI, and Power Platform and github copilot
              </p>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-1 bg-slate-800 border border-blue-800 rounded  text-slate-300">AI/ ML</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Data Science</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-blue-300">Azure AI</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Power BI</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">MLOps</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Flask</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Python</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Scikit-learn</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">TensorFlow</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Keras</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">PostgreSQL</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Neon DB</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Flask API</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">REST API</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Vercel</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Render</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">SPFX</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Power Automate</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Power Apps</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">SharePoint (10y+)</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">React/Next.js</span>

              </div>
            </div>

          </div>
        </div>
      </section>
     
    </main>
  );
}