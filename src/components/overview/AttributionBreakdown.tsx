import React from 'react';
import {
  TrafficSourceSpend,
  MonetizationNetworkRevenue,
  TrafficFormatBreakdown
} from '../../types/analytics';
import { Layers, ArrowDownRight, ArrowUpRight, ShieldCheck, Gauge } from 'lucide-react';

interface AttributionBreakdownProps {
  trafficSources: TrafficSourceSpend[];
  monetizationNetworks: MonetizationNetworkRevenue[];
  formats: TrafficFormatBreakdown[];
  totalSpend: number;
  totalRevenue: number;
}

export const AttributionBreakdown: React.FC<AttributionBreakdownProps> = ({
  trafficSources,
  monetizationNetworks,
  formats,
  totalSpend,
  totalRevenue
}) => {
  return (
    <section className="space-y-4">
      {/* Two-Column Network Grid: Advertising Traffic Sources vs Monetization Networks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Advertising Traffic Sources (Ad Spend) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  Advertising Traffic Sources (Media Spend)
                </h3>
                <span className="text-[10px] font-mono px-1 bg-slate-800 text-slate-400 rounded">
                  DEMO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Outbound cost per ad network · Total Spend: ${totalSpend.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            {trafficSources.map((source) => {
              const pct = totalSpend > 0 ? (source.spend / totalSpend) * 100 : 0;
              return (
                <div key={source.name} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/90 hover:border-slate-700/80 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {source.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-rose-500/15 text-rose-300 rounded border border-rose-500/20">
                        Cost Driver
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white font-mono tabular-nums">
                        ${source.spend.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1.5 font-mono">
                        ({pct.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Sub-metrics */}
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{source.clicks.toLocaleString()} clicks · CPC: ${source.avgCpc.toFixed(4)}</span>
                    <span className="text-slate-400">{source.activeCampaigns} campaigns</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Monetization Networks (Revenue) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  Monetization Networks (Gross Revenue)
                </h3>
                <span className="text-[10px] font-mono px-1 bg-slate-800 text-slate-400 rounded">
                  DEMO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Inbound payouts from offers & yields · Total Rev: ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            {monetizationNetworks.map((net) => {
              const pct = totalRevenue > 0 ? (net.revenue / totalRevenue) * 100 : 0;
              return (
                <div key={net.name} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/90 hover:border-slate-700/80 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-tight">
                        {net.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/15 text-emerald-300 rounded border border-emerald-500/20">
                        {net.payoutModel}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                        ${net.revenue.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 ml-1.5 font-mono">
                        ({pct.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Sub-metrics */}
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{net.conversions.toLocaleString()} conversions</span>
                    <span className="text-slate-400">eCPM: ${net.ecpm.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Format Margin & Profitability Strip */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Traffic Format Profitability & Volume Share
            </h3>
            <span className="text-[10px] font-mono px-1 bg-slate-800 text-slate-400 rounded">
              DEMO
            </span>
          </div>
          <span className="text-xs font-mono text-purple-300">
            Popunder & Push generate 82.7% of net arbitrage profit
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {formats.map((fmt) => (
            <div
              key={fmt.format}
              className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/90 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="truncate">{fmt.format}</span>
                <span className={`font-mono text-[11px] ${fmt.roi >= 50 ? 'text-emerald-400' : fmt.roi > 0 ? 'text-purple-300' : 'text-rose-400'}`}>
                  {fmt.roi.toFixed(1)}% ROI
                </span>
              </div>

              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-slate-400 text-[11px]">Net Margin:</span>
                <span className={`font-bold tabular-nums ${fmt.netProfit >= 0 ? 'text-purple-300' : 'text-rose-400'}`}>
                  ${fmt.netProfit.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                <span>Rev: ${fmt.revenue.toFixed(1)}</span>
                <span>Cost: ${fmt.spend.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
