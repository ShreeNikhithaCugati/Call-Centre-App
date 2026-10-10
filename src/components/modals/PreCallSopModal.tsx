import React from 'react';
import { X, Phone, Target, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { LeadItem } from '../../types';

interface PreCallSopModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: LeadItem | null;
  onProceedCall: (name: string) => void;
}

export const PreCallSopModal: React.FC<PreCallSopModalProps> = ({
  isOpen,
  onClose,
  lead,
  onProceedCall,
}) => {
  if (!isOpen || !lead) return null;

  const pitch = lead.productPitch;

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
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm"
            style={{ background: lead.avatarBg, color: lead.avatarColor }}
          >
            {lead.initials}
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Before You Call {lead.name}</h3>
            <p className="text-xs text-slate-500">{lead.phone} · Review SOP &amp; Pitch</p>
          </div>
        </div>

        {/* Pitch Card */}
        {pitch && (
          <div className="border border-amber-300 rounded-2xl overflow-hidden bg-amber-50/40 mb-4 shadow-xs">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 text-white flex items-center gap-3">
              <span className="text-2xl">{pitch.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Product to Champion</div>
                <div className="text-sm font-extrabold truncate">{pitch.name}</div>
                <div className="text-xs font-semibold text-amber-100">{pitch.price} {pitch.orig && <s className="text-white/60 text-[10px]">{pitch.orig}</s>}</div>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5 text-xs">
              <div className="text-amber-950 bg-amber-100/70 p-2 rounded-xl">
                <span className="font-bold">Why this product: </span>
                {pitch.why}
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Recommended Opening Line</div>
                <div className="italic text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                  {pitch.pitch}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase">Cross-Sell</div>
                  <div className="font-bold text-slate-900 mt-0.5">{pitch.cross.name}</div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80">
                  <div className="text-[10px] font-bold text-indigo-800 uppercase">Ideal EMI</div>
                  <div className="font-bold text-slate-900 mt-0.5">{pitch.emi.monthly}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checklist */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Lead SOP Checkpoints
          </div>
          <div className="space-y-1.5 text-xs">
            {lead.problemBuckets.map((b, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-slate-800 font-medium">{b.cat}: {b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connect Call CTA */}
        <button
          onClick={() => {
            onClose();
            onProceedCall(lead.name);
          }}
          className="w-full py-3 bg-[#0f6e56] hover:bg-[#138065] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Place On-ground Call to {lead.name}</span>
        </button>
      </div>
    </div>
  );
};
