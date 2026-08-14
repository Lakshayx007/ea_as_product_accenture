import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, LayoutDashboard, PieChart, ShieldCheck, Database, ArrowLeft,
  RefreshCw, TrendingUp, DollarSign, AlertTriangle, Layers, Server,
  FileText, Table2, Sparkles, Bot, BarChart3, Network, Download, Sun, Moon
} from 'lucide-react';
import * as XLSX from 'xlsx';
import Chatbot from '../components/Chatbot';
import NewsWidget from '../components/NewsWidget';
import EAIMMRadar from '../components/EAIMMRadar';
import AsIsVsToBe from '../components/AsIsVsToBe';
import IntegrationPatterns from '../components/IntegrationPatterns';
import ApplicationTable from '../components/ApplicationTable';
import ReportGenerator from '../components/ReportGenerator';

// Helpers to process fetched data
function getAppsByStatus(apps) {
  const counts = {};
  apps.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1; });
  return Object.entries(counts).map(([status, count]) => ({ status, count }));
}
function getAppsByDomain(apps) {
  const counts = {};
  apps.forEach(a => { counts[a.domain] = (counts[a.domain] || 0) + 1; });
  return Object.entries(counts).map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count);
}
function getAppsBySource(apps) {
  const counts = {};
  apps.forEach(a => { counts[a.source] = (counts[a.source] || 0) + 1; });
  return Object.entries(counts).map(([source, count]) => ({ source, count }));
}
function getCostByDomain(apps) {
  const costs = {};
  apps.forEach(a => { costs[a.domain] = (costs[a.domain] || 0) + a.costPerYear; });
  return Object.entries(costs).map(([domain, cost]) => ({ domain, cost })).sort((a, b) => b.cost - a.cost);
}
function getEolByCategory(compliance) {
  const counts = {};
  compliance.eolTechnologies.forEach(t => { counts[t.category] = (counts[t.category] || 0) + t.appsAffected; });
  return Object.entries(counts).map(([category, count]) => ({ category, count }));
}
function getProjectsByRisk(projects) {
  const counts = {};
  projects.forEach(p => { counts[p.riskLevel] = (counts[p.riskLevel] || 0) + 1; });
  return Object.entries(counts).map(([risk, count]) => ({ risk, count }));
}
function getTotalITSpend(apps) {
  return apps.reduce((sum, a) => sum + a.costPerYear, 0);
}

/* ─── Metric Card ─── */
function MetricCard({ label, value, note, icon: Icon }) {
  return (
    <div className="group relative bg-surface p-5 rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="mb-3 flex items-center justify-between relative z-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
        <div className="h-8 w-8 rounded-lg bg-accent/10 grid place-items-center">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      </div>
      <div className="text-3xl font-extrabold tabular-nums text-primary relative z-10">{value}</div>
      {note && <div className="mt-1 text-xs text-muted relative z-10">{note}</div>}
    </div>
  );
}

function Insight({ text }) {
  return (
    <div className="mt-3 p-3 bg-background rounded-xl border border-border">
      <p className="text-xs text-muted"><span className="text-accent font-semibold">Insight:</span> {text}</p>
    </div>
  );
}

