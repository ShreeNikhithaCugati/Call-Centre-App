import React from 'react';
import { LayoutDashboard, Phone, Calendar, MessagesSquare, PhoneOutgoing, PhoneIncoming, History, Sparkles, X } from 'lucide-react';
import { TabType, PlanSubTab } from '../../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  planSubTab: PlanSubTab;
  onSelectPlanSubTab: (subTab: PlanSubTab) => void;
  onSimulateIncomingCall: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  missedCallsCount: number;
  pulseBadgeCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  planSubTab,
  onSelectPlanSubTab,
  onSimulateIncomingCall,
  mobileOpen,
  onCloseMobile,
  missedCallsCount,
  pulseBadgeCount,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 md:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-60 bg-gradient-to-b from-[#123c30] to-[#0d2e26] text-white z-50 flex flex-col p-4 shadow-2xl transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-5 pt-1 px-1">
          <div>
            <div className="font-extrabold text-white text-lg tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 bg-[#1d9e75] rounded-lg inline-flex items-center justify-center text-xs text-white">OG</span>
              On-Ground.ai
            </div>
            <div className="text-[11px] text-[#89a89c] mt-0.5">Call Centre Shift · Live</div>
          </div>
          <button
            onClick={onCloseMobile}
            className="md:hidden text-white/60 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
          {/* Dashboard */}
          <button
            onClick={() => {
              onSelectTab('dash');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
              currentTab === 'dash'
                ? 'bg-white/10 text-white font-bold'
                : 'text-[#a9c4ba] hover:bg-white/5 hover:text-white font-medium'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                currentTab === 'dash'
                  ? 'bg-gradient-to-br from-[#2fbf94] to-[#0f6e56] text-white shadow-md'
                  : 'bg-white/10 text-[#4fd8ac]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="text-sm">Dashboard</span>
          </button>

          {/* Plan (Calls) */}
          <div>
            <button
              onClick={() => {
                onSelectTab('calls');
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                currentTab === 'calls'
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-[#a9c4ba] hover:bg-white/5 hover:text-white font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    currentTab === 'calls'
                      ? 'bg-gradient-to-br from-[#5b9bf5] to-[#1d4ed8] text-white shadow-md'
                      : 'bg-white/10 text-[#7cb3f7]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">Plan</span>
              </div>
              {missedCallsCount > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-rose-500 text-white">
                  {missedCallsCount}
                </span>
              )}
            </button>

            {/* Plan Sub-Menu */}
            <div className="pl-6 pr-1 pt-1.5 pb-2 flex flex-col gap-1">
              <button
                onClick={() => {
                  onSelectTab('calls');
                  onSelectPlanSubTab('outgoing');
                  onCloseMobile();
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                  currentTab === 'calls' && planSubTab === 'outgoing'
                    ? 'bg-[#5dcaa5]/20 text-[#7ee0bb]'
                    : 'text-[#89a89c] hover:bg-white/5 hover:text-white'
                }`}
              >
                <PhoneOutgoing className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Calls to make</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('calls');
                  onSelectPlanSubTab('incoming');
                  onCloseMobile();
                }}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                  currentTab === 'calls' && planSubTab === 'incoming'
                    ? 'bg-[#5dcaa5]/20 text-[#7ee0bb]'
                    : 'text-[#89a89c] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <PhoneIncoming className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Incoming</span>
                </div>
                {missedCallsCount > 0 && (
                  <span className="text-[10px] bg-rose-500/80 text-white font-bold px-1.5 py-0.2 rounded-full">
                    {missedCallsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  onSelectTab('calls');
                  onSelectPlanSubTab('recent');
                  onCloseMobile();
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                  currentTab === 'calls' && planSubTab === 'recent'
                    ? 'bg-[#5dcaa5]/20 text-[#7ee0bb]'
                    : 'text-[#89a89c] hover:bg-white/5 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Recent</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('calls');
                  onSimulateIncomingCall();
                  onCloseMobile();
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 hover:bg-amber-400/10 transition-colors cursor-pointer mt-1"
              >
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-amber-300 animate-pulse" />
                <span>Practise a call</span>
              </button>
            </div>
          </div>

          {/* Calendar */}
          <button
            onClick={() => {
              onSelectTab('calendar');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
              currentTab === 'calendar'
                ? 'bg-white/10 text-white font-bold'
                : 'text-[#a9c4ba] hover:bg-white/5 hover:text-white font-medium'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                currentTab === 'calendar'
                  ? 'bg-gradient-to-br from-[#e0a52f] to-[#a3660a] text-white shadow-md'
                  : 'bg-white/10 text-[#e0a52f]'
              }`}
            >
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-sm">Calendar</span>
          </button>

          {/* Pulse */}
          <button
            onClick={() => {
              onSelectTab('pulse');
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
              currentTab === 'pulse'
                ? 'bg-white/10 text-white font-bold'
                : 'text-[#a9c4ba] hover:bg-white/5 hover:text-white font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  currentTab === 'pulse'
                    ? 'bg-gradient-to-br from-[#9457ec] to-[#5b21b6] text-white shadow-md'
                    : 'bg-white/10 text-[#a978f0]'
                }`}
              >
                <MessagesSquare className="w-4 h-4" />
              </div>
              <span className="text-sm">Pulse</span>
            </div>
            {pulseBadgeCount > 0 && (
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500 text-white">
                {pulseBadgeCount}
              </span>
            )}
          </button>
        </nav>

        {/* Shift Badge & Platform Info */}
        <div className="pt-4 border-t border-white/10 text-xs text-[#89a89c] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white/90">Agent Shift</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              9:00 - 18:00
            </span>
          </div>
          <div className="text-[11px] text-[#719285] leading-relaxed">
            Sarvam Top Startup · ~7 Enterprise Brands
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d2e26]/95 backdrop-blur-md border-t border-white/10 z-30 flex items-center justify-around py-2 px-1">
        <button
          onClick={() => onSelectTab('dash')}
          className={`flex flex-col items-center gap-1 text-[11px] cursor-pointer ${
            currentTab === 'dash' ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onSelectTab('calls')}
          className={`flex flex-col items-center gap-1 text-[11px] relative cursor-pointer ${
            currentTab === 'calls' ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <Phone className="w-5 h-5" />
          <span>Plan</span>
          {missedCallsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
          )}
        </button>

        <button
          onClick={() => onSelectTab('calendar')}
          className={`flex flex-col items-center gap-1 text-[11px] cursor-pointer ${
            currentTab === 'calendar' ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </button>

        <button
          onClick={() => onSelectTab('pulse')}
          className={`flex flex-col items-center gap-1 text-[11px] relative cursor-pointer ${
            currentTab === 'pulse' ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <MessagesSquare className="w-5 h-5" />
          <span>Pulse</span>
          {pulseBadgeCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>
    </>
  );
};
