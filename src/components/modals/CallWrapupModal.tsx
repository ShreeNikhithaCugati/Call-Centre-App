import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Sparkles, Database } from 'lucide-react';

interface CallWrapupModalProps {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  duration: string;
  initialSummary: string;
  onSaveToCrm: (summary: string, outcome: string) => void;
}

export const CallWrapupModal: React.FC<CallWrapupModalProps> = ({
  isOpen,
  onClose,
  callerName,
  duration,
  initialSummary,
  onSaveToCrm,
}) => {
  const [summary, setSummary] = useState(initialSummary);
  const [outcome, setOutcome] = useState('Interested');

  useEffect(() => {
    setSummary(initialSummary);
  }, [initialSummary]);

  if (!isOpen) return null;

  const outcomes = [
    { label: 'Interested', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    { label: 'Follow-up Needed', color: 'bg-amber-50 text-amber-700 border-amber-300' },
    { label: 'Requested Callback', color: 'bg-sky-50 text-sky-700 border-sky-300' },
    { label: 'Resolved / Booked', color: 'bg-purple-50 text-purple-700 border-purple-300' },
    { label: 'Not Interested', color: 'bg-rose-50 text-rose-700 border-rose-300' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Call Wrap-Up &amp; CRM Sync</h3>
            <p className="text-xs text-slate-500">
              {callerName} · Duration: {duration} · Just finished
            </p>
          </div>
        </div>

        {/* AI-Drafted Summary */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI-Drafted Summary</span>
          </div>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-purple-500 text-slate-800 leading-relaxed font-sans"
          />
        </div>

        {/* Outcome Selector */}
        <div className="space-y-1.5 mb-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Select Lead Outcome
          </div>
          <div className="flex flex-wrap gap-1.5">
            {outcomes.map((o) => (
              <button
                key={o.label}
                onClick={() => setOutcome(o.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  outcome === o.label
                    ? `${o.color} ring-2 ring-emerald-500/30`
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Discard
          </button>
          <button
            onClick={() => onSaveToCrm(summary, outcome)}
            className="flex-2 py-2.5 bg-[#0f6e56] hover:bg-[#138065] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
          >
            <Database className="w-4 h-4" />
            <span>Save &amp; Log to CRM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
