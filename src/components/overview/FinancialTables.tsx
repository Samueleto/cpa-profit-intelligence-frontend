import React, { useState } from 'react';
import { CampaignItem, GeoItem } from '../../types/analytics';
import {
  Search,
  AlertTriangle,
  Trophy,
  Globe2,
  TrendingUp,
  TrendingDown,
  Pause,
  Play,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';

interface FinancialTablesProps {
  campaigns: CampaignItem[];
  biggestLosses: CampaignItem[];
  geos: GeoItem[];
  onOpenAiInvestigator: (context?: string) => void;
}

type TableTab = 'profitable' | 'losses' | 'geos';
type ViewMode = 'cards' | 'table';

export const FinancialTables: React.FC<FinancialTablesProps> = ({
  campaigns,
  biggestLosses,
  geos,
  onOpenAiInvestigator
}) => {
  const [activeTab, setActiveTab] = useState<TableTab>('profitable');
  const [searchQuery, setSearchQuery] = useState('');
  const [pausedCampaignIds, setPausedCampaignIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  const togglePause = (id: string) => {
    setPausedCampaignIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.geo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.trafficSource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLosses = biggestLosses.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.geo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.trafficSource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGeos = geos.filter((g) =>
    g.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.countryCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="p-3.5 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
      {/* Header with Tabs and Search */}
      <div className="flex flex-col gap-3 pb-3 border-b border-slate-800/80">
        {/* Top bar: Tabs + View Mode Toggle on Mobile */}
        <div className="flex items-center justify-between gap-2">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab('profitable')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                activeTab === 'profitable'
                  ? 'bg-purple-600/25 text-purple-200 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Top Profitable ({campaigns.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('losses')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                activeTab === 'losses'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Losses ({biggestLosses.length})</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('geos')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[36px] ${
                activeTab === 'geos'
                  ? 'bg-purple-600/25 text-purple-200 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>GEO Yields ({geos.length})</span>
            </button>
          </div>

          {/* Cards / Table toggle on small screens */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              title="Card view (mobile-optimized)"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'cards'
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Dense spreadsheet table"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter campaigns, networks, or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-3.5">
        {/* ======================================================== */}
        {/* VIEW 1: TOP PROFITABLE CAMPAIGNS                         */}
        {/* ======================================================== */}
        {activeTab === 'profitable' && (
          <>
            {/* MOBILE CARDS VIEW */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCampaigns.map((camp) => {
                  const isPaused = pausedCampaignIds.includes(camp.id);
                  return (
                    <div
                      key={camp.id}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                              {camp.geo}
                            </span>
                            <span className="font-semibold text-xs text-white leading-tight">
                              {camp.name}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-1">
                            {camp.id} · {camp.format}
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded shrink-0">
                          DEMO
                        </span>
                      </div>

                      {/* Financial KPI 2x2 Grid */}
                      <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/40 border border-slate-800/80 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Net Profit</span>
                          <span className="text-sm font-bold text-purple-300 tabular-nums">
                            +${camp.netProfit.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Blended ROI</span>
                          <span className="text-sm font-bold text-emerald-400 tabular-nums">
                            +{camp.roi.toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Ad Spend</span>
                          <span className="text-slate-300 tabular-nums">${camp.spend.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Revenue</span>
                          <span className="text-emerald-400 tabular-nums">${camp.revenue.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Network Badges & Touch Action Controls */}
                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]">
                            {camp.trafficSource}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px]">
                            {camp.monetizationNetwork}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => togglePause(camp.id)}
                            className={`p-2 rounded-lg text-xs transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center ${
                              isPaused
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                            title={isPaused ? 'Resume' : 'Pause'}
                          >
                            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => onOpenAiInvestigator(camp.name)}
                            className="p-2 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Audit in AI"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* DENSE TABLE VIEW (Scrollable) */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <div className="sm:hidden text-[10px] text-slate-400 flex items-center justify-between pb-1 px-1 font-mono">
                  <span>Swipe to view all metrics →</span>
                  <span className="text-purple-400">9 columns</span>
                </div>
                <table className="w-full text-left text-xs border-collapse min-w-[680px]">
                  <thead>
                    <tr className="border-b border-slate-800/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Campaign / Router</th>
                      <th className="py-2.5 px-3">Traffic Source</th>
                      <th className="py-2.5 px-3">Monetization</th>
                      <th className="py-2.5 px-3 text-right">Ad Spend</th>
                      <th className="py-2.5 px-3 text-right">Revenue</th>
                      <th className="py-2.5 px-3 text-right font-bold text-purple-300">Net Profit</th>
                      <th className="py-2.5 px-3 text-right">ROI %</th>
                      <th className="py-2.5 px-3 text-right">CR %</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredCampaigns.map((camp) => {
                      const isPaused = pausedCampaignIds.includes(camp.id);
                      return (
                        <tr key={camp.id} className="hover:bg-slate-900/60 transition-colors group">
                          <td className="py-2.5 px-3 font-sans">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-800 text-slate-400 rounded">
                                {camp.geo}
                              </span>
                              <span className="font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                                {camp.name}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              ID: {camp.id} · {camp.format}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-sans text-rose-300 text-[11px]">
                            {camp.trafficSource}
                          </td>
                          <td className="py-2.5 px-3 font-sans text-emerald-300 text-[11px]">
                            {camp.monetizationNetwork}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                            ${camp.spend.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold tabular-nums">
                            ${camp.revenue.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-purple-300 font-bold tabular-nums">
                            +${camp.netProfit.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold tabular-nums">
                            +{camp.roi.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                            {camp.cr.toFixed(2)}%
                          </td>
                          <td className="py-2.5 px-3 text-center font-sans">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => togglePause(camp.id)}
                                className={`p-1 rounded text-xs transition-colors ${
                                  isPaused
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => onOpenAiInvestigator(camp.name)}
                                className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-900/30"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: BIGGEST LOSSES & BLEEDERS                        */}
        {/* ======================================================== */}
        {activeTab === 'losses' && (
          <>
            {/* MOBILE CARDS VIEW */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredLosses.map((camp) => {
                  const isPaused = pausedCampaignIds.includes(camp.id);
                  return (
                    <div
                      key={camp.id}
                      className="p-3.5 rounded-xl bg-rose-950/15 border border-rose-500/30 hover:border-rose-500/50 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-rose-900/50 text-rose-300 rounded border border-rose-500/40">
                              {camp.geo}
                            </span>
                            <span className="font-semibold text-xs text-rose-200 leading-tight">
                              {camp.name}
                            </span>
                          </div>
                          <div className="text-[10px] text-rose-400/80 font-mono mt-1">
                            CR: {camp.cr.toFixed(2)}% · Bot Bleed Suspected
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded shrink-0">
                          AUTO-CUT
                        </span>
                      </div>

                      {/* Financial KPI 2x2 Grid */}
                      <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/50 border border-rose-900/40 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Net Loss</span>
                          <span className="text-sm font-bold text-rose-400 tabular-nums">
                            -${Math.abs(camp.netProfit).toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Negative ROI</span>
                          <span className="text-sm font-bold text-rose-400 tabular-nums">
                            {camp.roi.toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Wasted Cost</span>
                          <span className="text-rose-300 tabular-nums">${camp.spend.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans block">Recovered</span>
                          <span className="text-slate-400 tabular-nums">${camp.revenue.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px] font-mono">
                          {camp.trafficSource}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePause(camp.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[36px] ${
                              isPaused
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs'
                            }`}
                          >
                            <Pause className="w-3.5 h-3.5" />
                            <span>{isPaused ? 'Paused' : 'Halt Bid'}</span>
                          </button>
                          <button
                            onClick={() => onOpenAiInvestigator(camp.name)}
                            className="p-2 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Audit root cause"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* DENSE TABLE VIEW (Scrollable) */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[680px]">
                  <thead>
                    <tr className="border-b border-slate-800/90 text-rose-300/80 text-[11px] font-semibold uppercase tracking-wider bg-rose-950/10">
                      <th className="py-2.5 px-3">Bleeding Campaign</th>
                      <th className="py-2.5 px-3">Traffic Source</th>
                      <th className="py-2.5 px-3">Monetization</th>
                      <th className="py-2.5 px-3 text-right">Wasted Spend</th>
                      <th className="py-2.5 px-3 text-right">Recovered</th>
                      <th className="py-2.5 px-3 text-right font-bold text-rose-400">Net Loss</th>
                      <th className="py-2.5 px-3 text-right">Negative ROI</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredLosses.map((camp) => {
                      const isPaused = pausedCampaignIds.includes(camp.id);
                      return (
                        <tr key={camp.id} className="hover:bg-rose-950/20 transition-colors bg-rose-950/5">
                          <td className="py-2.5 px-3 font-sans">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-1 py-0.2 bg-rose-900/40 text-rose-300 rounded border border-rose-500/30">
                                {camp.geo}
                              </span>
                              <span className="font-semibold text-rose-200 tracking-tight">
                                {camp.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-sans text-rose-300 text-[11px]">
                            {camp.trafficSource}
                          </td>
                          <td className="py-2.5 px-3 font-sans text-slate-300 text-[11px]">
                            {camp.monetizationNetwork}
                          </td>
                          <td className="py-2.5 px-3 text-right text-rose-300 font-bold tabular-nums">
                            ${camp.spend.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-slate-400 tabular-nums">
                            ${camp.revenue.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-rose-400 font-extrabold tabular-nums">
                            -${Math.abs(camp.netProfit).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-right text-rose-400 font-semibold tabular-nums">
                            {camp.roi.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-center font-sans">
                            <button
                              onClick={() => togglePause(camp.id)}
                              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                                isPaused
                                  ? 'bg-slate-800 text-slate-300'
                                  : 'bg-rose-600 hover:bg-rose-500 text-white'
                              }`}
                            >
                              {isPaused ? 'Paused' : 'Halt Bid'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: COUNTRY ARBITRAGE GEOS                           */}
        {/* ======================================================== */}
        {activeTab === 'geos' && (
          <>
            {/* MOBILE CARDS VIEW */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredGeos.map((geo) => (
                  <div
                    key={geo.countryCode}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700">
                          {geo.countryCode}
                        </span>
                        <span className="font-semibold text-xs text-white">
                          {geo.countryName}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${
                        geo.roi >= 50 ? 'text-emerald-400' : geo.roi > 0 ? 'text-purple-300' : 'text-rose-400'
                      }`}>
                        {geo.roi >= 0 ? '+' : ''}{geo.roi.toFixed(1)}% ROI
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2 rounded-lg bg-black/40 border border-slate-800/80 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">Net Profit</span>
                        <span className={`font-bold tabular-nums ${geo.netProfit >= 0 ? 'text-purple-300' : 'text-rose-400'}`}>
                          {geo.netProfit >= 0 ? '+' : ''}${geo.netProfit.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">Conversion Rate</span>
                        <span className="font-bold text-slate-200 tabular-nums">{geo.cr.toFixed(2)}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">Ad Spend</span>
                        <span className="text-slate-300 tabular-nums">${geo.spend.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">Revenue</span>
                        <span className="text-emerald-400 tabular-nums">${geo.revenue.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                      <span>{geo.clicks.toLocaleString()} clicks</span>
                      <span>{geo.conversions.toLocaleString()} conversions</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DENSE TABLE VIEW (Scrollable) */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                  <thead>
                    <tr className="border-b border-slate-800/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Country / GEO</th>
                      <th className="py-2.5 px-3 text-right">Ad Spend</th>
                      <th className="py-2.5 px-3 text-right">Revenue</th>
                      <th className="py-2.5 px-3 text-right font-bold text-purple-300">Net Profit</th>
                      <th className="py-2.5 px-3 text-right">ROI %</th>
                      <th className="py-2.5 px-3 text-right">Clicks</th>
                      <th className="py-2.5 px-3 text-right">Conversions</th>
                      <th className="py-2.5 px-3 text-right">CR %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredGeos.map((geo) => (
                      <tr key={geo.countryCode} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-2.5 px-3 font-sans">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                              {geo.countryCode}
                            </span>
                            <span className="font-semibold text-white tracking-tight">
                              {geo.countryName}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                          ${geo.spend.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold tabular-nums">
                          ${geo.revenue.toFixed(2)}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-bold tabular-nums ${
                          geo.netProfit >= 0 ? 'text-purple-300' : 'text-rose-400'
                        }`}>
                          {geo.netProfit >= 0 ? '+' : ''}${geo.netProfit.toFixed(2)}
                        </td>
                        <td className={`py-2.5 px-3 text-right font-semibold tabular-nums ${
                          geo.roi >= 50 ? 'text-emerald-400' : geo.roi > 0 ? 'text-purple-300' : 'text-rose-400'
                        }`}>
                          {geo.roi >= 0 ? '+' : ''}{geo.roi.toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-400 tabular-nums">
                          {geo.clicks.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                          {geo.conversions.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-200 tabular-nums">
                          {geo.cr.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>All data is simulated DEMO calculations based on current timeframe</span>
        <button
          onClick={() => onOpenAiInvestigator()}
          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold self-start sm:self-auto"
        >
          <span>Ask AI to audit all campaigns</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
