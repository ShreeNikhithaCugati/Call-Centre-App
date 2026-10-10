import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { CalendarInvite } from '../../types';

interface ShareInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  invite: CalendarInvite | null;
  onConfirmShare: (inviteId: string, sharedWith: string[]) => void;
}

export const ShareInviteModal: React.FC<ShareInviteModalProps> = ({
  isOpen,
  onClose,
  invite,
  onConfirmShare,
}) => {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  useEffect(() => {
    if (invite?.sharedWith) {
      setSelectedPeople(invite.sharedWith);
    } else {
      setSelectedPeople([]);
    }
  }, [invite]);

  if (!isOpen || !invite) return null;

  const shareOptions = [
    { label: 'Sunita Rao', sub: 'Store Manager (M1)', icon: '👤' },
    { label: 'Call Centre Team', sub: 'All team members · #callcentre-team', icon: '👥' },
    { label: 'Fahmy', sub: 'L&D Coach', icon: '🎓' },
  ];

  const togglePerson = (label: string) => {
    setSelectedPeople((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const handleSave = () => {
    onConfirmShare(invite.id, selectedPeople);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <h3 className="font-bold text-base text-slate-900">Share Calendar Session</h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{invite.title}</p>
        </div>

        <div className="space-y-2 mb-5">
          {shareOptions.map((opt) => {
            const isChecked = selectedPeople.includes(opt.label);
            return (
              <div
                key={opt.label}
                onClick={() => togglePerson(opt.label)}
                className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  isChecked
                    ? 'border-purple-500 bg-purple-50/60 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 truncate">{opt.sub}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm transition-all"
        >
          Confirm Sharing
        </button>
      </div>
    </div>
  );
};
