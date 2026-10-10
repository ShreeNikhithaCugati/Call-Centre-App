import React from 'react';
import { X, CheckCircle2, XCircle, Award } from 'lucide-react';
import { RecentCallItem } from '../../types';

interface CallSopReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: RecentCallItem | null;
}

export const CallSopReviewModal: React.FC<CallSopReviewModalProps> = ({
  isOpen,
  onClose,
  call,
}) => {
  if (!isOpen || !call) return null;

  const sopCheckpoints = [
    {
      label: '1. Opening & Intent Confirm',
      pass: true,
      evidence: '"This is Arvind calling from The Sleep Company, is now an okay time?"',
    },
    {
      label: '2. Needs Discovery',
      pass: true,
      evidence: '"Can I ask what matters most to you — firmness or price?"',
    },
    {
      label: '3. Product Technology Pitch',
      pass: true,
      evidence: '"The GRID layer gives pressure relief exactly where you need it."',
    },
    {
      label: '4. EMI / Financing Mention',
      pass: true,
      evidence: '"We do have a 12-month zero-interest EMI plan starting at ₹708/mo."',
    },
    {
      label: '5. Warranty / 100-Night Trial Mention',
      pass: false,
      evidence: 'No mention of the 100-night trial period anywhere on this call.',
    },
    {
      label: '6. Closing / Callback Booking',
      pass: true,
      evidence: '"Let us lock in Friday morning delivery, I will send the confirmation."',
    },
  ];

  const passCount = sopCheckpoints.filter((c) => c.pass).length;
  const scorePct = Math.round((passCount / sopCheckpoints.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Call SOP QA Review</h3>
            <p className="text-xs text-slate-500">
              {call.name} · {call.time} · {call.duration}
            </p>
          </div>
        </div>

        {/* Adherence Score Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-4 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="text-xs font-bold text-slate-700">Script Adherence Score</div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                style={{ width: `${scorePct}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">{scorePct}%</div>
        </div>

        {/* Checkpoint Rubric */}
        <div className="space-y-3">
          {sopCheckpoints.map((cp, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  {cp.pass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  )}
                  {cp.label}
                </span>

                <span
                  className={`font-extrabold text-[10px] px-2 py-0.5 rounded-md ${
                    cp.pass ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {cp.pass ? 'PASSED' : 'MISSED'}
                </span>
              </div>

              <div
                className={`text-xs p-2.5 rounded-xl italic leading-relaxed ${
                  cp.pass ? 'bg-slate-50 text-slate-700' : 'bg-rose-50/70 text-rose-900'
                }`}
              >
                {cp.evidence}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer"
        >
          Close Review
        </button>
      </div>
    </div>
  );
};
