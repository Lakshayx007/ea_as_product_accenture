import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Database,
  Layers,
  X,
  RotateCcw,
  Server,
  Building2,
  RefreshCw,
  ShieldAlert,
  Activity
} from 'lucide-react';

// Mock Enterprise Applications Dataset (~22 applications)
const INITIAL_APPLICATIONS = [
  { id: 1, name: 'SAP S/4HANA', domain: 'Finance', status: 'Active', freshness: '< 24h', source: 'SAP PPM', owner: 'Finance IT' },
  { id: 2, name: 'ServiceNow ITSM', domain: 'IT Operations', status: 'Active', freshness: '< 1h', source: 'ServiceNow CMDB', owner: 'IT Ops' },
  { id: 3, name: 'Signavio Process Intelligence', domain: 'Engineering', status: 'Active', freshness: '< 12h', source: 'Signavio Hub', owner: 'Process COE' },
  { id: 4, name: 'Apptio Cost Transparency', domain: 'Finance', status: 'Active', freshness: '< 6h', source: 'Apptio TBM', owner: 'IT Finance' },
  { id: 5, name: 'Workday HCM', domain: 'HR', status: 'Active', freshness: '< 2h', source: 'SAP PPM', owner: 'HR Tech Team' },
  { id: 6, name: 'Salesforce Sales Cloud', domain: 'Customer', status: 'Active', freshness: '< 30m', source: 'ServiceNow CMDB', owner: 'Commercial IT' },
  { id: 7, name: 'Oracle E-Business Suite', domain: 'Supply Chain', status: 'End-of-Life', freshness: '> 7d', source: 'SAP PPM', owner: 'Supply Chain IT' },
  { id: 8, name: 'Legacy ERP Gateway', domain: 'Finance', status: 'End-of-Life', freshness: '> 30d', source: 'Apptio TBM', owner: 'Legacy Ops' },
  { id: 9, name: 'Snowflake Data Warehouse', domain: 'IT Operations', status: 'Active', freshness: '< 15m', source: 'ServiceNow CMDB', owner: 'Data Platform Team' },
  { id: 10, name: 'SAP SuccessFactors', domain: 'HR', status: 'Planned', freshness: '< 24h', source: 'SAP PPM', owner: 'Enterprise HR' },
  { id: 11, name: 'Jira Enterprise Hub', domain: 'Engineering', status: 'Active', freshness: '< 5m', source: 'ServiceNow CMDB', owner: 'DevOps COE' },
  { id: 12, name: 'Signavio Process Manager', domain: 'Engineering', status: 'Active', freshness: '< 4h', source: 'Signavio Hub', owner: 'EA Board' },
  { id: 13, name: 'Concur Expense Portal', domain: 'Finance', status: 'Under Review', freshness: '< 48h', source: 'Apptio TBM', owner: 'Travel & Expense' },
  { id: 14, name: 'SAP Ariba Procurement', domain: 'Supply Chain', status: 'Active', freshness: '< 12h', source: 'SAP PPM', owner: 'Procurement IT' },
  { id: 15, name: 'ServiceNow SecOps', domain: 'IT Operations', status: 'Planned', freshness: '< 1h', source: 'ServiceNow CMDB', owner: 'InfoSec Team' },
  { id: 16, name: 'Tableau Analytics Server', domain: 'IT Operations', status: 'Under Review', freshness: '< 24h', source: 'Apptio TBM', owner: 'BI Competency Center' },
  { id: 17, name: 'Legacy Warehouse System', domain: 'Supply Chain', status: 'End-of-Life', freshness: '> 14d', source: 'SAP PPM', owner: 'Logistics Operations' },
  { id: 18, name: 'Apptio Cloudability', domain: 'IT Operations', status: 'Active', freshness: '< 3h', source: 'Apptio TBM', owner: 'Cloud FinOps' },
  { id: 19, name: 'Customer Portal v1', domain: 'Customer', status: 'End-of-Life', freshness: '> 60d', source: 'ServiceNow CMDB', owner: 'Digital Channels' },
  { id: 20, name: 'SAP IBP (Integrated Planning)', domain: 'Supply Chain', status: 'Planned', freshness: '< 8h', source: 'SAP PPM', owner: 'Supply Chain COE' },
  { id: 21, name: 'ServiceNow HR Service Delivery', domain: 'HR', status: 'Under Review', freshness: '< 2h', source: 'ServiceNow CMDB', owner: 'HR Operations' },
  { id: 22, name: 'Contract Lifecycle Mgmt', domain: 'Legal', status: 'Active', freshness: '< 6h', source: 'Signavio Hub', owner: 'Legal Tech Team' }
];

const DOMAINS = ['Finance', 'HR', 'IT Operations', 'Supply Chain', 'Customer', 'Engineering', 'Legal'];
const STATUSES = ['Active', 'Planned', 'Under Review', 'End-of-Life'];

