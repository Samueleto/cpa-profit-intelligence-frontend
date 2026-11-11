import React from 'react';
import { DateRangePreset, DatasetForPeriod } from '../../types/analytics';
import { AlertBanner } from './AlertBanner';
import { KpiStrip } from './KpiStrip';
import { TrendChart } from './TrendChart';
import { AttributionBreakdown } from './AttributionBreakdown';
import { FinancialTables } from './FinancialTables';
import { Sparkles, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface OverviewViewProps {
  dataset: DatasetForPeriod;
  selectedRange: DateRangePreset;
  compareMode: boolean;
  onOpenAiInvestigator: (promptId?: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  dataset,
  selectedRange,
  compareMode,
  onOpenAiInvestigator
}) => {
  return (
    <div className="space-y-5 pb-16">
      {/* Page Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Financial Arbitrage Overview
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25 font-semibold">
              DEMO ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time advertising margin intelligence · All figures mathematically verified
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-slate-400">Postback Stream:</span>
            <span className="font-mono text-emerald-400 font-semibold">Healthy</span>
          </div>
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/30 border border-purple-800/40 text-purple-300 font-mono text-[11px]">
            <span>Net Margin:</span>
            <span className="font-bold">{dataset.kpis.roiPercentage.toFixed(1)}% ROI</span>
          </div>
        </div>
      </div>

      {/* 1. Data Integrity & Unattributed Revenue Alert Banner */}
      <AlertBanner onOpenAiInvestigator={onOpenAiInvestigator} />

      {/* 2. Primary Financial KPIs Strip (7 Cards, Net Profit Hero) */}
      <KpiStrip kpis={dataset.kpis} compareMode={compareMode} />

      {/* 3. Main Trend Chart Area (SVG Curves, Area Gradients, Tooltip) */}
      <TrendChart data={dataset.trendSeries} />

      {/* 4. Advertising Traffic Sources vs Monetization Networks Breakdown */}
      <AttributionBreakdown
        trafficSources={dataset.trafficSources}
        monetizationNetworks={dataset.monetizationNetworks}
        formats={dataset.formats}
        totalSpend={dataset.kpis.adSpend}
        totalRevenue={dataset.kpis.totalRevenue}
      />

      {/* 5. Deep-Dive Financial Tables: Profitable Campaigns, Losses & GEOs */}
      <FinancialTables
        campaigns={dataset.campaigns}
        biggestLosses={dataset.biggestLosses}
        geos={dataset.geos}
        onOpenAiInvestigator={onOpenAiInvestigator}
      />

      {/* Floating Ask AI Button (Fixed at Bottom-Right for instant access) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => onOpenAiInvestigator()}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-2xl shadow-purple-950/90 border border-purple-400/40 transition-all hover:scale-105 active:scale-95"
          aria-label="Open AI Profit Investigator"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-purple-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="tracking-wide">Ask AI Investigator</span>
        </button>
      </div>
    </div>
  );
};
