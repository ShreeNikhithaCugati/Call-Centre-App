import React, { useState, useEffect } from 'react';
import { PhoneOutgoing, PhoneIncoming, History, Sparkles, Phone, PhoneOff, Mic, MicOff, Pause, Play, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, ArrowUpRight, Search, Send, Clock, Target, DollarSign, Sparkle, Tag } from 'lucide-react';
import { PlanSubTab, LeadItem, RecentCallItem } from '../../types';
import { CALL_SOP_SCRIPTS, AI_KNOWLEDGE_BASE } from '../../data/mockData';

interface PlanViewProps {
  subTab: PlanSubTab;
  onSelectSubTab: (subTab: PlanSubTab) => void;
  leads: LeadItem[];
  recentCalls: RecentCallItem[];
  onOpenLeadDetail: (lead: LeadItem) => void;
  onOpenCallSopReview: (callIndex: number) => void;
  onOpenWrapup: (name: string, duration: string, summary: string) => void;
  activeCall: { name: string; isIncoming: boolean } | null;
  onStartCall: (name: string, isIncoming?: boolean) => void;
  onEndCall: () => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  subTab,
  onSelectSubTab,
  leads,
  recentCalls,
  onOpenLeadDetail,
  onOpenCallSopReview,
  onOpenWrapup,
  activeCall,
  onStartCall,
  onEndCall,
}) => {
  // Outgoing pagination state
  const [outgoingPage, setOutgoingPage] = useState(0);
  const [expandedLeadIndex, setExpandedLeadIndex] = useState<number | null>(0);
  const PER_PAGE = 2;

  // Active call live states
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [transcriptTurns, setTranscriptTurns] = useState<{ who: 'agent' | 'customer'; text: string; sop?: string }[]>([]);
  const [transcriptTurnIndex, setTranscriptTurnIndex] = useState(0);
  const [sopChecked, setSopChecked] = useState<Record<string, boolean>>({});
  const [sentimentScore, setSentimentScore] = useState(65);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  // Filtered leads sorted by attractiveness score
  const sortedOutgoingLeads = [...leads].sort(
    (a, b) => (b.attractivenessScore || 0) - (a.attractivenessScore || 0)
  );

  const totalOutgoingPages = Math.max(1, Math.ceil(sortedOutgoingLeads.length / PER_PAGE));
  const currentOutgoingPageLeads = sortedOutgoingLeads.slice(
    outgoingPage * PER_PAGE,
    outgoingPage * PER_PAGE + PER_PAGE
  );

  // Missed calls for incoming tab
  const missedCalls = recentCalls.filter((c) => c.dir === 'missed');
  const totalValueAtStake = missedCalls.reduce((sum, c) => {
    const matchedLead = leads.find((l) => c.name.includes(l.name));
    return sum + (matchedLead ? matchedLead.expectedValue : 8490);
  }, 0);

  // Active Call Live Script
  const activeScript = activeCall
    ? CALL_SOP_SCRIPTS[activeCall.name] || CALL_SOP_SCRIPTS['default']
    : [];

  const matchedActiveLead = activeCall
    ? leads.find((l) => activeCall.name.includes(l.name)) || leads[0]
    : null;

  // Call timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeCall && !isOnHold) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall, isOnHold]);

  // Live transcript streamer
  useEffect(() => {
    if (!activeCall) {
      setTranscriptTurns([]);
      setTranscriptTurnIndex(0);
      setSopChecked({});
      setCallTimer(0);
      setIsMuted(false);
      setIsOnHold(false);
      setAiAnswer(null);
      return;
    }

    const script = activeScript;
    if (transcriptTurnIndex < script.length) {
      const turnTimer = setTimeout(() => {
        const turn = script[transcriptTurnIndex];
        setTranscriptTurns((prev) => [...prev, turn]);
        if (turn.sop) {
          setSopChecked((prev) => ({ ...prev, [turn.sop!]: true }));
        }
        if (turn.who === 'customer') {
          setSentimentScore((prev) => Math.min(95, prev + 6));
        }
        setTranscriptTurnIndex((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(turnTimer);
    }
  }, [activeCall, transcriptTurnIndex]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAskAi = () => {
    if (!aiQuestion.trim()) return;
    const qLower = aiQuestion.toLowerCase();
    const hit = AI_KNOWLEDGE_BASE.find((k) => k.match.some((w) => qLower.includes(w)));
    setAiAnswer(
      hit
        ? hit.answer
        : "Every SmartGRID mattress includes our 100-night trial, 10-year warranty, and 0% interest EMI up to 24 months."
    );
    setAiQuestion('');
  };

  const handleFinishCall = () => {
    const summary = transcriptTurns
      .filter((t) => t.who === 'agent')
      .map((t) => t.text)
      .slice(0, 2)
      .join(' ') || 'Discussed customer enquiry and explained product specs.';
    const duration = formatSeconds(callTimer);
    const name = activeCall?.name || 'Customer';
    onEndCall();
    onOpenWrapup(name, duration, summary);
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="pb-24">
      {/* Planner Header */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d5f] p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Today's calling plan</div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Planner</h1>
          </div>
          <div className="text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            {currentDateFormatted}
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 mt-4 bg-black/20 p-1 rounded-xl">
          <button
            onClick={() => onSelectSubTab('outgoing')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              subTab === 'outgoing'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            <PhoneOutgoing className="w-3.5 h-3.5" />
            <span>Calls to make</span>
          </button>

          <button
            onClick={() => onSelectSubTab('incoming')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 relative ${
              subTab === 'incoming'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            <PhoneIncoming className="w-3.5 h-3.5" />
            <span>Incoming</span>
            {missedCalls.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            onClick={() => onSelectSubTab('recent')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              subTab === 'recent'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Recent</span>
          </button>
        </div>
      </div>

      {/* ACTIVE CALL SIMULATION BANNER & CO-PILOT */}
      {activeCall && (
        <div className="m-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {/* Active Call Control Card */}
          <div className="bg-gradient-to-r from-[#0a2e1a] to-[#0f6e56] rounded-2xl p-4 text-white shadow-lg border border-emerald-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs text-emerald-200/90 font-bold uppercase tracking-wider">
                  Call in progress · {activeCall.isIncoming ? 'Incoming' : 'Outgoing'}
                </div>
                <div className="text-lg font-extrabold text-white mt-0.5">{activeCall.name}</div>
              </div>

              <div className="text-2xl font-mono font-extrabold text-white tracking-widest bg-black/20 px-3 py-1 rounded-xl">
                {formatSeconds(callTimer)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                    isMuted ? 'bg-rose-500 text-white' : 'bg-white/15 hover:bg-white/20 text-white'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsOnHold(!isOnHold)}
                  className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                    isOnHold ? 'bg-amber-500 text-white' : 'bg-white/15 hover:bg-white/20 text-white'
                  }`}
                  title={isOnHold ? 'Unhold' : 'Hold'}
                >
                  {isOnHold ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleFinishCall}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Call</span>
                </button>
              </div>
            </div>

            {/* Live Sentiment Meter */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
              <span className="text-emerald-100 font-medium">Customer Sentiment</span>
              <div className="flex-1 max-w-xs h-2 bg-black/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${sentimentScore}%` }}
                />
              </div>
              <span className="font-bold text-emerald-300">
                {sentimentScore > 75 ? 'Positive (92%)' : sentimentScore > 50 ? 'Engaged' : 'Guarded'}
              </span>
            </div>
          </div>

          {/* Side-by-side: Live Streaming Transcript (Left) + AI Assist Live Coach (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Live Transcript Stream */}
            <div className="bg-[#12151c] rounded-2xl border border-slate-800 p-4 shadow-md flex flex-col h-[480px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Live Transcript</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Real-time Audio Stream</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
                {transcriptTurns.map((turn, i) => {
                  const isAgent = turn.who === 'agent';
                  return (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${isAgent ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 ${
                          isAgent ? 'bg-emerald-900/60 text-emerald-400' : 'bg-indigo-900/60 text-indigo-300'
                        }`}
                      >
                        {isAgent ? 'AR' : 'C'}
                      </div>
                      <div className={`max-w-[82%] ${isAgent ? 'text-left' : 'text-right'}`}>
                        <div className="text-[10px] text-slate-500 font-semibold mb-0.5">
                          {isAgent ? 'You (Arvind)' : activeCall.name}
                        </div>
                        <div
                          className={`text-xs leading-relaxed p-2.5 rounded-2xl ${
                            isAgent
                              ? 'bg-slate-800/80 text-slate-200 rounded-tl-xs'
                              : 'bg-indigo-950/60 text-indigo-100 rounded-tr-xs border border-indigo-800/30'
                          }`}
                        >
                          {turn.text}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {transcriptTurnIndex < activeScript.length && (
                  <div className="flex items-center gap-2 text-slate-500 text-xs italic pl-2 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-ping" />
                    <span>Listening to conversation…</span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Assist Live Coaching Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-md flex flex-col h-[480px] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-purple-900">
                    AI Assist · Live Coach
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                  Active
                </span>
              </div>

              {/* Main Objective */}
              {matchedActiveLead && (
                <div className="mt-3 bg-amber-50/70 border border-amber-200/60 rounded-xl p-3">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                    <Target className="w-3.5 h-3.5" />
                    <span>Main Objective — What to pitch</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {matchedActiveLead.product} (₹{matchedActiveLead.expectedValue.toLocaleString('en-IN')})
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {matchedActiveLead.notes[0]}
                  </div>
                </div>
              )}

              {/* SOP Live Checklist */}
              <div className="mt-3.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                  SOP Script Adherence
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: 'opening', label: '1. Greet in 10s' },
                    { key: 'needs', label: '2. Probe Needs' },
                    { key: 'pitch', label: '3. Pitch Tech' },
                    { key: 'financing', label: '4. Offer 0% EMI' },
                    { key: 'warranty', label: '5. 100-Night Trial' },
                    { key: 'closing', label: '6. Close / Date' },
                  ].map((s) => (
                    <div
                      key={s.key}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                        sopChecked[s.key]
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                          : 'bg-slate-50 text-slate-400 border border-slate-100'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          sopChecked[s.key] ? 'text-emerald-600' : 'text-slate-300'
                        }`}
                      />
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-Call Q&A Search */}
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wide mb-1.5">
                  Ask AI About This Call
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                    placeholder="e.g. return policy, 0% EMI terms..."
                    className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-purple-500"
                  />
                  <button
                    onClick={handleAskAi}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>

                {aiAnswer && (
                  <div className="mt-2 p-2.5 bg-purple-50 rounded-xl border border-purple-200/80 text-xs text-purple-950 leading-relaxed animate-in fade-in">
                    <span className="font-bold">💡 Answer: </span>
                    {aiAnswer}
                  </div>
                )}
              </div>

              {/* Quick Action Chips */}
              <div className="mt-3.5 pt-2 flex flex-wrap gap-1.5">
                {[
                  'Send WhatsApp Quote',
                  'Explain 100-Night Trial',
                  '12-Mo No-Cost EMI',
                  'Book Revisit Slot',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiAnswer(`Suggested script: "I have just shared the official ${chip} details to your WhatsApp!"`);
                    }}
                    className="text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 1: Calls to Make (Outgoing) */}
      {subTab === 'outgoing' && !activeCall && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Planned Outgoing Calls</h2>
              <p className="text-xs text-slate-500">
                Ranked by lead attractiveness score — tap any row to expand details
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {currentOutgoingPageLeads.map((lead, idx) => {
              const globalIndex = outgoingPage * PER_PAGE + idx;
              const isExpanded = expandedLeadIndex === globalIndex;
              const scoreColor =
                lead.attractivenessScore >= 80
                  ? 'text-emerald-700 bg-emerald-50'
                  : lead.attractivenessScore >= 55
                  ? 'text-amber-700 bg-amber-50'
                  : 'text-rose-700 bg-rose-50';

              return (
                <div
                  key={lead.name}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
                >
                  {/* Lead Row Header */}
                  <div
                    onClick={() => setExpandedLeadIndex(isExpanded ? null : globalIndex)}
                    className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                        style={{ background: lead.avatarBg, color: lead.avatarColor }}
                      >
                        {lead.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 truncate">{lead.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {lead.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 truncate mt-0.5">{lead.interest}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className={`text-sm font-extrabold px-2 py-0.5 rounded-lg ${scoreColor}`}>
                          {lead.attractivenessScore}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Score</div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Lead Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-in fade-in duration-150">
                      <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Story So Far
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed">
                          {lead.journey.map((j) => j.text).join(' → ')}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Preferred Product</div>
                          <div className="font-bold text-slate-900 mt-0.5">{lead.product}</div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70">
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Smart Cross-Sell</div>
                          <div className="font-bold text-slate-900 mt-0.5">{lead.crossSell}</div>
                        </div>
                      </div>

                      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 text-xs text-amber-900">
                        <span className="font-bold">EMI Opportunity: </span>
                        {lead.emi}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => onStartCall(lead.name, false)}
                          className="flex-1 py-2.5 bg-[#0f6e56] hover:bg-[#138065] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Place Outgoing Call</span>
                        </button>

                        <button
                          onClick={() => onOpenLeadDetail(lead)}
                          className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer transition-colors"
                        >
                          Full Lead Profile
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Outgoing Pagination Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200/70 text-xs text-slate-500">
            <span>
              Showing {outgoingPage * PER_PAGE + 1} -{' '}
              {Math.min((outgoingPage + 1) * PER_PAGE, sortedOutgoingLeads.length)} of{' '}
              {sortedOutgoingLeads.length} leads
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={outgoingPage === 0}
                onClick={() => setOutgoingPage((p) => Math.max(0, p - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 cursor-pointer hover:bg-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 font-bold text-slate-700">
                {outgoingPage + 1} / {totalOutgoingPages}
              </span>

              <button
                disabled={outgoingPage >= totalOutgoingPages - 1}
                onClick={() => setOutgoingPage((p) => Math.min(totalOutgoingPages - 1, p + 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 cursor-pointer hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Incoming (Missed Calls With Value at Stake) */}
      {subTab === 'incoming' && !activeCall && (
        <div className="p-4 space-y-3">
          {/* Value at Stake Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-300/60 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                  Value at Stake · Callback SLA
                </div>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                  ₹{totalValueAtStake.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Across {missedCalls.length} missed calls awaiting prompt callback
                </div>
              </div>

              <button
                onClick={() => onStartCall(missedCalls[0]?.name || 'Customer', false)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Highest Value</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {missedCalls.map((c) => {
              const matchedLead = leads.find((l) => c.name.includes(l.name));
              const value = matchedLead ? matchedLead.expectedValue : 8490;

              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <PhoneIncoming className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">{c.name}</div>
                      <div className="text-xs text-slate-500 truncate flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>Missed {c.time}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold">₹{value.toLocaleString('en-IN')} Value</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartCall(c.name, false)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer flex-shrink-0 shadow-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Back</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Recent Calls (Tap to Review vs SOP) */}
      {subTab === 'recent' && !activeCall && (
        <div className="p-4 space-y-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Calls Log</h2>
            <p className="text-xs text-slate-500">
              Tap any completed call to open its full script-adherence SOP audit
            </p>
          </div>

          <div className="space-y-2">
            {recentCalls.map((c, i) => (
              <div
                key={c.id}
                onClick={() => onOpenCallSopReview(i)}
                className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      c.dir === 'in'
                        ? 'bg-emerald-100 text-emerald-700'
                        : c.dir === 'out'
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {c.dir === 'in' ? (
                      <PhoneIncoming className="w-4 h-4" />
                    ) : c.dir === 'out' ? (
                      <PhoneOutgoing className="w-4 h-4" />
                    ) : (
                      <PhoneOff className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      {c.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {c.time} · Duration: {c.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {c.outcome && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                      {c.outcome}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
