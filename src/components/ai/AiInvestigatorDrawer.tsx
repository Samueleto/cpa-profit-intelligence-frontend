import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Copy,
  Zap,
  Terminal
} from 'lucide-react';
import {
  mockAiPrompts,
  mockAiInvestigationResults
} from '../../data/mockAnalytics';
import { AiInvestigationResult } from '../../types/analytics';

interface AiInvestigatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPromptId?: string;
}

export const AiInvestigatorDrawer: React.FC<AiInvestigatorDrawerProps> = ({
  isOpen,
  onClose,
  initialPromptId
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>(
    initialPromptId || 'prompt-bleed'
  );
  const [customInput, setCustomInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeResult, setActiveResult] = useState<AiInvestigationResult>(
    mockAiInvestigationResults[initialPromptId || 'prompt-bleed']
  );
  const [copied, setCopied] = useState(false);
  const [actionApplied, setActionApplied] = useState(false);

  if (!isOpen) return null;

  const handleSelectPrompt = (promptId: string) => {
    setSelectedPromptId(promptId);
    setIsSimulating(true);
    setActionApplied(false);
    setTimeout(() => {
      setActiveResult(mockAiInvestigationResults[promptId] || mockAiInvestigationResults['prompt-bleed']);
      setIsSimulating(false);
    }, 350);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsSimulating(true);
    setActionApplied(false);
    setTimeout(() => {
      // Return bleed audit with customized title
      setActiveResult({
        ...mockAiInvestigationResults['prompt-bleed'],
        title: `DEMO · Custom Audit: "${customInput.slice(0, 32)}..."`,
      });
      setIsSimulating(false);
      setCustomInput('');
    }, 400);
  };

  const handleCopyLog = () => {
    navigator.clipboard.writeText(JSON.stringify(activeResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <aside className="w-screen max-w-full sm:max-w-lg bg-[#0a0f1d] border-l border-purple-500/30 shadow-2xl shadow-black flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-800 bg-[#0c1224]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    AI Profit Investigator
                  </h2>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded shrink-0">
                    DEMO SIMULATOR
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Autonomous CPA arbitrage root-cause auditing
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Disclaimer pill */}
            <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-800/40 text-[11px] text-purple-300/90 leading-tight">
              <strong>Notice:</strong> All AI audits shown here are simulated DEMO calculations. In your VPS deployment, Codex will connect this drawer to your Fastify API and PostgreSQL data store.
            </div>

            {/* Quick Audit Prompt Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Pre-Configured Arbitrage Audits
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockAiPrompts.map((p) => {
                  const isSelected = selectedPromptId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPrompt(p.id)}
                      className={`p-2.5 rounded-lg text-left text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-purple-600/20 border-purple-500/60 text-purple-200 shadow-xs'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{p.label}</span>
                        <span className={`text-[10px] font-mono px-1 rounded ${
                          p.category === 'leakage'
                            ? 'bg-rose-500/20 text-rose-300'
                            : p.category === 'scaling'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {p.promptText}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Investigation Result Display */}
            {isSimulating ? (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                <div className="text-xs font-mono text-purple-300">
                  Simulating cross-network audit across ExoClick, Zeydoo & ProPush...
                </div>
              </div>
            ) : (
              activeResult && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3.5 animate-in fade-in">
                  {/* Result Header */}
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        {activeResult.severity === 'critical' ? (
                          <ShieldAlert className="w-4 h-4 text-rose-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        <span className="text-xs font-bold text-white tracking-tight">
                          {activeResult.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>Affected: {activeResult.affectedNetworks.join(' · ')}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyLog}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                      title="Copy diagnostic JSON"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {activeResult.summary}
                  </div>

                  {/* Root Cause Box */}
                  <div className="p-3 rounded-lg bg-black/40 border border-purple-900/30 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                      Identified Root Cause
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {activeResult.rootCause}
                    </p>
                  </div>

                  {/* Financial Projection Strip */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-purple-950/20 border border-purple-900/40 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 font-sans">Current Run Rate</span>
                      <div className="text-white font-bold">
                        ${activeResult.metricsBreakdown.spend.toFixed(2)} cost / ${activeResult.metricsBreakdown.revenue.toFixed(2)} rev
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-purple-300 font-sans">Projected Profit Impact</span>
                      <div className="text-emerald-400 font-bold">
                        +${activeResult.metricsBreakdown.projectedGain.toFixed(2)}/day
                      </div>
                    </div>
                  </div>

                  {/* Action Item */}
                  <div className="p-3 rounded-lg bg-[#0e172a] border border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Recommended Action
                      </span>
                      {actionApplied && (
                        <span className="text-[10px] font-mono text-emerald-400">
                          Applied in DEMO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {activeResult.actionItem}
                    </p>
                    <button
                      onClick={() => setActionApplied(!actionApplied)}
                      className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                        actionApplied
                          ? 'bg-emerald-600/30 text-emerald-200 border border-emerald-500/40'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-950'
                      }`}
                    >
                      {actionApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Simulation Action Active</span>
                        </>
                      ) : (
                        <>
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Simulate Action Execution</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 sm:p-4 border-t border-slate-800 bg-[#0c1224]">
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about traffic leaks, ExoClick bids, or ROI..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm sm:text-xs min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-hidden focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!customInput.trim()}
                className="p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};
