import {
  DateRangePreset,
  FinancialKPIs,
  TrendDataPoint,
  TrafficSourceSpend,
  MonetizationNetworkRevenue,
  TrafficFormatBreakdown,
  CampaignItem,
  GeoItem,
  ProviderSyncItem,
  DataIntegrityAlert,
  AiInvestigationPrompt,
  AiInvestigationResult,
  DatasetForPeriod
} from '../types/analytics';


// 7-day default realistic dataset
export const mockAnalyticsData: Record<DateRangePreset, DatasetForPeriod> = {
  today: {
    kpis: {
      totalRevenue: 2385.60,
      adSpend: 1420.00,
      netProfit: 965.60,
      roiPercentage: 68.00,
      cpc: 0.0271,
      ecpm: 1.295,
      conversionRate: 3.20,
      totalImpressions: 1842000,
      totalClicks: 52400,
      totalConversions: 1677,
      previousPeriod: {
        totalRevenue: 2190.00,
        adSpend: 1380.00,
        netProfit: 810.00,
        roiPercentage: 58.70,
        cpc: 0.0285,
        ecpm: 1.220,
        conversionRate: 2.95,
      }
    },
    trendSeries: [
      { timeLabel: '00:00', revenue: 64.20, spend: 42.00, netProfit: 22.20, roi: 52.8, clicks: 1540, conversions: 48 },
      { timeLabel: '03:00', revenue: 48.00, spend: 35.00, netProfit: 13.00, roi: 37.1, clicks: 1260, conversions: 36 },
      { timeLabel: '06:00', revenue: 92.50, spend: 56.00, netProfit: 36.50, roi: 65.2, clicks: 2100, conversions: 71 },
      { timeLabel: '09:00', revenue: 210.80, spend: 115.00, netProfit: 95.80, roi: 83.3, clicks: 4320, conversions: 146 },
      { timeLabel: '12:00', revenue: 384.00, spend: 210.00, netProfit: 174.00, roi: 82.9, clicks: 7850, conversions: 272 },
      { timeLabel: '15:00', revenue: 495.20, spend: 285.00, netProfit: 210.20, roi: 73.8, clicks: 10400, conversions: 345 },
      { timeLabel: '18:00', revenue: 582.40, spend: 345.00, netProfit: 237.40, roi: 68.8, clicks: 12750, conversions: 412 },
      { timeLabel: '21:00', revenue: 508.50, spend: 332.00, netProfit: 176.50, roi: 53.2, clicks: 12180, conversions: 347 }
    ],
    trafficSources: [
      { name: 'ExoClick DSP', type: 'traffic_source', spend: 1080.00, clicks: 41200, impressions: 1420000, avgCpc: 0.0262, activeCampaigns: 18, percentageOfSpend: 76.06 },
      { name: 'RollerAds Traffic', type: 'traffic_source', spend: 340.00, clicks: 11200, impressions: 422000, avgCpc: 0.0304, activeCampaigns: 7, percentageOfSpend: 23.94 }
    ],
    monetizationNetworks: [
      { name: 'Zeydoo SmartLink', type: 'monetization_network', revenue: 1640.40, conversions: 1140, ecpm: 1.48, payoutModel: 'CPA / CPL', percentageOfRevenue: 68.76 },
      { name: 'ProPush Monetag', type: 'monetization_network', revenue: 512.20, conversions: 412, ecpm: 0.98, payoutModel: 'CPS / RevShare', percentageOfRevenue: 21.47 },
      { name: 'RollerAds Yield', type: 'monetization_network', revenue: 233.00, conversions: 125, ecpm: 1.12, payoutModel: 'CPC / CPM', percentageOfRevenue: 9.77 }
    ],
    formats: [
      { format: 'Popunder / New Tab', spend: 760.00, revenue: 1368.00, netProfit: 608.00, roi: 80.0, share: 53.5 },
      { format: 'Push Subscriptions', spend: 410.00, revenue: 688.80, netProfit: 278.80, roi: 68.0, share: 28.9 },
      { format: 'In-Page Push (IPP)', spend: 180.00, revenue: 243.00, netProfit: 63.00, roi: 35.0, share: 12.7 },
      { format: 'Direct Native Click', spend: 70.00, revenue: 85.80, netProfit: 15.80, roi: 22.6, share: 4.9 }
    ],
    campaigns: [
      {
        id: 'CMP-7041',
        name: 'EXO-ZEY · Sweepstakes US Tier1 Tab',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'US',
        status: 'active',
        spend: 420.00,
        revenue: 798.00,
        netProfit: 378.00,
        roi: 90.0,
        clicks: 14800,
        conversions: 524,
        cpc: 0.0284,
        cr: 3.54
      },
      {
        id: 'CMP-6984',
        name: 'EXO-PRO · Android Antivirus Utility BR',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'ProPush Monetag',
        format: 'Popunder',
        geo: 'BR',
        status: 'active',
        spend: 260.00,
        revenue: 481.00,
        netProfit: 221.00,
        roi: 85.0,
        clicks: 11400,
        conversions: 418,
        cpc: 0.0228,
        cr: 3.67
      },
      {
        id: 'CMP-7102',
        name: 'ROL-ZEY · Finance Survey Incentive DE',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Push Notifications',
        geo: 'DE',
        status: 'active',
        spend: 180.00,
        revenue: 306.00,
        netProfit: 126.00,
        roi: 70.0,
        clicks: 5800,
        conversions: 189,
        cpc: 0.0310,
        cr: 3.26
      },
      {
        id: 'CMP-7215',
        name: 'ROL-PRO · Push Sub Backfill Global ID',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'ProPush Monetag',
        format: 'In-Page Push',
        geo: 'ID',
        status: 'active',
        spend: 110.00,
        revenue: 176.00,
        netProfit: 66.00,
        roi: 60.0,
        clicks: 4200,
        conversions: 152,
        cpc: 0.0262,
        cr: 3.62
      }
    ],
    biggestLosses: [
      {
        id: 'CMP-6940',
        name: 'EXO-ZEY · Dating Adult WebCam FR [Bleed]',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'FR',
        status: 'active',
        spend: 165.00,
        revenue: 82.50,
        netProfit: -82.50,
        roi: -50.0,
        clicks: 5100,
        conversions: 42,
        cpc: 0.0324,
        cr: 0.82,
        isLossLeader: true
      },
      {
        id: 'CMP-7244',
        name: 'ROL-ROL · Casino Direct Prelander MX',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'RollerAds Yield',
        format: 'Push Notifications',
        geo: 'MX',
        status: 'testing',
        spend: 85.00,
        revenue: 51.00,
        netProfit: -34.00,
        roi: -40.0,
        clicks: 2900,
        conversions: 24,
        cpc: 0.0293,
        cr: 0.83,
        isLossLeader: true
      }
    ],
    geos: [
      { countryCode: 'US', countryName: 'United States', spend: 540.00, revenue: 1026.00, netProfit: 486.00, roi: 90.0, clicks: 17200, conversions: 620, cr: 3.60 },
      { countryCode: 'BR', countryName: 'Brazil', spend: 310.00, revenue: 558.00, netProfit: 248.00, roi: 80.0, clicks: 13500, conversions: 495, cr: 3.67 },
      { countryCode: 'DE', countryName: 'Germany', spend: 220.00, revenue: 374.00, netProfit: 154.00, roi: 70.0, clicks: 6800, conversions: 228, cr: 3.35 },
      { countryCode: 'ID', countryName: 'Indonesia', spend: 150.00, revenue: 225.00, netProfit: 75.00, roi: 50.0, clicks: 6100, conversions: 195, cr: 3.20 },
      { countryCode: 'FR', countryName: 'France', spend: 200.00, revenue: 202.60, netProfit: 2.60, roi: 1.3, clicks: 8800, conversions: 139, cr: 1.58 }
    ]
  },
  yesterday: {
    kpis: {
      totalRevenue: 2190.00,
      adSpend: 1380.00,
      netProfit: 810.00,
      roiPercentage: 58.70,
      cpc: 0.0285,
      ecpm: 1.220,
      conversionRate: 2.95,
      totalImpressions: 1795000,
      totalClicks: 48420,
      totalConversions: 1428,
      previousPeriod: {
        totalRevenue: 2050.00,
        adSpend: 1320.00,
        netProfit: 730.00,
        roiPercentage: 55.30,
        cpc: 0.0290,
        ecpm: 1.180,
        conversionRate: 2.80
      }
    },
    trendSeries: [
      { timeLabel: '00:00', revenue: 58.00, spend: 38.00, netProfit: 20.00, roi: 52.6, clicks: 1320, conversions: 39 },
      { timeLabel: '03:00', revenue: 42.00, spend: 32.00, netProfit: 10.00, roi: 31.2, clicks: 1110, conversions: 31 },
      { timeLabel: '06:00', revenue: 84.00, spend: 52.00, netProfit: 32.00, roi: 61.5, clicks: 1890, conversions: 58 },
      { timeLabel: '09:00', revenue: 195.00, spend: 110.00, netProfit: 85.00, roi: 77.2, clicks: 3950, conversions: 122 },
      { timeLabel: '12:00', revenue: 350.00, spend: 205.00, netProfit: 145.00, roi: 70.7, clicks: 7200, conversions: 224 },
      { timeLabel: '15:00', revenue: 460.00, spend: 280.00, netProfit: 180.00, roi: 64.3, clicks: 9800, conversions: 295 },
      { timeLabel: '18:00', revenue: 535.00, spend: 340.00, netProfit: 195.00, roi: 57.4, clicks: 11900, conversions: 350 },
      { timeLabel: '21:00', revenue: 466.00, spend: 323.00, netProfit: 143.00, roi: 44.3, clicks: 11250, conversions: 309 }
    ],
    trafficSources: [
      { name: 'ExoClick DSP', type: 'traffic_source', spend: 1045.00, clicks: 37500, impressions: 1370000, avgCpc: 0.0278, activeCampaigns: 18, percentageOfSpend: 75.72 },
      { name: 'RollerAds Traffic', type: 'traffic_source', spend: 335.00, clicks: 10920, impressions: 425000, avgCpc: 0.0306, activeCampaigns: 7, percentageOfSpend: 24.28 }
    ],
    monetizationNetworks: [
      { name: 'Zeydoo SmartLink', type: 'monetization_network', revenue: 1510.00, conversions: 980, ecpm: 1.41, payoutModel: 'CPA / CPL', percentageOfRevenue: 68.95 },
      { name: 'ProPush Monetag', type: 'monetization_network', revenue: 468.00, conversions: 338, ecpm: 0.94, payoutModel: 'CPS / RevShare', percentageOfRevenue: 21.37 },
      { name: 'RollerAds Yield', type: 'monetization_network', revenue: 212.00, conversions: 110, ecpm: 1.08, payoutModel: 'CPC / CPM', percentageOfRevenue: 9.68 }
    ],
    formats: [
      { format: 'Popunder / New Tab', spend: 740.00, revenue: 1258.00, netProfit: 518.00, roi: 70.0, share: 53.6 },
      { format: 'Push Subscriptions', spend: 400.00, revenue: 624.00, netProfit: 224.00, roi: 56.0, share: 29.0 },
      { format: 'In-Page Push (IPP)', spend: 175.00, revenue: 227.50, netProfit: 52.50, roi: 30.0, share: 12.7 },
      { format: 'Direct Native Click', spend: 65.00, revenue: 80.50, netProfit: 15.50, roi: 23.8, share: 4.7 }
    ],
    campaigns: [
      {
        id: 'CMP-7041',
        name: 'EXO-ZEY · Sweepstakes US Tier1 Tab',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'US',
        status: 'active',
        spend: 410.00,
        revenue: 738.00,
        netProfit: 328.00,
        roi: 80.0,
        clicks: 13900,
        conversions: 445,
        cpc: 0.0295,
        cr: 3.20
      },
      {
        id: 'CMP-6984',
        name: 'EXO-PRO · Android Antivirus Utility BR',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'ProPush Monetag',
        format: 'Popunder',
        geo: 'BR',
        status: 'active',
        spend: 250.00,
        revenue: 437.50,
        netProfit: 187.50,
        roi: 75.0,
        clicks: 10800,
        conversions: 356,
        cpc: 0.0231,
        cr: 3.30
      },
      {
        id: 'CMP-7102',
        name: 'ROL-ZEY · Finance Survey Incentive DE',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Push Notifications',
        geo: 'DE',
        status: 'active',
        spend: 175.00,
        revenue: 280.00,
        netProfit: 105.00,
        roi: 60.0,
        clicks: 5400,
        conversions: 162,
        cpc: 0.0324,
        cr: 3.00
      },
      {
        id: 'CMP-7215',
        name: 'ROL-PRO · Push Sub Backfill Global ID',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'ProPush Monetag',
        format: 'In-Page Push',
        geo: 'ID',
        status: 'active',
        spend: 105.00,
        revenue: 157.50,
        netProfit: 52.50,
        roi: 50.0,
        clicks: 3900,
        conversions: 128,
        cpc: 0.0269,
        cr: 3.28
      }
    ],
    biggestLosses: [
      {
        id: 'CMP-6940',
        name: 'EXO-ZEY · Dating Adult WebCam FR [Bleed]',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'FR',
        status: 'active',
        spend: 150.00,
        revenue: 75.00,
        netProfit: -75.00,
        roi: -50.0,
        clicks: 4600,
        conversions: 35,
        cpc: 0.0326,
        cr: 0.76,
        isLossLeader: true
      },
      {
        id: 'CMP-7244',
        name: 'ROL-ROL · Casino Direct Prelander MX',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'RollerAds Yield',
        format: 'Push Notifications',
        geo: 'MX',
        status: 'testing',
        spend: 80.00,
        revenue: 44.00,
        netProfit: -36.00,
        roi: -45.0,
        clicks: 2650,
        conversions: 19,
        cpc: 0.0302,
        cr: 0.72,
        isLossLeader: true
      }
    ],
    geos: [
      { countryCode: 'US', countryName: 'United States', spend: 520.00, revenue: 936.00, netProfit: 416.00, roi: 80.0, clicks: 15900, conversions: 525, cr: 3.30 },
      { countryCode: 'BR', countryName: 'Brazil', spend: 300.00, revenue: 510.00, netProfit: 210.00, roi: 70.0, clicks: 12500, conversions: 412, cr: 3.30 },
      { countryCode: 'DE', countryName: 'Germany', spend: 215.00, revenue: 344.00, netProfit: 129.00, roi: 60.0, clicks: 6200, conversions: 192, cr: 3.10 },
      { countryCode: 'ID', countryName: 'Indonesia', spend: 145.00, revenue: 203.00, netProfit: 58.00, roi: 40.0, clicks: 5800, conversions: 168, cr: 2.90 },
      { countryCode: 'FR', countryName: 'France', spend: 200.00, revenue: 197.00, netProfit: -3.00, roi: -1.5, clicks: 8020, conversions: 131, cr: 1.63 }
    ]
  },
  '7d': {
    kpis: {
      totalRevenue: 19417.60,
      adSpend: 11840.00,
      netProfit: 7577.60,
      roiPercentage: 64.00,
      cpc: 0.0280,
      ecpm: 1.304,
      conversionRate: 3.20,
      totalImpressions: 14890000,
      totalClicks: 422800,
      totalConversions: 13530,
      previousPeriod: {
        totalRevenue: 16920.00,
        adSpend: 10980.00,
        netProfit: 5940.00,
        roiPercentage: 54.10,
        cpc: 0.0292,
        ecpm: 1.210,
        conversionRate: 2.88
      }
    },
    trendSeries: [
      { timeLabel: 'Mon (Nov 5)', revenue: 2450.00, spend: 1520.00, netProfit: 930.00, roi: 61.2, clicks: 54200, conversions: 1720 },
      { timeLabel: 'Tue (Nov 6)', revenue: 2610.00, spend: 1610.00, netProfit: 1000.00, roi: 62.1, clicks: 57400, conversions: 1840 },
      { timeLabel: 'Wed (Nov 7)', revenue: 2840.00, spend: 1680.00, netProfit: 1160.00, roi: 69.0, clicks: 60100, conversions: 1980 },
      { timeLabel: 'Thu (Nov 8)', revenue: 2790.00, spend: 1720.00, netProfit: 1070.00, roi: 62.2, clicks: 61500, conversions: 1940 },
      { timeLabel: 'Fri (Nov 9)', revenue: 3140.00, spend: 1880.00, netProfit: 1260.00, roi: 67.0, clicks: 66800, conversions: 2190 },
      { timeLabel: 'Sat (Nov 10)', revenue: 3202.00, spend: 2010.00, netProfit: 1192.00, roi: 59.3, clicks: 70400, conversions: 2183 },
      { timeLabel: 'Sun (Nov 11)', revenue: 2385.60, spend: 1420.00, netProfit: 965.60, roi: 68.0, clicks: 52400, conversions: 1677 }
    ],
    trafficSources: [
      { name: 'ExoClick DSP', type: 'traffic_source', spend: 8980.00, clicks: 328000, impressions: 11320000, avgCpc: 0.0274, activeCampaigns: 22, percentageOfSpend: 75.84 },
      { name: 'RollerAds Traffic', type: 'traffic_source', spend: 2860.00, clicks: 94800, impressions: 3570000, avgCpc: 0.0302, activeCampaigns: 9, percentageOfSpend: 24.16 }
    ],
    monetizationNetworks: [
      { name: 'Zeydoo SmartLink', type: 'monetization_network', revenue: 13260.00, conversions: 9140, ecpm: 1.45, payoutModel: 'CPA / CPL', percentageOfRevenue: 68.29 },
      { name: 'ProPush Monetag', type: 'monetization_network', revenue: 4280.60, conversions: 3210, ecpm: 1.02, payoutModel: 'CPS / RevShare', percentageOfRevenue: 22.05 },
      { name: 'RollerAds Yield', type: 'monetization_network', revenue: 1877.00, conversions: 1180, ecpm: 1.14, payoutModel: 'CPC / CPM', percentageOfRevenue: 9.66 }
    ],
    formats: [
      { format: 'Popunder / New Tab', spend: 6380.00, revenue: 11165.00, netProfit: 4785.00, roi: 75.0, share: 53.9 },
      { format: 'Push Subscriptions', spend: 3410.00, revenue: 5626.50, netProfit: 2216.50, roi: 65.0, share: 28.8 },
      { format: 'In-Page Push (IPP)', spend: 1480.00, revenue: 2012.80, netProfit: 532.80, roi: 36.0, share: 12.5 },
      { format: 'Direct Native Click', spend: 570.00, revenue: 613.30, netProfit: 43.30, roi: 7.6, share: 4.8 }
    ],
    campaigns: [
      {
        id: 'CMP-7041',
        name: 'EXO-ZEY · Sweepstakes US Tier1 Tab',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'US',
        status: 'active',
        spend: 3480.00,
        revenue: 6612.00,
        netProfit: 3132.00,
        roi: 90.0,
        clicks: 122000,
        conversions: 4390,
        cpc: 0.0285,
        cr: 3.60
      },
      {
        id: 'CMP-6984',
        name: 'EXO-PRO · Android Antivirus Utility BR',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'ProPush Monetag',
        format: 'Popunder',
        geo: 'BR',
        status: 'active',
        spend: 2150.00,
        revenue: 3870.00,
        netProfit: 1720.00,
        roi: 80.0,
        clicks: 94000,
        conversions: 3380,
        cpc: 0.0229,
        cr: 3.60
      },
      {
        id: 'CMP-7102',
        name: 'ROL-ZEY · Finance Survey Incentive DE',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Push Notifications',
        geo: 'DE',
        status: 'active',
        spend: 1520.00,
        revenue: 2584.00,
        netProfit: 1064.00,
        roi: 70.0,
        clicks: 47200,
        conversions: 1510,
        cpc: 0.0322,
        cr: 3.20
      },
      {
        id: 'CMP-7215',
        name: 'ROL-PRO · Push Sub Backfill Global ID',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'ProPush Monetag',
        format: 'In-Page Push',
        geo: 'ID',
        status: 'active',
        spend: 920.00,
        revenue: 1472.00,
        netProfit: 552.00,
        roi: 60.0,
        clicks: 34800,
        conversions: 1185,
        cpc: 0.0264,
        cr: 3.41
      }
    ],
    biggestLosses: [
      {
        id: 'CMP-6940',
        name: 'EXO-ZEY · Dating Adult WebCam FR [Bleed]',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'FR',
        status: 'active',
        spend: 1380.00,
        revenue: 690.00,
        netProfit: -690.00,
        roi: -50.0,
        clicks: 42500,
        conversions: 340,
        cpc: 0.0325,
        cr: 0.80,
        isLossLeader: true
      },
      {
        id: 'CMP-7244',
        name: 'ROL-ROL · Casino Direct Prelander MX',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'RollerAds Yield',
        format: 'Push Notifications',
        geo: 'MX',
        status: 'testing',
        spend: 710.00,
        revenue: 390.50,
        netProfit: -319.50,
        roi: -45.0,
        clicks: 23600,
        conversions: 182,
        cpc: 0.0301,
        cr: 0.77,
        isLossLeader: true
      }
    ],
    geos: [
      { countryCode: 'US', countryName: 'United States', spend: 4420.00, revenue: 8398.00, netProfit: 3978.00, roi: 90.0, clicks: 147000, conversions: 5290, cr: 3.60 },
      { countryCode: 'BR', countryName: 'Brazil', spend: 2680.00, revenue: 4556.00, netProfit: 1876.00, roi: 70.0, clicks: 112000, conversions: 3920, cr: 3.50 },
      { countryCode: 'DE', countryName: 'Germany', spend: 1840.00, revenue: 2944.00, netProfit: 1104.00, roi: 60.0, clicks: 55400, conversions: 1830, cr: 3.30 },
      { countryCode: 'ID', countryName: 'Indonesia', spend: 1220.00, revenue: 1708.00, netProfit: 488.00, roi: 40.0, clicks: 48800, conversions: 1464, cr: 3.00 },
      { countryCode: 'FR', countryName: 'France', spend: 1680.00, revenue: 1811.60, netProfit: 131.60, roi: 7.8, clicks: 59600, conversions: 1026, cr: 1.72 }
    ]
  },
  '30d': {
    kpis: {
      totalRevenue: 78566.00,
      adSpend: 48200.00,
      netProfit: 30366.00,
      roiPercentage: 63.00,
      cpc: 0.0276,
      ecpm: 1.284,
      conversionRate: 3.20,
      totalImpressions: 61200000,
      totalClicks: 1745000,
      totalConversions: 55840,
      previousPeriod: {
        totalRevenue: 68400.00,
        adSpend: 44500.00,
        netProfit: 23900.00,
        roiPercentage: 53.71,
        cpc: 0.0289,
        ecpm: 1.190,
        conversionRate: 2.85
      }
    },
    trendSeries: [
      { timeLabel: 'Week 1', revenue: 17800.00, spend: 11200.00, netProfit: 6600.00, roi: 58.9, clicks: 398000, conversions: 12400 },
      { timeLabel: 'Week 2', revenue: 19400.00, spend: 11900.00, netProfit: 7500.00, roi: 63.0, clicks: 432000, conversions: 13900 },
      { timeLabel: 'Week 3', revenue: 20600.00, spend: 12400.00, netProfit: 8200.00, roi: 66.1, clicks: 456000, conversions: 14800 },
      { timeLabel: 'Week 4', revenue: 20766.00, spend: 12700.00, netProfit: 8066.00, roi: 63.5, clicks: 459000, conversions: 14740 }
    ],
    trafficSources: [
      { name: 'ExoClick DSP', type: 'traffic_source', spend: 36600.00, clicks: 1345000, impressions: 46500000, avgCpc: 0.0272, activeCampaigns: 24, percentageOfSpend: 75.93 },
      { name: 'RollerAds Traffic', type: 'traffic_source', spend: 11600.00, clicks: 400000, impressions: 14700000, avgCpc: 0.0290, activeCampaigns: 11, percentageOfSpend: 24.07 }
    ],
    monetizationNetworks: [
      { name: 'Zeydoo SmartLink', type: 'monetization_network', revenue: 53800.00, conversions: 38200, ecpm: 1.44, payoutModel: 'CPA / CPL', percentageOfRevenue: 68.48 },
      { name: 'ProPush Monetag', type: 'monetization_network', revenue: 17200.00, conversions: 13100, ecpm: 1.01, payoutModel: 'CPS / RevShare', percentageOfRevenue: 21.89 },
      { name: 'RollerAds Yield', type: 'monetization_network', revenue: 7566.00, conversions: 4540, ecpm: 1.11, payoutModel: 'CPC / CPM', percentageOfRevenue: 9.63 }
    ],
    formats: [
      { format: 'Popunder / New Tab', spend: 25800.00, revenue: 45150.00, netProfit: 19350.00, roi: 75.0, share: 53.5 },
      { format: 'Push Subscriptions', spend: 13900.00, revenue: 22935.00, netProfit: 9035.00, roi: 65.0, share: 28.8 },
      { format: 'In-Page Push (IPP)', spend: 6100.00, revenue: 8174.00, netProfit: 2074.00, roi: 34.0, share: 12.7 },
      { format: 'Direct Native Click', spend: 2400.00, revenue: 2307.00, netProfit: -93.00, roi: -3.9, share: 5.0 }
    ],
    campaigns: [
      {
        id: 'CMP-7041',
        name: 'EXO-ZEY · Sweepstakes US Tier1 Tab',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'US',
        status: 'active',
        spend: 14200.00,
        revenue: 26980.00,
        netProfit: 12780.00,
        roi: 90.0,
        clicks: 495000,
        conversions: 18100,
        cpc: 0.0287,
        cr: 3.66
      },
      {
        id: 'CMP-6984',
        name: 'EXO-PRO · Android Antivirus Utility BR',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'ProPush Monetag',
        format: 'Popunder',
        geo: 'BR',
        status: 'active',
        spend: 8750.00,
        revenue: 15750.00,
        netProfit: 7000.00,
        roi: 80.0,
        clicks: 382000,
        conversions: 13800,
        cpc: 0.0229,
        cr: 3.61
      },
      {
        id: 'CMP-7102',
        name: 'ROL-ZEY · Finance Survey Incentive DE',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Push Notifications',
        geo: 'DE',
        status: 'active',
        spend: 6180.00,
        revenue: 10506.00,
        netProfit: 4326.00,
        roi: 70.0,
        clicks: 191000,
        conversions: 6150,
        cpc: 0.0324,
        cr: 3.22
      },
      {
        id: 'CMP-7215',
        name: 'ROL-PRO · Push Sub Backfill Global ID',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'ProPush Monetag',
        format: 'In-Page Push',
        geo: 'ID',
        status: 'active',
        spend: 3740.00,
        revenue: 5984.00,
        netProfit: 2244.00,
        roi: 60.0,
        clicks: 141000,
        conversions: 4820,
        cpc: 0.0265,
        cr: 3.42
      }
    ],
    biggestLosses: [
      {
        id: 'CMP-6940',
        name: 'EXO-ZEY · Dating Adult WebCam FR [Bleed]',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'FR',
        status: 'active',
        spend: 5620.00,
        revenue: 2810.00,
        netProfit: -2810.00,
        roi: -50.0,
        clicks: 172000,
        conversions: 1390,
        cpc: 0.0327,
        cr: 0.81,
        isLossLeader: true
      },
      {
        id: 'CMP-7244',
        name: 'ROL-ROL · Casino Direct Prelander MX',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'RollerAds Yield',
        format: 'Push Notifications',
        geo: 'MX',
        status: 'testing',
        spend: 2890.00,
        revenue: 1589.50,
        netProfit: -1300.50,
        roi: -45.0,
        clicks: 96000,
        conversions: 740,
        cpc: 0.0301,
        cr: 0.77,
        isLossLeader: true
      }
    ],
    geos: [
      { countryCode: 'US', countryName: 'United States', spend: 18100.00, revenue: 34390.00, netProfit: 16290.00, roi: 90.0, clicks: 615000, conversions: 22140, cr: 3.60 },
      { countryCode: 'BR', countryName: 'Brazil', spend: 10900.00, revenue: 18530.00, netProfit: 7630.00, roi: 70.0, clicks: 456000, conversions: 16000, cr: 3.51 },
      { countryCode: 'DE', countryName: 'Germany', spend: 7500.00, revenue: 12000.00, netProfit: 4500.00, roi: 60.0, clicks: 226000, conversions: 7480, cr: 3.31 },
      { countryCode: 'ID', countryName: 'Indonesia', spend: 4950.00, revenue: 6930.00, netProfit: 1980.00, roi: 40.0, clicks: 198000, conversions: 5940, cr: 3.00 },
      { countryCode: 'FR', countryName: 'France', spend: 6750.00, revenue: 6716.00, netProfit: -34.00, roi: -0.5, clicks: 250000, conversions: 4280, cr: 1.71 }
    ]
  },
  mtd: {
    // Month to date identical to 7d for consistency
    kpis: {
      totalRevenue: 27950.00,
      adSpend: 17120.00,
      netProfit: 10830.00,
      roiPercentage: 63.26,
      cpc: 0.0278,
      ecpm: 1.298,
      conversionRate: 3.19,
      totalImpressions: 21530000,
      totalClicks: 615800,
      totalConversions: 19640,
      previousPeriod: {
        totalRevenue: 24200.00,
        adSpend: 15600.00,
        netProfit: 8600.00,
        roiPercentage: 55.13,
        cpc: 0.0290,
        ecpm: 1.205,
        conversionRate: 2.86
      }
    },
    trendSeries: [
      { timeLabel: 'Nov 1 - 3', revenue: 7300.00, spend: 4580.00, netProfit: 2720.00, roi: 59.4, clicks: 164000, conversions: 5180 },
      { timeLabel: 'Nov 4 - 6', revenue: 7850.00, spend: 4810.00, netProfit: 3040.00, roi: 63.2, clicks: 172000, conversions: 5520 },
      { timeLabel: 'Nov 7 - 9', revenue: 8400.00, spend: 5100.00, netProfit: 3300.00, roi: 64.7, clicks: 183000, conversions: 5890 },
      { timeLabel: 'Nov 10 - 11', revenue: 4400.00, spend: 2630.00, netProfit: 1770.00, roi: 67.3, clicks: 96800, conversions: 3050 }
    ],
    trafficSources: [
      { name: 'ExoClick DSP', type: 'traffic_source', spend: 13010.00, clicks: 475000, impressions: 16360000, avgCpc: 0.0274, activeCampaigns: 23, percentageOfSpend: 76.00 },
      { name: 'RollerAds Traffic', type: 'traffic_source', spend: 4110.00, clicks: 140800, impressions: 5170000, avgCpc: 0.0292, activeCampaigns: 10, percentageOfSpend: 24.00 }
    ],
    monetizationNetworks: [
      { name: 'Zeydoo SmartLink', type: 'monetization_network', revenue: 19120.00, conversions: 13420, ecpm: 1.45, payoutModel: 'CPA / CPL', percentageOfRevenue: 68.41 },
      { name: 'ProPush Monetag', type: 'monetization_network', revenue: 6150.00, conversions: 4620, ecpm: 1.02, payoutModel: 'CPS / RevShare', percentageOfRevenue: 22.00 },
      { name: 'RollerAds Yield', type: 'monetization_network', revenue: 2680.00, conversions: 1600, ecpm: 1.13, payoutModel: 'CPC / CPM', percentageOfRevenue: 9.59 }
    ],
    formats: [
      { format: 'Popunder / New Tab', spend: 9150.00, revenue: 16012.50, netProfit: 6862.50, roi: 75.0, share: 53.4 },
      { format: 'Push Subscriptions', spend: 4940.00, revenue: 8151.00, netProfit: 3211.00, roi: 65.0, share: 28.9 },
      { format: 'In-Page Push (IPP)', spend: 2180.00, revenue: 2943.00, netProfit: 763.00, roi: 35.0, share: 12.7 },
      { format: 'Direct Native Click', spend: 850.00, revenue: 843.50, netProfit: -6.50, roi: -0.8, share: 5.0 }
    ],
    campaigns: [
      {
        id: 'CMP-7041',
        name: 'EXO-ZEY · Sweepstakes US Tier1 Tab',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'US',
        status: 'active',
        spend: 5040.00,
        revenue: 9576.00,
        netProfit: 4536.00,
        roi: 90.0,
        clicks: 176000,
        conversions: 6380,
        cpc: 0.0286,
        cr: 3.63
      },
      {
        id: 'CMP-6984',
        name: 'EXO-PRO · Android Antivirus Utility BR',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'ProPush Monetag',
        format: 'Popunder',
        geo: 'BR',
        status: 'active',
        spend: 3100.00,
        revenue: 5580.00,
        netProfit: 2480.00,
        roi: 80.0,
        clicks: 135000,
        conversions: 4890,
        cpc: 0.0230,
        cr: 3.62
      },
      {
        id: 'CMP-7102',
        name: 'ROL-ZEY · Finance Survey Incentive DE',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Push Notifications',
        geo: 'DE',
        status: 'active',
        spend: 2190.00,
        revenue: 3723.00,
        netProfit: 1533.00,
        roi: 70.0,
        clicks: 68000,
        conversions: 2180,
        cpc: 0.0322,
        cr: 3.21
      },
      {
        id: 'CMP-7215',
        name: 'ROL-PRO · Push Sub Backfill Global ID',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'ProPush Monetag',
        format: 'In-Page Push',
        geo: 'ID',
        status: 'active',
        spend: 1320.00,
        revenue: 2112.00,
        netProfit: 792.00,
        roi: 60.0,
        clicks: 50000,
        conversions: 1710,
        cpc: 0.0264,
        cr: 3.42
      }
    ],
    biggestLosses: [
      {
        id: 'CMP-6940',
        name: 'EXO-ZEY · Dating Adult WebCam FR [Bleed]',
        trafficSource: 'ExoClick DSP',
        monetizationNetwork: 'Zeydoo SmartLink',
        format: 'Popunder',
        geo: 'FR',
        status: 'active',
        spend: 1990.00,
        revenue: 995.00,
        netProfit: -995.00,
        roi: -50.0,
        clicks: 61000,
        conversions: 490,
        cpc: 0.0326,
        cr: 0.80,
        isLossLeader: true
      },
      {
        id: 'CMP-7244',
        name: 'ROL-ROL · Casino Direct Prelander MX',
        trafficSource: 'RollerAds Traffic',
        monetizationNetwork: 'RollerAds Yield',
        format: 'Push Notifications',
        geo: 'MX',
        status: 'testing',
        spend: 1020.00,
        revenue: 561.00,
        netProfit: -459.00,
        roi: -45.0,
        clicks: 34000,
        conversions: 260,
        cpc: 0.0300,
        cr: 0.76,
        isLossLeader: true
      }
    ],
    geos: [
      { countryCode: 'US', countryName: 'United States', spend: 6420.00, revenue: 12198.00, netProfit: 5778.00, roi: 90.0, clicks: 224000, conversions: 8080, cr: 3.61 },
      { countryCode: 'BR', countryName: 'Brazil', spend: 3880.00, revenue: 6596.00, netProfit: 2716.00, roi: 70.0, clicks: 162000, conversions: 5690, cr: 3.51 },
      { countryCode: 'DE', countryName: 'Germany', spend: 2660.00, revenue: 4256.00, netProfit: 1596.00, roi: 60.0, clicks: 80200, conversions: 2650, cr: 3.30 },
      { countryCode: 'ID', countryName: 'Indonesia', spend: 1760.00, revenue: 2464.00, netProfit: 704.00, roi: 40.0, clicks: 70400, conversions: 2110, cr: 3.00 },
      { countryCode: 'FR', countryName: 'France', spend: 2400.00, revenue: 2436.00, netProfit: 36.00, roi: 1.5, clicks: 85200, conversions: 1470, cr: 1.73 }
    ]
  }
};

