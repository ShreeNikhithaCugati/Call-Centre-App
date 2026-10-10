import React from 'react';
import { X, Award, Lightbulb } from 'lucide-react';

interface RankDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RankDetailModal: React.FC<RankDetailModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const weights = [
    { label: 'OG Score™', weight: 40, actual: 76, max: 100, unit: '', icon: '🏆' },
    { label: 'Leads Called', weight: 20, actual: 2, max: 5, unit: '', icon: '📞' },
    { label: 'Leads Created', weight: 15, actual: 3, max: 5, unit: '', icon: '🎯' },
    { label: 'Conversation Time', weight: 15, actual: 62, max: 90, unit: 'm', icon: '⏱️' },
    { label: 'On-time Delivery', weight: 10, actual: 92, max: 100, unit: '%', icon: '🚚' },
  ];

  const compositeScore = weights.reduce((sum, r) => {
    return sum + (Math.min(1, r.actual / r.max) * r.weight);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-2 mb-4">
          <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
            Leaderboard Position
          </div>
          <div className="text-4xl font-black text-slate-900 mt-1">#3</div>
          <div className="text-xs text-slate-500 mt-1">
            within Koramangala Store · 6 Call Centre Agents Ranked
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3.5 mb-4 text-xs text-slate-600 leading-relaxed">
          Your rank is a transparent weighted blend of the 5 core shift milestones — not subjective manager ratings.
        </div>

        <div className="space-y-3">
          {weights.map((r, i) => {
            const achievement = Math.min(1, r.actual / r.max);
            return (
              <div key={i}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-800">
                    {r.icon} {r.label}
                  </span>
                  <span className="text-slate-500">
                    <b className="text-slate-900">{r.actual}{r.unit}</b> · {r.weight}% weight
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-600 rounded-full"
                    style={{ width: `${achievement * 100}%` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-extrabold text-sm">
            <span className="text-slate-800">Composite Score</span>
            <span className="text-[#0f6e56]">{compositeScore.toFixed(1)} / 100</span>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-gradient-to-r from-[#0a1a14] to-[#1d3a2e] rounded-2xl text-white flex items-start gap-2.5 text-xs">
          <Lightbulb className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <b>To reach #2: </b> Closing 1 more lead this shift will add +4 points — enough to surpass Neha P. for second place.
          </div>
        </div>
      </div>
    </div>
  );
};
