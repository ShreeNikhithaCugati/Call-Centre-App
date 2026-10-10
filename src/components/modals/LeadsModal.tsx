import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Users, Target, PhoneCall, ShieldAlert, Receipt, Tag, Clock } from 'lucide-react';
import { LeadItem } from '../../types';

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadItem[];
  onStartCall: (name: string) => void;
  onOpenSopCheck: (lead: LeadItem) => void;
}

export const LeadsModal: React.FC<LeadsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onStartCall,
  onOpenSopCheck,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [icpBreakdownOpen, setIcpBreakdownOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [problemBucketsOpen, setProblemBucketsOpen] = useState(true);
  const [quoteToggles, setQuoteToggles] = useState<Record<string, boolean>>({
    Mukunda: true,
    'Faizan A.': true,
    'Ritu S.': true,
  });

  // Action sheets within lead modal
  const [noInterestOpen, setNoInterestOpen] = useState(false);
  const [cameBackOpen, setCameBackOpen] = useState(false);
  const [noInterestReason, setNoInterestReason] = useState('price');
  const [cameBackWhen, setCameBackWhen] = useState('today');

  if (!isOpen || leads.length === 0) return null;

  const currentLead = leads[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(leads.length - 1, prev + 1));
  };

  const toggleQuote = (name: string) => {
    setQuoteToggles((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3b1254] to-[#6b2fa0] text-white p-4 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-sm font-bold">
              <Users className="w-4 h-4 text-purple-200" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight">Lead Dossier</h2>
              <p className="text-[11px] text-purple-200">
                Lead {currentIndex + 1} of {leads.length} · SLA to close
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pager Bar */}
        <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>

          <div className="flex gap-1.5">
            {leads.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-5 bg-purple-700' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === leads.length - 1}
            className="p-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Scrollable Lead Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {/* Identity & Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-base shadow-xs"
                style={{ background: currentLead.avatarBg, color: currentLead.avatarColor }}
              >
                {currentLead.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">{currentLead.name}</h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase"
                    style={{ background: currentLead.badgeBg, color: currentLead.badgeColor }}
                  >
                    {currentLead.badge}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{currentLead.interest}</div>
              </div>
            </div>

            <div className="text-right">
              <span
                className="text-xs font-bold px-2 py-1 rounded-lg inline-block"
                style={{
                  background: `${currentLead.statusColor}15`,
                  color: currentLead.statusColor,
                }}
              >
                ● {currentLead.statusLabel}
              </span>
            </div>
          </div>

          {/* Quote Toggle */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Receipt className="w-4 h-4 text-amber-700" />
              <span>Quote to be given to customer</span>
            </div>
            <button
              onClick={() => toggleQuote(currentLead.name)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                quoteToggles[currentLead.name] ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  quoteToggles[currentLead.name] ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Scores: ICP & Lead Intent Score */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                <Target className="w-3.5 h-3.5 text-purple-600" />
                <span>ICP Fit Score</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-emerald-700">{currentLead.icp}%</span>
                <span className="text-[11px] font-semibold text-slate-400">Match</span>
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3">
              <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1 mb-1">
                <span>🎯 Lead Intent</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-emerald-700">
                  {currentLead.intentScore}/100
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">High Buy Signal</span>
              </div>
            </div>
          </div>

          {/* Collapsible Section 1: ICP Breakdown */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden">
            <button
              onClick={() => setIcpBreakdownOpen(!icpBreakdownOpen)}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100/70"
            >
              <span className="uppercase tracking-wider">ICP Fit Breakdown</span>
              {icpBreakdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {icpBreakdownOpen && (
              <div className="px-3 pb-3 space-y-2 border-t border-slate-200/60 pt-2 animate-in fade-in">
                {currentLead.subscores.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">{s.label}</span>
                      <span style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Section 2: Problem Buckets / Where We Picked Up Signals */}
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl overflow-hidden">
            <button
              onClick={() => setProblemBucketsOpen(!problemBucketsOpen)}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-amber-900 cursor-pointer hover:bg-amber-100/50"
            >
              <span className="uppercase tracking-wider">📋 Where We Picked Up Signals</span>
              {problemBucketsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {problemBucketsOpen && (
              <div className="px-3 pb-3 space-y-2 border-t border-amber-200/60 pt-2 animate-in fade-in">
                {currentLead.problemBuckets.map((b, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-amber-200/60">
                    <div className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-amber-600" />
                      <span>{b.cat}</span>
                    </div>
                    <div className="text-xs text-slate-700 mt-1 leading-relaxed">{b.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Section 3: Customer Journey (How We Got Here) */}
          <div className="bg-purple-50/50 border border-purple-200/70 rounded-xl overflow-hidden">
            <button
              onClick={() => setJourneyOpen(!journeyOpen)}
              className="w-full p-3 flex items-center justify-between text-xs font-bold text-purple-950 cursor-pointer hover:bg-purple-100/50"
            >
              <span className="uppercase tracking-wider">How We Got Here · Multi-touch Journey</span>
              {journeyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {journeyOpen && (
              <div className="px-3 pb-3 space-y-2.5 border-t border-purple-200/60 pt-2.5 animate-in fade-in">
                {currentLead.journey.map((ev, i) => (
                  <div key={i} className="flex gap-2.5 items-start text-xs">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xs">
                      {ev.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">
                        {ev.channel} <span className="font-normal text-slate-400">· {ev.date}</span>
                      </div>
                      <div className="text-slate-600 mt-0.5 leading-relaxed">{ev.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Before You Reach Out Coaching Guidance */}
          <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-3.5 space-y-2">
            <div className="text-xs font-extrabold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>💡 Before you reach out</span>
            </div>
            <div className="space-y-1.5 text-xs text-amber-950 leading-relaxed">
              {currentLead.notes.map((n, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              onClick={() => setNoInterestOpen(true)}
              className="py-2.5 px-2 bg-white hover:bg-rose-50 border border-rose-300 text-rose-700 rounded-xl font-bold text-xs cursor-pointer text-center transition-colors"
            >
              No Interest
            </button>

            <button
              onClick={() => {
                alert(`Opening WhatsApp chat with ${currentLead.name} (${currentLead.phone})`);
              }}
              className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer text-center shadow-xs transition-colors"
            >
              WhatsApp
            </button>

            <button
              onClick={() => onOpenSopCheck(currentLead)}
              className="py-2.5 px-2 bg-[#0f6e56] hover:bg-[#138065] text-white rounded-xl font-bold text-xs cursor-pointer text-center shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>On-ground Call</span>
            </button>

            <button
              onClick={() => setCameBackOpen(true)}
              className="py-2.5 px-2 bg-white hover:bg-emerald-50 border border-emerald-500 text-emerald-800 rounded-xl font-bold text-xs cursor-pointer text-center transition-colors"
            >
              Came Back ✓
            </button>
          </div>
        </div>

        {/* Persistent Footer */}
        <div className="bg-rose-50 border-t border-rose-200/80 px-4 py-2.5 flex items-center gap-2 text-xs font-bold text-rose-800 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Cumulative Missed: 2 · Expired without follow-up, visible to manager</span>
        </div>
      </div>

      {/* No Interest Reason Sheet */}
      {noInterestOpen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <h3 className="font-bold text-base text-slate-900">Why was there no interest?</h3>
            <div className="space-y-2 text-xs font-medium text-slate-700">
              {['Price too high', 'Bought from competitor', 'Not ready to buy right now', 'Other'].map((r) => (
                <label key={r} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="noInterest"
                    value={r}
                    checked={noInterestReason === r}
                    onChange={(e) => setNoInterestReason(e.target.value)}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setNoInterestOpen(false)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setNoInterestOpen(false);
                  alert(`Marked ${currentLead.name} as No Interest: ${noInterestReason}`);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Came Back Sheet */}
      {cameBackOpen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-end sm:items-center justify-center p-3">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl animate-in fade-in duration-150">
            <h3 className="font-bold text-base text-slate-900">When did the customer return?</h3>
            <div className="space-y-2 text-xs font-medium text-slate-700">
              {['Today (walked back in)', 'This week', 'Scheduled specific date'].map((w) => (
                <label key={w} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="cameBack"
                    value={w}
                    checked={cameBackWhen === w}
                    onChange={(e) => setCameBackWhen(e.target.value)}
                  />
                  <span>{w}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCameBackOpen(false)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCameBackOpen(false);
                  alert(`Confirmed ${currentLead.name} came back! Recorded for manager review.`);
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
