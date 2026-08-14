import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ShieldCheck, PieChart, Activity, UserCircle, ChevronRight, LayoutDashboard } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

export default function Landing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  const stakeholders = [
    { id: 'cio', name: 'CIO / Technology Leadership', icon: <Activity className="w-5 h-5 text-accent" />, desc: 'Board-ready reporting & DORA compliance' },
    { id: 'cfo', name: 'Chief Financial Officer', icon: <PieChart className="w-5 h-5 text-accent" />, desc: 'IT spend optimization & duplicate tool costs' },
    { id: 'ea_manager', name: 'EA Manager', icon: <Database className="w-5 h-5 text-accent" />, desc: 'Data quality, integration health & pipelines' },
    { id: 'prog_manager', name: 'Programme Manager', icon: <LayoutDashboard className="w-5 h-5 text-accent" />, desc: 'Project-to-app dependency mapping' },
    { id: 'sec_officer', name: 'Security / Compliance Officer', icon: <ShieldCheck className="w-5 h-5 text-accent" />, desc: 'End-of-life tech risks & DORA audit trails' }
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  const filtered = stakeholders.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="relative min-h-screen bg-background text-primary selection:bg-accent/30 font-sans overflow-hidden">
      <BackgroundAnimation />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 border border-accent/20">
              <Database className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-xl font-bold leading-none tracking-tight">Accenture EA</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted mt-1">Platform Prototype</div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          <div className="md:w-1/2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-6 border border-accent/20">
              <Database className="w-3 h-3" />
              EA as a Data Product
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Trusted Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Intelligence.</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">
              Select your stakeholder role to view tailored insights, driven by the new automated 5-layer integration architecture mapping ServiceNow, SAP, Signavio, and Apptio into a canonical repository.
            </p>
            
            <div className="relative max-w-md group">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <UserCircle className="h-5 w-5 text-muted group-focus-within:text-accent transition-colors" />
               </div>
               <input
                  type="text"
                  placeholder="Filter roles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-primary placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
               />
            </div>
          </div>

          <div className="md:w-1/2 w-full">
             <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <UserCircle className="w-5 h-5 text-accent" />
                        Select Stakeholder Login
                    </h2>
                    <span className="text-xs font-semibold text-muted bg-background px-3 py-1 rounded-full border border-border">
                        {filtered.length} Roles
                    </span>
                </div>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {filtered.length > 0 ? (
                        filtered.map(role => (
                            <button
                                key={role.id}
                                onClick={() => navigate(`/dashboard?role=${encodeURIComponent(role.id)}`)}
                                className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-2xl hover:border-accent/50 hover:shadow-md transition-all group text-left"
                            >
                                <div className="flex items-center gap-3">
                                  {role.icon}
                                  <div>
                                    <span className="block font-semibold text-primary group-hover:text-accent transition-colors">{role.name}</span>
                                    <span className="block text-xs text-muted mt-0.5">{role.desc}</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted">
                            No roles found matching "{search}"
                        </div>
                    )}
                </div>
             </div>
          </div>
        </div>

        <footer className="mt-auto pt-24 pb-8 text-center text-muted text-sm font-medium">
          <p className="flex items-center justify-center gap-2">
            Accenture EA Platform Integration Prototype
          </p>
        </footer>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--text-2); }
      `}} />
    </main>
  );
}
