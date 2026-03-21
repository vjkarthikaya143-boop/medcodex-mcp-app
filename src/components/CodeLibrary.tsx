import { useState } from "react";
import { Search, Database, Fingerprint, Activity, AlignLeft, Tags, HardDrive } from "lucide-react";

export default function CodeLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const results = [
    { id: "E11", type: "ICD-10", desc: "Type 2 diabetes mellitus", children: 12 },
    { id: "E11.9", type: "ICD-10", desc: "Type 2 diabetes mellitus without complications", children: 0 },
    { id: "E11.40", type: "ICD-10", desc: "Type 2 diabetes mellitus with diabetic neuropathy, unspecified", children: 0 },
    { id: "10060", type: "CPT", desc: "Incision and drainage of abscess", children: 2 },
  ].filter(r => r.id.includes(searchQuery.toUpperCase()) || r.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-[#0b1120] relative p-8 gap-6 overflow-hidden">
      {/* Header & Search Area */}
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-6">
        <div className="text-center space-y-3 mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full mb-2">
            <Database size={28} />
          </div>
          <h1 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">Universal Code Library</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Semantic search across 2024 ICD-10-CM, CPT, and HCPCS Level II code sets.
          </p>
        </div>

        {/* Global Search Interface */}
        <div className="relative group w-full">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-4 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-blue-500 dark:focus:border-blue-500 shadow-lg shadow-slate-200/50 dark:shadow-none transition-all"
            placeholder="Search symptoms, diagnoses, or specific codes (e.g. 'Neuropathy' or 'E11')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-4 flex items-center gap-2">
            <span className="bg-slate-100 dark:bg-slate-700 flex items-center gap-1 text-slate-500 dark:text-slate-400 px-3 py-1 rounded text-xs font-mono font-medium border border-slate-200 dark:border-slate-600 shadow-inner">
              <HardDrive size={12} /> ICD-10 2024
            </span>
          </div>
        </div>

        {/* Categories / Tags filter */}
        <div className="flex gap-2 justify-center flex-wrap">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-white shadow-md focus:outline-none hover:scale-105 transition-transform">All Codes</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 focus:outline-none hover:scale-105 transition-transform hover:text-blue-600 dark:hover:text-blue-400">ICD-10-CM</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 focus:outline-none hover:scale-105 transition-transform hover:text-indigo-600 dark:hover:text-indigo-400">CPT/HCPCS</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 focus:outline-none hover:scale-105 transition-transform">Modifiers</button>
        </div>

        {/* Results Area */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden flex-1 flex flex-col mt-4 min-h-[400px]">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50/50 dark:bg-[#1a2336]/50">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <AlignLeft size={18} className="text-slate-400" /> Search Results
            </h2>
            <div className="text-xs text-slate-500 font-mono">Found {results.length} entities</div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.map((res, i) => (
                  <li key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 cursor-pointer group">
                    <div className={`mt-0.5 px-2 py-1 flex items-center justify-center rounded text-[10px] font-bold tracking-wider w-16 text-center ${res.type === 'ICD-10' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'}`}>
                      {res.type}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{res.id}</span>
                        {res.children > 0 && (
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 text-[10px] font-semibold px-2 border border-amber-200 dark:border-amber-500/30 rounded-full flex items-center gap-1">
                            <Fingerprint size={10} /> Needs Specifying ({res.children} sub-codes)
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{res.desc}</p>
                    </div>
                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      <Tags className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" size={20} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12">
                <Search className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
                <p className="font-medium text-slate-500">No codes matching "{searchQuery}"</p>
                <p className="text-sm mt-1">Try searching by clinical terminology or exact code identifier</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
