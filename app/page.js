"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, Mail, Shield, BarChart3, ChevronRight, CheckCircle2, 
  MessageSquare, Bell, Zap, LayoutDashboard, Globe, Settings,
  LogOut, Sparkles, AlertCircle, TrendingUp
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Uses the Environment Variables you added to Netlify)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
  const [view, setView] = useState('landing'); // Controls 'landing' or 'dashboard'
  const [activeTab, setActiveTab] = useState('leads'); 
  const [leads, setLeads] = useState([]);

  // --- LANDING PAGE COMPONENT ---
  const LandingPage = () => (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {/* Real Logo Implementation */}
          <img 
            src="/logo.png" 
            alt="MyLeadWorld Logo" 
            className="h-10 w-auto object-contain" 
            onError={(e) => { e.target.src='https://via.placeholder.com/150x40?text=MyLeadWorld'; }} 
          />
        </div>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105"
        >
          Launch Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full mb-8 animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">Deliverability Meets Automation</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Your Complete <span className="text-cyan-400">Outreach Ecosystem</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Myleadworld combines email warm-up, cold email campaigns, and LinkedIn automation to help you bypass the spam folder and engage decision-makers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
            Start Your Free Trial <ChevronRight className="w-5 h-5" />
          </button>
          <button className="bg-slate-900 border border-slate-700 hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all">
            Book a Demo
          </button>
        </div>
      </header>

      {/* Feature Bento Grid */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-colors group">
          <Mail className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3">Automated Email Warmup</h3>
          <p className="text-slate-400 leading-relaxed">Maintain high inbox placement with our Adeline AI warmup network that mimics human interaction across millions of mailboxes.</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-colors group">
          <Shield className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3">Safety First</h3>
          <p className="text-slate-400 leading-relaxed">Randomized pacing and daily limits to keep your LinkedIn account secure and human-like.</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-colors group">
          <Users className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3">Lead Enrichment</h3>
          <p className="text-slate-400 leading-relaxed">Auto-retrieve and verify professional emails directly from LinkedIn profiles in real-time.</p>
        </div>
        <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-colors group">
          <MessageSquare className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3">Smart AI Inbox</h3>
          <p className="text-slate-400 leading-relaxed">Gemini-powered intent detection and suggested replies for every prospect interaction, helping you close deals faster.</p>
        </div>
      </section>
    </div>
  );

  // --- DASHBOARD COMPONENT ---
  const Dashboard = () => {
    useEffect(() => {
      fetchLeads();
      // Real-time listener: Whenever a lead is added to Supabase, update the list
      const subscription = supabase
        .channel('public:leads')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, payload => {
          setLeads(prev => [payload.new, ...prev]);
        })
        .subscribe();
      return () => supabase.removeChannel(subscription);
    }, []);

    const fetchLeads = async () => {
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (data) setLeads(data);
    };

    return (
      <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 bg-slate-950">
          <img src="/logo.png" alt="MLW" className="h-8 w-auto object-contain self-start" />
          
          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveTab('leads')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:bg-slate-900 text-slate-400'}`}>
              <Users className="w-5 h-5" /> Leads
            </button>
            <button onClick={() => setActiveTab('warmup')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'warmup' ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:bg-slate-900 text-slate-400'}`}>
              <Zap className="w-5 h-5" /> Email Warmup
            </button>
            <button onClick={() => setActiveTab('inbox')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inbox' ? 'bg-cyan-500 text-slate-950 font-bold' : 'hover:bg-slate-900 text-slate-400'}`}>
              <MessageSquare className="w-5 h-5" /> Smart Inbox
            </button>
          </nav>

          <div className="mt-auto flex flex-col gap-2 border-t border-slate-800 pt-6">
            <button onClick={() => setView('landing')} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all font-semibold">
              <LogOut className="w-5 h-5" /> Exit Dashboard
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Leads Repository</h2>
                <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-sm">Active Prospects:</span> <span className="text-cyan-400 font-bold ml-2">{leads.length}</span>
                </div>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-300">Name</th>
                      <th className="px-6 py-4 font-semibold text-slate-300">Headline</th>
                      <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.length > 0 ? leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{lead.full_name}</td>
                        <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{lead.headline}</td>
                        <td className="px-6 py-4">
                          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/20">Synced</span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-slate-500">
                          <div className="flex flex-col items-center gap-2">
                            <AlertCircle className="w-8 h-8 opacity-20" />
                            No leads captured yet. Use the Chrome Extension to start!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  return view === 'landing' ? <LandingPage /> : <Dashboard />;
};

export default App;
