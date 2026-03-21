import { useState } from "react";
import CoderWorkspace from "@/components/CoderWorkspace";
import LmsDashboard from "@/components/LmsDashboard";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import CodeLibrary from "@/components/CodeLibrary";
import { LayoutDashboard, FileText, Settings, LogOut, Sun, Moon, BarChart3, Database } from "lucide-react";

export default function Home() {
  const [activeModule, setActiveModule] = useState<"workspace" | "lms" | "analytics" | "library">("workspace");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col text-slate-300 shadow-xl z-20 transition-all duration-300">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-700/50">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">M</div>
          <span className="hidden lg:block ml-3 font-semibold text-slate-100 tracking-wide">MedCodeX</span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <button 
            onClick={() => setActiveModule("workspace")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              activeModule === "workspace" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <FileText size={20} className={activeModule === "workspace" ? "text-white" : "text-slate-400"} />
            <span className="hidden lg:block font-medium">Coder Workspace</span>
          </button>
          
          <button 
            onClick={() => setActiveModule("lms")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              activeModule === "lms" 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} className={activeModule === "lms" ? "text-white" : "text-slate-400"} />
            <span className="hidden lg:block font-medium">Student LMS</span>
          </button>

          <button 
            onClick={() => setActiveModule("library")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              activeModule === "library" 
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Database size={20} className={activeModule === "library" ? "text-white" : "text-slate-400"} />
            <span className="hidden lg:block font-medium">Code Library</span>
          </button>

          <button 
            onClick={() => setActiveModule("analytics")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              activeModule === "analytics" 
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BarChart3 size={20} className={activeModule === "analytics" ? "text-white" : "text-slate-400"} />
            <span className="hidden lg:block font-medium">Analytics</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700/50 flex flex-col gap-2">
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="hidden lg:block text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
            <Settings size={18} />
            <span className="hidden lg:block text-sm font-medium">Settings</span>
          </button>
          <button className="flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-colors text-slate-400">
            <LogOut size={18} />
            <span className="hidden lg:block text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-slate-50 dark:bg-[#0b1120] text-slate-900 dark:text-slate-200 transition-colors duration-300 overflow-hidden relative">
        {activeModule === "workspace" && <CoderWorkspace />}
        {activeModule === "lms" && <LmsDashboard />}
        {activeModule === "analytics" && <AnalyticsDashboard />}
        {activeModule === "library" && <CodeLibrary />}
      </main>
    </div>
  );
}
