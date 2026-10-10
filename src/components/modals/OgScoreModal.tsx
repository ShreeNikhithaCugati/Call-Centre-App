import React, { useEffect, useRef } from 'react';
import { X, Award, Flame, Lightbulb, ArrowRight, Share2 } from 'lucide-react';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, RadarController } from 'chart.js';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, RadarController);

interface OgScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPractice: () => void;
  onShareLinkedIn: () => void;
}

export const OgScoreModal: React.FC<OgScoreModalProps> = ({
  isOpen,
  onClose,
  onOpenPractice,
  onShareLinkedIn,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Follow-up', 'Greeting', 'Product Tech', 'Warranty', 'Objections', 'Closing'],
        datasets: [
          {
            label: 'Your OG Score™',
            data: [88, 82, 78, 71, 65, 58],
            backgroundColor: 'rgba(29, 158, 117, 0.2)',
            borderColor: '#1d9e75',
            borderWidth: 2.5,
            pointBackgroundColor: '#1d9e75',
            pointBorderColor: '#fff',
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              display: false,
              stepSize: 25,
            },
            grid: {
              color: '#e2e8f0',
            },
            angleLines: {
              color: '#cbd5e1',
            },
            pointLabels: {
              font: {
                size: 11,
                weight: 'bold',
              },
              color: '#475569',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#fffdf5] to-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-400 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Gauge */}
        <div className="text-center pt-2">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Overall Sales Rating
          </div>

          <div className="relative w-24 h-24 mx-auto my-3 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full shadow-lg"
              style={{
                background: 'conic-gradient(#1d9e75 76%, rgba(0,0,0,0.08) 0)',
              }}
            />
            <div className="absolute inset-2.5 bg-white rounded-full flex flex-col items-center justify-center shadow-xs">
              <span className="text-3xl font-black text-slate-900 leading-none">76</span>
              <span className="text-[10px] font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="text-sm font-bold text-emerald-700">▲ +13 points this month</div>
          <div className="text-xs text-slate-500 mt-0.5">
            72nd percentile across 120+ retail call centre staff
          </div>
        </div>

        {/* Radar Chart */}
        <div className="h-44 my-2">
          <canvas ref={canvasRef} />
        </div>

        {/* Earning Opportunity Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <div className="text-xs text-amber-950 font-bold leading-tight">
              Top 28% bracket: +5 pts unlocks <span className="text-emerald-700 font-extrabold">+4% earning potential</span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-500 rounded-full"
              style={{ width: '72%' }}
            />
          </div>
          <div className="text-[11px] text-amber-900/80 leading-relaxed">
            This is why OG Score™ matters — it directly scales your monthly commission slab.
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 mt-3 space-y-1.5">
          <div className="text-xs font-extrabold text-rose-900 uppercase flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-rose-600" />
            <span>Your Biggest Levers Right Now</span>
          </div>
          <div className="text-xs text-rose-950 leading-relaxed">
            🔴 <b>Closing (58/100)</b> — Excellent rapport, but the direct ask for booking often stalls.
          </div>
          <div className="text-xs text-rose-950 leading-relaxed">
            🟠 <b>Objections (65/100)</b> — Proactively position 0% EMI before price resistance peaks.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-4">
          <button
            onClick={onOpenPractice}
            className="w-full py-3 bg-[#0f6e56] hover:bg-[#138065] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <span>Practice These 2 Skills With Avani</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onShareLinkedIn}
            className="w-full py-2.5 bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Announce Milestone on LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
