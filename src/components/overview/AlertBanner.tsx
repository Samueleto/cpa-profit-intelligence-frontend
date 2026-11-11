import React, { useState } from 'react';
import { AlertTriangle, Sparkles, X, ChevronRight } from 'lucide-react';
import { mockDataAlerts } from '../../data/mockAnalytics';

interface AlertBannerProps {
  onOpenAiInvestigator: (promptId?: string) => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ onOpenAiInvestigator }) => {
  const [dismissed, setDismissed] = useState(false);
  const primaryAlert = mockDataAlerts[0];

  if (dismissed || !primaryAlert) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-[#0e1422] border border-amber-500/30 p-3.5 sm:p-4 text-xs shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-200 tracking-tight">
                {primaryAlert.title}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                DATA HEALTH
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {primaryAlert.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => onOpenAiInvestigator('prompt-sync')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-semibold transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Diagnose in AI</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss alert"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
