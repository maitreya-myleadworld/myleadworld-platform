"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, ArrowRight, Brain, LogOut, CheckCircle2, 
  ShieldCheck, Mail, Sparkles, Layout, Database,
  ArrowUpRight, Copy, Globe, ChevronRight
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

// --- Components ---

const Navbar = ({ onLaunch }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 py-4 px-8 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <Zap className="text-white w-6 h-6 fill-current" />
      </div>
      <span className="text-2xl font-black text-white tracking-tighter italic">MyLeadWorld</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-400">
      <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
      <a href="#ai-demo" className="hover:text-cyan-400 transition-colors">AI Test Drive</a>
      <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
    </div>
    <button onClick={onLaunch} className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95">
      Launch Console
    </button>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 hover:border-cyan-500/30 transition-all group hover:-translate-y-2">
    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
      <Icon size={28} className="text-cyan-400 group-hover:text-inherit" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Leads');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const runAiDemo = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiResult("Hey [Name], loved your recent post about LinkedIn automation! MyLeadWorld can actually help you scale those connection requests without the manual grind. Would you be open to a 5-min chat?");
      setAiLoading(false);
    }, 1500);
  };

  if (view === 'landing') return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      <Navbar onLaunch={() => setView('dashboard')} />

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 opacity-50" />
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em]">The Future of Multichannel Outreach</span>
          </div>
          <h1 className="text-6xl md:text-[6.5rem] font-black text-white mb-10 leading-[0.9] tracking-tighter">
            Deliverability Meets <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 italic">Automation.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto leading-relaxed">
            A unified ecosystem combining LinkedIn scraping, automated email warmup, and AI-intent detection to bypass the spam folder.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-3 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
              Start Free Trial <ArrowRight />
            </button>
            <button className="bg-slate-900/50 border border-slate-700 text-white px-10 py-6 rounded-[2rem] font-bold text-xl hover:bg-slate-800 transition-all">
              Book Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-40">
           <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">WARMY</div>
           <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">WAALAXY</div>
           <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">EXPANDI</div>
           <div className="flex items-center gap-2 font-black text-2xl tracking-tighter italic">LEMULIST</div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Everything you need <br/><span className="text-slate-500 italic">to close more deals.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Database} 
            title="LinkedIn Scraper" 
            desc="Extract verified emails and personal info directly from LinkedIn profiles using our browser extension."
          />
          <FeatureCard 
            icon={Sparkles} 
            title="AI Personalization" 
            desc="Our Gemini-powered engine writes custom icebreakers based on the prospect's real-time LinkedIn activity."
          />
          <FeatureCard 
            icon={Mail} 
            title="Adeline Warmup" 
            desc="Automated email warmup that keeps your sender reputation high and your messages in the inbox."
          />
        </div>
      </section>

      {/* AI Demo Section */}
      <section id="ai-demo" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-900 to-black rounded-[3rem] p-12 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-black text-white mb-6">Test Drive <br/>The MyLeadWorld AI</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">Type a prospect's role and see how our AI writes a personalized intro that gets a 35% higher response rate.</p>
              <div className="space-y-4">
                <input type="text" placeholder="e.g. Head of Growth at OpenAI" className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500 transition-all" />
                <button onClick={runAiDemo} className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                  {aiLoading ? <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" /> : <><Sparkles size={18}/> Generate Icebreaker</>}
                </button>
              </div>
            </div>
            <div className="md:w-1/2 w-full min-h-[250px] bg-slate-950 rounded-[2rem] border border-slate-800 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Output Preview</span>
                <Copy size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
              </div>
              <p className="text-slate-400 italic text-sm leading-relaxed">
                {aiResult || "Your generated message will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-slate-900 text-center">
        <Logo className="mx-auto mb-8" />
        <p className="text-slate-500 text-sm">© 2026 MyLeadWorld Platform. All rights reserved.</p>
      </footer>
    </div>
  );

  // --- Dashboard View ---
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800/50 p-8 flex flex-col gap-10 hidden lg:flex shrink-0 bg-[#020617]/50 backdrop-blur-3xl">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black text-white italic tracking-tighter">MyLeadWorld</span>
        </div>
        
        <nav className="space-y-1">
          {['Leads', 'Campaigns', 'Warmup', 'Settings'].map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)} 
              className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === item ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-white hover:bg-slate-900/50'}`}
            >
              {item === 'Leads' && <Database size={18} />}
              {item === 'Campaigns' && <Globe size={18} />}
              {item === 'Warmup' && <ArrowUpRight size={18} />}
              {item === 'Settings' && <Layout size={18} />}
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 rounded-[2rem] bg-gradient-to-br from-cyan-500 to-blue-600">
           <p className="text-xs font-black text-black/60 uppercase mb-2">Pro Plan</p>
           <p className="text-white font-black text-sm mb-4 italic leading-tight">Scale your outreach today.</p>
           <button className="w-full bg-black text-white py-2 rounded-xl text-xs font-bold hover:bg-white hover:text-black transition-all">Upgrade</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{activeTab}</h2>
            <p className="text-slate-500 text-sm font-medium mt-1 italic">Real-time data synchronization active.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"><Copy size={18}/></div>
             <button onClick={() => setView('landing')} className="bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2">
               <LogOut size={16}/> Exit Console
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem]">
            <p className="text-slate-500 text-xs font-black uppercase mb-2 tracking-widest">Total Leads</p>
            <p className="text-4xl font-black text-white tracking-tighter">1,284</p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem]">
            <p className="text-slate-500 text-xs font-black uppercase mb-2 tracking-widest">Warm Emails</p>
            <p className="text-4xl font-black text-cyan-400 tracking-tighter">98.2%</p>
          </div>
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem]">
            <p className="text-slate-500 text-xs font-black uppercase mb-2 tracking-widest">AI Credits</p>
            <p className="text-4xl font-black text-indigo-400 tracking-tighter">450</p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-24 text-center">
           <div className="inline-flex p-5 rounded-3xl bg-slate-950 border border-slate-800 text-slate-600 mb-8"><Sparkles size={48} /></div>
           <h3 className="text-2xl font-black text-white mb-2">Module Initializing...</h3>
           <p className="text-slate-500 italic font-medium">Syncing with your MyLeadWorld Extension to pull LinkedIn leads.</p>
        </div>
      </main>
    </div>
  );
}

const Logo = ({ className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="bg-cyan-500 w-8 h-8 rounded-lg flex items-center justify-center">
      <Zap className="text-black w-5 h-5 fill-current" />
    </div>
    <span className="text-xl font-black text-white italic tracking-tighter">MyLeadWorld</span>
  </div>
);
