import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { NotificationItem, TabType } from '../../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onNavigateAction: (channelName?: string, tabName?: TabType) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onNavigateAction,
}) => {
  const [filter, setFilter] = useState<'all' | 'action' | 'alert'>('all');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'action') return n.needsAction;
    if (filter === 'alert') return !n.needsAction;
    return true;
  });

  const actionCount = notifications.filter((n) => n.needsAction).length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Shift Notifications</h3>
            <p className="text-xs text-slate-500">
              {actionCount} need action · {notifications.length - actionCount} alerts
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mt-3 flex-shrink-0">
          {(['all', 'action', 'alert'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors cursor-pointer ${
                filter === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f === 'all' ? 'All' : f === 'action' ? 'Needs Action' : 'Alerts'}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
          {filteredNotifs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">No notifications found</div>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all ${
                  n.needsAction
                    ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base flex-shrink-0">
                    {n.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          n.needsAction ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {n.needsAction ? 'ACTION NEEDED' : 'ALERT'}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{n.time}</span>
                    </div>

                    <div className="text-xs text-slate-800 font-medium leading-relaxed">
                      {n.title}
                    </div>

                    {n.cta && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateAction(n.channelToOpen, n.tabToOpen);
                        }}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-900 mt-2 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{n.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
