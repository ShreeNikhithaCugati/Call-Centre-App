export type TabType = 'dash' | 'calls' | 'calendar' | 'pulse';
export type PlanSubTab = 'outgoing' | 'incoming' | 'recent';

export interface LeadJourneyEvent {
  date: string;
  channel: string;
  icon: string;
  color: string;
  text: string;
}

export interface ProblemBucket {
  cat: string;
  text: string;
}

export interface SubScore {
  label: string;
  pct: number;
  color: string;
}

export interface ProductPitch {
  emoji: string;
  name: string;
  price: string;
  orig?: string;
  why: string;
  pitch: string;
  cross: {
    emoji: string;
    name: string;
    line: string;
  };
  emi: {
    plan: string;
    monthly: string;
    line: string;
  };
}

export interface LeadItem {
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  interest: string;
  product?: string;
  crossSell?: string;
  emi?: string;
  attractivenessScore: number;
  expectedValue: number;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  statusLabel: string;
  statusColor: string;
  quoteOn: boolean;
  icp: number;
  icpColor: string;
  intentScore: number;
  subscores: SubScore[];
  slaNote?: string | null;
  notes: string[];
  problemBuckets: ProblemBucket[];
  journey: LeadJourneyEvent[];
  phone: string;
  actions: 'open' | 'ageing' | 'closed';
  productPitch?: ProductPitch;
}

export interface RecentCallItem {
  id: string;
  dir: 'in' | 'out' | 'missed';
  name: string;
  time: string;
  duration: string;
  outcome?: string | null;
}

export interface CallSopItem {
  label: string;
  pass: boolean;
  evidence: string;
}

export interface CalendarInvite {
  id: string;
  day: number;
  time: string;
  title: string;
  meta: string;
  sharedWith?: string[];
}

export interface PinnedTask {
  id: string;
  q: string;
  ctx: string;
  opts: string[];
}

export interface ChannelMessage {
  who: string;
  init: string;
  time: string;
  bg?: string;
  color?: string;
  text?: string;
  isBot?: boolean;
  card?: {
    icon: string;
    title: string;
    badge?: string;
    fields: [string, string][];
    actions?: { label: string; style?: 'primary' | 'secondary'; onclick?: string }[];
  };
}

export interface PulseChannelData {
  title: string;
  dateLabel: string;
  messages: ChannelMessage[];
  meta?: string;
  badge?: number;
  icon?: string;
  type?: 'team' | 'store' | 'ai' | 'shipment' | 'tickets' | 'onboarding' | 'agent' | 'manager' | 'peer' | 'avanibot';
}

export interface NotificationItem {
  id: string;
  needsAction: boolean;
  icon: string;
  color: string;
  title: string;
  time: string;
  cta?: string | null;
  channelToOpen?: string;
  tabToOpen?: TabType;
}

export interface DashboardKPI {
  ogScore: number;
  ogScoreDelta: number;
  avgHandleTime: string;
  csatToday: number;
  inQueueCount: number;
  leadsCreated: number;
  leadsCalled: number;
  earningsMonth: number;
  earningsCoached: number;
}
