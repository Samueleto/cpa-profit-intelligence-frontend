import React, { useState, useEffect } from 'react';
import { Sidebar, NavRouteId } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { OverviewView } from './components/overview/OverviewView';
import { PlaceholderView } from './components/ui/PlaceholderView';
import { AiInvestigatorDrawer } from './components/ai/AiInvestigatorDrawer';
import { mockAnalyticsData } from './data/mockAnalytics';
import { DateRangePreset } from './types/analytics';
import { LayoutDashboard, Megaphone, Globe2, Sparkles, Menu } from 'lucide-react';

const routeNames: Record<NavRouteId, string> = {
  overview: 'Overview Dashboard',
  campaigns: 'Campaigns',
  geo: 'GEO Analytics',
  hourly: 'Hourly Analytics',
  ai: 'AI Investigator',
  optimizations: 'Optimizations',
  history: 'Optimization History',
  integrations: 'Integrations',
  settings: 'Settings',
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<NavRouteId>('overview');
  const [selectedRange, setSelectedRange] = useState<DateRangePreset>('7d');
  const [compareMode, setCompareMode] = useState<boolean>(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [aiPromptId, setAiPromptId] = useState<string | undefined>(undefined);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  // Sync theme with <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleOpenAi = (promptId?: string) => {
    setAiPromptId(promptId);
    setAiDrawerOpen(true);
  };

  const currentDataset = mockAnalyticsData[selectedRange] || mockAnalyticsData['7d'];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans">
      {/* 1. Collapsible Sidebar Navigation */}
      <Sidebar
        currentRoute={currentRoute}
        onSelectRoute={setCurrentRoute}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenAiDrawer={() => handleOpenAi()}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Frame */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-out ${
          isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        {/* 2. Top Navigation Bar */}
        <Topbar
          currentRouteName={routeNames[currentRoute]}
          selectedRange={selectedRange}
          onSelectRange={setSelectedRange}
          compareMode={compareMode}
          onToggleCompare={() => setCompareMode(!compareMode)}
          onOpenAiDrawer={() => handleOpenAi()}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          isDarkTheme={isDarkTheme}
          onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        />

        {/* 3. Main Viewport Content */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-[1520px] w-full mx-auto">
          {currentRoute === 'overview' ? (
            <OverviewView
              dataset={currentDataset}
              selectedRange={selectedRange}
              compareMode={compareMode}
              onOpenAiInvestigator={handleOpenAi}
            />
          ) : (
            <PlaceholderView
              routeId={currentRoute}
              onReturnToOverview={() => setCurrentRoute('overview')}
              onOpenAiDrawer={() => handleOpenAi()}
            />
          )}
        </main>
      </div>

      {/* 4. Mobile Bottom Quick Navigation Dock (Thumb-friendly) */}
      <nav aria-label="Mobile bottom navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a0e1a]/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-1 flex items-center justify-around select-none">
        <button
          onClick={() => setCurrentRoute('overview')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-h-[44px] transition-colors ${
            currentRoute === 'overview'
              ? 'text-purple-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => setCurrentRoute('campaigns')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-h-[44px] transition-colors ${
            currentRoute === 'campaigns'
              ? 'text-purple-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Campaigns</span>
        </button>

        {/* Center Ask AI highlight button */}
        <button
          onClick={() => handleOpenAi()}
          className="flex flex-col items-center justify-center py-1 px-3 -mt-3.5 group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-950/80 border border-purple-400/40 group-active:scale-95 transition-transform">
            <Sparkles className="w-4 h-4 text-purple-100" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold text-purple-300">Ask AI</span>
        </button>

        <button
          onClick={() => setCurrentRoute('geo')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-h-[44px] transition-colors ${
            currentRoute === 'geo'
              ? 'text-purple-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">GEOs</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-lg min-h-[44px] text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Menu</span>
        </button>
      </nav>

      {/* 5. Interactive Slide-over AI Investigator Drawer */}
      <AiInvestigatorDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        initialPromptId={aiPromptId}
      />
    </div>
  );
}