export default function ApplicationTable({ apps = INITIAL_APPLICATIONS }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Domain filter
      if (selectedDomain !== 'All' && app.domain !== selectedDomain) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && app.status !== selectedStatus) {
        return false;
      }
      // Search term filter across all fields
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = (app.name || '').toLowerCase().includes(query);
        const matchesDomain = (app.domain || '').toLowerCase().includes(query);
        const matchesStatus = (app.status || '').toLowerCase().includes(query);
        const matchesFreshness = (app.freshness || String(app.latencyMin || '')).toLowerCase().includes(query);
        const matchesSource = (app.source || '').toLowerCase().includes(query);
        const matchesOwner = (app.owner || '').toLowerCase().includes(query);

        return matchesName || matchesDomain || matchesStatus || matchesFreshness || matchesSource || matchesOwner;
      }
      return true;
    });
  }, [searchTerm, selectedDomain, selectedStatus]);

  // Sort logic
  const sortedApps = useMemo(() => {
    return [...filteredApps].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredApps, sortField, sortDirection]);

  // Reset pagination when filters change
  const totalPages = Math.ceil(sortedApps.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const paginatedApps = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return sortedApps.slice(start, start + itemsPerPage);
  }, [sortedApps, safePage]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = apps.length;
    const active = apps.filter(a => a.status === 'Active').length;
    const planned = apps.filter(a => a.status === 'Planned' || a.status === 'Under Review').length;
    const eol = apps.filter(a => a.status === 'End-of-Life').length;
    return { total, active, planned, eol };
  }, [apps]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDomain('All');
    setSelectedStatus('All');
    setSortField('name');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== '' || selectedDomain !== 'All' || selectedStatus !== 'All';

  // Helper for Status Badges
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active
          </span>
        );
      case 'Planned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-3.5 h-3.5" />
            Planned
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      case 'End-of-Life':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" />
            End-of-Life
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-surface text-muted border border-border">
            {status}
          </span>
        );
    }
  };

  // Helper for Source Badges
  const renderSourceBadge = (source) => {
    let colorClass = 'bg-surface text-muted border-border';
    if (source.includes('SAP')) colorClass = 'bg-blue-950/40 text-blue-300 border-blue-800/40';
    if (source.includes('ServiceNow')) colorClass = 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40';
    if (source.includes('Signavio')) colorClass = 'bg-purple-950/40 text-purple-300 border-purple-800/40';
    if (source.includes('Apptio')) colorClass = 'bg-indigo-950/40 text-indigo-300 border-indigo-800/40';

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border ${colorClass}`}>
        <Server className="w-3 h-3 opacity-70" />
        {source}
      </span>
    );
  };

  // Helper for Data Freshness Indicator
  const renderFreshnessIndicator = (freshness) => {
    const isStale = freshness.includes('>') || freshness.includes('30d') || freshness.includes('60d') || freshness.includes('14d') || freshness.includes('7d');
    const isVeryFresh = freshness.includes('m') || freshness.includes('1h') || freshness.includes('2h');

    return (
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isStale ? 'bg-rose-500 animate-pulse' : isVeryFresh ? 'bg-emerald-400' : 'bg-amber-400'
          }`}
        />
        <span className={`text-xs ${isStale ? 'text-rose-400 font-medium' : 'text-primary'}`}>
          {freshness}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Overview Cards / Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Total Applications</p>
            <p className="text-2xl font-bold text-primary mt-1">{stats.total}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <Database className="w-5 h-5 text-accent" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Active Apps</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.active}</p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Planned / Review</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{stats.planned}</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">End-of-Life</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{stats.eol}</p>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface border border-border rounded-xl shadow-lg overflow-hidden">
        {/* Controls Header: Search & Filters */}
        <div className="p-5 border-b border-border space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, domain, owner, source..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-surface border border-border rounded-lg text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns & Reset */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Domain Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-accent" />
                Domain:
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-2 px-3 text-xs bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="All">All Domains</option>
                {DOMAINS.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted font-medium">Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="py-2 px-3 text-xs bg-surface border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-accent hover:text-accent/80 bg-accent/10 border border-accent/20 rounded-lg transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface text-muted text-xs uppercase tracking-wider font-semibold">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Application Name</span>
                    {sortField === 'name' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('domain')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Domain</span>
                    {sortField === 'domain' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Lifecycle Status</span>
                    {sortField === 'status' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('freshness')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Data Freshness</span>
                    {sortField === 'freshness' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('source')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Source System</span>
                    {sortField === 'source' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('owner')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Owner</span>
                    {sortField === 'owner' ? (
                      sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-accent" /> : <ArrowDown className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-sm">
              {paginatedApps.length > 0 ? (
                paginatedApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-primary">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-accent opacity-80" />
                        <span>{app.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted">
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Building2 className="w-3.5 h-3.5 opacity-60" />
                        {app.domain}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {renderStatusBadge(app.status)}
                    </td>
                    <td className="py-3.5 px-4">
                      {renderFreshnessIndicator(app.freshness || (app.latencyMin ? `< ${Math.ceil(app.latencyMin / 60)}h` : 'Unknown'))}
                    </td>
                    <td className="py-3.5 px-4">
                      {renderSourceBadge(app.source)}
                    </td>
                    <td className="py-3.5 px-4 text-muted font-medium text-xs">
                      {app.owner}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Search className="w-10 h-10 text-muted opacity-40" />
                      <p className="text-base font-medium text-primary">No applications found</p>
                      <p className="text-xs text-muted max-w-sm">
                        No results matched your search criteria or selected filters. Try broadening your parameters or reset filters.
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Controls */}
        <div className="p-4 border-t border-border bg-surface flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div>
            Showing{' '}
            <span className="font-semibold text-primary">
              {sortedApps.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-primary">
              {Math.min(safePage * itemsPerPage, sortedApps.length)}
            </span>{' '}
            of <span className="font-semibold text-primary">{sortedApps.length}</span> applications
            {hasActiveFilters && ` (filtered from ${apps.length} total)`}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safePage === 1}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="First Page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 px-2 font-medium text-primary">
                <span>Page {safePage}</span>
                <span className="text-muted">of</span>
                <span>{totalPages}</span>
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-lg border border-border text-muted hover:text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Last Page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
