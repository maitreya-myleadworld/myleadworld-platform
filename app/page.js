"use client"; // Mandatory for interactive features [cite: 1618, 1637]

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Zap, ArrowRight, CheckCircle2, Mail, Linkedin, 
  Globe, Lock, Users, Search, Activity, ChevronRight, 
  ShieldCheck, Flame, MessageSquare, Brain, Bell, 
  Calendar, MoreVertical, Filter, Download, Settings,
  LogOut, LayoutDashboard, Target
} from 'lucide-react';

// Initialize Supabase safely using your environment variables [cite: 1891, 1922]
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Logo = ({ className = "w-8 h-8" }) => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className={`bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-transform ${className}`}>
      <Zap className="text-white w-2/3 h-2/3 fill-current" />
    </div>
    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">MyLeadWorld</span>
  </div>
);

export default function App() {
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('Smart Inbox');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (view === 'dashboard' && supabase) {
      const fetchLeads = async () => {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error) setLeads(data);
        setLoading(false);
      };
      fetchLeads();

      const subscription = supabase
        .channel('leads-all')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, payload => {
          setLeads(prev => [payload.new, ...prev]);
        })
        .subscribe();

      return () => { supabase.removeChannel(subscription); };
    }
  }, [view]);

  const LandingPage = () => (
    <div className="min-h-screen bg-brand-navy text-slate-200">
      <nav className="fixed top-0 w-full z-50 bg-brand-navy/80 backdrop-blur-md border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo />
          <button onClick={() => setView('dashboard')} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-brand-cyan transition-all shadow-xl active:scale-95">
            Launch Console
          </button>
        </div>
      </nav>

      <section className="pt-40 pb-32 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
          Outreach That Actually <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">Hits the Inbox.</span>
        </h1>
        <button onClick={() => setView('dashboard')} className="bg-brand-cyan text-black px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:shadow-2xl transition-all mx-auto">
          Start Prospecting <ArrowRight />
        </button>
      </section>
    </div>
  );

  const DashboardView = () => (
    <div className="min-h-screen bg-brand-navy text-slate-200 flex">
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex">
        <Logo className="w-10 h-10" />
        <nav className="space-y-1.5 text-sm font-semibold">
          {['Smart Inbox', 'Lead List', 'Email Warmup', 'Analytics'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)} className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${activeTab === item ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20' : 'text-slate-500 hover:text-white'}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">{activeTab}</h1>
          <button onClick={() => setView('landing')} className="text-slate-500 hover:text-white flex items-center gap-1 text-sm"><LogOut className="w-4 h-4" /> Exit</button>
        </header>

        {activeTab === 'Lead List' && (
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-[10px] uppercase font-black text-slate-500 tracking-widest px-6 py-5">
                <tr><th className="px-6 py-5">Prospect</th><th className="px-6 py-5">Headline</th><th className="px-6 py-5">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.length === 0 ? (
                  <tr><td colSpan="3" className="p-20 text-center text-slate-500 italic">No leads found. Use the extension to import.</td></tr>
                ) : leads.map(l => (
                  <tr key={l.id} className="hover:bg-slate-800/30 group">
                    <td className="px-6 py-4 font-bold text-white text-sm">{l.full_name}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 truncate max-w-[200px]">{l.headline}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase">Imported</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );

  return view === 'landing' ? <LandingPage /> : <DashboardView />;
}