// Provider sync status with explicit DEMO label
export const mockProviderSyncStatus: ProviderSyncItem[] = [
  {
    id: 'prov-exo',
    name: 'ExoClick API',
    role: 'Traffic Source (Cost/Spend)',
    status: 'synced',
    lastSyncedText: 'DEMO · 2 mins ago',
    unattributedAmount: 18.40,
    totalSyncedEvents: '42.8k clicks/hr',
    syncFreshnessPercent: 99.4
  },
  {
    id: 'prov-zey',
    name: 'Zeydoo Postback',
    role: 'Monetization Network (Revenue)',
    status: 'synced',
    lastSyncedText: 'DEMO · Live S2S stream',
    unattributedAmount: 0.00,
    totalSyncedEvents: '1.4k postbacks/hr',
    syncFreshnessPercent: 99.9
  },
  {
    id: 'prov-pro',
    name: 'ProPush Subscriptions',
    role: 'Monetization Network (Revenue)',
    status: 'synced',
    lastSyncedText: 'DEMO · 1 min ago',
    unattributedAmount: 4.80,
    totalSyncedEvents: '320 push leads/hr',
    syncFreshnessPercent: 98.7
  },
  {
    id: 'prov-rol',
    name: 'RollerAds DSP & Yield',
    role: 'Traffic Source (Cost/Spend)',
    status: 'warning',
    lastSyncedText: 'DEMO · Latency 14m (Delay)',
    unattributedAmount: 38.60,
    totalSyncedEvents: '8.6k clicks/hr',
    syncFreshnessPercent: 91.2
  }
];

