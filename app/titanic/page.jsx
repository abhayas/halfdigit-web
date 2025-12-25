'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Activity, Terminal, AlertCircle, CheckCircle, Database } from 'lucide-react';

export default function TitanicModule() {
  // 1. Exact state matching your API requirements
  const [formData, setFormData] = useState({
    pclass: '3',
    age: '22',
    sibsp: '0',
    parch: '0',
    adult_male: true, // Maps to 1 or 0
    alone: true,      // Maps to 1 or 0
    sex: 'male'       // Used to generate the 'male' field (1 or 0)
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Submit to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();

    // 2. Strict Payload Construction (Matches Titanic_demo.html)
    const payload = {
      pclass: parseInt(formData.pclass),
      age: parseFloat(formData.age),
      sibsp: parseInt(formData.sibsp),
      parch: parseInt(formData.parch),
      adult_male: formData.adult_male ? 1 : 0, // Convert Boolean to 1/0
      alone: formData.alone ? 1 : 0,           // Convert Boolean to 1/0
      male: formData.sex === 'male' ? 1 : 0    // Derive 'male' field from sex
    };

    try {
      const response = await fetch('https://halfdigit-api.onrender.com/predict-titanic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const latency = Date.now() - startTime;

      setResult(data);
      
      // Add to "Console Logs"
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        status: response.status,
        latency: `${latency}ms`,
        prediction: data.survived ? 'SURVIVED' : 'DID NOT SURVIVE'
      };
      setLogs(prev => [newLog, ...prev]);

    } catch (error) {
      console.error('Inference Error:', error);
      alert('API Connection Failed. Please check if the backend is waking up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-md transition-colors text-slate-500">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity size={18} className="text-blue-600" />
                Module 01: Titanic Survival Engine
              </h1>
              <p className="text-xs text-slate-500 font-mono">Status: Active | Endpoint: /predict-titanic</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded text-slate-600 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            API CONNECTION: SECURE
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* DESCRIPTION CARD: Layman-friendly explanation */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">About this demo</h2>
            <p className="text-sm text-slate-600 mb-3">
              This interactive demo shows a machine learning model that predicts whether a passenger on the
              RMS Titanic would have survived based on a few simple details. It is an educational tool — not a
              perfect prediction — that helps illustrate how models use features like age, sex, and travel class
              to estimate outcomes.
            </p>

            <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
              <li><strong>Inputs:</strong> Passenger class (1 = highest, 3 = lowest), age, sex, family count, and simple flags.</li>
              <li><strong>Output:</strong> A prediction ("Passenger Survived" or "Did Not Survive") plus a probability showing the model's confidence.</li>
              <li><strong>How it works:</strong> Your inputs are sent to a backend model which returns the prediction in real time. Change the input paraments in the below form and and click on "Run Inference Engine" to see the prediction</li>
            </ul>
          </div>
        </div>

        {/*  LEFT PANEL: CONFIGURATION */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
              <Database size={16} /> Input Parameters
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Group: Primary Features */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Passenger Class</label>
                  <select name="pclass" value={formData.pclass} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5">
                    <option value="1">1st Class (Upper)</option>
                    <option value="2">2nd Class (Middle)</option>
                    <option value="3">3rd Class (Lower)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Age</label>
                  <input type="number" name="age" step="0.5" value={formData.age} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Sex</label>
                  <select name="sex" value={formData.sex} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Group: Family & Flags */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Siblings / Spouses</label>
                  <input type="number" name="sibsp" value={formData.sibsp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Parents / Children</label>
                  <input type="number" name="parch" value={formData.parch} onChange={handleChange} className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5" />
                </div>
                
                {/* Checkboxes matching HTML flags */}
                <div className="pt-2 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="adult_male" checked={formData.adult_male} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <span className="text-sm text-slate-700">Adult Male Flag</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="alone" checked={formData.alone} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                    <span className="text-sm text-slate-700">Traveling Alone Flag</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 pt-4 border-t border-slate-100 flex items-center justify-between">
                 <div className="text-xs text-slate-400 max-w-[200px]">
                    Note: First request may incur ~30s latency due to server cold-start.
                 </div>
                 <button 
                  type="submit" 
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium text-white transition-all
                    ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <><Play size={16} fill="currentColor" /> Run Inference Engine</>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* RIGHT PANEL: OUTPUT CONSOLE (UNCHANGED from previous, but functional now) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
               <span className="text-xs font-mono text-slate-300 flex items-center gap-2">
                 <Terminal size={14} /> SYSTEM OUTPUT
               </span>
               {result && (
                 <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                   JSON Received
                 </span>
               )}
            </div>
            
            <div className="p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
              {!result && !loading && (
                 <div className="text-slate-500">
                    <Activity size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-mono">Ready to process data...</p>
                 </div>
              )}

              {loading && (
                 <div className="text-blue-400 animate-pulse">
                    <div className="h-2 w-24 bg-blue-500/50 rounded mx-auto mb-2"></div>
                    <p className="text-xs font-mono">Calculating probabilities...</p>
                 </div>
              )}

              {result && (
                <div className="w-full animate-in fade-in zoom-in duration-300">
                   <div className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${result.survived ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {result.survived ? <CheckCircle size={48} /> : <AlertCircle size={48} />}
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-1">
                     {result.survived ? 'PASSENGER SURVIVED' : 'DID NOT SURVIVE'}
                   </h3>
                   <div className="flex justify-center gap-4 mt-4">
                     <div className="bg-slate-800 px-4 py-2 rounded border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase">Probability</div>
                        <div className="text-xl font-mono font-bold text-blue-400">
                          {Math.round(result.probability * 100)}%
                        </div>
                     </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 h-[300px] overflow-y-auto font-mono text-xs">
             <div className="text-slate-400 mb-2 border-b border-slate-100 pb-2">
               &gt; Transaction Log
             </div>
             {logs.length === 0 && <span className="text-slate-300">No requests logged in this session.</span>}
             {logs.map((log) => (
               <div key={log.id} className="mb-2 flex gap-3 text-slate-600 border-b border-slate-50 pb-1 last:border-0">
                 <span className="text-slate-400">[{log.time}]</span>
                 <span className={log.status === 200 ? 'text-green-600' : 'text-red-600'}>
                   {log.status} OK
                 </span>
                 <span className="text-slate-500">Lat: {log.latency}</span>
                 <span className="font-bold text-slate-700 ml-auto">{log.prediction}</span>
               </div>
             ))}
          </div>

        </div>
      </main>
    </div>
  );
}