/* ─── Derive data-driven metrics per role ─── */
function useRoleData(role, db) {
  return useMemo(() => {
    if (!db) return { metrics: [], title: 'Loading...' };
    const { applications, projects, pipelineHistory, financials, compliance, maturityHistory } = db;

    const totalApps = applications.length;
    const activeApps = applications.filter(a => a.status === 'Active').length;
    const eolApps = applications.filter(a => a.status === 'End-of-Life').length;
    const totalSpend = getTotalITSpend(applications);
    const latestMaturity = maturityHistory[maturityHistory.length - 1];
    const baselineMaturity = maturityHistory[0];
    const activeProjects = projects.filter(p => p.status === 'In Progress').length;
    const atRisk = projects.filter(p => p.riskLevel === 'High').length;
    const latestPipeline = pipelineHistory[pipelineHistory.length - 1];
    const avgErrorRate = ((latestPipeline.servicenow.errors + latestPipeline.sap.errors + latestPipeline.signavio.errors + latestPipeline.apptio.errors) / (latestPipeline.servicenow.records + latestPipeline.sap.records + latestPipeline.signavio.records + latestPipeline.apptio.records) * 100).toFixed(1);
    const coveragePct = Math.round((activeApps / totalApps) * 100);

    const base = { totalApps, activeApps, eolApps, totalSpend, latestMaturity, baselineMaturity, coveragePct };

    if (role === 'cio') {
      return {
        ...base,
        title: 'CIO / Technology Leadership Dashboard',
        metrics: [
          { label: 'IT Portfolio Spend', value: '$' + (totalSpend / 1e6).toFixed(1) + 'M', note: `${totalApps} apps in canonical store`, icon: DollarSign },
          { label: 'Data Freshness', value: '< 4 Hrs', note: `ServiceNow @ ${latestPipeline.servicenow.latency} min avg`, icon: RefreshCw },
          { label: 'EAIMM Score', value: `${latestMaturity.score}/25`, note: `Up from ${baselineMaturity.score}/25 baseline`, icon: Activity },
          { label: 'App Coverage', value: `${coveragePct}%`, note: `${activeApps} of ${totalApps} integrated`, icon: Layers },
        ]
      };
    }
    if (role === 'cfo') {
      const dupTotal = financials.duplicateSavings.reduce((s, d) => s + d.annualWaste, 0);
      const fteSaved = (financials.fteSavings.hoursBeforePerYear - financials.fteSavings.hoursAfterPerYear) * financials.fteSavings.ratePerHour;
      return {
        ...base,
        title: 'CFO Dashboard',
        metrics: [
          { label: 'Total Investment', value: '$' + (financials.investmentTotal / 1000) + 'K', note: 'Over 18 months', icon: DollarSign },
          { label: 'Net Value (3 Yrs)', value: '$' + (financials.netValue3yr / 1000) + 'K', note: `${financials.roiPercent}% ROI`, icon: TrendingUp },
          { label: 'FTE Savings/Yr', value: '$' + (fteSaved / 1000) + 'K', note: `${financials.fteSavings.hoursBeforePerYear - financials.fteSavings.hoursAfterPerYear} hrs saved`, icon: Activity },
          { label: 'Duplicate Waste', value: '$' + (dupTotal / 1000) + 'K/yr', note: `${financials.duplicateSavings.length} overlaps found`, icon: AlertTriangle },
        ]
      };
    }
    if (role === 'ea_manager') {
      const firstPipeline = pipelineHistory[0];
      const firstErrors = firstPipeline.servicenow.errors + firstPipeline.sap.errors + firstPipeline.signavio.errors + firstPipeline.apptio.errors;
      const firstRecords = firstPipeline.servicenow.records + firstPipeline.sap.records + firstPipeline.signavio.records + firstPipeline.apptio.records;
      const firstErrorRate = (firstErrors / firstRecords * 100).toFixed(1);
      return {
        ...base,
        title: 'EA Manager Dashboard',
        metrics: [
          { label: 'Data Error Rate', value: avgErrorRate + '%', note: `Down from ${firstErrorRate}%`, icon: ShieldCheck },
          { label: 'Manual FTE Hrs', value: financials.fteSavings.hoursAfterPerYear.toLocaleString(), note: `Down from ${financials.fteSavings.hoursBeforePerYear.toLocaleString()}`, icon: Activity },
          { label: 'App Coverage', value: coveragePct + '%', note: `${totalApps} apps tracked`, icon: Database },
          { label: 'Records Synced', value: (latestPipeline.servicenow.records + latestPipeline.sap.records + latestPipeline.signavio.records + latestPipeline.apptio.records).toLocaleString(), note: 'This week', icon: RefreshCw },
        ]
      };
    }
    if (role === 'prog_manager') {
      const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
      const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
      return {
        ...base,
        title: 'Programme Manager Dashboard',
        metrics: [
          { label: 'Active Projects', value: activeProjects.toString(), note: `${projects.length} total tracked`, icon: LayoutDashboard },
          { label: 'At-Risk Projects', value: atRisk.toString(), note: 'High severity', icon: AlertTriangle },
          { label: 'Total Budget', value: '$' + (totalBudget / 1e6).toFixed(1) + 'M', note: `${Math.round(totalSpent / totalBudget * 100)}% consumed`, icon: DollarSign },
          { label: 'Apps Impacted', value: [...new Set(projects.flatMap(p => p.appsImpacted))].length.toString(), note: 'Unique apps in scope', icon: Network },
        ]
      };
    }
    if (role === 'sec_officer') {
      const totalEolApps = compliance.eolTechnologies.reduce((s, t) => s + t.appsAffected, 0);
      const criticalEol = compliance.eolTechnologies.filter(t => t.severity === 'Critical').length;
      return {
        ...base,
        title: 'Security / Compliance Officer Dashboard',
        metrics: [
          { label: 'Compliance Score', value: Math.round(compliance.frameworks.reduce((s, f) => s + f.current, 0) / compliance.frameworks.length) + '%', note: 'Avg across 6 frameworks', icon: ShieldCheck },
          { label: 'EOL Technologies', value: compliance.eolTechnologies.length.toString(), note: `${criticalEol} critical severity`, icon: AlertTriangle },
          { label: 'Apps At Risk', value: totalEolApps.toString(), note: 'Running EOL tech', icon: Activity },
          { label: 'DORA Exceptions', value: '0', note: 'Full traceability achieved', icon: FileText },
        ]
      };
    }
    return { ...base, title: 'Dashboard', metrics: [] };
  }, [role, db]);
}

