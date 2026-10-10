import React from 'react';
import { X, Check } from 'lucide-react';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmoji: string;
  onSelectAvatar: (emoji: string, name: string, ring: string) => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  currentEmoji,
  onSelectAvatar,
}) => {
  if (!isOpen) return null;

  const personas = [
    {
      name: 'Captain',
      emoji: '🦸‍♂️',
      bg: 'bg-blue-100',
      ring: 'conic-gradient(#4fc3f7, #1d9e75, #5dcaa5, #4fc3f7)',
      desc: 'Balanced leadership, consultative pitch',
    },
    {
      name: 'Valkyrie',
      emoji: '🦸‍♀️',
      bg: 'bg-rose-100',
      ring: 'conic-gradient(#f48fb1, #e91e63, #ff80ab, #f48fb1)',
      desc: 'High empathy, active listening master',
    },
    {
      name: 'Vortex',
      emoji: '🦹‍♀️',
      bg: 'bg-purple-100',
      ring: 'conic-gradient(#ce93d8, #7b1fa2, #e040fb, #ce93d8)',
      desc: 'Objection solver, technical depth',
    },
    {
      name: 'Blaze',
      emoji: '🦹‍♂️',
      bg: 'bg-amber-100',
      ring: 'conic-gradient(#FFCC02, #FF8C00, #FFD700, #FFCC02)',
      desc: 'High energy, fast closing rhythm',
    },
    {
      name: 'Shadow',
      emoji: '🥷',
      bg: 'bg-slate-200',
      ring: 'conic-gradient(#90a4ae, #37474f, #b0bec5, #90a4ae)',
      desc: 'Calm precision, high compliance',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pt-2 mb-4">
          <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
            Selling Persona
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">Choose Profile Avatar</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sets your icon and animated badge ring in the header
          </p>
        </div>

        <div className="space-y-2.5">
          {personas.map((p) => {
            const isSelected = p.emoji === currentEmoji;
            return (
              <div
                key={p.name}
                onClick={() => {
                  onSelectAvatar(p.emoji, p.name, p.ring);
                  onClose();
                }}
                className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${p.bg}`}
                >
                  {p.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{p.desc}</div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
