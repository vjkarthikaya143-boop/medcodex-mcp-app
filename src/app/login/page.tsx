"use client";

import { useState } from "react";
import { User, Lock, ExternalLink, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking NextAuth signIn method
    console.log("Authenticating:", email);
    setTimeout(() => {
      setLoading(false);
      window.location.href = email.includes("student") ? "/?mode=lms" : "/?mode=workspace";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl z-0" />

      <div className="w-full max-w-4xl bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl flex overflow-hidden z-10 border border-slate-200 dark:border-slate-800">
        
        {/* Left Informational Panel */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex-col justify-between relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-2xl shadow-lg mb-8 border border-white/30">M</div>
            <h1 className="text-3xl font-bold font-serif mb-4 leading-tight">Universal Medical Coding Platform</h1>
            <p className="text-blue-100 text-lg opacity-90 leading-relaxed mb-8">
              Bridge the gap between education and enterprise application. AI-driven compliance, simulation, and high-speed coding all in one unified ecosystem.
            </p>
          </div>
          
          <div className="relative z-10 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-2">Demo Access Roles</h3>
            <div className="space-y-4 text-sm mt-4">
              <div className="border-l-2 border-emerald-400 pl-3">
                <p className="font-medium text-white">Left Mode (LMS Student)</p>
                <p className="text-blue-100/80 font-mono mt-0.5">student@academy.com / password</p>
              </div>
              <div className="border-l-2 border-rose-400 pl-3">
                <p className="font-medium text-white">Right Mode (Pro Coder Workspace)</p>
                <p className="text-blue-100/80 font-mono mt-0.5">coder@hospital.org / password</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Authentication Panel */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-[#111827]">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex lg:hidden items-center justify-center font-bold text-lg shadow-lg mb-6 text-white">M</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Please enter your credentials to access your terminal.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                  placeholder="name@hospital.org"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? "Authenticating via NextAuth..." : "Sign In to Workspace"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-500">
                Don't have an enterprise account? <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">Apply for pilot</a>
              </p>
            </div>
            
            {/* Enterprise SSO */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="flex items-center justify-center gap-3 w-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <ExternalLink size={16} className="text-slate-400" />
                Sign in with Epic MyChart SSO
              </button>
              <button className="flex items-center justify-center gap-3 w-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <ExternalLink size={16} className="text-slate-400" />
                Sign in with Cerner SSO
              </button>
            </div>
        </div>
        
      </div>
    </div>
  );
}
