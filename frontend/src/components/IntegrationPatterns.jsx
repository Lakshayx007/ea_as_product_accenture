import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Database, ArrowRight, ShieldCheck, FileJson, Server } from 'lucide-react';

export default function IntegrationPatterns() {
  const [activePattern, setActivePattern] = useState('A');

  const patterns = {
    A: {
      id: 'A',
      title: 'Pattern A: Event-Driven Webhook',
      subtitle: 'ServiceNow CMDB',
      latency: '< 1 hour',
      freshness: 'High Velocity',
      description: 'Change fires webhook to APIM gateway, routes through Event Hub to Azure Function subscriber. Designed for high-frequency operational systems where immediate traceability is critical.',
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      color: 'emerald'
    },
    B: {
      id: 'B',
      title: 'Pattern B: Scheduled REST Polling',
      subtitle: 'Signavio BPM',
      latency: '< 6 hours',
      freshness: 'Medium Velocity',
      description: 'Timer-triggered Azure Function polls REST API periodically. Uses delta detection via hash comparison to submit only changed records to the Canonical Schema.',
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      color: 'blue'
    },
    C: {
      id: 'C',
      title: 'Pattern C: Batch ETL Pipeline',
      subtitle: 'SAP PPM & Apptio',
      latency: '< 24 hours',
      freshness: 'Low Velocity',
      description: 'Nightly Azure Data Factory pipeline extracts via OData or file export, transforms against the canonical schema, and bulk loads into the EA Repository. Ideal for strategic planning data.',
      icon: <Database className="w-6 h-6 text-purple-400" />,
      color: 'purple'
    }
  };

  const getThemeColor = (color) => {
    switch (color) {
      case 'emerald': return 'from-emerald-500/20 to-emerald-900/20 border-emerald-500/50 text-emerald-400';
      case 'blue': return 'from-blue-500/20 to-blue-900/20 border-blue-500/50 text-blue-400';
      case 'purple': return 'from-purple-500/20 to-purple-900/20 border-purple-500/50 text-purple-400';
      default: return '';
    }
  };

  const getFlowAnimation = (patternId) => {
    switch (patternId) {
      case 'A':
        return (
          <div className="flex items-center justify-between w-full h-48 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-700 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Server className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">ServiceNow</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">APIM & Event Hub</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Database className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">EA Data Product</span>
            </div>
          </div>
        );
      case 'B':
        return (
          <div className="flex items-center justify-between w-full h-48 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-700 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/3 h-full bg-gradient-to-l from-transparent via-blue-500 to-transparent"
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Server className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">Signavio BPM</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-blue-500/30">
              <Clock className="w-8 h-8 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Timer Polling (6h)</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <FileJson className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">Delta Hash Check</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Database className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">EA Data Product</span>
            </div>
          </div>
        );
      case 'C':
        return (
          <div className="flex items-center justify-between w-full h-48 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-700 -translate-y-1/2 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Server className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">SAP / Apptio</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-purple-500/30">
              <Database className="w-8 h-8 text-purple-400" />
              <span className="text-xs font-medium text-purple-400">Azure Data Factory</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-2 bg-surface-800 p-4 rounded-xl border border-surface-700">
              <Database className="w-8 h-8 text-surface-300" />
              <span className="text-xs font-medium text-surface-300">EA Data Product</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-surface-900 border border-surface-700 rounded-3xl p-8 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-surface-50 mb-2">Integration Patterns</h2>
          <p className="text-surface-400">Matched to source system API maturity and velocity</p>
        </div>
        <div className="flex bg-surface-800 p-1 rounded-full border border-surface-700">
          {['A', 'B', 'C'].map(key => (
            <button
              key={key}
              onClick={() => setActivePattern(key)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activePattern === key 
                  ? 'bg-surface-700 text-surface-50 shadow-md' 
                  : 'text-surface-400 hover:text-surface-200'
              }`}
            >
              Pattern {key}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {Object.values(patterns).map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => setActivePattern(pattern.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                activePattern === pattern.id 
                  ? `bg-gradient-to-br ${getThemeColor(pattern.color)} shadow-lg scale-105` 
                  : 'bg-surface-800 border-surface-700 text-surface-400 hover:bg-surface-700/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${activePattern === pattern.id ? 'bg-surface-900/50' : 'bg-surface-700'}`}>
                  {pattern.icon}
                </div>
                <div>
                  <h3 className={`font-bold ${activePattern === pattern.id ? '' : 'text-surface-200'}`}>
                    {pattern.title}
                  </h3>
                  <p className="text-xs opacity-80">{pattern.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <motion.div
            key={activePattern}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full bg-surface-800 border border-surface-700 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-surface-50 mb-2">{patterns[activePattern].title}</h3>
                <p className="text-surface-300">{patterns[activePattern].description}</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-900 text-surface-300 rounded-full text-xs font-semibold border border-surface-700">
                  Latency: {patterns[activePattern].latency}
                </span>
                <span className="px-3 py-1 bg-surface-900 text-surface-300 rounded-full text-xs font-semibold border border-surface-700">
                  {patterns[activePattern].freshness}
                </span>
              </div>
            </div>

            <div className="flex-1 bg-surface-900/50 rounded-xl border border-surface-700 p-8 flex items-center justify-center">
              {getFlowAnimation(activePattern)}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
