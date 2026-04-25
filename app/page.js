"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, ArrowRight, Linkedin, Brain, Flame, ChevronRight, LogOut
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Logo = ({ className = "w-8 h-8" }) => (
  <div className="flex items-center gap-2 group">
    <div className={`bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 ${className}`}>
      <svg className="text-white w-2/3 h-2/3 fill-current" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">MyLeadWorld</span>
  </div>
);

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Smart Inbox');
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (view === 'dashboard' && supabase) {
      const fetchLeads = async () => {
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (!error) setLeads(data);
      };
      fetchLeads();
    }
  }, [view]);

  if (view === 'landing') return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <button onClick={() => setView('dashboard')} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-xl">
            Launch Console
          </button>
        </div>
      </nav>
      <section className="pt-40 pb-32 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
          Outreach That Actually <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Hits the Inbox.</span>
        </h1>
        <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black px-10 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:shadow-2xl transition-all mx-auto active:scale-95">
          Start Prospecting <ArrowRight />
        </button>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex">
        <Logo className="w-10 h-10" />
        <nav className="space-y-1.5 font-semibold">
          {['Smart Inbox', 'Lead List', 'Email Warmup'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === item ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-white'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-white uppercase">{activeTab}</h1>
          <button onClick={() => setView('landing')} className="text-slate-500 hover:text-white flex items-center gap-1 text-sm"><LogOut className="w-4 h-4" /> Exit</button>
        </header>
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-10 text-center italic text-slate-500">
           Dashboard module live. Syncing with database...
        </div>
      </main>
    </div>
  );
}
