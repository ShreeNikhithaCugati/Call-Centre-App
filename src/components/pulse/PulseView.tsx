import React, { useState } from 'react';
import { Sparkles, MessageCircle, Trophy, Plus, ChevronRight, Hash, ArrowLeft, Send, Search, Check, Pin, X } from 'lucide-react';
import { PulseChannelData, PinnedTask } from '../../types';

interface PulseViewProps {
  channels: Record<string, PulseChannelData>;
  onSendMessage: (channelName: string, text: string) => void;
  pinnedTasks: Record<string, PinnedTask[]>;
  onAnswerPinnedTask: (taskId: string, answerText: string) => void;
  activeChatChannel: string | null;
  onOpenChannel: (channelName: string) => void;
  onCloseChannel: () => void;
}

export const PulseView: React.FC<PulseViewProps> = ({
  channels,
  onSendMessage,
  pinnedTasks,
  onAnswerPinnedTask,
  activeChatChannel,
  onOpenChannel,
  onCloseChannel,
}) => {
  const [inputText, setInputText] = useState('');
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [manualInput, setManualInput] = useState<Record<string, string>>({});
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [customAgentsFoldOpen, setCustomAgentsFoldOpen] = useState(false);
  const [kudosOverlayOpen, setKudosOverlayOpen] = useState(false);
  const [whatsappOverlayOpen, setWhatsappOverlayOpen] = useState(false);
  const [avaniSearchOpen, setAvaniSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAnswer, setSearchAnswer] = useState<string | null>(null);

  const activeChannelData = activeChatChannel ? channels[activeChatChannel] : null;
  const currentChannelTasks = activeChatChannel ? pinnedTasks[activeChatChannel] || [] : [];

  const handleSend = () => {
    if (!inputText.trim() || !activeChatChannel) return;
    onSendMessage(activeChatChannel, inputText.trim());
    setInputText('');
  };

  const handleAnswerTask = (taskId: string, answer: string) => {
    onAnswerPinnedTask(taskId, answer);
  };

  const handleRunChannelSearch = () => {
    if (!searchQuery.trim() || !activeChatChannel) return;
    const qLower = searchQuery.toLowerCase();
    const channelMsgs = activeChannelData?.messages || [];
    const matchedMsg = channelMsgs.find((m) => (m.text || '').toLowerCase().includes(qLower));

    setSearchAnswer(
      matchedMsg
        ? `Found in channel history (${matchedMsg.who}): "${matchedMsg.text?.replace(/<[^>]+>/g, '')}"`
        : `AvaniBot analyzed #${activeChatChannel}: Greeting QA compliance is targeted at 85% by Friday, and all planned callbacks should be logged directly in the shift plan.`
    );
  };

  // Custom agents catalog
  const customAgentsList = [
    {
      title: 'Skill Improvement Coach',
      sub: 'Practice & feedback agent',
      icon: '🎯',
      channel: 'Skill Improvement Coach',
    },
    {
      title: 'My SOP Coach',
      sub: 'Personal coaching agent',
      icon: '📋',
      channel: 'Avani AI Coaching',
    },
    {
      title: 'Recognition Bot',
      sub: 'Kudos automation agent',
      icon: '🏆',
      channel: 'Recognition Bot',
    },
  ];

  return (
    <div className="pb-24 relative">
      {/* Pulse Main Header */}
      <div className="bg-gradient-to-r from-[#3b1a5a] to-[#6b2fa0] p-4 text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-xs">
            <svg viewBox="0 0 16 16" className="w-full h-full">
              <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#E01E5A" />
              <rect x="10" y="1" width="5" height="5" rx="1.5" fill="#36C5F0" />
              <rect x="1" y="10" width="5" height="5" rx="1.5" fill="#2EB67D" />
              <rect x="10" y="10" width="5" height="5" rx="1.5" fill="#ECB22E" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight leading-tight">Pulse</h1>
            <p className="text-[11px] text-purple-200">The Sleep Company · Koramangala Team</p>
          </div>
        </div>

        <button
          onClick={() => onOpenChannel('Call Centre Team')}
          className="w-8 h-8 rounded-full bg-white text-purple-950 flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer font-bold"
          title="New message"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Pulse Channels List */}
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* AvaniBot Always-On Featured Hero Card */}
        <div
          onClick={() => onOpenChannel('AvaniBot')}
          className="relative overflow-hidden bg-gradient-to-r from-[#3b1254] via-[#6d28d9] to-[#8b5cf6] rounded-2xl p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl flex-shrink-0">
              ✨
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base">AvaniBot</span>
                <span className="text-[10px] font-extrabold bg-white/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Always On
                </span>
              </div>
              <p className="text-xs text-purple-200 truncate mt-0.5">
                Ask about anything in Pulse — daily briefs, open tasks, quick answers
              </p>
            </div>
          </div>

          <div className="flex gap-2 relative z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenChannel('AvaniBot');
                onSendMessage('AvaniBot', 'Give me my daily brief for this shift');
              }}
              className="flex-1 py-1.5 px-3 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily Brief</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenChannel('AvaniBot');
              }}
              className="flex-1 py-1.5 px-3 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask Question</span>
            </button>
          </div>
        </div>

        {/* Custom Agents Fold */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden">
          <div
            onClick={() => setCustomAgentsFoldOpen(!customAgentsFoldOpen)}
            className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-base">
                ✨
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Custom Agents</h3>
                <p className="text-xs text-slate-500">Configured by your manager · tap to open</p>
              </div>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-slate-400 transition-transform ${
                customAgentsFoldOpen ? 'rotate-90' : ''
              }`}
            />
          </div>

          {customAgentsFoldOpen && (
            <div className="px-3 pb-3 space-y-1.5 border-t border-purple-50 pt-2 animate-in fade-in duration-150">
              {customAgentsList.map((ag) => (
                <div
                  key={ag.title}
                  onClick={() => onOpenChannel(ag.channel)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/70 border border-slate-100 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{ag.icon}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{ag.title}</div>
                      <div className="text-[11px] text-slate-500">{ag.sub}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kudos Hero Banner */}
        <div
          onClick={() => setKudosOverlayOpen(true)}
          className="relative overflow-hidden bg-gradient-to-r from-[#c8860a] via-[#e0a52f] to-[#f0b649] rounded-2xl p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
              🏆
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base">Kudos Received</span>
                <span className="text-[10px] font-extrabold bg-white text-amber-900 px-2 py-0.5 rounded-full uppercase">
                  3 New
                </span>
              </div>
              <p className="text-xs text-amber-50 truncate mt-0.5">
                "Great work with Mukunda — closed that objection beautifully!" — Sunita Rao
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-extrabold text-white">12</div>
              <div className="text-[10px] uppercase font-bold text-amber-100">All-Time</div>
            </div>
          </div>
        </div>

        {/* WhatsApp Customer Discussions Row */}
        <div
          onClick={() => setWhatsappOverlayOpen(true)}
          className="bg-white rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
              💬
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>#customer-discussions</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                  WhatsApp
                </span>
              </div>
              <div className="text-xs text-slate-500">Mukunda R., Kavitha R. · 2 open threads</div>
            </div>
          </div>
          <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
            2
          </span>
        </div>

        {/* Channel Section */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">
            Team Channels
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
            {[
              { id: 'Call Centre Team', desc: 'Manager: Review greeting QA scores this week!', unread: 2 },
              { id: 'All Stores', desc: 'New Ortho Grid campaign live from 1 June', unread: 4 },
              { id: 'Avani AI Coaching', desc: 'Your warranty score dropped 12% this week', unread: 1 },
              { id: 'Manage Shipment', desc: '📦 Ortho Grid Pro — ready for delivery ✓', unread: 1 },
              { id: 'Quotation Tickets', desc: '🎫 Quotation approval — awaiting approval', unread: 1 },
              { id: 'New Hire Onboarding', desc: '🎉 Welcome to the team!', unread: 0 },
              { id: 'EMI Push Nudge', desc: 'EMI mentioned in 4/11 calls (36%) — below target', unread: 1 },
              { id: 'Follow-up Agent', desc: '9 of your allocated leads are past 48h without a call', unread: 0 },
            ].map((c) => {
              const pendingCount = (pinnedTasks[c.id] || []).length;
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenChannel(c.id)}
                  className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-slate-400 font-mono text-sm font-bold">#</span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">{c.id}</div>
                      <div className="text-xs text-slate-500 truncate">{c.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {pendingCount > 0 && (
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                        <Pin className="w-3 h-3" />
                        <span>{pendingCount}</span>
                      </span>
                    )}
                    {c.unread > 0 && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {c.unread}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Messages Section */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">
            Direct Messages
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 divide-y divide-slate-100 shadow-xs overflow-hidden">
            {[
              { name: 'Sunita Rao', initials: 'SR', role: 'Store Manager', msg: '🌟 Great work with Mukunda — keep it up', time: '12:40pm', bg: 'bg-amber-100 text-amber-800' },
              { name: 'Priya Krishnan', initials: 'PK', role: 'Sales Peer', msg: 'Can you cover my 3pm slot today?', time: '9:55am', bg: 'bg-rose-100 text-rose-800' },
              { name: 'Raju Kumar', initials: 'RK', role: 'Sales Peer', msg: 'Nice cross-sell on the Tranquo chair! 🔥', time: 'Yesterday', bg: 'bg-teal-100 text-teal-800' },
            ].map((dm) => (
              <div
                key={dm.name}
                onClick={() => onOpenChannel(dm.name)}
                className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${dm.bg}`}>
                    {dm.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{dm.name}</span>
                      {dm.name === 'Sunita Rao' && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-amber-200 text-amber-900">
                          M1 MGR
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{dm.msg}</div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium flex-shrink-0">{dm.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IN-CHANNEL FULL CHAT VIEW OVERLAY */}
      {activeChatChannel && activeChannelData && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in slide-in-from-right duration-200">
          {/* Channel Header */}
          <div className="bg-[#3b1a5a] text-white p-3.5 flex items-center justify-between gap-3 shadow-md flex-shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={onCloseChannel}
                className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="font-extrabold text-sm sm:text-base text-white truncate">
                  {activeChannelData.title}
                </div>
                <div className="text-[11px] text-purple-200 truncate">
                  {activeChannelData.dateLabel}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSearchAnswer(null);
                setAvaniSearchOpen(true);
              }}
              className="p-2 rounded-full bg-white/15 hover:bg-white/20 text-white cursor-pointer transition-colors"
              title="Ask AvaniBot about this channel"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* PINNED "NEEDS YOUR INPUT" CARD (Never scrolls away!) */}
          {currentChannelTasks.length > 0 && (
            <div className="bg-amber-50 border-b-2 border-amber-400 p-3 flex-shrink-0 shadow-xs">
              <div
                onClick={() => setPinnedOpen(!pinnedOpen)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Pin className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                    Needs your input ({currentChannelTasks.length})
                  </span>
                </div>
                <span className="text-xs text-amber-700 font-bold">
                  {pinnedOpen ? 'Collapse ▲' : 'Expand ▼'}
                </span>
              </div>

              {pinnedOpen && (
                <div className="mt-2.5 space-y-2.5">
                  {currentChannelTasks.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs space-y-2"
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">{t.q}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{t.ctx}</div>
                      </div>

                      {/* Choice Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {t.opts.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleAnswerTask(t.id, opt)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 cursor-pointer transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      {/* Or Custom Text Input */}
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={manualInput[t.id] || ''}
                          onChange={(e) =>
                            setManualInput((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && manualInput[t.id]?.trim()) {
                              handleAnswerTask(t.id, manualInput[t.id].trim());
                            }
                          }}
                          placeholder="Or type a custom reply..."
                          className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-amber-500"
                        />
                        <button
                          onClick={() => {
                            if (manualInput[t.id]?.trim()) {
                              handleAnswerTask(t.id, manualInput[t.id].trim());
                            }
                          }}
                          className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages Scroll View */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
            {activeChannelData.messages.map((m, i) => {
              const isMe = m.who === 'You';
              return (
                <div
                  key={i}
                  className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isMe
                        ? 'bg-emerald-600 text-white'
                        : m.bg
                        ? `${m.bg} text-slate-800`
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {m.init}
                  </div>

                  <div className={`max-w-[80%] ${isMe ? 'text-right' : 'text-left'}`}>
                    <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                      <span>{m.who}</span>
                      {m.isBot && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800">
                          AI AGENT
                        </span>
                      )}
                      <span>· {m.time}</span>
                    </div>

                    <div
                      className={`text-xs sm:text-sm p-3 rounded-2xl shadow-xs leading-relaxed inline-block text-left ${
                        isMe
                          ? 'bg-[#1d9e75] text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/70'
                      }`}
                      dangerouslySetInnerHTML={{ __html: m.text || '' }}
                    />

                    {/* Optional Card Component */}
                    {m.card && (
                      <div className="mt-2 bg-white rounded-xl border border-slate-200 p-3 text-left shadow-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{m.card.icon}</span>
                          <span className="font-bold text-xs text-slate-900">{m.card.title}</span>
                          {m.card.badge && (
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-md ml-auto">
                              {m.card.badge}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-xs text-slate-600">
                          {m.card.fields.map(([k, v], idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-slate-400">{k}:</span>
                              <span className="font-semibold text-slate-800">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <div className="bg-white border-t border-slate-200 p-3 flex-shrink-0">
            {emojiPickerOpen && (
              <div className="flex gap-2 pb-2.5 overflow-x-auto text-xl border-b border-slate-100 mb-2">
                {['👍', '🙌', '🔥', '💪', '🏆', '✨', '✅', '❤️', '🎉', '📢', '💡', '🛏️'].map(
                  (em) => (
                    <button
                      key={em}
                      onClick={() => {
                        setInputText((prev) => prev + em);
                        setEmojiPickerOpen(false);
                      }}
                      className="hover:scale-125 transition-transform cursor-pointer p-1"
                    >
                      {em}
                    </button>
                  )
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-lg"
              >
                😊
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message #${activeChatChannel}…`}
                className="flex-1 text-xs sm:text-sm bg-slate-100 border-none rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={handleSend}
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AVANIBOT IN-CHANNEL SEARCH MODAL */}
      {avaniSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Ask AvaniBot about #{activeChatChannel}
                </h3>
              </div>
              <button
                onClick={() => setAvaniSearchOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunChannelSearch()}
                placeholder="e.g. what are the greeting targets? who is assigned to..."
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-purple-500"
              />
              <button
                onClick={handleRunChannelSearch}
                className="bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Ask
              </button>
            </div>

            {searchAnswer && (
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200/80 text-xs text-purple-950 leading-relaxed">
                <div className="font-bold mb-1">✨ Channel Analysis:</div>
                {searchAnswer}
              </div>
            )}
          </div>
        </div>
      )}

      {/* KUDOS OVERLAY */}
      {kudosOverlayOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900">Kudos &amp; Leadership Wins</h3>
              </div>
              <button
                onClick={() => setKudosOverlayOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {[
                { who: 'Sunita Rao (Manager)', badge: '🏆 Top Closer', text: 'Great work with Mukunda — closed that warranty objection beautifully. Keep it up!', time: '12:40pm · Today', bg: 'border-amber-300 bg-amber-50/60' },
                { who: 'Raju Kumar (Peer)', badge: '🔥 Great Cross-Sell', text: 'Nice cross-sell on the Tranquo chair! Impressed by how you read the customer.', time: 'Yesterday', bg: 'border-rose-200 bg-rose-50/60' },
                { who: 'Sunita Rao (Manager)', badge: '💪 Top SOP Streak', text: 'Top SOP score this week — 72/100 on Mukunda conversation. Store leader!', time: '2 days ago', bg: 'border-emerald-200 bg-emerald-50/60' },
              ].map((kd, idx) => (
                <div key={idx} className={`p-3.5 rounded-2xl border ${kd.bg} space-y-1`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{kd.who}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{kd.time}</span>
                  </div>
                  <div className="text-xs font-bold text-amber-900">{kd.badge}</div>
                  <div className="text-xs text-slate-700 italic leading-relaxed">"{kd.text}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WHATSAPP CUSTOMER DISCUSSIONS OVERLAY */}
      {whatsappOverlayOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <h3 className="font-bold text-base text-slate-900">#customer-discussions</h3>
              </div>
              <button
                onClick={() => setWhatsappOverlayOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Live WhatsApp Business customer threads relayed to your queue:
            </div>

            <div className="space-y-2">
              {[
                { name: 'Mukunda R.', msg: 'Quote for Ortho GRID sent · awaiting approval', time: '2:40pm', phone: '+91 98765 43210' },
                { name: 'Kavitha R.', msg: 'When can I come see the hybrid mattress?', time: '11:15am', phone: '+91 97654 32109' },
              ].map((c) => (
                <div
                  key={c.name}
                  className="p-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{c.name} ({c.phone})</div>
                    <div className="text-xs text-slate-600 mt-0.5">{c.msg}</div>
                  </div>
                  <button
                    onClick={() => {
                      setWhatsappOverlayOpen(false);
                      onOpenChannel('Call Centre Team');
                    }}
                    className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
