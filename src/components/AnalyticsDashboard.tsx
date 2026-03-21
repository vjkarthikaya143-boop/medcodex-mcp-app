import { BarChart3, TrendingUp, TrendingDown, Users, Activity, FileWarning, SearchX } from "lucide-react";

export default function AnalyticsDashboard() {
  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-[#0b1120] relative p-8 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="text-blue-500" /> Enterprise Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time productivity and compliance insights</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm shadow-sm outline-none">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md">
            Export Report
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Charts Coded", value: "14,230", trend: "+12%", up: true, icon: Activity, color: "text-emerald-500" },
          { label: "AI Acceptance Rate", value: "86.4%", trend: "+5%", up: true, icon: Users, color: "text-blue-500" },
          { label: "Claim Denials", value: "3.2%", trend: "-2.1%", up: true, icon: TrendingDown, color: "text-purple-500" },
          { label: "Avg Time/Chart", value: "3m 12s", trend: "-45s", up: true, icon: TrendingDown, color: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-current opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500 ${stat.color}`} />
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-slate-800 dark:text-white">{stat.value}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.up ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400"}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-3 gap-6">
        {/* Productivity Chart Fake */}
        <div className="col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Coding Throughput (Manual vs AI-Assisted)</h3>
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-300 font-medium">Daily Average</span>
          </div>
          <div className="flex-1 relative min-h-[250px] flex items-end gap-2 pb-6 px-4">
            {/* Fake bar chart bars */}
            {[40, 60, 45, 80, 75, 95, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 group">
                <div className="w-full flex justify-center gap-1 items-end h-[200px] relative">
                  <div style={{ height: `${h * 0.3}%` }} className="w-full max-w-[20px] bg-slate-300 dark:bg-slate-600 rounded-t-sm transition-all group-hover:bg-slate-400" />
                  <div style={{ height: `${h}%` }} className="w-full max-w-[20px] bg-blue-500 rounded-t-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:bg-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-2">Day {i+1}</span>
              </div>
            ))}
            {/* Axis lines */}
            <div className="absolute left-0 bottom-6 right-0 border-t border-slate-200 dark:border-slate-700"></div>
          </div>
        </div>

        {/* Audit Flags Fake */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex flex-col">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <FileWarning size={18} className="text-amber-500" /> Compliance Flags (Top 3)
          </h3>
          <div className="space-y-4">
            <div className="p-3 border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-500/5 rounded-xl">
              <div className="flex justify-between font-medium text-sm text-rose-800 dark:text-rose-300 mb-1">
                <span>Missing Modifier 25</span>
                <span>142 charts</span>
              </div>
              <p className="text-xs text-rose-600/80 dark:text-rose-400/80">E/M billed with minor procedure</p>
            </div>
            <div className="p-3 border border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-500/5 rounded-xl">
              <div className="flex justify-between font-medium text-sm text-amber-800 dark:text-amber-300 mb-1">
                <span>Laterality Undefined</span>
                <span>89 charts</span>
              </div>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80">Missing RT/LT on orthopedic codes</p>
            </div>
            <div className="p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <div className="flex justify-between font-medium text-sm text-slate-800 dark:text-slate-300 mb-1">
                <span>Unspecified Diabetes</span>
                <span>45 charts</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">E11.9 used instead of specific complications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
