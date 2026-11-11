import React from 'react';
import {
  Megaphone,
  Globe2,
  Clock,
  Sparkles,
  SlidersHorizontal,
  History,
  Cable,
  Settings,
  ArrowLeft,
  Terminal,
  Database
} from 'lucide-react';
import { NavRouteId } from '../layout/Sidebar';

interface PlaceholderViewProps {
  routeId: NavRouteId;
  onReturnToOverview: () => void;
  onOpenAiDrawer: () => void;
}

const routeMetadata: Record<
  NavRouteId,
  { title: string; subtitle: string; icon: React.ElementType; fastifyRoute: string; dbTable: string }
> = {
  overview: {
    title: 'Overview',
    subtitle: 'Primary financial analytics dashboard',
    icon: Sparkles,
    fastifyRoute: 'GET /api/v1/analytics/overview',
    dbTable: 'analytics_hourly_aggregates',
  },
  campaigns: {
    title: 'Campaign Management & Drilldown',
    subtitle: 'Granular per-campaign media buy ledger, zone-level bids, and target URLs',
    icon: Megaphone,
    fastifyRoute: 'GET /api/v1/campaigns',
    dbTable: 'campaigns, campaign_stats_daily',
  },
  geo: {
    title: 'GEO Arbitrage Matrix',
    subtitle: 'Country tier breakdowns, localized conversion yields, and multi-currency normalization',
    icon: Globe2,
    fastifyRoute: 'GET /api/v1/analytics/geo',
    dbTable: 'geo_breakdowns, currency_rates',
  },
  hourly: {
    title: 'Hourly Heatmap & Dayparting',
    subtitle: 'Intraday peak conversion windows, scheduled bid escalations, and off-hour traffic cutoffs',
    icon: Clock,
    fastifyRoute: 'GET /api/v1/analytics/dayparting',
    dbTable: 'hourly_traffic_events',
  },
  ai: {
    title: 'AI Investigator Terminal',
    subtitle: 'Autonomous anomaly detection, fraud/bot traffic filtration, and margin leak audits',
    icon: Sparkles,
    fastifyRoute: 'POST /api/v1/ai/audit',
    dbTable: 'ai_investigation_logs',
  },
  optimizations: {
    title: 'Active Optimizations & Rules Engine',
    subtitle: 'Automated ExoClick/RollerAds bid adjustments and negative ROI blacklist triggers',
    icon: SlidersHorizontal,
    fastifyRoute: 'GET /api/v1/rules',
    dbTable: 'automation_rules, rule_triggers',
  },
  history: {
    title: 'Optimization Audit History',
    subtitle: 'Complete timeline of automated bid updates, campaign pauses, and budget revisions',
    icon: History,
    fastifyRoute: 'GET /api/v1/rules/history',
    dbTable: 'rule_execution_history',
  },
  integrations: {
    title: 'Provider Integrations & S2S Postbacks',
    subtitle: 'ExoClick API, Zeydoo S2S Webhooks, ProPush API keys, and RollerAds reporting feeds',
    icon: Cable,
    fastifyRoute: 'GET /api/v1/integrations/status',
    dbTable: 'provider_credentials, postback_logs',
  },
  settings: {
    title: 'Application & Currency Settings',
    subtitle: 'Alert thresholds, VPS webhook endpoints, timezone alignment, and PostgreSQL pool configs',
    icon: Settings,
    fastifyRoute: 'GET /api/v1/settings',
    dbTable: 'app_settings',
  },
};

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({
  routeId,
  onReturnToOverview,
  onOpenAiDrawer
}) => {
  const meta = routeMetadata[routeId] || routeMetadata.overview;
  const Icon = meta.icon;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      {/* Return button */}
      <button
        onClick={onReturnToOverview}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Overview Dashboard</span>
      </button>

      {/* Main card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0c101c] border border-slate-800/90 shadow-xl space-y-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-300 shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {meta.title}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded">
                  DEMO PLACEHOLDER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {meta.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onReturnToOverview}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors self-center sm:self-auto"
          >
            Go to Live Overview
          </button>
        </div>

        {/* VPS / Fastify / PostgreSQL Scaffold Notes */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Export & Integration Ready for Codex (VS Code)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300 font-sans font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Fastify Backend Endpoint</span>
              </div>
              <div className="text-slate-300 text-[11px] bg-black/40 p-1.5 rounded">
                {meta.fastifyRoute}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-300 font-sans font-semibold">
                <Database className="w-3.5 h-3.5" />
                <span>Target PostgreSQL Table</span>
              </div>
              <div className="text-slate-300 text-[11px] bg-black/40 p-1.5 rounded">
                {meta.dbTable}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-purple-200">Architectural Note:</span> All navigation paths, responsive layouts, design tokens, and components are ready for clean export to your local <code className="text-purple-300 font-mono text-[11px]">/root/cpa-profit-intelligence</code> repository.
            </div>
            <button
              onClick={onOpenAiDrawer}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold shrink-0 text-xs shadow-xs"
            >
              Open AI Investigator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
