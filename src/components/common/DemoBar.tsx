import React, { useState } from 'react';
import { Phone, ShieldCheck, HelpCircle, X, ChevronUp, ChevronDown } from 'lucide-react';

interface DemoBarProps {
  onSimulateIncomingCall: () => void;
  onSimulateCustomerSpeech: (speech: string) => void;
}

export const DemoBar: React.FC<DemoBarProps> = ({
  onSimulateIncomingCall,
  onSimulateCustomerSpeech,
}) => {
  const [dpdpModalOpen, setDpdpModalOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <>
      {/* Floating Demo Strip */}
      <div className="fixed bottom-14 md:bottom-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full px-3 py-1.5 shadow-xl flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
            DEMO
          </span>

          {!minimized ? (
            <>
              <button
                onClick={onSimulateIncomingCall}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                <Phone className="w-3 h-3 text-emerald-600" />
                <span>Simulate Call</span>
              </button>

              <button
                onClick={() => onSimulateCustomerSpeech("Is this being recorded? I'd rather it wasn't.")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full transition-colors cursor-pointer hidden sm:inline"
              >
                "Unsure?"
              </button>

              <button
                onClick={() => onSimulateCustomerSpeech("Can I get a copy of my data?")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full transition-colors cursor-pointer hidden sm:inline"
              >
                "My data?"
              </button>

              <button
                onClick={() => onSimulateCustomerSpeech("Please stop recording.")}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-full transition-colors cursor-pointer hidden sm:inline"
              >
                "Stop!"
              </button>

              <button
                onClick={() => setDpdpModalOpen(true)}
                className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center hover:bg-emerald-200 cursor-pointer"
                title="DPDP Digital Personal Data Protection Compliance"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            </>
          ) : null}

          <button
            onClick={() => setMinimized(!minimized)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title={minimized ? 'Expand Demo Controls' : 'Minimize'}
          >
            {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* DPDP Compliance Explainer Modal */}
      {dpdpModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setDpdpModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">DPDP Act (India) Compliance</h3>
                <p className="text-xs text-slate-500">Built-in privacy safeguards for offline conversations</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-0.5">1. Pre-Recording Consent (Sec 5 &amp; 6)</div>
                <div>Voice and WhatsApp opt-in before storing any customer voice streams. Generates auditable Consent ID.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-0.5">2. Right to Withdraw (Sec 6)</div>
                <div>If customer says "Stop recording", the audio stream terminates instantly and data erasure is queued.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-0.5">3. Right to Access &amp; Correction (Sec 11 &amp; 12)</div>
                <div>Customers can request transcripts or update personal records directly via DPO workflow.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 mb-0.5">4. Minor Shield (Sec 9)</div>
                <div>Guardian consent gate mandatory for buyers under 18 years of age.</div>
              </div>
            </div>

            <button
              onClick={() => setDpdpModalOpen(false)}
              className="w-full mt-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
