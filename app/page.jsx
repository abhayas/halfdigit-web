import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Activity, ShieldCheck, Database, Github, Linkedin, Mail } from 'lucide-react';
// --- Components ---

const StatusBadge = ({ status, latency }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-mono rounded-full border border-green-200">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    </span>
    {status} {latency && <span className="text-green-800/50">| {latency}</span>}
  </div>
);

const TechBadge = ({ label }) => (
  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
    {label}
  </span>
);

const ProjectModule = ({ title, stack, status, description, link, isLive }) => (
  <div className="group relative bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200">
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
        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
          ● LIVE
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
          ◌ In Progress
        </span>
      )}
    </div>
    
    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
      {description}
    </p>

    <div className="flex items-center gap-3 mt-auto">
      {link ? (
        <Link 
          href={link}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 px-4 py-2 rounded-md hover:bg-slate-800 transition-colors"
        >
          Live Demo <ArrowRight size={14} />
        </Link>
      ) : (
        <button disabled className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-md cursor-not-allowed">
          Coiming Soon...
        </button>
      )}
      <button className="text-sm font-medium text-slate-500 px-4 py-2 hover:text-slate-800 transition-colors">
        View Specs
      </button>
    </div>
  </div>
);

// --- Main Page Component ---

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION: The System Architecture */}
      <section className="pt-15 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase rounded-full border border-blue-100">
            System Architecture: Online
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Bridging Enterprise Rigor with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Modern AI Engineering.
            </span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Full-Stack AI Practitioner with 17 years of experience. Specializing in secure, 
            scalable systems. Currently deploying Deep Learning & LLM solutions via Next.js and Python.
          </p>
          
          <div className="flex justify-center gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-blue-600"/> Enterprise Security</span>
            <span className="flex items-center gap-1"><Activity size={16} className="text-blue-600"/> Real-time Inference</span>
            <span className="flex items-center gap-1"><Database size={16} className="text-blue-600"/> Vector + Relational DB</span>
          </div>
        </div>

        {/* The Live Architecture Diagram (CSS Only) */}
        
      </section>

      {/* 2. DEPLOYED MODULES SECTION */}
      <section className="py-5 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Deployed System Modules</h2>
            <div className="text-sm text-slate-500 font-mono">api.halfdigit.com/v1/status</div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Module 1: Titanic (Live) */}
            <ProjectModule 
              title="01: Passenger Survival Engine"
              stack={['Scikit-learn', 'Flask', 'REST API']}
              isLive={true}
              link="/titanic"
              description="Production-grade classification system. Features serverless cold-start handling, request logging, and real-time probability inference."
            />

            {/* Module 2: Loan Approval (Coming Soon) */}
            <ProjectModule 
              title="02: Deep Learning Risk Assessor"
              stack={['TensorFlow/Keras', 'Python', 'Microservice']}
              isLive={false}
              description="Neural Network for financial risk assessment. Currently optimizing model weights for containerized deployment on Render free tier."
            />
            
            {/* Module 3: RAG (Planned) */}
             <ProjectModule 
              title="03: Enterprise Doc Chat (RAG)"
              stack={['OpenAI', 'Vector DB', 'LangChain']}
              isLive={false}
              description="Retrieval-Augmented Generation system allowing secure Q&A against uploaded PDF documentation. Simulating enterprise search."
            />

          </div>
        </div>
      </section>

      {/* 3. FOOTER */}
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
        </div>
        <p className="text-slate-400 text-[10px]">
          © 2025 Abhay Prasad Sahu. Built with Next.js, Tailwind, and Python.
        </p>
      </footer>
    </main>
  );
}