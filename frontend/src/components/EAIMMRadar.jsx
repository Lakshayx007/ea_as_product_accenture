import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';
import { eaimm } from '../data/mockEAIMM';
import { ShieldCheck, Target, Activity } from 'lucide-react';

const levelColors = {
  'Level 1: Initial': 'text-red-500 bg-red-500/10 border-red-500/20',
  'Level 2: Managed': 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  'Level 3: Defined': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  'Level 4: Governed': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  'Level 5: Optimized': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

const formatDimensionName = (key) => {
  const mapping = {
    dataFreshness: 'Data Freshness',
    integrationCoverage: 'Coverage',
    governanceMaturity: 'Governance',
    traceabilityDepth: 'Traceability',
    automationLevel: 'Automation',
  };
  return mapping[key] || key;
};

export default function EAIMMRadar() {
  const [mode, setMode] = useState('target');

  const baselineData = Object.keys(eaimm.baseline.dimensions).map((key) => {
    return eaimm.baseline.dimensions[key].current;
  });

  const targetData = Object.keys(eaimm.target.dimensions).map((key) => {
    return eaimm.target.dimensions[key].current;
  });

  const indicator = Object.keys(eaimm.baseline.dimensions).map((key) => ({
    name: formatDimensionName(key),
    max: 5,
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#F4F4F5' },
    },
    radar: {
      indicator: indicator,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#A1A1AA',
        fontWeight: 600,
        fontSize: 12,
        fontFamily: 'Inter, sans-serif'
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.01)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.01)'],
        },
      },
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
    },
    series: [
      {
        name: 'EAIMM Score',
        type: 'radar',
        data: [
          {
            value: baselineData,
            name: 'Legacy Baseline',
            itemStyle: { color: '#EF4444' },
            lineStyle: { width: mode === 'baseline' ? 3 : 1, type: mode === 'baseline' ? 'solid' : 'dashed' },
            areaStyle: { color: mode === 'baseline' ? 'rgba(239, 68, 68, 0.2)' : 'transparent' },
          },
          {
            value: targetData,
            name: 'Target Future State',
            itemStyle: { color: '#10B981' },
            lineStyle: { width: mode === 'target' ? 3 : 1, type: mode === 'target' ? 'solid' : 'dashed' },
            areaStyle: { color: mode === 'target' ? 'rgba(16, 185, 129, 0.2)' : 'transparent' },
          },
        ],
      },
    ],
  };

  const currentScore = mode === 'baseline' ? eaimm.baseline : eaimm.target;
  const levelBadgeClass = levelColors[currentScore.level] || 'text-surface-400 bg-surface-500/10 border-surface-500/20';

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-8 shadow-lg">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-2xl font-bold text-surface-50 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            EA Integration Maturity Model
          </h2>
          <p className="mt-2 text-sm text-surface-400 max-w-2xl leading-relaxed">
            Measures the transition from a siloed, manual architecture capability (Baseline) to a fully automated, governed Data Product (Target).
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-black/40 p-1 border border-surface-700/50">
          <button
            onClick={() => setMode('baseline')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              mode === 'baseline'
                ? 'bg-red-500/20 text-red-400 shadow-sm border border-red-500/30'
                : 'text-surface-500 hover:text-surface-300'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Legacy State
          </button>
          <button
            onClick={() => setMode('target')}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              mode === 'target'
                ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30'
                : 'text-surface-500 hover:text-surface-300'
            }`}
          >
            <Target className="h-4 w-4" />
            Target State
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Radar Chart Area */}
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>

        {/* Details Area */}
        <div className="space-y-6">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-surface-700/50 bg-white/[0.02] p-6 shadow-inner"
          >
            <div className="mb-4 flex items-center justify-between border-b border-surface-700 pb-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-surface-500">
                  {mode === 'baseline' ? 'Legacy Score' : 'Target Score'}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter text-surface-50">
                    {currentScore.score}
                  </span>
                  <span className="text-xl font-medium text-surface-500">/ 25</span>
                </div>
              </div>
              <div className={`rounded-full border px-4 py-1.5 text-sm font-bold tracking-wide ${levelBadgeClass}`}>
                {currentScore.level}
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(currentScore.dimensions).map(([key, dim], idx) => {
                const title = formatDimensionName(key);
                const isTarget = mode === 'target';
                const desc = isTarget ? dim.targetDescription : dim.description;
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${
                      isTarget ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {dim.current}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-surface-200">{title}</h4>
                      <p className="mt-1 text-xs text-surface-400 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
