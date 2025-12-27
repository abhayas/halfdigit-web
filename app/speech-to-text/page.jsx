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
  Terminal 
} from 'lucide-react';

export default function SpeechToTextPage() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // Drag and Drop handlers
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

    // 1. Check File Type (Allow WAV and MP3)
    // Note: MP3 mime type is usually 'audio/mpeg'
    const validTypes = ['audio/wav', 'audio/x-wav', 'audio/mpeg', 'audio/mp3'];
    // Also check extension as fallback
    const isWavOrMp3 = validTypes.includes(selectedFile.type) || 
                       /\.(wav|mp3)$/i.test(selectedFile.name);

    if (!isWavOrMp3) {
      setError('Invalid file format. Please upload a .wav or .mp3 file.');
      return;
    }

    // 2. Check File Size (Updated to 25MB based on your successful 14.5MB test)
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError('File is too large. Please use a file smaller than 25MB for this demo.');
      return;
    }

    setFile(selectedFile);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setTranscript('');

    const formData = new FormData();
    formData.append('audio', file);

    try {
      // Note: We increased the timeout on the backend to 300s to handle these larger files.
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

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-slate-900 pt-24 pb-12 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors text-sm font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to System Status
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">
              <Mic size={32} className="text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Audio Extraction Pipeline</h1>
          </div>
          
          <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
            Ingests raw audio files (WAV/MP3) and generates structured text transcripts using the <strong className="text-blue-300">OpenAI Whisper v3</strong> model via Hugging Face Inference API.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          
          <div className="p-8 md:p-10">
            
            {/* INSTRUCTIONS */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex gap-3 items-start">
              <Terminal size={18} className="mt-0.5 flex-shrink-0 text-blue-600" />
              <div>
                <p className="font-semibold mb-1">System Capabilities (Free Tier):</p>
                <ul className="list-disc pl-4 space-y-1 text-blue-700/80">
                  <li>Supported Formats: <strong>.wav</strong> and <strong>.mp3</strong></li>
                  <li>Max File Size: <strong>25MB</strong> (Supports approx. 10-15 minutes of audio).</li>
                  <li>Processing Time: Large files may take up to 2-3 minutes.</li>
                  <li className="mt-2">
                    Need a test file? <a href="https://www.kaggle.com/datasets/pavanelisetty/sample-audio-files-for-speech-recognition" target="_blank" className="underline hover:text-blue-900 font-medium">Download sample audio files from Kaggle.</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* UPLOAD AREA */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div 
                className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 cursor-pointer
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
                      <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <FileAudio size={32} />
                      </div>
                      <p className="text-lg font-semibold text-slate-800">{file.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to Upload</p>
                    </>
                  ) : (
                    <>
                      <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                        <UploadCloud size={32} />
                      </div>
                      <p className="text-lg font-medium text-slate-700">Drag & Drop audio file here</p>
                      <p className="text-sm text-slate-400 mt-2">Supports .wav and .mp3</p>
                    </>
                  )}
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={20} />
                  {error}
                </div>
              )}

              {/* ACTION BUTTON */}
              <button
                type="submit"
                disabled={!file || loading}
                className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3
                  ${!file || loading 
                    ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-500' 
                    : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.99]'}
                `}
              >
                {loading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    Initializing Whisper Model...
                  </>
                ) : (
                  <>
                    <Mic size={24} />
                    Start Transcription
                  </>
                )}
              </button>

            </form>
          </div>

          {/* RESULTS AREA */}
          {(transcript || loading) && (
             <div className="border-t border-slate-200 bg-slate-50/50 p-8 md:p-10">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                 {loading ? 'Processing Stream' : 'Output Transcript'}
                 {!loading && <CheckCircle2 size={16} className="text-green-500" />}
               </h3>
               
               <div className={`rounded-lg border p-6 min-h-[150px] font-mono text-sm leading-relaxed transition-all
                  ${loading ? 'bg-white border-slate-200 text-slate-400 animate-pulse' : 'bg-white border-slate-300 text-slate-800 shadow-sm'}
               `}>
                 {loading ? (
                   <div className="space-y-3">
                     <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                     <div className="h-2 bg-slate-100 rounded w-full"></div>
                     <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                   </div>
                 ) : (
                   transcript
                 )}
               </div>

               {!loading && transcript && (
                 <div className="mt-4 flex justify-end">
                   <button 
                     onClick={() => navigator.clipboard.writeText(transcript)}
                     className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                   >
                     Copy to Clipboard
                   </button>
                 </div>
               )}
             </div>
          )}

        </div>
      </div>
    </main>
  );
}