import { useState } from "react";
import { PlayCircle, CheckCircle, FileText, Bot, Send, Award, BookOpen, Clock } from "lucide-react";

export default function LmsDashboard() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: "user" | "ai", text: string}[]>([
    { role: "ai", text: "Hello! I'm your AI Coding Tutor. Do you have any questions about Module 4: Integumentary CPT Coding or modifier usage?" }
  ]);

  const handleSend = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { role: "user", text: chatMessage }, { role: "ai", text: "According to CPT 2024 guidelines, if an excision is performed along with an intermediate repair, you should code the repair separately only if it requires layered closure. Simple closures are included in the excision code." }]);
    setChatMessage("");
  };

  return (
    <div className="flex h-full w-full bg-slate-50 dark:bg-[#0b1120] relative">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 z-10 flex flex-col gap-6">
        
        {/* Header Dashboard Stats */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="text-indigo-500">CPC Certification Track</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Module 4: Integumentary System Procedures</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Overall Progress</div>
              <div className="text-xl font-mono text-indigo-600 dark:text-indigo-400">45%</div>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl shadow-sm text-center">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Est. Mock Exam</div>
              <div className="text-xl font-mono text-emerald-600 dark:text-emerald-400">3 Days</div>
            </div>
          </div>
        </div>

        {/* Video Player & Curriculum */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 flex flex-col gap-6">
            <div className="bg-black rounded-2xl aspect-video overflow-hidden shadow-2xl relative border border-slate-800 group">
              {/* Fake Video Player State */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-black/20">
                <button className="w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 border border-white/20">
                  <PlayCircle size={40} className="ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                  <div className="w-[35%] h-full bg-indigo-500"></div>
                </div>
                <div className="flex justify-between text-white/80 text-xs font-mono font-medium">
                  <span>05:22 / 15:40</span>
                  <span className="Tracking-wider">Excision vs. Biopsy Margins</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-500" />
                Lesson References
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                  <FileText className="text-rose-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">CPT 2024 Index Table: Skin Excisions</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Refer to this table to understand how to measure lesion margins and select the correct code class (Benign vs Malignant).</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                  <Award className="text-amber-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Interactive Quiz: Calculate Lesion Sizes</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">3 practice questions to reinforce video concepts. Due this week.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold px-1 text-slate-800 dark:text-slate-300">Course Index</h3>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm flex flex-col flex-1">
              <ul className="divide-y divide-slate-100 dark:divide-slate-700/50 overflow-y-auto">
                <li className="p-4 bg-slate-50 dark:bg-slate-900/40">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 line-through opacity-70">1. Intro to Integumentary</h4>
                      <p className="text-xs text-slate-400 mt-0.5"><Clock size={10} className="inline mr-1" />12 mins</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-2 border-indigo-500 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3 relative z-10">
                    <PlayCircle className="text-indigo-600 dark:text-indigo-400 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight text-indigo-900 dark:text-indigo-300">2. Excision vs. Biopsy</h4>
                      <p className="text-xs text-indigo-500/80 mt-0.5"><Clock size={10} className="inline mr-1" />15 mins (Playing)</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">3. Repair & Closures (Complex)</h4>
                      <p className="text-xs text-slate-400 mt-0.5"><Clock size={10} className="inline mr-1" />18 mins</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">4. Burns & Skin Grafts</h4>
                      <p className="text-xs text-slate-400 mt-0.5"><Clock size={10} className="inline mr-1" />24 mins</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Right AI Tutor Panel */}
      <div className="w-[380px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.05)] z-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-[#1a2336] relative overflow-hidden flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 p-1">
              <Bot className="text-white" size={18} />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-slate-800 dark:text-white">AI Guidelines Tutor</h2>
              <p className="text-[10px] text-indigo-500 font-medium">Always trained on latest 2024 CPT/ICD</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed relative ${
                msg.role === 'ai' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm border border-slate-200/50 dark:border-slate-700/50' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/20'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111827] relative z-10">
          <div className="relative flex items-center shadow-sm">
            <input 
              type="text" 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a coding question..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send size={15} className="ml-0.5" />
            </button>
          </div>
          <div className="mt-2 text-[10px] text-center text-slate-400">
            Tutor can hallucinate code values. Verify against official index books.
          </div>
        </div>
      </div>
    </div>
  );
}
