import React, { useState } from 'react';
import { X, Lock, Store, Globe, Wrench, Share2, Check, User, Phone, Mail } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
  devModeOn: boolean;
  onToggleDevMode: () => void;
  currentVertical: 'retail' | 'healthcare';
  onSelectVertical: (vertical: 'retail' | 'healthcare') => void;
  linkedInConnected: boolean;
  onConnectLinkedIn: (url: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  devModeOn,
  onToggleDevMode,
  currentVertical,
  onSelectVertical,
  linkedInConnected,
  onConnectLinkedIn,
}) => {
  const [name, setName] = useState('Arvind Rajan');
  const [email, setEmail] = useState('arvind.r@ogretail.in');
  const [phone, setPhone] = useState('+91 98450 11223');
  const [linkedInInput, setLinkedInInput] = useState('linkedin.com/in/arvind-rajan');
  const [dirty, setDirty] = useState(false);

  if (!isOpen) return null;

  const languages = [
    { code: 'en', native: 'English', english: 'English' },
    { code: 'hi', native: 'हिन्दी', english: 'Hindi' },
    { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada' },
    { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
    { code: 'te', native: 'తెలుగు', english: 'Telugu' },
    { code: 'mr', native: 'मराठी', english: 'Marathi' },
    { code: 'bn', native: 'বাংলা', english: 'Bengali' },
    { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h2 className="font-extrabold text-base text-slate-900">App Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Employee Profile */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Employee Profile
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Employee ID</label>
                  <input
                    type="text"
                    value="OG-EMP-07734"
                    disabled
                    className="w-full text-xs font-bold bg-slate-200/60 border border-slate-200 rounded-xl px-2.5 py-1.5 mt-1 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Registered Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Role & Designation */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Role &amp; Designation
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-extrabold flex items-center justify-center text-sm">
                M0
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-slate-900">
                  M0 · {currentVertical === 'healthcare' ? 'Patient Helpline Staff' : 'Call Centre Staff'}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Base Location: Koramangala Store / Central Desk
                </div>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Display Language
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onSelectLanguage(l.code)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    currentLanguage === l.code
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="text-sm font-bold">{l.native}</div>
                  <div className="text-[10px] text-slate-400">{l.english}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Industry Vertical & Dev Mode */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Industry Vertical
              </span>
              <button
                onClick={onToggleDevMode}
                className="text-xs text-amber-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <Wrench className="w-3 h-3" />
                <span>{devModeOn ? 'Dev Mode (Active)' : 'Unlock Dev Mode'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => devModeOn && onSelectVertical('retail')}
                className={`p-3 rounded-2xl border transition-all ${
                  currentVertical === 'retail'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 bg-white opacity-60'
                } ${devModeOn ? 'cursor-pointer hover:opacity-100' : 'cursor-not-allowed'}`}
              >
                <div className="text-base">🛏️</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Retail · The Sleep Company</div>
                <div className="text-[10px] text-slate-500">Call Centre Staff App</div>
              </div>

              <div
                onClick={() => devModeOn && onSelectVertical('healthcare')}
                className={`p-3 rounded-2xl border transition-all ${
                  currentVertical === 'healthcare'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 bg-white opacity-60'
                } ${devModeOn ? 'cursor-pointer hover:opacity-100' : 'cursor-not-allowed'}`}
              >
                <div className="text-base">🏥</div>
                <div className="text-xs font-bold text-slate-900 mt-1">Healthcare · Meridian Hospital</div>
                <div className="text-[10px] text-slate-500">Patient Helpline Desk</div>
              </div>
            </div>
          </div>

          {/* LinkedIn Profile */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              LinkedIn OG Score™ Integration
            </div>
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5 space-y-2">
              <div className="text-xs text-blue-900">
                Connect your LinkedIn profile to publish validated milestone badges in 1 tap:
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={linkedInInput}
                  onChange={(e) => setLinkedInInput(e.target.value)}
                  className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800"
                />
                <button
                  onClick={() => onConnectLinkedIn(linkedInInput)}
                  className="bg-[#0a66c2] hover:bg-[#09549f] text-white px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  {linkedInConnected ? 'Connected ✓' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {dirty && (
          <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                setDirty(false);
                onClose();
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
