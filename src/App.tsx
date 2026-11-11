import React, { useState, useEffect } from 'react';
import { Sidebar, NavRouteId } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { OverviewView } from './components/overview/OverviewView';
import { PlaceholderView } from './components/ui/PlaceholderView';
import { AiInvestigatorDrawer } from './components/ai/AiInvestigatorDrawer';
import { mockAnalyticsData } from './data/mockAnalytics';
import { DateRangePreset } from './types/analytics';

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
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1520px] w-full mx-auto">
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

      {/* 4. Interactive Slide-over AI Investigator Drawer */}
      <AiInvestigatorDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        initialPromptId={aiPromptId}
      />
    </div>
  );
}
