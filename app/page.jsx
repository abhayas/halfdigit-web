'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layout, Server, Terminal, Activity, Database, Github, User } from 'lucide-react';

// --- Components ---

const TechBadge = ({ label }) => (
  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
    {label}
  </span>
);

const ProjectModule = ({ title, stack, isLive, description, link, specs }) => (
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

    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 flex-wrap">
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

      {/* Secondary Action: View Specs (Dynamic List) */}
      {specs && specs.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {specs.map((spec, idx) => (
            <a
              key={idx}
              href={spec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-500 px-2 py-2 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              {spec.label} <span className="opacity-50">↗</span>
            </a>
          ))}
        </div>
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
      <section className="relative pt-20 pb-24 px-6 border-b border-slate-900 overflow-hidden bg-slate-950">

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
        <div className="relative z-10 max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            
            {/* LEFT COL: Intro Text (Left Aligned) */}
            <div className="text-left">
              
              <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <h2 className="text-xl md:text-2xl font-medium text-slate-400 flex items-center gap-3">
                  Hi, I&apos;m <span className="text-white font-bold">Abhaya Prasad Sahu</span> <span className="animate-bounce inline-block">👋</span>
                </h2>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
                End-to-End <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                  AI Engineering.
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl font-light">
                I bridge the gap between complex model training and seamless user experience. Specializing in <strong className="text-white font-semibold">Data Science, Python, and MLOps</strong> to deliver real-time machine learning applications.
              </p>
            </div>

            {/* RIGHT COL: Personal Bio Card + Actions */}
            <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <User size={120} className="text-white" />
              </div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                  <User size={20} className="text-blue-400" /> About Abhaya
                </h3>
                
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  With over <strong className="text-white">17+ years in IT</strong>, I have transformed from a SharePoint & Power Platform Expert into a specialized Data Science & AI Engineer. I hold Microsoft Certifications in Azure AI, Power BI, and Power Platform.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Competencies</h4>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 bg-blue-900/30 border border-blue-500/30 rounded text-blue-200">AI / ML Engineering</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Data Science</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Azure AI</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Python</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">TensorFlow/Keras</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Flask API</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">PostgreSQL</span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300">Next.js</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS (Moved Here) */}
              <div className="relative z-10 pt-6 border-t border-slate-800 flex flex-wrap gap-3">
                <a href="#modules" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/40">
                  <Terminal size={14} /> Explore Live Demos
                </a>
                <a href="https://github.com/abhayas/DataScience" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold rounded-lg hover:bg-slate-700 transition-all">
                  <Activity size={14} /> View Technical Specs
                </a>
              </div>
            </div>

          </div>

          {/* --- ARCHITECTURE DIAGRAM (Full Width Bottom) --- */}
          <div className="bg-slate-900/40 rounded-xl border border-slate-800/60 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Top Bar */}
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

            {/* Bottom Grid */}
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/50 text-left">
              {/* Col 1 */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-2">Frontend Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Next.js Edge Runtime</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  Responsive React UI hosted on Vercel. Captures user inputs and forwards formatted JSON payloads to the Flask API via secure TLS.
                </p>
                <a href="https://github.com/abhayas/halfdigit-web" target="_blank" className="inline-flex items-center gap-2 text-xs font-mono text-blue-300 hover:text-blue-200 transition-colors border-t border-slate-800 pt-3 mt-auto">
                  <Github size={12} /> <span>/halfdigit-web</span> <ArrowRight size={10} className="-ml-1" />
                </a>
              </div>
              {/* Col 2 */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-2">Inference Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Python Flask API</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  Serverless microservice on Render. Orchestrates ML inference, saves contact data to Neon, and dispatches email notifications via Resend.
                </p>
                <a href="https://github.com/abhayas/halfdigit-api" target="_blank" className="inline-flex items-center gap-2 text-xs font-mono text-indigo-300 hover:text-indigo-200 transition-colors border-t border-slate-800 pt-3 mt-auto">
                  <Github size={12} /> <span>/halfdigit-api</span> <ArrowRight size={10} className="-ml-1" />
                </a>
              </div>
              {/* Col 3 */}
              <div className="p-6 hover:bg-slate-800/30 transition-colors flex flex-col h-full">
                <div className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mb-2">Persistence Layer</div>
                <h4 className="text-white text-sm font-semibold mb-1">Neon Serverless DB</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                  PostgreSQL database storing contact submissions, audit logs, prediction history, and analytics telemetry.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 border-t border-slate-800 pt-3 mt-auto cursor-default">
                  <Database size={12} /> <span>Managed Service</span>
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
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Module 1: Titanic (Live) */}
            <ProjectModule
              title="01: Passenger Survival Engine"
              stack={['Scikit-learn', 'Flask', 'REST API']}
              isLive={true}
              link="/titanic"
              specs={[
                { label: 'Notebook Specs', url: 'https://github.com/abhayas/DataScience/blob/main/Titanic/Titanic.ipynb' }
              ]}
              description="Production-grade classification system. Features serverless cold-start handling, request logging, and real-time probability inference."
            />

            {/* Module 2: Speech-to-Text (New & Live) */}
            <ProjectModule
              title="02: Audio Extraction Pipeline"
              stack={['OpenAI Whisper', 'Hugging Face', 'Flask']}
              isLive={true}
              link="/speech-to-text"
              specs={[
                { label: 'Frontend Code', url: 'https://github.com/abhayas/halfdigit-web/blob/main/app/speech-to-text/page.jsx' },
                { label: 'Backend API', url: 'https://github.com/abhayas/halfdigit-api/blob/main/app.py' }
              ]}
              description="Automated speech-to-text transcription pipeline using the Whisper Large-v3 model via Hugging Face Inference API. Handles WAV/MP3 audio ingestion."
            />

            {/* Module 3: Loan Approval (Building) */}
            <ProjectModule
              title="03: Deep Learning Risk Assessor"
              stack={['TensorFlow/Keras', 'Python', 'Microservice']}
              isLive={false}
              specs={[
                { label: 'Model Specs', url: 'https://github.com/abhayas/DataScience/blob/main/DeepLearning/Loan_Eligibility.ipynb' }
              ]}
              description="Neural Network for financial risk assessment. Currently optimizing model weights for containerized deployment on Render free tier."
            />

            {/* Module 4: RAG (Planned) */}
            <ProjectModule
              title="04: Enterprise Doc Chat (RAG)"
              stack={['OpenAI', 'Vector DB', 'LangChain']}
              isLive={false}
              description="Retrieval-Augmented Generation system allowing secure Q&A against uploaded PDF documentation. Simulating enterprise search."
            />
            
          </div>
        </div>
      </section>

    </main>
  );
}