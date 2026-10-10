import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Users, Mail, Calendar as CalendarIcon, Check } from 'lucide-react';
import { CalendarInvite } from '../../types';

interface CalendarViewProps {
  invites: CalendarInvite[];
  onShareInvite: (invite: CalendarInvite) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ invites, onShareInvite }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // October 2026 (matching prompt deadline date)
  const [selectedDay, setSelectedDay] = useState<number | null>(11);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const handleToday = () => {
    const today = new Date(2026, 9, 11);
    setCurrentDate(today);
    setSelectedDay(today.getDate());
  };

  // Find days with invites
  const inviteDays = new Set(invites.map((iv) => iv.day));

  const filteredInvites = selectedDay
    ? invites.filter((iv) => iv.day === selectedDay)
    : invites;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto pb-24">
      {/* Title & Mailbox Synced Banner */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900">Shift Calendar</h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synced with Outlook / Google Calendar — store visits &amp; coaching
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/60 rounded-2xl p-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white shadow-xs text-blue-600 flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4" />
        </div>
        <div className="text-xs text-blue-900 leading-relaxed">
          Store coaching sessions, lead visit appointments, and QA audits are mirrored directly into your mailbox.
        </div>
      </div>

      {/* Month Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base text-slate-900 tracking-tight">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleToday}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              Today
            </button>
          </div>

          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="text-xs font-bold text-slate-400 py-1">
              {d}
            </span>
          ))}
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isToday = dayNum === 11 && month === 9 && year === 2026;
            const isSelected = selectedDay === dayNum;
            const hasInvite = inviteDays.has(dayNum);

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(isSelected ? null : dayNum)}
                className={`aspect-square rounded-xl text-xs font-bold flex flex-col items-center justify-center relative cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm scale-105'
                    : isToday
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-300'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{dayNum}</span>
                {hasInvite && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full absolute bottom-1.5 ${
                      isSelected ? 'bg-amber-300' : 'bg-rose-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming / Selected Day Events */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <span>
            {selectedDay ? `Scheduled for October ${selectedDay}` : 'All Upcoming Sessions'}
          </span>
          {selectedDay && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-indigo-600 hover:underline cursor-pointer lowercase"
            >
              Show all
            </button>
          )}
        </div>

        {filteredInvites.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-400 border border-slate-200/80">
            No sessions scheduled for this day
          </div>
        ) : (
          filteredInvites.map((iv) => (
            <div
              key={iv.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-start justify-between gap-3 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="text-center bg-indigo-50 border border-indigo-100 rounded-xl px-2.5 py-1.5 flex-shrink-0">
                  <div className="text-xs font-extrabold text-indigo-900">{iv.time.split(' ')[0]}</div>
                  <div className="text-[10px] font-bold text-indigo-600">{iv.time.split(' ')[1]}</div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{iv.title}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{iv.meta}</span>
                  </div>

                  {iv.sharedWith && iv.sharedWith.length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[10px] text-slate-400 font-semibold">Shared with:</span>
                      {iv.sharedWith.map((p, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => onShareInvite(iv)}
                className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer transition-colors flex-shrink-0"
                title="Share session invite"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