// Data integrity & discrepancy alerts
export const mockDataAlerts: DataIntegrityAlert[] = [
  {
    id: 'alert-1',
    type: 'unattributed',
    title: 'DEMO · Unattributed Revenue Discrepancy ($61.80)',
    message: 'Postbacks received from Zeydoo with missing or stripped click_id tokens from ExoClick popunder router.',
    varianceAmount: 61.80,
    provider: 'Zeydoo S2S ↔ ExoClick',
    timestamp: '14 mins ago'
  },
  {
    id: 'alert-2',
    type: 'latency',
    title: 'DEMO · RollerAds Spend Ingestion Latency (+14m)',
    message: 'Hourly spend batch sync delayed by RollerAds reporting queue; current ROI may be temporarily inflated by ~2.1%.',
    varianceAmount: 38.60,
    provider: 'RollerAds API',
    timestamp: '28 mins ago'
  }
];

// AI investigation simulated prompts and responses
export const mockAiPrompts: AiInvestigationPrompt[] = [
  {
    id: 'prompt-bleed',
    label: 'Audit Negative ROI Campaigns',
    badge: 'Urgent',
    promptText: 'Analyze all active campaigns losing money over the last 24 hours. Identify the exact zones, geos, and traffic sources driving negative margin.',
    category: 'leakage'
  },
  {
    id: 'prompt-scale',
    label: 'Identify Top 3 Scaling Candidates',
    badge: 'Growth',
    promptText: 'Which campaigns have ROI > 70% and stable conversion volume where increasing ExoClick bid will yield net positive bottom line?',
    category: 'scaling'
  },
  {
    id: 'prompt-sync',
    label: 'Diagnose Unattributed Discrepancies',
    badge: 'Integrity',
    promptText: 'Investigate the $61.80 unattributed postback revenue between Zeydoo and ExoClick. Where is the token dropping?',
    category: 'sync'
  },
  {
    id: 'prompt-propush',
    label: 'Evaluate ProPush Backfill Yield',
    badge: 'Yield',
    promptText: 'Is the secondary monetization layer via ProPush push subscriptions cannibalizing initial Zeydoo sweepstakes conversion rates?',
    category: 'arbitrage'
  }
];

