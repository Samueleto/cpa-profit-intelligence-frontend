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
  ArrowRight
} from 'lucide-react';

interface FinancialTablesProps {
  campaigns: CampaignItem[];
  biggestLosses: CampaignItem[];
  geos: GeoItem[];
  onOpenAiInvestigator: (context?: string) => void;
}

type TableTab = 'profitable' | 'losses' | 'geos';

export const FinancialTables: React.FC<FinancialTablesProps> = ({
  campaigns,
  biggestLosses,
  geos,
  onOpenAiInvestigator
}) => {
  const [activeTab, setActiveTab] = useState<TableTab>('profitable');
  const [searchQuery, setSearchQuery] = useState('');
  const [pausedCampaignIds, setPausedCampaignIds] = useState<string[]>([]);

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
    <section className="p-4 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
      {/* Header with Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('profitable')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'profitable'
                ? 'bg-purple-600/25 text-purple-200 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Top Profitable Campaigns ({campaigns.length})
          </button>

          <button
            onClick={() => setActiveTab('losses')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'losses'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Biggest Losses ({biggestLosses.length})
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab('geos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'geos'
                ? 'bg-purple-600/25 text-purple-200 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            Country Arbitrage Yield ({geos.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-56 shrink-0">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter campaigns or geos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-hidden focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="mt-3 overflow-x-auto">
        {/* VIEW 1: TOP PROFITABLE CAMPAIGNS */}
        {activeTab === 'profitable' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Campaign / Router</th>
                <th className="py-2.5 px-3">Traffic Source (Cost)</th>
                <th className="py-2.5 px-3">Monetization (Rev)</th>
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
                  <tr
                    key={camp.id}
                    className="hover:bg-slate-900/60 transition-colors group"
                  >
                    <td className="py-2.5 px-3 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-800 text-slate-400 rounded">
                          {camp.geo}
                        </span>
                        <span className="font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                          {camp.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">DEMO</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        ID: {camp.id} · {camp.format}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 font-sans text-rose-300">
                      <span className="px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded text-[11px]">
                        {camp.trafficSource}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 font-sans text-emerald-300">
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[11px]">
                        {camp.monetizationNetwork}
                      </span>
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
                              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                          title={isPaused ? 'Resume campaign' : 'Simulate pause'}
                        >
                          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => onOpenAiInvestigator(camp.name)}
                          className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-colors"
                          title="Simulate AI audit"
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
        )}

        {/* VIEW 2: BIGGEST LOSSES & BLEEDERS */}
        {activeTab === 'losses' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 text-rose-300/80 text-[11px] font-semibold uppercase tracking-wider bg-rose-950/10">
                <th className="py-2.5 px-3">Bleeding Campaign</th>
                <th className="py-2.5 px-3">Traffic Source (Cost)</th>
                <th className="py-2.5 px-3">Monetization (Rev)</th>
                <th className="py-2.5 px-3 text-right">Wasted Spend</th>
                <th className="py-2.5 px-3 text-right">Recovered</th>
                <th className="py-2.5 px-3 text-right font-bold text-rose-400">Net Loss</th>
                <th className="py-2.5 px-3 text-right">Negative ROI</th>
                <th className="py-2.5 px-3 text-center">Auto-Cut Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLosses.map((camp) => {
                const isPaused = pausedCampaignIds.includes(camp.id);
                return (
                  <tr
                    key={camp.id}
                    className="hover:bg-rose-950/20 transition-colors group bg-rose-950/5"
                  >
                    <td className="py-2.5 px-3 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1 py-0.2 bg-rose-900/40 text-rose-300 rounded border border-rose-500/30">
                          {camp.geo}
                        </span>
                        <span className="font-semibold text-rose-200 tracking-tight">
                          {camp.name}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">DEMO</span>
                      </div>
                      <div className="text-[11px] text-rose-400/80 font-mono mt-0.5">
                        CR: {camp.cr.toFixed(2)}% (Bot leakage suspected)
                      </div>
                    </td>

                    <td className="py-2.5 px-3 font-sans text-rose-300">
                      <span className="px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded text-[11px]">
                        {camp.trafficSource}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 font-sans text-slate-300">
                      <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[11px]">
                        {camp.monetizationNetwork}
                      </span>
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
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => togglePause(camp.id)}
                          className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isPaused
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-xs'
                          }`}
                        >
                          <Pause className="w-3 h-3" />
                          <span>{isPaused ? 'Paused' : 'Halt Bid'}</span>
                        </button>

                        <button
                          onClick={() => onOpenAiInvestigator(camp.name)}
                          className="p-1 rounded text-purple-400 hover:text-purple-300 hover:bg-purple-900/40"
                          title="Simulate AI root-cause audit"
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
        )}

        {/* VIEW 3: COUNTRY ARBITRAGE GEOS */}
        {activeTab === 'geos' && (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800/90 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Country / GEO</th>
                <th className="py-2.5 px-3 text-right">Ad Spend</th>
                <th className="py-2.5 px-3 text-right">Revenue</th>
                <th className="py-2.5 px-3 text-right font-bold text-purple-300">Net Profit</th>
                <th className="py-2.5 px-3 text-right">ROI %</th>
                <th className="py-2.5 px-3 text-right">Clicks</th>
                <th className="py-2.5 px-3 text-right">Conversions</th>
                <th className="py-2.5 px-3 text-right">Conv Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredGeos.map((geo) => (
                <tr
                  key={geo.countryCode}
                  className="hover:bg-slate-900/60 transition-colors"
                >
                  <td className="py-2.5 px-3 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                        {geo.countryCode}
                      </span>
                      <span className="font-semibold text-white tracking-tight">
                        {geo.countryName}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400">DEMO</span>
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
        )}
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>All data is simulated DEMO calculations based on current timeframe</span>
        <button
          onClick={() => onOpenAiInvestigator()}
          className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
        >
          <span>Ask AI to audit all campaigns</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