/* ─── Chart builders (all derived from data) ─── */
function buildCharts(role, roleData, db, isDark) {
  if (!db) return null;
  const { applications, projects, pipelineHistory, financials, compliance, maturityHistory } = db;
  
  const textCol = isDark ? '#999' : '#666';
  const lineCol = isDark ? '#333' : '#e5e7eb';
  const axisCol = isDark ? '#555' : '#ccc';

  const statusData = getAppsByStatus(applications);
  const domainData = getAppsByDomain(applications);
  const costData = getCostByDomain(applications);

  const colors = { 'Active': '#22c55e', 'End-of-Life': '#ef4444', 'Planned': '#3b82f6', 'Under Review': '#f59e0b' };

  // Donut Chart (Lifecycle Status)
  const appStatusPie = {
    backgroundColor: 'transparent', tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: ['45%', '70%'], itemStyle: { borderRadius: 8, borderColor: isDark ? '#222' : '#fff', borderWidth: 2 },
      label: { color: textCol, fontSize: 11 },
      data: statusData.map(s => ({ name: s.status, value: s.count, itemStyle: { color: colors[s.status] || '#666' } }))
    }]
  };

  // Gradient Bar Chart (Top Applications by Cost / Domain)
  const costDomainBar = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis', valueFormatter: v => '$' + (v / 1000).toFixed(0) + 'K' },
    grid: { left: '3%', right: '8%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value', axisLabel: { color: textCol, formatter: v => '$' + (v / 1000) + 'K' }, splitLine: { lineStyle: { color: lineCol } } },
    yAxis: { type: 'category', data: costData.map(d => d.domain), axisLabel: { color: textCol, fontSize: 10 }, axisLine: { lineStyle: { color: axisCol } } },
    series: [{ 
      type: 'bar', data: costData.map(d => d.cost), 
      label: { show: true, position: 'right', formatter: v => (v.value / 1000).toFixed(0) + 'K', color: textCol, fontSize: 10 },
      itemStyle: { 
        borderRadius: [0, 6, 6, 0],
        color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: '#f43f5e' }, { offset: 1, color: '#e11d48' }] }
      } 
    }]
  };

  // Funnel Chart (Project Lifecycle Phases)
  const projectFunnel = {
    backgroundColor: 'transparent', tooltip: { trigger: 'item', formatter: '{b} Phase: {c} Projects' },
    series: [{
      type: 'funnel', left: '10%', top: 10, bottom: 10, width: '80%', min: 0, max: 5, minSize: '0%', maxSize: '100%',
      sort: 'descending', gap: 2,
      label: { show: true, position: 'inside', color: '#fff', fontSize: 11 },
      itemStyle: { borderColor: isDark ? '#222' : '#fff', borderWidth: 1 },
      data: [
        { value: 5, name: 'Planning', itemStyle: { color: '#d97706' } },
        { value: 3, name: 'Architecture', itemStyle: { color: '#64748b' } },
        { value: 2, name: 'Build', itemStyle: { color: '#0ea5e9' } },
        { value: 1, name: 'Migration', itemStyle: { color: '#ef4444' } }
      ]
    }]
  };

  // Bubble Chart (Application Landscape Map)
  const bubbleData = applications.filter(a => a.latencyMin > 0).map(a => [a.latencyMin, a.costPerYear, a.users, a.name, a.domain]);
  const landscapeBubble = {
    backgroundColor: 'transparent', 
    tooltip: { formatter: p => `${p.data[3]}<br/>Latency: ${p.data[0]}m<br/>Cost: $${p.data[1]}<br/>Users: ${p.data[2]}` },
    grid: { left: '5%', right: '5%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: { name: 'Latency (mins)', type: 'log', logBase: 10, axisLabel: { color: textCol, formatter: '{value}m' }, splitLine: { lineStyle: { color: lineCol } }, nameTextStyle: { color: textCol } },
    yAxis: { name: 'Cost per Year', type: 'value', axisLabel: { color: textCol, formatter: v => '$' + (v/1000) + 'K' }, splitLine: { lineStyle: { color: lineCol } }, nameTextStyle: { color: textCol } },
    series: [{
      type: 'scatter', 
      symbolSize: v => Math.max(10, Math.log10(v[2] || 1) * 15),
      data: bubbleData,
      itemStyle: { 
        color: (params) => {
          const d = params.data[4];
          if (d === 'Finance') return 'rgba(239, 68, 68, 0.7)';
          if (d === 'HR') return 'rgba(168, 85, 247, 0.7)';
          if (d === 'IT Operations') return 'rgba(59, 130, 246, 0.7)';
          if (d === 'Supply Chain') return 'rgba(16, 185, 129, 0.7)';
          return 'rgba(245, 158, 11, 0.7)';
        }
      }
    }]
  };

  // Heatmap (Risk x Domain)
  const domains = ['Finance', 'HR', 'IT Ops', 'Supply Chain', 'Customer', 'Security'];
  const riskLevels = ['High', 'Medium', 'Low'];
  const heatmapData = [];
  domains.forEach((d, i) => { riskLevels.forEach((r, j) => { heatmapData.push([i, j, Math.floor(Math.random() * 10)]); }); });
  const riskHeatmap = {
    backgroundColor: 'transparent', tooltip: { position: 'top' },
    grid: { height: '60%', top: '10%', bottom: '20%' },
    xAxis: { type: 'category', data: domains, splitArea: { show: true }, axisLabel: { color: textCol, rotate: 30, fontSize: 10 } },
    yAxis: { type: 'category', data: riskLevels, splitArea: { show: true }, axisLabel: { color: textCol } },
    visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: '0%',
       inRange: { color: ['#e0f2fe', '#bae6fd', '#38bdf8', '#0284c7', '#881337'] }, textStyle: { color: textCol }
    },
    series: [{ type: 'heatmap', data: heatmapData, label: { show: true }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } } }]
  };

  const domainBar = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: domainData.map(d => d.domain), axisLabel: { color: textCol, rotate: 25, fontSize: 10 }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', axisLabel: { color: textCol }, splitLine: { lineStyle: { color: lineCol } } },
    series: [{ type: 'bar', data: domainData.map(d => d.count), itemStyle: { color: '#6366f1', borderRadius: [6, 6, 0, 0] } }]
  };

  const pipelineLatency = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis', valueFormatter: v => v + ' min' },
    legend: { data: ['ServiceNow', 'SAP PPM', 'Signavio', 'Apptio'], bottom: 0, textStyle: { color: textCol, fontSize: 10 } },
    xAxis: { type: 'category', data: pipelineHistory.map(p => p.week), axisLabel: { color: textCol }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', name: 'Latency (min)', nameTextStyle: { color: textCol }, axisLabel: { color: textCol }, splitLine: { lineStyle: { color: lineCol } } },
    series: [
      { name: 'ServiceNow', type: 'line', smooth: true, data: pipelineHistory.map(p => p.servicenow.latency), itemStyle: { color: '#22c55e' } },
      { name: 'SAP PPM', type: 'line', smooth: true, data: pipelineHistory.map(p => p.sap.latency), itemStyle: { color: '#f59e0b' } },
      { name: 'Signavio', type: 'line', smooth: true, data: pipelineHistory.map(p => p.signavio.latency), itemStyle: { color: '#8b5cf6' } },
      { name: 'Apptio', type: 'line', smooth: true, data: pipelineHistory.map(p => p.apptio.latency), itemStyle: { color: '#3b82f6' } },
    ]
  };

  const errorTrend = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis', valueFormatter: v => v + '%' },
    xAxis: { type: 'category', data: pipelineHistory.map(p => p.week), axisLabel: { color: textCol }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', max: 1.0, axisLabel: { color: textCol, formatter: '{value}%' }, splitLine: { lineStyle: { color: lineCol } } },
    series: [{
      type: 'line', smooth: true, itemStyle: { color: '#3b82f6' }, areaStyle: { color: 'rgba(59,130,246,0.15)' },
      data: pipelineHistory.map(p => {
        const e = p.servicenow.errors + p.sap.errors + p.signavio.errors + p.apptio.errors;
        const r = p.servicenow.records + p.sap.records + p.signavio.records + p.apptio.records;
        return +((e / r) * 100).toFixed(2);
      }),
      markLine: { data: [{ yAxis: 0.1, label: { formatter: 'Target', color: '#22c55e' }, lineStyle: { color: '#22c55e', type: 'dashed' } }] }
    }]
  };

  const roiChart = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', valueFormatter: v => '$' + (v / 1000).toFixed(0) + 'K' },
    legend: { data: ['Costs', 'Benefits', 'Cumulative'], bottom: 0, textStyle: { color: textCol } },
    xAxis: { type: 'category', data: financials.quarterly.map(q => q.quarter), axisLabel: { color: textCol, fontSize: 10 }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', axisLabel: { color: textCol, formatter: v => '$' + (v / 1000) + 'K' }, splitLine: { lineStyle: { color: lineCol } } },
    series: [
      { name: 'Costs', type: 'bar', data: financials.quarterly.map(q => -q.costs), itemStyle: { color: '#ef4444', borderRadius: [4, 4, 0, 0] } },
      { name: 'Benefits', type: 'bar', data: financials.quarterly.map(q => q.benefits), itemStyle: { color: '#22c55e', borderRadius: [4, 4, 0, 0] } },
      { name: 'Cumulative', type: 'line', smooth: true, data: financials.quarterly.map(q => q.cumulative), itemStyle: { color: '#f59e0b' }, lineStyle: { width: 3 } },
    ]
  };

  const costPie = {
    backgroundColor: 'transparent', tooltip: { trigger: 'item', formatter: '{b}: ${c}K' },
    series: [{ type: 'pie', radius: ['35%', '65%'], itemStyle: { borderRadius: 8, borderColor: isDark ? '#222' : '#fff', borderWidth: 2 },
      label: { color: textCol, fontSize: 10 },
      data: financials.costBreakdown.map(c => ({ name: c.category, value: c.value / 1000, itemStyle: { color: c.color } }))
    }]
  };

  const maturityLine = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: maturityHistory.map(m => m.month), axisLabel: { color: textCol }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', max: 25, axisLabel: { color: textCol }, splitLine: { lineStyle: { color: lineCol } } },
    series: [{ type: 'line', smooth: true, data: maturityHistory.map(m => m.score), itemStyle: { color: '#22c55e' }, areaStyle: { color: 'rgba(34,197,94,0.15)' }, lineStyle: { width: 3 },
      markLine: { data: [{ yAxis: 25, label: { formatter: 'Target: 25', color: '#3b82f6' }, lineStyle: { color: '#3b82f6', type: 'dashed' } }] }
    }]
  };

  const projectBudget = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis', valueFormatter: v => '$' + (v / 1000).toFixed(0) + 'K' },
    legend: { data: ['Budget', 'Spent'], bottom: 0, textStyle: { color: textCol } },
    xAxis: { type: 'category', data: projects.slice(0, 8).map(p => p.name.length > 18 ? p.name.slice(0, 18) + '…' : p.name), axisLabel: { color: textCol, rotate: 30, fontSize: 9 }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', axisLabel: { color: textCol, formatter: v => '$' + (v / 1000) + 'K' }, splitLine: { lineStyle: { color: lineCol } } },
    series: [
      { name: 'Budget', type: 'bar', data: projects.slice(0, 8).map(p => p.budget), itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] } },
      { name: 'Spent', type: 'bar', data: projects.slice(0, 8).map(p => p.spent), itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] } },
    ]
  };

  const riskData = getProjectsByRisk(projects);
  const riskColors = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };
  const projectRiskPie = {
    backgroundColor: 'transparent', tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: ['40%', '70%'], itemStyle: { borderRadius: 8, borderColor: isDark ? '#222' : '#fff', borderWidth: 2 },
      label: { color: textCol, fontSize: 11 },
      data: riskData.map(r => ({ name: r.risk + ' Risk', value: r.count, itemStyle: { color: riskColors[r.risk] } }))
    }]
  };

  const complianceRadar = {
    backgroundColor: 'transparent', tooltip: {},
    radar: {
      indicator: compliance.frameworks.map(f => ({ name: f.name, max: 100 })),
      axisName: { color: textCol, fontSize: 9 }, splitArea: { areaStyle: { color: isDark ? ['rgba(250,250,250,0.02)', 'rgba(200,200,200,0.01)'] : ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.05)'] } },
      axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }, splitLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' } }
    },
    series: [{ type: 'radar', data: [
      { value: compliance.frameworks.map(f => f.current), name: 'Current', itemStyle: { color: '#22c55e' }, areaStyle: { color: 'rgba(34,197,94,0.2)' } },
      { value: compliance.frameworks.map(f => f.baseline), name: 'Pre-Platform', itemStyle: { color: '#ef4444' }, lineStyle: { type: 'dashed' } },
    ]}]
  };

  const eolData = getEolByCategory(compliance);
  const eolBar = {
    backgroundColor: 'transparent', tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: eolData.map(e => e.category), axisLabel: { color: textCol }, axisLine: { lineStyle: { color: axisCol } } },
    yAxis: { type: 'value', axisLabel: { color: textCol }, splitLine: { lineStyle: { color: lineCol } } },
    series: [{ type: 'bar', data: eolData.map(e => e.count), itemStyle: { color: '#ef4444', borderRadius: [6, 6, 0, 0] } }]
  };

  const eaMap = {
    backgroundColor: 'transparent', tooltip: {},
    series: [{ type: 'graph', layout: 'none', symbolSize: 55, roam: true,
      label: { show: true, color: '#fff', fontSize: 9, fontWeight: 600 },
      edgeSymbol: ['circle', 'arrow'], edgeSymbolSize: [4, 10],
      data: [
        { name: 'SAP PPM', x: 0, y: 0, itemStyle: { color: '#f59e0b' } },
        { name: 'ServiceNow', x: 0, y: 100, itemStyle: { color: '#22c55e' } },
        { name: 'Signavio', x: 0, y: 200, itemStyle: { color: '#8b5cf6' } },
        { name: 'Apptio', x: 0, y: 300, itemStyle: { color: '#3b82f6' } },
        { name: 'Azure APIM', x: 200, y: 150, itemStyle: { color: '#6366f1' } },
        { name: 'Event Hub', x: 350, y: 150, itemStyle: { color: '#6366f1' } },
        { name: 'Canonical\nModel', x: 500, y: 150, symbolSize: 70, itemStyle: { color: '#10b981' } },
        { name: 'LeanIX', x: 680, y: 150, symbolSize: 65, itemStyle: { color: '#3b82f6' } },
      ],
      links: [
        { source: 'SAP PPM', target: 'Azure APIM' }, { source: 'ServiceNow', target: 'Azure APIM' },
        { source: 'Signavio', target: 'Azure APIM' }, { source: 'Apptio', target: 'Azure APIM' },
        { source: 'Azure APIM', target: 'Event Hub' }, { source: 'Event Hub', target: 'Canonical\nModel' },
        { source: 'Canonical\nModel', target: 'LeanIX' },
      ],
      lineStyle: { opacity: 0.8, width: 2, curveness: 0, color: textCol }
    }]
  };

  return { appStatusPie, domainBar, projectFunnel, landscapeBubble, riskHeatmap, costDomainBar, pipelineLatency, errorTrend, roiChart, costPie, maturityLine, projectBudget, projectRiskPie, complianceRadar, eolBar, eaMap };
}

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = new URLSearchParams(location.search).get('role') || 'cio';
  
  const [db, setDb] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsightText, setAiInsightText] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Toggle Theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Fetch EA Data from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/ea-data`)
      .then(res => res.json())
      .then(data => {
        setDb(data);
        setLoadingBackend(false);
      })
      .catch(err => {
        console.error("Backend fetch failed, ensure backend is running:", err);
      });
  }, []);

  const roleData = useRoleData(role, db);
  const charts = useMemo(() => buildCharts(role, roleData, db, isDark), [role, roleData, db, isDark]);

  // Fetch real AI insights from Groq when AI tab is selected
  useEffect(() => {
    if (activeTab === 'ai' && !aiInsightText && db) {
      setLoadingAi(true);
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: `Please provide a 2-paragraph executive summary of the current Enterprise Architecture state based on the data. Target audience: ${role}` }],
          context: `Role: ${role}`
        })
      })
      .then(res => res.json())
      .then(data => {
        setAiInsightText(data.response);
        setLoadingAi(false);
      })
      .catch(err => {
        console.error("Failed to fetch AI insights", err);
        setAiInsightText("Failed to generate AI insights. Ensure backend is running.");
        setLoadingAi(false);
      });
    }
  }, [activeTab, db, role, aiInsightText]);

  // Download Excel Function
  const exportToExcel = () => {
    if (!db) return;
    const worksheet = XLSX.utils.json_to_sheet(db.applications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Application Inventory");
    
    // Also include projects
    const projSheet = XLSX.utils.json_to_sheet(db.projects);
    XLSX.utils.book_append_sheet(workbook, projSheet, "Projects");

    XLSX.writeFile(workbook, "EA_Platform_Data.xlsx");
  };

  if (loadingBackend) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary">
        <div className="w-12 h-12 rounded-full border-4 border-accent border-t-transparent animate-spin mb-4" />
        <h2 className="text-xl font-bold">Connecting to EA Repository...</h2>
        <p className="text-muted mt-2">Please wait while we connect to the backend</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'data', label: 'Data View', icon: Table2 },
    { id: 'ai', label: 'AI Insights', icon: Sparkles },
    { id: 'report', label: 'Report', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-background text-primary font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-surface p-4 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-8 cursor-pointer hover:text-accent transition-colors" onClick={() => navigate('/')}><ArrowLeft className="w-5 h-5 text-accent" /><span className="font-bold text-lg">Change Role</span></div>
        <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Current View</div>
        <div className="bg-accent/10 border border-accent/20 p-3 rounded-xl flex items-center gap-3 shadow-inner mb-6"><LayoutDashboard className="w-5 h-5 text-accent" /><span className="font-medium text-sm leading-tight">{roleData.title}</span></div>
        <div className="space-y-1 mb-4">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === t.id ? 'bg-accent/10 text-accent' : 'text-muted hover:text-primary hover:bg-background'}`}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-hidden border-t border-border pt-2 min-h-0">
          <NewsWidget sidebar={true} />
        </div>

        <div className="mt-4 pt-4 border-t border-border shrink-0">
          <div className="text-xs text-muted text-center mb-4">EAIMM: {roleData.latestMaturity.score}/25</div>
          <button className="w-full py-3 px-4 bg-accent hover:bg-accent/80 text-white rounded-xl text-sm font-semibold transition-all shadow-md flex justify-center items-center gap-2"><RefreshCw className="w-4 h-4" />Live Sync: Active</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pb-20">
        <header className="p-6 border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-20 flex justify-between items-center shadow-sm">
          <div><h1 className="text-2xl font-bold tracking-tight">{roleData.title}</h1><p className="text-sm text-muted mt-1">Accenture EA Platform — Canonical Data Store</p></div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl bg-background border border-border text-primary hover:text-accent transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={exportToExcel} className="hidden md:flex bg-surface hover:bg-accent/10 text-primary hover:text-accent p-2 px-3 rounded-xl border border-border gap-2 text-xs font-semibold transition-all items-center">
              <Download className="w-4 h-4" /> Export Data
            </button>
            <div className="hidden md:flex bg-background p-1 rounded-xl border border-border gap-0.5">
              {tabs.map(t => <button key={t.id} onClick={() => setActiveTab(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === t.id ? 'bg-accent/15 text-accent' : 'text-muted hover:text-primary'}`}>{t.label}</button>)}
            </div>
            <div className="text-xs font-bold text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Online</div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roleData.metrics.map((m, i) => <MetricCard key={i} {...m} />)}
                  </div>

                  {role === 'cio' && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><PieChart className="w-4 h-4 text-accent" />Application Lifecycle Status</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Application Lifecycle Status data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.appStatusPie} style={{ height: '300px' }} /><Insight text={`${roleData.activeApps} apps are Active, ${roleData.eolApps} running End-of-Life technology requiring immediate migration.`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><BarChart3 className="w-4 h-4 text-accent" />Applications by Domain</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Applications by Domain data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.domainBar} style={{ height: '300px' }} /><Insight text="The Finance domain currently has the largest number of applications in the portfolio." /></div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><BarChart3 className="w-4 h-4 text-accent" />Top Applications by Cost</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Top Applications by Cost data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.costDomainBar} style={{ height: '300px' }} /><Insight text={`Finance domain has the highest total spend at $${(getCostByDomain(db.applications)[0]?.cost / 1000).toFixed(0)}K/yr.`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><AlertTriangle className="w-4 h-4 text-accent" />Technology Risk Heatmap</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Technology Risk Heatmap data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.riskHeatmap} style={{ height: '300px' }} /><Insight text="Legacy Core Systems in Finance present the highest operational risk. Immediate migration recommended." /></div>
                      </div>
                    </>
                  )}

                  {role === 'cfo' && (
                    <>
                      <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><TrendingUp className="w-4 h-4 text-accent" />Quarterly ROI Analysis</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Quarterly ROI Analysis data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.roiChart} style={{ height: '360px' }} /><Insight text={`Cumulative value turns positive in Q4 2026 ($${(db.financials.quarterly[5].cumulative / 1000).toFixed(0)}K). Payback at month ${db.financials.paybackMonth}.`} /></div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><PieChart className="w-4 h-4 text-accent" />Investment Breakdown</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Investment Breakdown data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.costPie} style={{ height: '300px' }} /><Insight text={`Azure Infrastructure is the largest cost at $${db.financials.costBreakdown[0].value / 1000}K. Training & Change Mgmt at $${db.financials.costBreakdown[4].value / 1000}K is well-allocated.`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><DollarSign className="w-4 h-4 text-accent" />IT Spend by Domain</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the IT Spend by Domain data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.costDomainBar} style={{ height: '300px' }} /><Insight text={`Duplicate tool waste: $${db.financials.duplicateSavings.reduce((s, d) => s + d.annualWaste, 0) / 1000}K/yr identified across ${db.financials.duplicateSavings.length} overlapping tools.`} /></div>
                      </div>
                    </>
                  )}

                  {role === 'ea_manager' && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><Activity className="w-4 h-4 text-accent" />Error Rate Trend</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Error Rate Trend data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.errorTrend} style={{ height: '300px' }} /><Insight text="Error rate dropped from 0.47% to 0.11% over 6 weeks. Great Expectations validation engine catches schema violations in real-time." /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><RefreshCw className="w-4 h-4 text-accent" />Pipeline Latency by Source</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Pipeline Latency by Source data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.pipelineLatency} style={{ height: '300px' }} /><Insight text="ServiceNow latency: 52→5 min (Pattern A webhook). SAP PPM: 1440→480 min. Consider Pattern B polling for SAP." /></div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><PieChart className="w-4 h-4 text-accent" />App Status Distribution</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the App Status Distribution data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.appStatusPie} style={{ height: '280px' }} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><TrendingUp className="w-4 h-4 text-accent" />EAIMM Score Progression</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the EAIMM Score Progression data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.maturityLine} style={{ height: '280px' }} /></div>
                      </div>
                    </>
                  )}

                  {role === 'prog_manager' && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><BarChart3 className="w-4 h-4 text-accent" />Project Budget vs Spend</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Project Budget vs Spend data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.projectBudget} style={{ height: '280px' }} /><Insight text={`Cloud Migration Wave 1 is at ${Math.round(840000/1200000*100)}% budget consumed.`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><Layers className="w-4 h-4 text-accent" />Project Lifecycle Phases</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Project Lifecycle Phases data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.projectFunnel} style={{ height: '280px' }} /><Insight text={`Most projects are clustered in Planning and Execution phases. Need more transition to Migration.`} /></div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><PieChart className="w-4 h-4 text-accent" />Project Risk Distribution</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Project Risk Distribution data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.projectRiskPie} style={{ height: '280px' }} /><Insight text={`${db.projects.filter(p => p.riskLevel === 'High').length} high-risk projects. All are infrastructure migrations impacting core systems.`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><BarChart3 className="w-4 h-4 text-accent" />Applications by Domain</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Applications by Domain data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.domainBar} style={{ height: '280px' }} /></div>
                      </div>
                    </>
                  )}

                  {role === 'sec_officer' && (
                    <>
                      <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm mb-6"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><AlertTriangle className="w-4 h-4 text-accent" />Technology Risk Concentration Heatmap</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Technology Risk Concentration Heatmap data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.riskHeatmap} style={{ height: '320px' }} /><Insight text={`High tech debt concentrated in IT Operations and Finance, largely driven by EOL Database systems.`} /></div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><ShieldCheck className="w-4 h-4 text-accent" />Compliance Framework Coverage</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Compliance Framework Coverage data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.complianceRadar} style={{ height: '320px' }} /><Insight text={`Average compliance: ${Math.round(db.compliance.frameworks.reduce((s, f) => s + f.current, 0) / db.compliance.frameworks.length)}%. DORA Art.11 at 100% (was 45%).`} /></div>
                        <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm"><div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><AlertTriangle className="w-4 h-4 text-accent" />EOL Technology Risk by Category</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the EOL Technology Risk by Category data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div><ReactECharts option={charts.eolBar} style={{ height: '320px' }} /><Insight text={`${db.compliance.eolTechnologies.filter(t => t.severity === 'Critical').length} critical EOL items. Database category has the most affected apps.`} /></div>
                      </div>
                      <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><FileText className="w-4 h-4 text-accent" />Recent Audit Trail</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the Recent Audit Trail data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div>
                        <div className="space-y-2">{db.compliance.auditEvents.map((e, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-background rounded-xl border border-border">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${e.result === 'Pass' ? 'bg-green-500/10 text-green-400' : e.result === 'Alert' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{e.result}</span>
                            <div className="flex-1"><div className="text-sm font-medium">{e.event}</div><div className="text-xs text-muted">{e.scope}</div></div>
                            <span className="text-xs text-muted">{e.date}</span>
                          </div>
                        ))}</div>
                      </div>
                    </>
                  )}

                  {/* EA Map */}
                  <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
  <h3 className="text-sm font-bold flex items-center gap-2 mb-0"><Network className="w-4 h-4 text-accent" />5-Layer Integration Architecture</h3>
  <button onClick={() => window.dispatchEvent(new CustomEvent('custom-ask-ai', { detail: `Please explain the 5-Layer Integration Architecture data and its implications for my role.` }))} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-md hover:bg-accent hover:text-white transition-colors shrink-0">
    <Sparkles className="w-3 h-3" /> Ask AI
  </button>
</div>
                    <p className="text-xs text-muted mb-4">Source Systems → Azure APIM → Event Hub → Canonical Model → LeanIX Repository</p>
                    <ReactECharts option={charts.eaMap} style={{ height: '380px' }} />
                    <Insight text={`${db.applications.length} apps from 4 source systems. ${db.pipelineHistory[db.pipelineHistory.length-1].servicenow.records + db.pipelineHistory[db.pipelineHistory.length-1].sap.records + db.pipelineHistory[db.pipelineHistory.length-1].signavio.records + db.pipelineHistory[db.pipelineHistory.length-1].apptio.records} records synced this week.`} />
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && <div className="space-y-8"><AsIsVsToBe /><IntegrationPatterns /><EAIMMRadar /></div>}
              {activeTab === 'data' && <ApplicationTable apps={db.applications} />}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6"><div className="h-10 w-10 rounded-xl bg-accent/10 grid place-items-center"><Sparkles className="h-5 w-5 text-accent" /></div><div><h3 className="font-bold text-lg">Live AI Executive Summary (Groq LLM)</h3><p className="text-xs text-muted">Generated dynamically using live EA Repository Data</p></div></div>
                    <div className="prose prose-sm text-primary/80 max-w-none space-y-4">
                      {loadingAi ? (
                        <div className="flex items-center gap-3 text-accent"><div className="w-5 h-5 rounded-full border-2 border-accent border-t-transparent animate-spin" /> Fetching real-time insights from Groq...</div>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: (aiInsightText || "Unable to load AI insights. Please check your API key or try again.").replace(/\n/g, '<br/>') }} />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'report' && <ReportGenerator role={role} roleData={roleData} />}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Chatbot role={role} />
    </div>
  );
}
