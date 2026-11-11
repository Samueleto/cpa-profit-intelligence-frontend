import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  RefreshCw,
  Sun,
  Moon,
  Sparkles,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { DateRangePreset, ProviderSyncItem } from '../../types/analytics';
import { mockProviderSyncStatus } from '../../data/mockAnalytics';

interface TopbarProps {
  currentRouteName: string;
  selectedRange: DateRangePreset;
  onSelectRange: (range: DateRangePreset) => void;
  compareMode: boolean;
  onToggleCompare: () => void;
  onOpenAiDrawer: () => void;
  onToggleMobileMenu: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

const rangeLabels: Record<DateRangePreset, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  mtd: 'Month to Date',
};

export const Topbar: React.FC<TopbarProps> = ({
  currentRouteName,
  selectedRange,
  onSelectRange,
  compareMode,
  onToggleCompare,
  onOpenAiDrawer,
  onToggleMobileMenu,
  isDarkTheme,
  onToggleTheme,
}) => {
  const [syncOpen, setSyncOpen] = useState(false);
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const syncPopoverRef = useRef<HTMLDivElement>(null);
  const rangeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (syncPopoverRef.current && !syncPopoverRef.current.contains(event.target as Node)) {
        setSyncOpen(false);
      }
      if (rangeDropdownRef.current && !rangeDropdownRef.current.contains(event.target as Node)) {
        setRangeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSimulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#0b101b]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Left zone: Mobile toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="hidden sm:inline text-slate-400">Console</span>
          <span className="hidden sm:inline text-slate-600">/</span>
          <span className="text-white font-semibold flex items-center gap-1.5">
            {currentRouteName}
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded">
              DEMO
            </span>
          </span>
        </div>
      </div>

      {/* Right zone: Date selector, Comparison, Sync status, Theme & Ask AI */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Range Selector Dropdown */}
        <div className="relative" ref={rangeDropdownRef}>
          <button
            onClick={() => setRangeDropdownOpen(!rangeDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden xs:inline">{rangeLabels[selectedRange]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {rangeDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-44 p-1 bg-[#0f172a] border border-slate-700 rounded-lg shadow-xl shadow-black/50 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Timeframe
              </div>
              {(['today', 'yesterday', '7d', '30d', 'mtd'] as DateRangePreset[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    onSelectRange(key);
                    setRangeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedRange === key
                      ? 'bg-purple-600/20 text-purple-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{rangeLabels[key]}</span>
                  {selectedRange === key && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Period Comparison Toggle */}
        <button
          onClick={onToggleCompare}
          title={compareMode ? 'Comparing with previous period' : 'Click to enable prior period comparison'}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
            compareMode
              ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60 shadow-xs'
              : 'text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Compare: {compareMode ? 'ON' : 'OFF'}</span>
        </button>

        {/* Provider Sync & Data Freshness Indicator with Popover */}
        <div className="relative" ref={syncPopoverRef}>
          <button
            onClick={() => setSyncOpen(!syncOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Sync</span>
            <span className="text-[10px] text-emerald-400 font-mono">99.4%</span>
          </button>

          {/* Sync Status Flyout */}
          {syncOpen && (
            <div className="absolute right-0 mt-1.5 w-80 p-3 bg-[#0f172a] border border-slate-700/90 rounded-xl shadow-2xl shadow-black/60 z-50 text-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Provider S2S Streams
                  <span className="text-[9px] font-mono px-1 bg-purple-500/20 text-purple-300 rounded">
                    DEMO
                  </span>
                </div>
                <button
                  onClick={handleSimulateRefresh}
                  className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sync Now
                </button>
              </div>

              {/* Provider list */}
              <div className="py-2 space-y-2">
                {mockProviderSyncStatus.map((prov) => (
                  <div
                    key={prov.id}
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-white flex items-center gap-1.5">
                        {prov.status === 'synced' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        {prov.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {prov.totalSyncedEvents}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                      <span className="text-purple-400/90 font-medium">{prov.role}</span>
                      <span>{prov.lastSyncedText}</span>
                    </div>

                    {prov.unattributedAmount > 0 && (
                      <div className="mt-1 text-[10px] text-amber-400 font-mono">
                        Unattributed: ${prov.unattributedAmount.toFixed(2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Fastify backend ingest: Standby</span>
                <span className="font-mono text-purple-400">PostgreSQL Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Dark / Light) */}
        <button
          onClick={onToggleTheme}
          aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
        >
          {isDarkTheme ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Floating / Header Ask AI CTA */}
        <button
          onClick={onOpenAiDrawer}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md shadow-purple-950/40 border border-purple-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
          <span className="hidden xs:inline">Ask AI</span>
        </button>
      </div>
    </header>
  );
};
