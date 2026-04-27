"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Zap, ArrowRight, Brain, LogOut } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
      <Zap className="text-white w-5 h-5 fill-current" />
    </div>
    <span className="text-xl font-bold text-white tracking-tight">MyLeadWorld</span>
  </div>
);

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Smart Inbox');
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (view === 'dashboard' && supabase) {
      const fetchLeads = async () => {
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (data) setLeads(data);
      };
      fetchLeads();
    }
  }, [view]);

  if (view === 'landing') return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 py-4 px-8 flex justify-between items-center">
        <Logo />
        <button onClick={() => setView('dashboard')} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all">Launch Console</button>
      </nav>
      <main className="pt-40 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-8">Outreach That <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Hits the Inbox.</span></h1>
        <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-2 mx-auto hover:shadow-2xl transition-all active:scale-95">Start Prospecting <ArrowRight /></button>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex shrink-0">
        <Logo />
        <nav className="space-y-1">
          {['Smart Inbox', 'Lead List', 'Email Warmup'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === item ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-white'}`}>{item}</button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase">{activeTab}</h2>
          <button onClick={() => setView('landing')} className="text-slate-500 hover:text-white flex items-center gap-2 font-bold"><LogOut size={18}/> Exit</button>
        </header>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center italic text-slate-500">Dashboard Live. Point your Chrome Extension here.</div>
      </main>
    </div>
  );
}
