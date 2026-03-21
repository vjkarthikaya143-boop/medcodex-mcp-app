"use client";

import { useState } from "react";
import { Search, CheckCircle2, AlertTriangle, Zap, Bot, ArrowRight, CornerDownRight, XCircle } from "lucide-react";

type AICodeSuggestion = {
  id: string;
  code: string;
  type: "ICD-10" | "CPT";
  description: string;
  confidence: number;
  justification: string;
};

const SUGGESTIONS: AICodeSuggestion[] = [
  {
    id: "1",
    code: "E11.40",
    type: "ICD-10",
    description: "Type 2 diabetes mellitus with diabetic neuropathy, unspecified",
    confidence: 0.98,
    justification: "Documentation states 'Type 2 DM w/ Neuropathy'",
  },
  {
    id: "2",
    code: "G62.9",
    type: "ICD-10",
    description: "Polyneuropathy, unspecified",
    confidence: 0.82,
    justification: "Patient presented with severe neuropathic pain",
  },
  {
    id: "3",
    code: "99213",
    type: "CPT",
    description: "Office or other outpatient visit, established patient",
    confidence: 0.94,
    justification: "Established patient, moderate MDM level",
  }
];

export default function CoderWorkspace() {
  const [activeCodes, setActiveCodes] = useState<AICodeSuggestion[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AICodeSuggestion[]>(SUGGESTIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAccept = (suggestion: AICodeSuggestion) => {
    if (!activeCodes.find(c => c.id === suggestion.id)) {
      setActiveCodes([...activeCodes, suggestion]);
      setAiSuggestions(aiSuggestions.filter(s => s.id !== suggestion.id));
    }
  };

  const handleRemove = (id: string) => {
    const code = activeCodes.find(c => c.id === id);
    if (code) {
      setActiveCodes(activeCodes.filter(c => c.id !== id));
      setAiSuggestions([code, ...aiSuggestions]);
    }
  };

  return (
    <div className="flex h-full w-full relative">
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
      
      {/* Top Action Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-10 shadow-sm">
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
            Target: 25 charts/hr
          </span>
          <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md border border-blue-100 dark:border-blue-500/20 shadow-sm flex items-center gap-2">
            <Zap size={14} className="animate-pulse" /> Current: 28/hr
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">Route for Audit</button>
          <button className="px-5 py-2 text-sm font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition-transform active:scale-95">Complete Encounter</button>
        </div>
      </div>

      <div className="flex flex-1 pt-14 p-4 gap-4 h-full">
        {/* Left Pane: Clinical Document */}
        <div className="flex-1 bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col relative z-0">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1e293b]/50">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Encounter Documentation
            </h2>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex gap-4 font-mono">
              <span>PT: JOHN DOE (42M)</span>
              <span>DOB: 01/01/1982</span>
              <span>DOS: 10/24/2023</span>
            </div>
          </div>
          <div className="p-6 overflow-y-auto font-serif text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
            <div>
              <h3 className="font-bold font-sans text-sm text-slate-900 dark:text-white uppercase mb-1">Chief Complaint</h3>
              <p>Patient presents for follow-up of severe neuropathic pain in lower extremities, ongoing for 3 weeks.</p>
            </div>
            <div>
              <h3 className="font-bold font-sans text-sm text-slate-900 dark:text-white uppercase mb-1">History of Present Illness</h3>
              <p>
                Patient is a established patient here for routine checkup concerning 
                <span className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1 mx-1 rounded shadow-sm border border-yellow-200 dark:border-yellow-500/30">type 2 diabetes mellitus directly causing polyneuropathy</span>. 
                He complains of tingling in both feet. Blood sugar logs show fasting at 140 mg/dL.
              </p>
            </div>
            <div>
              <h3 className="font-bold font-sans text-sm text-slate-900 dark:text-white uppercase mb-1">Assessment & Plan</h3>
              <ol className="list-decimal pl-4 space-y-1">
                <li><span className="bg-blue-50 dark:bg-blue-500/20 px-1 rounded border border-blue-100 dark:border-blue-500/30">Type 2 DM w/ Neuropathy</span>: poorly controlled. Prescribed Gabapentin 300mg completely.</li>
                <li>Continue metformin 500mg.</li>
                <li>Return to clinic in 3 weeks.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right Pane: Coding Workspace */}
        <div className="w-[500px] flex flex-col gap-4 z-0">
          
          {/* AI Suggestions Panel */}
          <div className="flex flex-col bg-white dark:bg-[#111827] rounded-xl border border-blue-200 dark:border-blue-900/50 shadow-xl overflow-hidden flex-1 relative ring-1 ring-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
            <div className="px-4 py-3 border-b border-blue-100 dark:border-slate-800 bg-blue-50/50 dark:bg-slate-800/50 flex justify-between items-center relative">
              <h2 className="font-semibold text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Bot size={18} /> AI Copilot Predictions
              </h2>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50">Auto-Extraction Active</span>
            </div>
            
            <div className="p-3 overflow-y-auto space-y-3 relative">
              {aiSuggestions.map((sug) => (
                <div key={sug.id} className="border border-slate-200 dark:border-slate-700/60 rounded-lg p-3 hover:border-blue-400 dark:hover:border-blue-500 transition-all bg-white dark:bg-slate-800/50 group relative overflow-hidden shadow-sm hover:shadow-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${sug.type === 'ICD-10' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'}`}>
                        {sug.type}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight">{sug.code}</span>
                    </div>
                    <button 
                      onClick={() => handleAccept(sug)}
                      className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors border border-blue-200 dark:border-blue-500/30"
                    >
                      <CheckCircle2 size={14} /> Accept
                    </button>
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-300 line-clamp-1">{sug.description}</p>
                  
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 mb-1">
                      <CornerDownRight size={12} className="text-slate-400" />
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">AI Justification</span>
                      <span className="text-xs font-mono ml-auto text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        {(sug.confidence * 100).toFixed(0)}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md border border-slate-100 dark:border-slate-800">
                      &quot;{sug.justification}&quot;
                    </p>
                  </div>
                </div>
              ))}
              {aiSuggestions.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-sm">No more AI suggestions.</div>
              )}
            </div>
          </div>

          {/* Final Code Grid (Draft) */}
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[250px] flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#1e293b]/50">
              <h2 className="font-semibold text-sm">Submitted Codes Draft</h2>
              <div className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded shadow-inner border border-slate-300 dark:border-slate-600">
                Total Codes: {activeCodes.length}
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 relative bg-slate-50/50 dark:bg-slate-900/30">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Manual search term or code..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-inner dark:shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase text-slate-500 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Code</th>
                    <th className="px-4 py-2">Mod</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCodes.map((code) => (
                    <tr key={code.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-4 py-2.5">
                        <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{code.code}</div>
                        <div className="text-xs text-slate-500 line-clamp-1" title={code.description}>{code.description}</div>
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-10 px-1 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-center text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none" placeholder="25" />
                      </td>
                      <td className="px-4 py-2 text-center text-slate-600 dark:text-slate-400 font-mono">1</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => handleRemove(code.id)} className="text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                          <XCircle size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activeCodes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-sm">
                        No codes accepted yet. Accept AI suggestions or search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Compliance Alert */}
            {activeCodes.find(c => c.code === "99213") && (
              <div className="mx-3 my-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg p-3 flex gap-3 text-sm shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                <div className="text-amber-900 dark:text-amber-200">
                  <span className="font-semibold block mb-1">NCCI Edit Alert</span>
                  If E/M 99213 is significant and separately identifiable from another procedure, ensure <strong className="font-mono bg-amber-200/50 dark:bg-amber-500/30 px-1 rounded">Modifier 25</strong> is appended.
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
