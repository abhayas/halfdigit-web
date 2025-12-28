'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mic, 
  UploadCloud, 
  FileAudio, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Activity,
  Copy
} from 'lucide-react';

export default function SpeechToTextPage() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Logic Section (Same as before) ---

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    setTranscript('');
    
    if (!selectedFile) return;

    const validTypes = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3'];
    const isWavOrMp3 = validTypes.includes(selectedFile.type) || 
                       /\.(wav|mp3)$/i.test(selectedFile.name);

    if (!isWavOrMp3) {
      setError('Invalid file format. Please upload a .wav or .mp3 file.');
      return;
    }

    // 5MB Limit Check
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File is too large. Please use a file smaller than 5MB (approx 5 mins).');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setTranscript('');
    setCopied(false);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('https://halfdigit-api.onrender.com/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to transcribe audio.');
      }

      setTranscript(data.transcript);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- UI Section (Matches Titanic Layout) ---

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
                <Mic size={18} className="text-blue-600" />
                Module 02: Audio Extraction Pipeline
              </h1>
              <p className="text-xs text-slate-500 font-mono">Status: Active | Endpoint: /speech-to-text</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded text-slate-600 border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            API CONNECTION: SECURE
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* DESCRIPTION CARD */}
        <div className="lg:col-span-12">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">About this demo</h2>
            <p className="text-sm text-slate-600 mb-3">
              This module demonstrates an automated pipeline for converting unstructured audio data into structured text.
              It leverages the <strong>OpenAI Whisper Large-v3</strong> model via Hugging Face Inference API to transcribe speech with high accuracy.
            </p>
            <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
              <li><strong>Inputs:</strong> Raw audio files (.wav or .mp3).</li>
              <li><strong>Output:</strong> Full text transcription.</li>
              <li><strong>Tech Stack:</strong> Next.js Frontend → Python Flask API → Hugging Face Inference Cluster.</li>
            </ul>
          </div>
        </div>

        {/* LEFT PANEL: CONFIGURATION & UPLOAD */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
              <FileAudio size={16} /> Input Source
            </h2>

            {/* System Constraints Box */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
              <p className="font-bold mb-1 flex items-center gap-2">
                <Terminal size={12} /> System Constraints (Free Tier):
              </p>
              <ul className="list-disc pl-4 space-y-1 text-blue-700/80">
                <li>Formats: <strong>.wav, .mp3</strong></li>
                <li>Max Size: <strong>5MB</strong> (Approx. 5 mins).</li>
                <li><em>Note: Larger files are supported by the model but restricted here to prevent server timeouts.</em></li>
              </ul>
              <div className="mt-2 pt-2 border-t border-blue-200/50">
                <a href="https://www.kaggle.com/datasets/mozillaorg/common-voice" target="_blank" className="underline hover:text-blue-900 font-medium flex items-center gap-1">
                  Get sample files form Kaggle ↗
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Drag & Drop Area */}
              <div 
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer group
                  ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}
                  ${file ? 'bg-green-50/50 border-green-300' : ''}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept=".wav,.mp3" 
                  onChange={handleFileChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  {file ? (
                    <>
                      <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-sm">
                        <FileAudio size={20} />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <div className="h-10 w-10 bg-slate-100 text-slate-400 group-hover:text-slate-500 rounded-full flex items-center justify-center mb-2 transition-colors">
                        <UploadCloud size={20} />
                      </div>
                      <p className="text-sm font-medium text-slate-700">Click or Drag audio here</p>
                    </>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={!file || loading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium text-white transition-all
                    ${!file || loading 
                      ? 'bg-slate-300 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Mic size={16} /> Start Transcription
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL: OUTPUT CONSOLE */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-700 h-full min-h-[400px] flex flex-col">
            
            {/* Console Header */}
            <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
               <span className="text-xs font-mono text-slate-300 flex items-center gap-2">
                 <Terminal size={14} /> TRANSCRIPTION OUTPUT
               </span>
               {transcript && (
                 <button 
                   onClick={copyToClipboard}
                   className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors flex items-center gap-1"
                 >
                   {copied ? <CheckCircle2 size={10} className="text-green-400" /> : <Copy size={10} />}
                   {copied ? 'COPIED' : 'COPY TEXT'}
                 </button>
               )}
            </div>
            
            {/* Console Body */}
            <div className="p-6 flex-grow flex flex-col relative bg-slate-900">
              
              {/* Idle State */}
              {!transcript && !loading && (
                 <div className="flex-grow flex flex-col items-center justify-center text-slate-600">
                    <Activity size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-mono">Waiting for input stream...</p>
                 </div>
              )}

              {/* Loading State */}
              {loading && (
                 <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="relative w-16 h-16 mb-4">
                      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-blue-400 text-xs font-mono animate-pulse">
                       Ingesting audio & generating tokens...
                    </p>
                 </div>
              )}

              {/* Result State */}
              {transcript && !loading && (
                <div className="w-full h-full overflow-y-auto custom-scrollbar">
                   <div className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      <span className="text-green-500 mr-2">➜</span>
                      {transcript}
                   </div>
                   <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500 font-mono">
                      [End of stream]
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}