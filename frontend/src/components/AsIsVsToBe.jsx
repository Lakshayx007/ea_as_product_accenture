import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Users, Briefcase, DollarSign, Server, ArrowRight, RefreshCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import ConceptExplainer from './ui/ConceptExplainer';

export default function AsIsVsToBe() {
  const [isToBe, setIsToBe] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          The Architecture Evolution
        </h3>
        <p className="text-surface-400 mt-2">From isolated silos to an integrated intelligence hub.</p>
        
        {/* Toggle */}
        <div className="mt-8 inline-flex items-center p-1 bg-surface-900 border border-surface-700 rounded-full">
          <button
            onClick={() => setIsToBe(false)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              !isToBe ? 'bg-red-500/20 text-red-400 shadow-md' : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            As-Is (Legacy)
          </button>
          <button
            onClick={() => setIsToBe(true)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              isToBe ? 'bg-emerald-500/20 text-emerald-400 shadow-md' : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            To-Be (<ConceptExplainer termKey="dataMesh">EA Data Product</ConceptExplainer>)
          </button>
        </div>
      </div>

      <div className="relative h-[500px] bg-surface-900/50 border border-surface-800 rounded-2xl overflow-hidden p-8">
        <AnimatePresence mode="wait">
          {!isToBe ? (
            <motion.div
              key="asis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 p-8 flex flex-col items-center justify-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mb-12">
                {[
                  { name: 'SAP PPM', desc: '3,200 Projects', icon: Briefcase, color: 'text-blue-400' },
                  { name: 'ServiceNow', desc: '8,400 Apps', icon: Server, color: 'text-emerald-400' },
                  { name: 'Signavio', desc: 'Process Models', icon: RefreshCcw, color: 'text-amber-400' },
                  { name: 'Apptio', desc: 'IT Finance', icon: DollarSign, color: 'text-purple-400' }
                ].map((sys) => (
                  <div key={sys.name} className="flex flex-col items-center p-6 bg-surface-800 border border-surface-700 rounded-xl">
                    <sys.icon className={`w-10 h-10 ${sys.color} mb-4`} />
                    <h4 className="font-semibold">{sys.name}</h4>
                    <span className="text-xs text-surface-400">{sys.desc}</span>
                  </div>
                ))}
              </div>

              <div className="relative flex items-center justify-center w-full max-w-lg mx-auto">
                {/* Manual survey lines */}
                <div className="absolute inset-0 flex items-center justify-between -z-10 opacity-30">
                  <svg className="w-full h-full" style={{ strokeDasharray: '4 4' }}>
                    <path d="M0,50 Q150,0 300,50" fill="none" stroke="#EF4444" strokeWidth="2" />
                    <path d="M0,50 Q150,100 300,50" fill="none" stroke="#EF4444" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl">
                  <AlertTriangle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-bold">Manual Surveys</div>
                    <div className="text-xs">4-8 week lag • 18% error rate</div>
                  </div>
                </div>

                <div className="mx-8 text-surface-600">
                  <ArrowRight className="w-8 h-8" />
                </div>

                <div className="flex flex-col items-center p-6 bg-surface-800 border border-surface-700 rounded-xl opacity-75">
                  <Database className="w-10 h-10 text-surface-400 mb-4" />
                  <h4 className="font-semibold text-surface-300">EA Repository</h4>
                  <span className="text-xs text-surface-500">40% Coverage</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tobe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 p-8 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                {/* Source Systems Stacked */}
                <div className="flex flex-col gap-4 w-64">
                  {[
                    { name: 'SAP PPM', icon: Briefcase, color: 'text-blue-400' },
                    { name: 'ServiceNow', icon: Server, color: 'text-emerald-400' },
                    { name: 'Signavio', icon: RefreshCcw, color: 'text-amber-400' },
                    { name: 'Apptio', icon: DollarSign, color: 'text-purple-400' }
                  ].map((sys) => (
                    <div key={sys.name} className="flex items-center gap-3 p-3 bg-surface-800 border border-surface-700 rounded-lg">
                      <sys.icon className={`w-5 h-5 ${sys.color}`} />
                      <span className="text-sm font-semibold">{sys.name}</span>
                    </div>
                  ))}
                </div>

                {/* Animated Connections */}
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
                  <div className="absolute inset-0 flex flex-col justify-evenly">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-0.5 w-full bg-gradient-to-r from-surface-700 via-emerald-500/50 to-surface-700 relative overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 bottom-0 w-20 bg-emerald-400/50 blur-md"
                          animate={{ x: ['-100%', '500%'] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* API Gateway / Validation */}
                  <div className="relative z-10 bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="font-bold text-emerald-300">Integration Hub</span>
                    <span className="text-xs text-emerald-500/70">APIM • Event Hub • DQ Engine</span>
                  </div>
                </div>

                {/* Target */}
                <div className="w-64">
                  <div className="flex flex-col items-center p-8 bg-gradient-to-br from-surface-800 to-surface-900 border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <Database className="w-12 h-12 text-emerald-400 mb-4" />
                    <h4 className="font-bold text-lg text-white"><ConceptExplainer termKey="dataMesh" position="top">EA Data Product</ConceptExplainer></h4>
                    <span className="text-sm text-emerald-400 mt-1">95% Coverage</span>
                    <span className="text-xs text-surface-400 mt-1">&lt; 4 hr latency</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
