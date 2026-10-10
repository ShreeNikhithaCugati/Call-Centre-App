import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLabel: string;
  onApplyRange: (label: string) => void;
}

export const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  currentLabel,
  onApplyRange,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(currentLabel);
  const [startDate, setStartDate] = useState('2026-10-05');
  const [endDate, setEndDate] = useState('2026-10-11');

  if (!isOpen) return null;

  const presets = ['Today', 'This Week', 'This Month', 'Last 30 Days', 'Custom'];

  const handleApply = () => {
    if (selectedPreset === 'Custom') {
      const formatted = `${startDate.slice(5)} to ${endDate.slice(5)}`;
      onApplyRange(formatted);
    } else {
      onApplyRange(selectedPreset);
    }
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

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900">Select Date Range</h3>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPreset(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPreset === p
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Custom Date Pickers */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setSelectedPreset('Custom');
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setSelectedPreset('Custom');
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mt-1"
            />
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};
