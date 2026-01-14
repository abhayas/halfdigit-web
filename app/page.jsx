'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Layout, Server, Terminal, Activity, Database, Github, User } from 'lucide-react';



// --- Components ---

const TechBadge = ({ label }) => (
  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
    {label}
  </span>
);

const ProjectModule = ({ title, stack, isLive, description, link, specs }) => (
  <div className="group relative bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={16} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </div>
      {isLive ? (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          ● LIVE
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
          ◌ BUILDING
        </span>
      )}
    </div>
    <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
      {description}
    </p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 flex-wrap">
      {link ? (
        <Link
          href={link}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg"
        >
          Initialize Module <ArrowRight size={14} />
        </Link>
      ) : (
        <button disabled className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-lg cursor-not-allowed border border-slate-200">
          Coming Soon...
        </button>
      )}

      {specs && specs.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {specs.map((spec, idx) => (
            <a
              key={idx}
              href={spec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-500 px-3 py-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
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
      } catch (err) { }
    };
    logVisit();
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 text-slate-900">
      
      {/* 1. HERO SECTION: Light Theme */}
      <section className="relative pt-6 pb-10 px-6 border-b border-slate-100 overflow-hidden bg-white">
        
        {/* --- LIGHT BACKGROUND GRID --- */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Soft Gradient Blobs (Blue/Indigo) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-[20%] right-[0%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* --- FOREGROUND CONTENT --- */}
        {/* CHANGED: max-w-7xl to max-w-6xl to match the bottom modules section */}
        <div className="relative z-10 max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LEFT COL: Now wrapped in a Card to match the style of the Right Col */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl flex flex-col relative overflow-hidden">
              <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-lg md:text-xl font-medium text-slate-500 flex items-center gap-2">
                  Hi, I&apos;m <span className="text-slate-900 font-bold">Abhaya</span> <span className="animate-bounce inline-block">👋</span>
                </h2>
              </div>

              <h1 className="text-1xl md:text-2xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                End-to-End&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                  AI Engineering.
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl font-light">
                I bridge the gap between complex model training and seamless user experience. Specializing in <strong className="text-slate-900 font-semibold">Data Science, Python, and MLOps</strong> to deliver real-time machine learning applications.
              </p>

              {/* --- ARCHITECTURE STACK (Inside the card now) --- */}
              <div className="mt-auto bg-slate-50/80 rounded-xl border border-slate-100 p-6 shadow-inner">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                  <span className="text-slate-400 font-mono text-xs font-bold uppercase tracking-wider">HalfDigit.com site Architecture</span>
                </div>
                <div className="space-y-4 relative">
                  {/* Connecting Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 -z-10"></div>

                  {/* 1. Frontend */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-blue-600 shadow-sm group-hover:border-blue-200 transition-colors">
                      <Layout size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 text-sm font-bold">Next.js Edge Runtime</span>
                        <a href="https://github.com/abhayas/halfdigit-web" target="_blank" className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-0.5 transition-colors">
                          <Github size={10} /> /halfdigit-web
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-500">Responsive UI hosted on Vercel.</p>
                    </div>
                  </div>

                  {/* 2. Backend */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-indigo-600 shadow-sm group-hover:border-indigo-200 transition-colors">
                      <Server size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 text-sm font-bold">Python Flask API</span>
                        <a href="https://github.com/abhayas/halfdigit-api" target="_blank" className="text-[10px] text-slate-400 hover:text-indigo-600 flex items-center gap-0.5 transition-colors">
                          <Github size={10} /> /halfdigit-api
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-500">Serverless Inference on Render.</p>
                    </div>
                  </div>

                  {/* 3. Database */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-cyan-600 shadow-sm group-hover:border-cyan-200 transition-colors">
                      <Database size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 text-sm font-bold">Neon Postgres DB</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">Managed</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Telemetry & User Data persistence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COL: Personal Bio Card */}
            {/* CHANGED: Removed justify-between to fix whitespace gap */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-500">
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative shrink-0 group">
                    {/* Simplified Glow */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                    <Image
                      src="/abhaya.jpg"
                      alt="Abhaya Prasad Sahu"
                      width={80}
                      height={80}
                      className="relative rounded-full border-2 border-white shadow-md object-cover"
                      priority={true}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xl">About Abhaya</h3>
                    <p className="text-blue-600 text-xs font-bold tracking-wide mt-1 uppercase">Data Science & AI Engineer</p>
                  </div>
                </div>

                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl font-light">
                  With over <strong className="text-slate-900 font-semibold">17+ years in IT</strong>, I have transformed from a SharePoint & Power Platform Expert into a specialized Data Science & AI Engineer. I hold Microsoft Certifications in Azure AI, Power BI, and Power Platform.
                </p>

                <div className="mb-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Core Competencies</h4>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-md font-semibold">AI / ML Engineering</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Data Science</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Azure AI</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Python</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">TensorFlow</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Flask API</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">PostgreSQL</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Next.js</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">React</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">SharePoint</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">SPFx</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Tailwind</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Power BI</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Power apps</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Power Automate</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">HTML</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">CSS</span>
                    <span className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md font-medium">Javascript</span>


                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {/* CHANGED: Removed border-t, removed mt-auto, added mt-8 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8">
                <a href="#modules" className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  <Terminal size={14} /> Explore Live Demos
                </a>
                <a href="https://github.com/abhayas/DataScience" target="_blank" className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-lg transition-all hover:-translate-y-0.5">
                  <Activity size={14} /> View Technical Specs
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEPLOYED MODULES SECTION */}
      <section id="modules" className="py-6 bg-slate-50 border-t border-slate-200">
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
            <ProjectModule
              title="03: Deep Learning Risk Assessor"
              stack={['TensorFlow/Keras', 'Python', 'Microservice']}
              isLive={false}
              specs={[
                { label: 'Model Specs', url: 'https://github.com/abhayas/DataScience/blob/main/DeepLearning/Loan_Eligibility.ipynb' }
              ]}
              description="Neural Network for financial risk assessment. Currently optimizing model weights for containerized deployment on Render free tier."
            />
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