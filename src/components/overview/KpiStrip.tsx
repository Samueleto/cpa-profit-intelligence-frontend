import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Percent,
  MousePointerClick,
  Eye,
  Target,
  Sparkles
} from 'lucide-react';
import { FinancialKPIs } from '../../types/analytics';

interface KpiStripProps {
  kpis: FinancialKPIs;
  compareMode: boolean;
}

export const KpiStrip: React.FC<KpiStripProps> = ({ kpis, compareMode }) => {
  const calcDelta = (current: number, prev: number) => {
    if (!prev || prev === 0) return 0;
    return ((current - prev) / prev) * 100;
  };

  const revenueDelta = calcDelta(kpis.totalRevenue, kpis.previousPeriod.totalRevenue);
  const spendDelta = calcDelta(kpis.adSpend, kpis.previousPeriod.adSpend);
  const profitDelta = calcDelta(kpis.netProfit, kpis.previousPeriod.netProfit);
  const roiDelta = kpis.roiPercentage - kpis.previousPeriod.roiPercentage;
  const cpcDelta = calcDelta(kpis.cpc, kpis.previousPeriod.cpc);
  const ecpmDelta = calcDelta(kpis.ecpm, kpis.previousPeriod.ecpm);
  const crDelta = kpis.conversionRate - kpis.previousPeriod.conversionRate;

  return (
    <section className="space-y-3">
      {/* Top 3 Primary Financial Anchors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* HERO CARD: Net Profit */}
        <div className="relative overflow-hidden p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#121028] via-[#101426] to-[#0c1222] border border-purple-500/40 shadow-lg shadow-purple-950/20 group hover:border-purple-400/60 transition-all">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Net Profit
            </span>
            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30">
              DEMO
            </span>
          </div>

          <div className="mt-2.5 sm:mt-3 flex items-baseline justify-between gap-2">
            <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              ${kpis.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="mt-2.5 sm:mt-3 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-purple-900/40 text-xs">
            <div className="flex items-center gap-1 font-mono tabular-nums font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{profitDelta.toFixed(1)}%</span>
              {compareMode && <span className="text-slate-400 font-normal ml-1">vs prior period</span>}
            </div>
            <span className="text-[11px] text-slate-400">
              Formula: Revenue - Ad Spend
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0e1422] border border-slate-800/90 shadow-sm hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Total Revenue (Monetization)
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>

          <div className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
            ${kpis.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div className="mt-2.5 sm:mt-3 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-slate-800/80 text-xs">
            <div className={`flex items-center gap-1 font-mono tabular-nums font-semibold ${
              revenueDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {revenueDelta >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{revenueDelta >= 0 ? '+' : ''}{revenueDelta.toFixed(1)}%</span>
              {compareMode && <span className="text-slate-400 font-normal ml-1">vs prior</span>}
            </div>
            <span className="text-[11px] text-slate-400 truncate">
              Zeydoo · ProPush · RollerAds
            </span>
          </div>
        </div>

        {/* Advertising Spend */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0e1422] border border-slate-800/90 shadow-sm hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-rose-400" />
              Advertising Spend (Cost)
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>

          <div className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono tabular-nums">
            ${kpis.adSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
            <div className={`flex items-center gap-1 font-mono tabular-nums font-semibold ${
              spendDelta <= 0 ? 'text-emerald-400' : 'text-slate-300'
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{spendDelta.toFixed(1)}%</span>
              {compareMode && <span className="text-slate-400 font-normal ml-1">cost delta</span>}
            </div>
            <span className="text-[11px] text-slate-400 truncate">
              ExoClick · RollerAds Traffic
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Efficiency Metrics Strip (4 Columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* ROI % */}
        <div className="p-3.5 rounded-lg bg-[#0c101c] border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-purple-400" />
              Blended ROI
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>
          <div className="mt-1 text-xl font-bold text-white font-mono tabular-nums">
            {kpis.roiPercentage.toFixed(1)}%
          </div>
          <div className="mt-1.5 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span>+{roiDelta >= 0 ? '+' : ''}{roiDelta.toFixed(1)} pts</span>
            <span className="text-slate-400 font-sans text-[10px]">efficiency</span>
          </div>
        </div>

        {/* CPC */}
        <div className="p-3.5 rounded-lg bg-[#0c101c] border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />
              Average CPC
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>
          <div className="mt-1 text-xl font-bold text-white font-mono tabular-nums">
            ${kpis.cpc.toFixed(4)}
          </div>
          <div className="mt-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>{kpis.totalClicks.toLocaleString()}</span>
            <span className="text-slate-400 font-sans text-[10px]">paid clicks</span>
          </div>
        </div>

        {/* eCPM */}
        <div className="p-3.5 rounded-lg bg-[#0c101c] border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Effective eCPM
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>
          <div className="mt-1 text-xl font-bold text-white font-mono tabular-nums">
            ${kpis.ecpm.toFixed(3)}
          </div>
          <div className="mt-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>{(kpis.totalImpressions / 1000000).toFixed(2)}M</span>
            <span className="text-slate-400 font-sans text-[10px]">impressions</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-3.5 rounded-lg bg-[#0c101c] border border-slate-800/80 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Conversion Rate
            </span>
            <span className="text-[10px] font-mono text-slate-400">DEMO</span>
          </div>
          <div className="mt-1 text-xl font-bold text-white font-mono tabular-nums">
            {kpis.conversionRate.toFixed(2)}%
          </div>
          <div className="mt-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <span>{kpis.totalConversions.toLocaleString()}</span>
            <span className="text-slate-400 font-sans text-[10px]">conversions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