export const mockAiInvestigationResults: Record<string, AiInvestigationResult> = {
  'prompt-bleed': {
    id: 'res-bleed',
    title: 'DEMO · Critical Bleed Audit: French Adult Popunder (CMP-6940)',
    severity: 'critical',
    summary: 'Campaign CMP-6940 on ExoClick targeting FR Mobile has burned $165.00 today generating only $82.50 on Zeydoo (-50% ROI). Three specific ExoClick publisher spot IDs account for 74% of the deficit.',
    rootCause: 'Sub-sources #88219 and #99401 in ExoClick are delivering fraudulent bot traffic with 0.12% CTR to the landing page and zero downstream conversions.',
    actionItem: 'Immediately blacklist publisher IDs #88219, #99401, #99405 in ExoClick campaign settings or pause campaign CMP-6940.',
    financialImpact: 'Halting these 3 sub-sources will instantly salvage $82.50/day in media spend, raising French GEO margin to positive +14%.',
    affectedNetworks: ['ExoClick DSP', 'Zeydoo SmartLink'],
    metricsBreakdown: {
      spend: 165.00,
      revenue: 82.50,
      currentRoi: -50.0,
      projectedGain: 82.50
    }
  },
  'prompt-scale': {
    id: 'res-scale',
    title: 'DEMO · Scaling Recommendation: Sweepstakes US Tier1 Tab (CMP-7041)',
    severity: 'positive',
    summary: 'Campaign CMP-7041 generates 90% ROI consistently with $378.00 net profit today on $420.00 spend. Current ExoClick win rate is only 38% due to conservative CPC ceiling ($0.0284).',
    rootCause: 'High advertiser demand in evening hours (18:00 - 22:00 EST) allows profitable bid increment from $0.0284 to $0.0315 without converting unprofitable.',
    actionItem: 'Increment ExoClick max CPC bid by +11% on US Chrome Android segments. Increase daily budget ceiling from $500 to $1,200.',
    financialImpact: 'Estimated daily net profit boost of +$245.00/day while keeping blended campaign ROI above 78%.',
    affectedNetworks: ['ExoClick DSP', 'Zeydoo SmartLink'],
    metricsBreakdown: {
      spend: 420.00,
      revenue: 798.00,
      currentRoi: 90.0,
      projectedGain: 245.00
    }
  },
  'prompt-sync': {
    id: 'res-sync',
    title: 'DEMO · Discrepancy Diagnostics: 26 Missing click_id S2S Conversions',
    severity: 'warning',
    summary: 'Detected $61.80 in Zeydoo conversions categorized as "Unattributed". ExoClick subid parameter {conversions_tracking} was dropped during HTTPS redirect on iOS Safari 17.4+ user agents.',
    rootCause: 'Safari ITP (Intelligent Tracking Prevention) strips unencoded query parameters on cross-domain 302 redirects when landing on prelander domain.',
    actionItem: 'Enable base64 url-safe parameter encoding in your Fastify redirector middleware and store click_id in First-Party LocalStorage fallback.',
    financialImpact: 'Restores 100% attribution precision for 18% of US traffic, realigning actual campaign ROI by +3.4%.',
    affectedNetworks: ['Zeydoo Postback', 'ExoClick API'],
    metricsBreakdown: {
      spend: 0.00,
      revenue: 61.80,
      currentRoi: 0.0,
      projectedGain: 61.80
    }
  },
  'prompt-propush': {
    id: 'res-propush',
    title: 'DEMO · Arbitrage Layer Analysis: ProPush Additional Yield vs Offer CR',
    severity: 'positive',
    summary: 'ProPush push subscriber monetization is contributing $512.20 in pure extra revenue today (+21.5% of total top-line). The permission prompt shows zero statistically significant negative impact on Zeydoo offer completions.',
    rootCause: 'Native browser push prompt promptDelay is optimized to 2.5s, allowing users to interact with the main Zeydoo survey before the opt-in modal appears.',
    actionItem: 'Keep ProPush enabled on BR, ID and DE traffic. Test rolling out ProPush script onto RollerAds Mexico popunders.',
    financialImpact: 'Generates an unhedged +$140.00 to $220.00 pure margin daily with 0 additional advertising ad spend cost.',
    affectedNetworks: ['ProPush Subscriptions', 'RollerAds Yield'],
    metricsBreakdown: {
      spend: 0.00,
      revenue: 512.20,
      currentRoi: 100.0,
      projectedGain: 180.00
    }
  }
};
