import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TabType, PlanSubTab, LeadItem, CalendarInvite } from './types';
import {
  INITIAL_LEADS,
  INITIAL_RECENT_CALLS,
  INITIAL_CALENDAR_INVITES,
  INITIAL_PINNED_TASKS,
  INITIAL_PULSE_CHANNELS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';

import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { PlanView } from './components/plan/PlanView';
import { CalendarView } from './components/calendar/CalendarView';
import { PulseView } from './components/pulse/PulseView';

import { LeadsModal } from './components/modals/LeadsModal';
import { OgScoreModal } from './components/modals/OgScoreModal';
import { RankDetailModal } from './components/modals/RankDetailModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { CallSopReviewModal } from './components/modals/CallSopReviewModal';
import { CallWrapupModal } from './components/modals/CallWrapupModal';
import { PreCallSopModal } from './components/modals/PreCallSopModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AvatarModal } from './components/modals/AvatarModal';
import { DateRangeModal } from './components/modals/DateRangeModal';
import { ShareInviteModal } from './components/modals/ShareInviteModal';
import { DemoBar } from './components/common/DemoBar';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('dash');
  const [planSubTab, setPlanSubTab] = useState<PlanSubTab>('outgoing');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // App Data State
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [recentCalls, setRecentCalls] = useState(INITIAL_RECENT_CALLS);
  const [calendarInvites, setCalendarInvites] = useState<CalendarInvite[]>(INITIAL_CALENDAR_INVITES);
  const [pinnedTasks, setPinnedTasks] = useState(INITIAL_PINNED_TASKS);
  const [pulseChannels, setPulseChannels] = useState(INITIAL_PULSE_CHANNELS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Active Call State
  const [activeCall, setActiveCall] = useState<{ name: string; isIncoming: boolean } | null>(null);

  // User Persona State
  const [avatarEmoji, setAvatarEmoji] = useState('🦸‍♂️');
  const [avatarName, setAvatarName] = useState('Captain');
  const [avatarRing, setAvatarRing] = useState(
    'conic-gradient(#4fc3f7, #1d9e75, #5dcaa5, #4fc3f7)'
  );

  // Filter / Setting State
  const [dateRangeLabel, setDateRangeLabel] = useState('This Week');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [devModeOn, setDevModeOn] = useState(false);
  const [currentVertical, setCurrentVertical] = useState<'retail' | 'healthcare'>('retail');
  const [linkedInConnected, setLinkedInConnected] = useState(false);

  // Modals & Overlays State
  const [leadsModalOpen, setLeadsModalOpen] = useState(false);
  const [ogScoreModalOpen, setOgScoreModalOpen] = useState(false);
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [dateRangeModalOpen, setDateRangeModalOpen] = useState(false);

  // Specific Item Modals
  const [selectedCallSopIndex, setSelectedCallSopIndex] = useState<number | null>(null);
  const [selectedInviteToShare, setSelectedInviteToShare] = useState<CalendarInvite | null>(null);
  const [preCallLead, setPreCallLead] = useState<LeadItem | null>(null);
  const [wrapupCallData, setWrapupCallData] = useState<{
    name: string;
    duration: string;
    summary: string;
  } | null>(null);

  // Pulse in-channel view
  const [activeChatChannel, setActiveChatChannel] = useState<string | null>(null);

  // Unread badge calculations
  const missedCallsCount = recentCalls.filter((c) => c.dir === 'missed').length;
  const hasUnreadNotifs = notifications.some((n) => n.needsAction);
  const pulseBadgeCount = Object.values(pinnedTasks).flat().length;

  // Handlers
  const handleStartCall = (name: string, isIncoming = false) => {
    setActiveCall({ name, isIncoming });
    setCurrentTab('calls');
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleSimulateIncomingCall = () => {
    const candidates = ['Ritu S.', 'Mukunda', 'Faizan A.', 'Kavitha R.'];
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    handleStartCall(chosen, true);
  };

  const handleSimulateCustomerSpeech = (speech: string) => {
    if (!activeCall) {
      handleStartCall('Mukunda', true);
    }
  };

  const handleSendMessage = (channelName: string, text: string) => {
    const channel = pulseChannels[channelName];
    if (!channel) return;

    const newMsg = {
      who: 'You',
      init: 'AR',
      time: 'Just now',
      text,
    };

    setPulseChannels((prev) => ({
      ...prev,
      [channelName]: {
        ...prev[channelName],
        messages: [...prev[channelName].messages, newMsg],
      },
    }));

    // If talking to AvaniBot, simulate a coaching reply
    if (channelName === 'AvaniBot' || channelName === 'Avani AI Coaching') {
      setTimeout(() => {
        const botReply = {
          who: 'AvaniBot',
          init: '✨',
          time: 'Just now',
          bg: '#f1ecff',
          color: '#7c3aed',
          isBot: true,
          text: `✨ I noticed your focus on <b>"${text}"</b>. When customers ask about price, anchoring against our 10-year warranty and 0% EMI lowers objection rates by 34%!`,
        };
        setPulseChannels((prev) => ({
          ...prev,
          [channelName]: {
            ...prev[channelName],
            messages: [...prev[channelName].messages, botReply],
          },
        }));
      }, 1000);
    }
  };

  const handleAnswerPinnedTask = (taskId: string, answerText: string) => {
    // 1. Mark task as completed
    setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));

    // 2. Post answer into active channel
    if (activeChatChannel) {
      handleSendMessage(activeChatChannel, `Answered pinned task: "${answerText}"`);
    }

    // 3. Remove task from pinned list
    setPinnedTasks((prev) => {
      const updated: Record<string, typeof prev[string]> = {};
      Object.keys(prev).forEach((ch) => {
        updated[ch] = prev[ch].filter((t) => t.id !== taskId);
      });
      return updated;
    });

    // 4. Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  const handleSaveToCrm = (summary: string, outcome: string) => {
    if (!wrapupCallData) return;

    // Add to recent calls log
    const newCallItem = {
      id: `c_${Date.now()}`,
      dir: 'out' as const,
      name: wrapupCallData.name,
      time: 'Just now',
      duration: wrapupCallData.duration,
      outcome,
    };
    setRecentCalls((prev) => [newCallItem, ...prev]);

    // Append note to lead record
    setLeads((prev) =>
      prev.map((l) => {
        if (wrapupCallData.name.includes(l.name)) {
          return {
            ...l,
            notes: [`${summary} (${outcome})`, ...l.notes],
          };
        }
        return l;
      })
    );

    setWrapupCallData(null);
  };

  const handleShareInviteConfirm = (inviteId: string, sharedWith: string[]) => {
    setCalendarInvites((prev) =>
      prev.map((iv) => (iv.id === inviteId ? { ...iv, sharedWith } : iv))
    );
  };

  const handleNotificationNavigate = (channelName?: string, tabName?: TabType) => {
    if (channelName) {
      setCurrentTab('pulse');
      setActiveChatChannel(channelName);
    } else if (tabName) {
      setCurrentTab(tabName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Sidebar for Desktop & Mobile Drawer */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        planSubTab={planSubTab}
        onSelectPlanSubTab={setPlanSubTab}
        onSimulateIncomingCall={handleSimulateIncomingCall}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
        missedCallsCount={missedCallsCount}
        pulseBadgeCount={pulseBadgeCount}
      />

      {/* Main Content Area (Offset for Desktop 240px sidebar) */}
      <div className="md:pl-60 flex-1 flex flex-col min-w-0">
        <TopBar
          onOpenNotifications={() => setNotifModalOpen(true)}
          onOpenOgScore={() => setOgScoreModalOpen(true)}
          onOpenRankDetail={() => setRankModalOpen(true)}
          onOpenAvatar={() => setAvatarModalOpen(true)}
          onOpenSettings={() => setSettingsModalOpen(true)}
          onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
          hasUnreadNotifs={hasUnreadNotifs}
          avatarEmoji={avatarEmoji}
          avatarRing={avatarRing}
        />

        <main className="flex-1 overflow-x-hidden">
          {currentTab === 'dash' && (
            <DashboardView
              onOpenOgScore={() => setOgScoreModalOpen(true)}
              onOpenDateRange={() => setDateRangeModalOpen(true)}
              dateRangeLabel={dateRangeLabel}
              onNavigateToPlan={() => {
                setCurrentTab('calls');
                setPlanSubTab('outgoing');
              }}
              onOpenLead={(lead) => {
                setLeadsModalOpen(true);
              }}
              onOpenTask={(channel, taskId) => {
                setCurrentTab('pulse');
                setActiveChatChannel(channel);
              }}
              leads={leads}
              completedTasks={completedTasks}
            />
          )}

          {currentTab === 'calls' && (
            <PlanView
              subTab={planSubTab}
              onSelectSubTab={setPlanSubTab}
              leads={leads}
              recentCalls={recentCalls}
              onOpenLeadDetail={(lead) => {
                setLeadsModalOpen(true);
              }}
              onOpenCallSopReview={(idx) => {
                setSelectedCallSopIndex(idx);
              }}
              onOpenWrapup={(name, duration, summary) => {
                setWrapupCallData({ name, duration, summary });
              }}
              activeCall={activeCall}
              onStartCall={handleStartCall}
              onEndCall={handleEndCall}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView
              invites={calendarInvites}
              onShareInvite={(invite) => setSelectedInviteToShare(invite)}
            />
          )}

          {currentTab === 'pulse' && (
            <PulseView
              channels={pulseChannels}
              onSendMessage={handleSendMessage}
              pinnedTasks={pinnedTasks}
              onAnswerPinnedTask={handleAnswerPinnedTask}
              activeChatChannel={activeChatChannel}
              onOpenChannel={setActiveChatChannel}
              onCloseChannel={() => setActiveChatChannel(null)}
            />
          )}
        </main>
      </div>

      {/* Floating Demo Actions */}
      <DemoBar
        onSimulateIncomingCall={handleSimulateIncomingCall}
        onSimulateCustomerSpeech={handleSimulateCustomerSpeech}
      />

      {/* MODALS */}
      <LeadsModal
        isOpen={leadsModalOpen}
        onClose={() => setLeadsModalOpen(false)}
        leads={leads}
        onStartCall={(name) => handleStartCall(name, false)}
        onOpenSopCheck={(lead) => setPreCallLead(lead)}
      />

      <OgScoreModal
        isOpen={ogScoreModalOpen}
        onClose={() => setOgScoreModalOpen(false)}
        onOpenPractice={() => {
          setOgScoreModalOpen(false);
          setCurrentTab('pulse');
          setActiveChatChannel('Avani AI Coaching');
        }}
        onShareLinkedIn={() => {
          setOgScoreModalOpen(false);
          alert('OG Score™ badge milestone published to your connected LinkedIn profile!');
        }}
      />

      <RankDetailModal
        isOpen={rankModalOpen}
        onClose={() => setRankModalOpen(false)}
      />

      <NotificationModal
        isOpen={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
        notifications={notifications}
        onNavigateAction={handleNotificationNavigate}
      />

      <CallSopReviewModal
        isOpen={selectedCallSopIndex !== null}
        onClose={() => setSelectedCallSopIndex(null)}
        call={selectedCallSopIndex !== null ? recentCalls[selectedCallSopIndex] : null}
      />

      <CallWrapupModal
        isOpen={wrapupCallData !== null}
        onClose={() => setWrapupCallData(null)}
        callerName={wrapupCallData?.name || ''}
        duration={wrapupCallData?.duration || ''}
        initialSummary={wrapupCallData?.summary || ''}
        onSaveToCrm={handleSaveToCrm}
      />

      <PreCallSopModal
        isOpen={preCallLead !== null}
        onClose={() => setPreCallLead(null)}
        lead={preCallLead}
        onProceedCall={(name) => {
          setPreCallLead(null);
          setLeadsModalOpen(false);
          handleStartCall(name, false);
        }}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        devModeOn={devModeOn}
        onToggleDevMode={() => setDevModeOn(!devModeOn)}
        currentVertical={currentVertical}
        onSelectVertical={setCurrentVertical}
        linkedInConnected={linkedInConnected}
        onConnectLinkedIn={(url) => {
          setLinkedInConnected(true);
          alert(`Connected LinkedIn: ${url}`);
        }}
      />

      <AvatarModal
        isOpen={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentEmoji={avatarEmoji}
        onSelectAvatar={(emoji, name, ring) => {
          setAvatarEmoji(emoji);
          setAvatarName(name);
          setAvatarRing(ring);
        }}
      />

      <DateRangeModal
        isOpen={dateRangeModalOpen}
        onClose={() => setDateRangeModalOpen(false)}
        currentLabel={dateRangeLabel}
        onApplyRange={setDateRangeLabel}
      />

      <ShareInviteModal
        isOpen={selectedInviteToShare !== null}
        onClose={() => setSelectedInviteToShare(null)}
        invite={selectedInviteToShare}
        onConfirmShare={handleShareInviteConfirm}
      />
    </div>
  );
}
