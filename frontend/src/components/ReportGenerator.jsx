import React from 'react';
import { FileDown, Printer, TrendingUp, Award, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * ReportGenerator Component
 * 
 * Generates an Enterprise Architecture Intelligence Report for a given role.
 * Includes KPI metrics, EAIMM maturity scores, integration coverage progress,
 * key architectural recommendations, and window.print() capabilities.
 * 
 * @param {Object} props
 * @param {string} props.role - Current active EA role identifier
 * @param {Object} props.roleData - Role data including title and metrics array
 */
export default function ReportGenerator({ role, roleData }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedRoleName = role
    ? role.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    : 'Enterprise Architect';

  const roleTitle = roleData?.title || `${formattedRoleName} Executive Brief`;

  // Fallback metrics if roleData.metrics is empty or not provided
  const metricsList = (roleData?.metrics && roleData.metrics.length > 0)
    ? roleData.metrics
    : [
        { label: 'EAIMM Overall Score', value: '22 / 25', change: '+13 pts target', trend: 'up' },
        { label: 'Integration Coverage', value: '95%', change: 'Target (vs 40% Baseline)', trend: 'up' },
        { label: 'Cloud-Native Adoption', value: '78%', change: '+24% YoY', trend: 'up' },
        { label: 'Tech Debt Mitigation', value: '64%', change: '-36% legacy risk', trend: 'up' }
      ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const domainMaturity = [
    { domain: 'Business Architecture', baseline: 2.0, target: 4.5, max: 5 },
    { domain: 'Data Architecture', baseline: 1.5, target: 4.5, max: 5 },
    { domain: 'Application Architecture', baseline: 2.0, target: 4.5, max: 5 },
    { domain: 'Technology Architecture', baseline: 2.0, target: 4.0, max: 5 },
    { domain: 'Governance & Security', baseline: 1.5, target: 4.5, max: 5 }
  ];

  const keyRecommendations = [
    'Transition legacy point-to-point interfaces to an Event-Driven Mesh architecture to achieve the target 95% integration coverage.',
    'Implement TOGAF ADM governance gates across Phase C (Information Systems) & Phase D (Technology) to elevate overall EAIMM score from 9/25 to 22/25.',
    'Establish an Enterprise Data Fabric & API Service Catalog with automated schema discovery to reduce tech debt and increase interoperability.',
    'Execute phased retirement of high-risk monolithic assets identified in architectural audits to improve cloud-native readiness.'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8 bg-surface text-primary border border-border rounded-xl shadow-lg print:shadow-none print:border-none print:p-0">
      {/* Top Action Bar (Hidden during print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border print:hidden">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Executive Report Generator
          </h2>
          <p className="text-xs text-muted">
            Export or print structured architecture intelligence insights for leadership review.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-accent/10 text-accent border border-accent/30 rounded-lg text-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent/90 rounded-lg text-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <FileDown className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Report Paper Container */}
      <div className="p-6 md:p-8 bg-surface rounded-lg border border-border space-y-8 print:p-0 print:border-none">
        {/* Report Header */}
        <header className="border-b border-border pb-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
              Accenture Enterprise Architecture
            </div>
            <div className="text-xs font-medium text-muted">
              Generated: <span className="text-primary font-semibold">{currentDate}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
            Accenture EA Platform — Intelligence Report
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted pt-1">
            <div>
              <span className="font-semibold text-primary">Role Context:</span>{' '}
              <span className="text-accent font-medium">{roleTitle}</span>
            </div>
            <span className="hidden md:inline">•</span>
            <div>
              <span className="font-semibold text-primary">Role ID:</span>{' '}
              <code className="px-2 py-0.5 bg-surface border border-border rounded text-accent font-mono text-xs">
                {role || 'enterprise_architect'}
              </code>
            </div>
          </div>
        </header>

        {/* Section 1: KPI Summary Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Key Performance Indicators
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricsList.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface border border-border rounded-lg shadow-sm flex flex-col justify-between space-y-2"
              >
                <div className="text-xs font-medium text-muted uppercase tracking-wider">
                  {metric.label || metric.title || `Metric ${idx + 1}`}
                </div>
                <div className="text-2xl font-extrabold text-primary tracking-tight">
                  {metric.value}
                </div>
                {(metric.change || metric.trend || metric.subtext) && (
                  <div className="text-xs font-semibold text-accent flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{metric.change || metric.subtext || metric.trend}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Architecture Maturity Summary */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
            <Award className="w-5 h-5 text-accent" />
            Architecture Maturity Summary
          </h2>

          <div className="p-5 bg-surface border border-border rounded-lg space-y-6">
            {/* Top Score Comparison Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-b border-border/60 pb-5">
              <div className="p-3 bg-surface/50 border border-border rounded-lg">
                <div className="text-xs font-semibold text-muted uppercase">Baseline EAIMM Score</div>
                <div className="text-3xl font-black text-primary mt-1">9 / 25</div>
                <div className="text-xs text-muted mt-0.5">Initial State (36%)</div>
              </div>
              
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xs font-semibold text-accent uppercase">Target Elevation</div>
                <div className="text-2xl font-black text-accent mt-1 flex items-center gap-1">
                  +13 Pts <ArrowRight className="w-5 h-5" />
                </div>
                <div className="text-xs text-accent font-medium mt-0.5">+144% Maturity Growth</div>
              </div>

              <div className="p-3 bg-surface/50 border border-border rounded-lg">
                <div className="text-xs font-semibold text-accent uppercase">Target EAIMM Score</div>
                <div className="text-3xl font-black text-accent mt-1">22 / 25</div>
                <div className="text-xs text-muted mt-0.5">Target State (88%)</div>
              </div>
            </div>

            {/* Domain Score Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                TOGAF Domain Breakdown (Baseline vs Target Score)
              </h3>
              <div className="space-y-3">
                {domainMaturity.map((item) => {
                  const baselinePercent = (item.baseline / item.max) * 100;
                  const targetPercent = (item.target / item.max) * 100;

                  return (
                    <div key={item.domain} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-primary font-semibold">{item.domain}</span>
                        <span className="text-muted">
                          Baseline: <strong className="text-primary">{item.baseline}</strong> / Target:{' '}
                          <strong className="text-accent">{item.target}</strong>
                        </span>
                      </div>
                      <div className="h-3 w-full bg-surface border border-border rounded-full overflow-hidden relative">
                        {/* Target Bar (Background indicator) */}
                        <div
                          className="h-full bg-accent/30 rounded-full absolute left-0 top-0 transition-all duration-300"
                          style={{ width: `${targetPercent}%` }}
                        />
                        {/* Baseline Bar (Foreground) */}
                        <div
                          className="h-full bg-accent rounded-full absolute left-0 top-0 transition-all duration-300"
                          style={{ width: `${baselinePercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Integration Coverage */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
            <Layers className="w-5 h-5 text-accent" />
            Integration Coverage
          </h2>

          <div className="p-5 bg-surface border border-border rounded-lg space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase text-muted">Modern Integration Roadmap</div>
                <div className="text-xl font-bold text-primary mt-0.5">
                  Point-to-Point <ArrowRight className="inline w-4 h-4 text-accent mx-1" /> Event Mesh & API Fabric
                </div>
              </div>
              <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-lg">
                <span className="text-sm font-semibold text-muted">Coverage:</span>
                <span className="text-lg font-bold text-muted line-through">40%</span>
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="text-2xl font-black text-accent">95%</span>
              </div>
            </div>

            {/* Visual Progress Line */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted">Current Baseline (40%)</span>
                <span className="text-accent font-bold">Target State (95%)</span>
              </div>
              <div className="h-4 w-full bg-surface border border-border rounded-full p-0.5 relative overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: '95%' }}
                />
                {/* Marker for Baseline */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-primary z-10"
                  style={{ left: '40%' }}
                  title="Baseline 40%"
                />
              </div>
              <p className="text-xs text-muted pt-1">
                Moving from 40% to 95% integration coverage replaces siloes with real-time event streaming and governed API endpoints across enterprise assets.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Key Recommendations */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Key Recommendations
          </h2>

          <div className="p-5 bg-surface border border-border rounded-lg">
            <ul className="space-y-3">
              {keyRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-primary">
                  <div className="mt-0.5 p-1 bg-accent/10 border border-accent/20 rounded text-accent flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Report Footer */}
        <footer className="border-t border-border pt-4 text-center text-xs text-muted">
          <p>Accenture EA Dashboard Platform — Confidential & Proprietary Architecture Report</p>
        </footer>
      </div>
    </div>
  );
}
