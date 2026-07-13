import React, { useState, useEffect } from 'react';
import { Upload, ShieldCheck, AlertTriangle, FileText, Loader2, CheckCircle, Terminal, RefreshCw, Layers } from 'lucide-react';

interface ComplianceReport {
  vendorName: string;
  documentType: 'W9' | 'InsuranceCertificate' | 'Unknown';
  extractedDate: string | null;
  hasSignature: boolean;
  coverageAmountUSD?: number | null;
  isValid: boolean;
  issuesFlagged: string[];
}

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!loading) return;
    setLogs([]);
    const simulatedLogs = [
      "⚡ Ingesting raw document binary streams...",
      "🔍 Inspecting MIME configuration paths...",
      "⚙️ Executing local parsing matrix via pure text layout structures...",
      "🧠 Initializing OpenRouter context window models...",
      "🛸 Routing structural layout nodes down the agent execution graph...",
      "📡 Invoking policy compliance verification agents...",
      "📊 Aggregating validation states against compliance targets..."
    ];

    simulatedLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, (index + 1) * 800);
    });
  }, [loading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setReport(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setReport(null);

    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('https://freelance-contractflow-backend.onrender.com/api/verify-document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setReport(data.report);
      } else {
        setError(data.error || 'Pipeline execution failed.');
      }
    } catch (err) {
      setError('Could not connect to the remote AI agent routing stack.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        {/* Header Navigation Area */}
        <header className="mb-12 border-b border-slate-800/60 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-xl shadow-indigo-500/10 ring-1 ring-white/10">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">ContractFlow AI</h1>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">v2026.4</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Autonomous Risk Auditing & Agentic Compliance Matrix</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] block text-slate-500 font-mono">NODE PIPELINE STATE</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">● Active Operational</span>
            </div>
          </div>
        </header>

        {/* Dashboard Panels Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Layout Ingestion Area */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-2xl shadow-black/40">
              <h2 className="text-sm font-semibold text-slate-300 uppercase font-mono tracking-wider mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" /> Document Ingestion Input
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition bg-slate-950/40 group relative overflow-hidden">
                  <Upload className="h-8 w-8 text-slate-500 group-hover:text-indigo-400 mb-3 transition transform group-hover:-translate-y-0.5" />
                  <span className="text-sm text-slate-300 font-medium text-center px-4 truncate max-w-full">
                    {file ? file.name : "Drop vendor audit file here"}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileChange} />
                </label>

                <button
                  type="submit"
                  disabled={!file || loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 border border-indigo-500/20 disabled:border-slate-800/80 text-white disabled:text-slate-500 font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                      <span>Processing Agent Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Execute Audit Report</span>
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-rose-950/20 border border-rose-900/30 rounded-xl text-rose-300 text-xs font-mono leading-relaxed">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* AI Agent Ticker Screen */}
            {loading && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-[11px] text-indigo-400/90 shadow-inner overflow-hidden">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3 text-slate-500">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>AGENT TRACE ENGINE OUTPUT</span>
                </div>
                <div className="space-y-2 max-h-[180px] overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="transition-all duration-300">
                      {log}
                    </div>
                  ))}
                  <div className="animate-pulse inline-block w-2 h-3.5 bg-indigo-500 ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Right Layout Visualized Diagnostics Card */}
          <div className="lg:col-span-7">
            {report ? (
              <div className={`border rounded-2xl p-6 transition-all duration-500 bg-gradient-to-b shadow-2xl shadow-black/40 ${report.isValid ? 'from-emerald-950/10 to-transparent border-emerald-500/20' : 'from-amber-950/10 to-transparent border-amber-500/20'}`}>
                
                {/* Metric Summary Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-800/40 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">AUDIT SUBJECT REGISTERED NAME</span>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-2">{report.vendorName || "Unidentified Entity"}</h3>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium font-mono bg-slate-900 border border-slate-800 text-slate-400">
                      🗂️ {report.documentType === 'InsuranceCertificate' ? 'Certificate of Insurance' : report.documentType}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-lg border uppercase ${report.isValid ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/5' : 'bg-amber-950/30 border-amber-500/30 text-amber-400 shadow-md shadow-amber-500/5'}`}>
                    {report.isValid ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Pass / Compliant</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Action Required</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Audit Grid Data Points */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-900 text-xs font-mono">
                    <span className="text-slate-400">METRIC RECORD TIMESTAMP:</span>
                    <span className="text-slate-200 font-medium">{report.extractedDate || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-900 text-xs font-mono">
                    <span className="text-slate-400">SIGNATURE VALIDATION:</span>
                    <span className={`font-semibold ${report.hasSignature ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {report.hasSignature ? 'VERIFIED' : 'MISSING / EXPIRED'}
                    </span>
                  </div>
                  {report.coverageAmountUSD !== undefined && report.coverageAmountUSD !== null && (
                    <div className="flex items-center justify-between py-2.5 border-b border-slate-900 text-xs font-mono">
                      <span className="text-slate-400">POLICY FINANCIAL COVERAGE:</span>
                      <span className="font-bold text-indigo-400">${report.coverageAmountUSD.toLocaleString()} USD</span>
                    </div>
                  )}

                  {/* Operational Action Item Notices */}
                  {!report.isValid && report.issuesFlagged.length > 0 && (
                    <div className="mt-6 p-4 bg-amber-950/10 border border-amber-500/10 rounded-xl">
                      <h4 className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-3 uppercase tracking-wider">
                        🚨 Invalidation Discrepancy Flag
                      </h4>
                      <ul className="space-y-2 text-xs text-amber-200/80 leading-relaxed font-mono">
                        {report.issuesFlagged.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">▪</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="border border-slate-800/80 border-dashed rounded-2xl p-16 text-center text-slate-500 bg-slate-900/10 font-mono text-xs flex flex-col items-center justify-center gap-4 group">
                <FileText className="h-10 w-10 text-slate-700 group-hover:text-slate-600 transition" />
                <span>Upload a vendor risk document profile to map structured analytics output threads.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}