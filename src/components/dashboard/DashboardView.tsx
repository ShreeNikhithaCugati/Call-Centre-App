import React from 'react';
import { Calendar as CalendarIcon, ChevronDown, CheckSquare, PhoneCall, Users, FileText, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LeadItem } from '../../types';

interface DashboardViewProps {
  onOpenOgScore: () => void;
  onOpenDateRange: () => void;
  dateRangeLabel: string;
  onNavigateToPlan: () => void;
  onOpenLead: (lead: LeadItem) => void;
  onOpenTask: (threadName: string, taskId: string) => void;
  leads: LeadItem[];
  completedTasks: Record<string, boolean>;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenOgScore,
  onOpenDateRange,
  dateRangeLabel,
  onNavigateToPlan,
  onOpenLead,
  onOpenTask,
  leads,
  completedTasks,
}) => {
  // Who's waiting in queue right now
  const queueItems = [
    { name: 'Priya Iyer', wait: '4m 20s', intent: 'Likely billing dispute — flagged before', level: 'high' },
    { name: 'Suresh Nair', wait: '1m 50s', intent: 'Plan upgrade enquiry', level: 'mid' },
  ];

  // Tasks with completion states
  const tasks = [
    {
      id: 'w1',
      title: '2 callbacks',
      sub: 'next 4:30pm · Priya Iyer',
      channel: 'Call Centre Team',
      icon: PhoneCall,
      color: 'bg-sky-100 text-sky-700',
    },
    {
      id: 'w2',
      title: '2 hot leads',
      sub: 'untouched 24h · Mukunda & Ritu',
      channel: 'AvaniBot',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'w3',
      title: '1 outcome',
      sub: 'to log from 11:30am call',
      channel: 'AvaniBot',
      icon: FileText,
      color: 'bg-amber-100 text-amber-700',
    },
  ];

  const remainingTasks = tasks.filter((t) => !completedTasks[t.id]);

  // Calls handled 7-day data
  const callDays = [
    { day: 'Mon', val: 18, height: '58%' },
    { day: 'Tue', val: 22, height: '70%' },
    { day: 'Wed', val: 15, height: '48%' },
    { day: 'Thu', val: 26, height: '82%' },
    { day: 'Fri', val: 20, height: '64%' },
    { day: 'Sat', val: 12, height: '38%' },
    { day: 'Today', val: 14, height: '45%', current: true },
  ];

  // CSAT trend 7-day data
  const csatDays = [
    { day: 'Mon', val: '88%', height: '70%' },
    { day: 'Tue', val: '90%', height: '74%' },
    { day: 'Wed', val: '85%', height: '64%' },
    { day: 'Thu', val: '92%', height: '78%' },
    { day: 'Fri', val: '89%', height: '72%' },
    { day: 'Sat', val: '91%', height: '76%' },
    { day: 'Today', val: '94%', height: '84%', current: true },
  ];

  return (
    <div className="pb-24">
      {/* Hero Command Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b0f2e] via-[#151b4d] to-[#1e2764] p-5 text-white shadow-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <div className="text-sm font-semibold text-indigo-300">Good afternoon 👋</div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">Arvind Rajan</h1>
            <div className="text-xs text-indigo-200/80 mt-1 flex items-center gap-2">
              <span>The Sleep Company</span>
              <span>·</span>
              <span>Call Centre Staff</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">+23.6pp Shopper Name Lift</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start">
            <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
              <span>On Queue</span>
            </div>

            <button
              onClick={onOpenDateRange}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-medium text-white cursor-pointer transition-colors"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-indigo-300" />
              <span>{dateRangeLabel}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>
          </div>
        </div>

        {/* Primary Row 1: KPI Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 relative z-10">
          <div
            onClick={onOpenOgScore}
            className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-3.5 text-center cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">76</div>
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-1">OG Score™</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 mt-1.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>▲ 13 pts</span>
            </div>
          </div>

          <div className="bg-white/8 border border-white/10 rounded-2xl p-3.5 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">4m 12s</div>
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-1">Avg Handle Time</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 mt-1.5">
              <ArrowDownRight className="w-3 h-3" />
              <span>▼ 8% (Faster)</span>
            </div>
          </div>

          <div className="bg-white/8 border border-white/10 rounded-2xl p-3.5 text-center">
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">94%</div>
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-1">CSAT Today</div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 mt-1.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>▲ 2 pt</span>
            </div>
          </div>

          <div
            onClick={onNavigateToPlan}
            className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-3.5 text-center cursor-pointer transition-all"
          >
            <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">2</div>
            <div className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider mt-1">In Queue</div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 mt-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>● Live Calls</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Left Column: My Progress & Who's Waiting */}
        <div className="space-y-4">
          {/* Progress Banner */}
          <div className="bg-gradient-to-r from-[#0a1a14] via-[#0f3d2f] to-[#1d9e75] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9fe1cb] uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>My Progress · Today</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-extrabold text-white">3</div>
                <div className="text-xs text-amber-300 font-bold mt-0.5">▲ +1 vs yesterday</div>
                <div className="text-xs text-emerald-100 font-semibold mt-1">Leads Created</div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-extrabold text-white">2</div>
                <div className="text-xs text-emerald-300 font-bold mt-0.5">▲ +2 calls placed</div>
                <div className="text-xs text-emerald-100 font-semibold mt-1">Leads Called</div>
              </div>
            </div>
          </div>

          {/* Who's Waiting */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Who's Waiting</h3>
                <div className="text-sm font-semibold text-slate-900">Live Call Queue</div>
              </div>
              <button
                onClick={onNavigateToPlan}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
              >
                <span>Open planner</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {queueItems.map((q, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 flex-shrink-0 text-xs font-bold">
                    {q.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">{q.name}</div>
                    <div className="text-xs text-slate-500 truncate">{q.intent}</div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        q.level === 'high'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {q.wait}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Earnings & Tasks */}
        <div className="space-y-4">
          {/* Monthly Earnings Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">💰 My Earnings</span>
              <span className="text-xs text-slate-500 font-medium">₹800 to ₹6,000 slab</span>
            </div>

            <div className="flex items-baseline gap-2.5 mt-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f6e56]">₹5,200</div>
              <div className="text-xs text-slate-600 font-semibold">₹1,700 from coached moves</div>
            </div>

            {/* Slab Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                <span>Current Tier (87%)</span>
                <span className="text-emerald-700 font-extrabold">Next Slab: ₹6,000</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: '87%' }}
                />
              </div>
            </div>
          </div>

          {/* My Tasks Card (Interactive & Deep-linked!) */}
          <div className="bg-gradient-to-br from-[#3b2304] to-[#92400e] rounded-2xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-sm text-white">My Tasks</h3>
              </div>
              <span className="bg-rose-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                {remainingTasks.length}
              </span>
            </div>

            {remainingTasks.length === 0 ? (
              <div className="bg-white/10 rounded-xl p-4 text-center text-sm font-semibold text-emerald-200">
                🎉 All tasks completed for today!
              </div>
            ) : (
              <div className="space-y-2">
                {remainingTasks.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.id}
                      onClick={() => onOpenTask(t.channel, t.id)}
                      className="bg-white rounded-xl p-2.5 flex items-center justify-between gap-3 text-slate-900 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-7 h-7 rounded-lg ${t.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold truncate group-hover:text-emerald-700 transition-colors">
                            {t.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{t.sub}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: 7-Day Charts (Calls Handled & CSAT Trend) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-1">
        {/* Calls Handled Chart */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Call Volume</span>
              <h4 className="text-sm font-bold text-slate-900">Calls Handled · Last 7 Days</h4>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              127 Total
            </span>
          </div>

          <div className="flex items-end gap-2.5 h-28 pt-4">
            {callDays.map((c, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600">{c.val}</span>
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    c.current ? 'bg-[#0f6e56] shadow-sm' : 'bg-[#5dcaa5]'
                  }`}
                  style={{ height: c.height }}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    c.current ? 'text-emerald-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  {c.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CSAT Trend Chart */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality Score</span>
              <h4 className="text-sm font-bold text-slate-900">CSAT Trend · Last 7 Days</h4>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
              90.5% Avg
            </span>
          </div>

          <div className="flex items-end gap-2.5 h-28 pt-4">
            {csatDays.map((c, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600">{c.val}</span>
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    c.current ? 'bg-[#185fa5] shadow-sm' : 'bg-[#8fb3f5]'
                  }`}
                  style={{ height: c.height }}
                />
                <span
                  className={`text-[10px] font-semibold ${
                    c.current ? 'text-sky-900 font-bold' : 'text-slate-400'
                  }`}
                >
                  {c.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
