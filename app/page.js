"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, ArrowRight, Linkedin, Brain, Flame, 
  MessageSquare, Bell, User, LogOut, ShieldCheck 
} from 'lucide-react';

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
        <button onClick={() => setView('dashboard')} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-xl">
          Launch Console
        </button>
      </nav>

      <main className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">v1.1 Stable Production</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            Outreach That <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Hits the Inbox.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            The unified B2B ecosystem for LinkedIn scraping, AI intent detection, and Adeline email warmup.
          </p>
          <button onClick={() => setView('dashboard')} className="bg-cyan-500 text-black px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-2 mx-auto hover:shadow-cyan-500/40 hover:shadow-2xl transition-all active:scale-95">
            Start Prospecting <ArrowRight />
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex">
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex shrink-0">
        <Logo />
        <nav className="space-y-1">
          {['Smart Inbox', 'Lead List', 'Email Warmup'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === item ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-white'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase">{activeTab}</h2>
          <button onClick={() => setView('landing')} className="text-slate-500 hover:text-white flex items-center gap-2 font-bold transition-colors">
            <LogOut size={18}/> Exit Console
          </button>
        </header>

        {activeTab === 'Lead List' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                <tr><th className="px-6 py-5">Prospect</th><th className="px-6 py-4">Headline</th><th className="px-6 py-4">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.length === 0 ? (
                  <tr><td colSpan="3" className="p-20 text-center text-slate-500 italic font-medium">No leads found. Sync your Extension to begin.</td></tr>
                ) : leads.map(l => (
                  <tr key={l.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-white text-sm">{l.full_name}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 truncate max-w-xs">{l.headline}</td>
                    <td className="px-6 py-4"><span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Imported</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab !== 'Lead List' && (
          <div className="h-64 border-2 border-dashed border-slate-800 rounded-[2rem] flex flex-col items-center justify-center text-slate-600 space-y-4">
             <Brain size={48} className="text-slate-800" />
             <p className="italic font-medium">Module under initialization...</p>
          </div>
        )}
      </main>
    </div>
  );
}
