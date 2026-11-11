import React from 'react';
import {
  LayoutDashboard,
  Megaphone,
  Globe2,
  Clock,
  Sparkles,
  SlidersHorizontal,
  History,
  Cable,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  X
} from 'lucide-react';

export type NavRouteId =
  | 'overview'
  | 'campaigns'
  | 'geo'
  | 'hourly'
  | 'ai'
  | 'optimizations'
  | 'history'
  | 'integrations'
  | 'settings';

interface SidebarProps {
  currentRoute: NavRouteId;
  onSelectRoute: (route: NavRouteId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAiDrawer: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  id: NavRouteId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  isAi?: boolean;
}

const navItems: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone, badge: '29' },
  { id: 'geo', label: 'GEO Analytics', icon: Globe2 },
  { id: 'hourly', label: 'Hourly Analytics', icon: Clock },
  { id: 'ai', label: 'AI Investigator', icon: Sparkles, isAi: true, badge: 'Audit' },
  { id: 'optimizations', label: 'Optimizations', icon: SlidersHorizontal, badge: '3' },
  { id: 'history', label: 'Optimization History', icon: History },
  { id: 'integrations', label: 'Integrations', icon: Cable, badge: 'DEMO' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onSelectRoute,
  isCollapsed,
  onToggleCollapse,
  onOpenAiDrawer,
  mobileOpen,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#0b101b] border-r border-slate-800/80 transition-all duration-200 ease-out select-none
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}
        `}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 shrink-0">
          <div
            onClick={() => {
              onSelectRoute('overview');
              onCloseMobile();
            }}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            {/* Logo Mark */}
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 text-white shadow-md shadow-purple-900/30 shrink-0 border border-purple-400/20 group-hover:border-purple-300/40 transition-colors">
              <TrendingUp className="w-5 h-5 text-white stroke-[2.2]" />
            </div>

            {/* Wordmark & Tagline (Hidden when collapsed) */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap group-hover:text-purple-200 transition-colors">
                  CPA PROFIT
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-purple-400/90 whitespace-nowrap">
                  INTELLIGENCE
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            aria-label="Close navigation drawer"
            className="flex lg:hidden items-center justify-center w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-2.5 py-4 overflow-y-auto space-y-1">
          {!isCollapsed && (
            <div className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Analytics & Control
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'ai') {
                    onOpenAiDrawer();
                  } else {
                    onSelectRoute(item.id);
                  }
                  onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 text-xs font-medium rounded-lg transition-colors group relative
                  ${isActive
                    ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }
                  ${isCollapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'
                  } ${item.isAi ? 'text-purple-400' : ''}`}
                />

                {!isCollapsed && (
                  <span className="truncate whitespace-nowrap flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded text-xs shrink-0 ${
                      item.isAi
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : item.badge === 'DEMO'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer / Provider Sync Overview */}
        <div className="p-3 border-t border-slate-800/80 shrink-0 bg-[#090d16]">
          {!isCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Provider Streams
                </span>
                <span className="text-[10px] font-mono font-semibold px-1 py-0.5 bg-slate-800 text-slate-300 rounded">
                  DEMO
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                ExoClick · Zeydoo · ProPush · RollerAds
              </div>
              <div className="pt-1 text-[10px] text-slate-400 italic">
                Backend VPS ready for Fastify integration
              </div>
            </div>
          ) : (
            <div className="flex justify-center" title="All figures DEMO simulated">
              <AlertCircle className="w-4 h-4 text-purple-400/80" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
