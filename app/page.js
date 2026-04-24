"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, Mail, Shield, BarChart3, ChevronRight, CheckCircle2, 
  MessageSquare, Bell, Zap, LayoutDashboard, Globe, Settings,
  LogOut, Sparkles, AlertCircle, TrendingUp
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase (Use your Environment Variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const App = () => {
  const [view, setView] = useState('landing'); // 'landing' or 'dashboard'
  const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'warmup', 'inbox'
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- LANDING PAGE COMPONENTS ---
  const LandingPage = () => (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Hero Section */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Globe className="text-slate-950 w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">MyLeadWorld</span>
        </div>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2 rounded-full font-semibold transition-all"
        >
          Launch Dashboard
        </button>
      </nav>

      <header className="max-w-6xl mx-auto px-8 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">Deliverability Meets Automation</span>
        </div>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Your Complete <span className="text-cyan-400">Outreach Ecosystem</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Myleadworld combines email warm-up, cold email campaigns, and LinkedIn automation to help you bypass the spam folder and engage decision-makers.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all">
            Start Your Free Trial <ChevronRight className="w-5 h-5" />
          </button>
          <button className="bg-slate-900 border border-slate-700 hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all">
            Book a Demo
          </button>
        </div>
      </header>

      {/* Feature Bento Grid */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <Mail className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Automated Email Warmup</h3>
          <p className="text-slate-400">Maintain high inbox placement with our Adeline AI warmup network that mimics human interaction.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <Shield className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Safety First</h3>
          <p className="text-slate-400">Randomized pacing and daily limits to keep your LinkedIn account secure.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <Users className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Lead Enrichment</h3>
          <p className="text-slate-400">Auto-retrieve and verify professional emails directly from LinkedIn profiles.</p>
        </div>
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <MessageSquare className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Smart AI Inbox</h3>
          <p className="text-slate-400">Gemini-powered intent detection and suggested replies for every prospect interaction.</p>
        </div>
      </section>
    </div>
  );

  // --- DASHBOARD COMPONENTS ---
  const Dashboard = () => {
    useEffect(() => {
      fetchLeads();
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <Globe className="text-slate-950 w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">MyLeadWorld</span>
          </div>
          
          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveTab('leads')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-cyan-500 text-slate-950' : 'hover:bg-slate-900 text-slate-400'}`}>
              <Users className="w-5 h-5" /> <span className="font-semibold">Leads</span>
            </button>
            <button onClick={() => setActiveTab('warmup')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'warmup' ? 'bg-cyan-500 text-slate-950' : 'hover:bg-slate-900 text-slate-400'}`}>
              <Zap className="w-5 h-5" /> <span className="font-semibold">Email Warmup</span>
            </button>
            <button onClick={() => setActiveTab('inbox')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inbox' ? 'bg-cyan-500 text-slate-950' : 'hover:bg-slate-900 text-slate-400'}`}>
              <MessageSquare className="w-5 h-5" /> <span className="font-semibold">Smart Inbox</span>
            </button>
          </nav>

          <div className="mt-auto flex flex-col gap-2 border-t border-slate-800 pt-6">
            <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all">
              <Settings className="w-5 h-5" /> Settings
            </button>
            <button onClick={() => setView('landing')} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all">
              <LogOut className="w-5 h-5" /> Exit to Site
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-8">
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Leads Repository</h2>
                <div className="flex gap-3">
                  <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 text-sm">Total Leads:</span> <span className="text-cyan-400 font-bold">{leads.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-slate-300">Name</th>
                      <th className="px-6 py-4 font-semibold text-slate-300">Headline</th>
                      <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                      <th className="px-6 py-4 font-semibold text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{lead.full_name}</td>
                        <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{lead.headline}</td>
                        <td className="px-6 py-4">
                          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/20">Imported</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">Message</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'warmup' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                Adeline AI Warmup Engine <Sparkles className="w-6 h-6 text-cyan-400" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-sm block mb-1">Reputation Score</span>
                  <span className="text-4xl font-bold text-green-400">98%</span>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-4">
                    <div className="bg-green-400 h-2 rounded-full w-[98%]"></div>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-sm block mb-1">Inbox Placement</span>
                  <span className="text-4xl font-bold text-cyan-400">100%</span>
                  <TrendingUp className="text-cyan-400 w-6 h-6 mt-2" />
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-sm block mb-1">Infrastructure Check</span>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300">SPF ✅</span>
                    <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300">DKIM ✅</span>
                    <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300">DMARC ✅</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Connect Your First Mailbox</h4>
                <p className="text-slate-400 mb-6">Start your warmup loop to ensure your emails bypass the spam folder.</p>
                <button className="bg-cyan-500 text-slate-950 px-6 py-3 rounded-xl font-bold">Connect via SMTP/IMAP</button>
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
