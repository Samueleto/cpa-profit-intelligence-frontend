export type DateRangePreset = 'today' | 'yesterday' | '7d' | '30d' | 'mtd';

export interface FinancialKPIs {
  totalRevenue: number;
  adSpend: number;
  netProfit: number;
  roiPercentage: number;
  cpc: number;
  ecpm: number;
  conversionRate: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  // Prior period comparisons for delta display
  previousPeriod: {
    totalRevenue: number;
    adSpend: number;
    netProfit: number;
    roiPercentage: number;
    cpc: number;
    ecpm: number;
    conversionRate: number;
  };
}

export interface TrendDataPoint {
  timeLabel: string;
  revenue: number;
  spend: number;
  netProfit: number;
  roi: number;
  clicks: number;
  conversions: number;
}

export interface TrafficSourceSpend {
  name: string; // e.g. "ExoClick Network", "RollerAds DSP"
  type: 'traffic_source';
  spend: number;
  clicks: number;
  impressions: number;
  avgCpc: number;
  activeCampaigns: number;
  percentageOfSpend: number;
}

export interface MonetizationNetworkRevenue {
  name: string; // e.g. "Zeydoo SmartLink", "ProPush Monetization", "RollerAds Monetize"
  type: 'monetization_network';
  revenue: number;
  conversions: number;
  ecpm: number;
  payoutModel: string;
  percentageOfRevenue: number;
}

export interface TrafficFormatBreakdown {
  format: string; // "Popunder / Tab", "Push Notifications", "In-Page Push", "Direct Click"
  spend: number;
  revenue: number;
  netProfit: number;
  roi: number;
  share: number;
}

export interface CampaignItem {
  id: string;
  name: string;
  trafficSource: string; // Where ad spend occurs (e.g. ExoClick)
  monetizationNetwork: string; // Where revenue is earned (e.g. Zeydoo, ProPush)
  format: string;
  geo: string;
  status: 'active' | 'paused' | 'testing';
  spend: number;
  revenue: number;
  netProfit: number;
  roi: number;
  clicks: number;
  conversions: number;
  cpc: number;
  cr: number;
  isLossLeader?: boolean;
}

export interface GeoItem {
  countryCode: string;
  countryName: string;
  spend: number;
  revenue: number;
  netProfit: number;
  roi: number;
  clicks: number;
  conversions: number;
  cr: number;
}

export interface ProviderSyncItem {
  id: string;
  name: string;
  role: 'Traffic Source (Cost/Spend)' | 'Monetization Network (Revenue)';
  status: 'synced' | 'delayed' | 'warning';
  lastSyncedText: string;
  unattributedAmount: number;
  totalSyncedEvents: string;
  syncFreshnessPercent: number;
}

export interface DataIntegrityAlert {
  id: string;
  type: 'unattributed' | 'latency' | 'threshold';
  title: string;
  message: string;
  varianceAmount: number;
  provider: string;
  timestamp: string;
}

export interface AiInvestigationPrompt {
  id: string;
  label: string;
  badge: string;
  promptText: string;
  category: 'leakage' | 'scaling' | 'arbitrage' | 'sync';
}

export interface AiInvestigationResult {
  id: string;
  title: string;
  severity: 'critical' | 'positive' | 'warning';
  summary: string;
  rootCause: string;
  actionItem: string;
  financialImpact: string;
  affectedNetworks: string[];
  metricsBreakdown: {
    spend: number;
    revenue: number;
    currentRoi: number;
    projectedGain: number;
  };
}

export interface DatasetForPeriod {
  kpis: FinancialKPIs;
  trendSeries: TrendDataPoint[];
  trafficSources: TrafficSourceSpend[];
  monetizationNetworks: MonetizationNetworkRevenue[];
  formats: TrafficFormatBreakdown[];
  campaigns: CampaignItem[];
  biggestLosses: CampaignItem[];
  geos: GeoItem[];
}

