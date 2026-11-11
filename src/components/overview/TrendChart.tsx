import React, { useState, useMemo } from 'react';
import { TrendDataPoint } from '../../types/analytics';
import { TrendingUp, Layers } from 'lucide-react';

interface TrendChartProps {
  data: TrendDataPoint[];
}

type MetricView = 'all' | 'profit' | 'rev_vs_spend';

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<MetricView>('all');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 24, bottom: 32, left: 56 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Maximum value for scaling
  const maxValue = useMemo(() => {
    let max = 0;
    data.forEach((d) => {
      max = Math.max(max, d.revenue, d.spend, d.netProfit);
    });
    return Math.ceil((max * 1.15) / 100) * 100 || 500;
  }, [data]);

  // Point coordinate calculations
  const points = useMemo(() => {
    if (!data.length) return [];
    return data.map((d, i) => {
      const x = padding.left + (i / (data.length - 1)) * chartW;
      const yRev = padding.top + chartH - (d.revenue / maxValue) * chartH;
      const ySpend = padding.top + chartH - (d.spend / maxValue) * chartH;
      const yProfit = padding.top + chartH - (Math.max(0, d.netProfit) / maxValue) * chartH;
      return { x, yRev, ySpend, yProfit, raw: d };
    });
  }, [data, maxValue, chartW, chartH, padding]);

  // Generate SVG path for line and area
  const createPath = (key: 'yRev' | 'ySpend' | 'yProfit') => {
    if (!points.length) return { line: '', area: '' };
    const lineParts: string[] = [];
    points.forEach((p, idx) => {
      if (idx === 0) {
        lineParts.push(`M ${p.x} ${p[key]}`);
      } else {
        // Smooth bezier curve control points
        const prev = points[idx - 1];
        const cp1x = prev.x + (p.x - prev.x) * 0.45;
        const cp1y = prev[key];
        const cp2x = prev.x + (p.x - prev.x) * 0.55;
        const cp2y = p[key];
        lineParts.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p[key]}`);
      }
    });

    const linePath = lineParts.join(' ');
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    const baseY = padding.top + chartH;
    const areaPath = `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;

    return { line: linePath, area: areaPath };
  };

  const revPaths = useMemo(() => createPath('yRev'), [points]);
  const spendPaths = useMemo(() => createPath('ySpend'), [points]);
  const profitPaths = useMemo(() => createPath('yProfit'), [points]);

  // Y-axis grid ticks (5 steps)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    val: Math.round(maxValue * pct),
    y: padding.top + chartH - pct * chartH,
  }));

  const activeHover = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  const handleTouch = (e: React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch || !points.length) return;
    const clientX = touch.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clientX / rect.width));
    const index = Math.round(ratio * (points.length - 1));
    if (index >= 0 && index < points.length) {
      setHoverIndex(index);
    }
  };

  return (
    <section className="p-4 sm:p-5 rounded-xl bg-[#0c101c] border border-slate-800/90 shadow-md">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/70">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Arbitrage Profitability & Cost Velocity
            </h2>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-purple-500/15 text-purple-300 border border-purple-500/20 rounded">
              DEMO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Hourly revenue generation vs. live advertising media cost
          </p>
        </div>

        {/* View Mode Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveMetric('all')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeMetric === 'all'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Series
          </button>
          <button
            onClick={() => setActiveMetric('profit')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeMetric === 'profit'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Net Profit Only
          </button>
          <button
            onClick={() => setActiveMetric('rev_vs_spend')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeMetric === 'rev_vs_spend'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rev vs. Spend
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-3 pb-1 text-xs text-slate-400 font-medium">
        {(activeMetric === 'all' || activeMetric === 'profit') && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-xs shadow-purple-500/50" />
            <span className="text-white font-semibold">Net Profit (Take-Home)</span>
          </div>
        )}
        {(activeMetric === 'all' || activeMetric === 'rev_vs_spend') && (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/50" />
              <span className="text-slate-300">Monetization Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-xs shadow-rose-400/50" />
              <span className="text-slate-300">Advertising Spend</span>
            </div>
          </>
        )}
      </div>

      {/* SVG Canvas Area */}
      <div className="relative mt-2 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none touch-none"
          onMouseLeave={() => setHoverIndex(null)}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
        >
          <defs>
            {/* Profit gradient */}
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
            </linearGradient>

            {/* Revenue gradient */}
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            {/* Spend gradient */}
            <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines & Y-Labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={tick.y}
                x2={width - padding.right}
                y2={tick.y}
                stroke="#1e293b"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                ${tick.val.toLocaleString()}
              </text>
            </g>
          ))}

          {/* Area Gradients */}
          {(activeMetric === 'all' || activeMetric === 'rev_vs_spend') && (
            <>
              <path d={spendPaths.area} fill="url(#spendGrad)" />
              <path d={revPaths.area} fill="url(#revGrad)" />
            </>
          )}
          {(activeMetric === 'all' || activeMetric === 'profit') && (
            <path d={profitPaths.area} fill="url(#profitGrad)" />
          )}

          {/* Line Curves */}
          {(activeMetric === 'all' || activeMetric === 'rev_vs_spend') && (
            <>
              <path
                d={spendPaths.line}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-200"
              />
              <path
                d={revPaths.line}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            </>
          )}

          {(activeMetric === 'all' || activeMetric === 'profit') && (
            <path
              d={profitPaths.line}
              fill="none"
              stroke="#c084fc"
              strokeWidth="2.8"
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          )}

          {/* X-Axis Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-mono"
            >
              {p.raw.timeLabel}
            </text>
          ))}

          {/* Interactive Hover Vertical Crosshair */}
          {activeHover && (
            <g>
              <line
                x1={activeHover.x}
                y1={padding.top}
                x2={activeHover.x}
                y2={padding.top + chartH}
                stroke="#c084fc"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Highlight Circles on hover */}
              <circle
                cx={activeHover.x}
                cy={activeHover.yProfit}
                r="4.5"
                fill="#a855f7"
                stroke="#ffffff"
                strokeWidth="2"
              />
              {(activeMetric === 'all' || activeMetric === 'rev_vs_spend') && (
                <>
                  <circle
                    cx={activeHover.x}
                    cy={activeHover.yRev}
                    r="4"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={activeHover.x}
                    cy={activeHover.ySpend}
                    r="4"
                    fill="#f43f5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </>
              )}
            </g>
          )}

          {/* Invisible interactive hover columns */}
          {points.map((p, i) => {
            const colW = chartW / points.length;
            return (
              <rect
                key={i}
                x={p.x - colW / 2}
                y={padding.top}
                width={colW}
                height={chartH}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>

        {/* Floating Tooltip Card */}
        {activeHover && (
          <div
            className="absolute top-2 z-20 pointer-events-none p-2 sm:p-2.5 rounded-lg bg-[#0f172a]/95 border border-purple-500/40 shadow-xl shadow-black/80 backdrop-blur-md text-[11px] sm:text-xs font-mono max-w-[240px] whitespace-nowrap"
            style={{
              left: `${Math.min(Math.max((activeHover.x / width) * 100, 22), 78)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex items-center justify-between gap-4 pb-1 border-b border-slate-700/60 font-semibold text-slate-200">
              <span>{activeHover.raw.timeLabel}</span>
              <span className="text-purple-400">ROI: {activeHover.raw.roi.toFixed(1)}%</span>
            </div>
            <div className="pt-1.5 space-y-1">
              <div className="flex items-center justify-between gap-4 text-emerald-400">
                <span className="font-sans text-slate-400 text-[11px]">Revenue:</span>
                <span className="font-bold">${activeHover.raw.revenue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-rose-400">
                <span className="font-sans text-slate-400 text-[11px]">Spend:</span>
                <span className="font-bold">${activeHover.raw.spend.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-purple-300 pt-1 border-t border-slate-800">
                <span className="font-sans text-purple-300 font-semibold text-[11px]">Net Profit:</span>
                <span className="font-bold">${activeHover.raw.netProfit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
