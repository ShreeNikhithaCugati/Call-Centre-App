# On-Ground.ai — Call Centre App Rebuild
**Role:** Forward Deployed Engineer / Agentic Engineer  
**Company:** On-Ground.ai (Founders: Rashmi Sehgal & Mukunda Dwarkanath)  
**Submission By:** Candidate Assignment Submission  

---

## 1. Overview & Vision
On-Ground.ai is an enterprise AI platform for premium offline products and services, bridging leads and floor conversations across call centres, retail stores, and field teams. Research shows that **86% of walk-ins leave with zero follow-up**, while naming the shopper delivers a **+23.6 percentage-point conversion lift**. 

This application rebuilds the complete, production-grade **Call Centre Staff Application** (optimized for shift agents such as Arvind Rajan at The Sleep Company), faithfully capturing every workflow from the provided live mock while introducing clean React 19 architecture, modular TypeScript components, live streaming audio transcript simulation, in-call AI coaching co-pilots, and DPDP Act compliance safeguards.

---

## 2. Tech Stack & Architectural Decisions
- **Framework:** **React 19** with **Vite 8**
  - *Why:* Instant build and HMR speed, functional components, hooks, high reliability, and clean state isolation.
- **Language:** **TypeScript 5.7+**
  - *Why:* Strict typing across complex data structures: multi-channel customer journeys, ICP scoring, live SOP checkpoints, call logs, and gamification metrics.
- **Styling:** **Tailwind CSS v4** + Modern typography
  - *Why:* Zero runtime CSS overhead, pixel-level precision matching the mock design language, responsive grid layout for both desktop and mobile viewports.
- **Icons:** **Lucide React**
  - *Why:* Crisp, modern SVG iconography with consistent line weights and zero bloat.
- **Visualizations & Charts:** **Chart.js**
  - *Why:* High-performance radar charts for multi-axis OG Score™ evaluation (Follow-up, Greeting, Product Knowledge, Warranty, Objections, Closing) and clean bar charts for 7-day call volumes and CSAT trends.
- **Interactions:** **Canvas-Confetti**
  - *Why:* Instant positive-reinforcement feedback on task completions and milestone achievements.

---

## 3. What Has Been Built (Complete Feature Matrix)

### A. App Shell
- **Desktop Sidebar:** 240px persistent navigation (`#123c30` to `#0d2e26` gradient) with brand mark, shift status indicator, active state styling, sub-menu for Plan (`Calls to make`, `Incoming`, `Recent`, `Practise a call`), and dynamic badge counts.
- **Mobile Responsive Drawer & Bottom Bar:** Adapts seamlessly to smartphone viewports with quick bottom-bar navigation and slide-out navigation.
- **Top Bar:** 
  - Dynamic notification bell with pulsing ring and unread counter.
  - Global persistent **OG Score™ ring gauge (76/100)** and store rank pill (`⭐ #3`).
  - Animated profile avatar with spinning conic-gradient persona ring (`🦸‍♂️ Captain`).
  - Dropdown menu for selling persona switching, app settings, and logout.

### B. Dashboard View
- **Command Center Hero:** Deep navy/indigo radial gradient, live agent status (`On Queue ● live`), brand vertical indicator, and customizable date range filter (`This Week`).
- **Row 1 KPI Tiles:**
  - `OG Score™: 76` (▲ 13 pts) — interactive, opens deep radar breakdown.
  - `Avg Handle Time: 4m 12s` (▼ 8% faster).
  - `CSAT Today: 94%` (▲ 2 pt).
  - `In Queue: 2` (● Live Calls) — interactive, jumps to incoming/queue view.
- **Row 2 Grid:**
  - *Left:* "My Progress · Today" banner (Leads Created: 3 ▲+1, Leads Called: 2 ▲+2) + "Who's Waiting" live queue card.
  - *Right:* "💰 My Earnings" card (₹5,200 earned, ₹1,700 coached, 87% progress toward ₹6,000 tier slab).
  - *My Tasks Card:* Interactive task list (2 callbacks, 2 hot leads untouched, 1 outcome to log) deep-linked to relevant channels and lead records.
- **7-Day Trend Charts:**
  - *Call Volume Chart:* Bar chart of calls handled over the last 7 days.
  - *CSAT Quality Score Chart:* 7-day CSAT percentage progression.

### C. Planner & Live Call Experience (`Plan` Tab)
- **Calls to Make (Outgoing):**
  - Leads ranked by **Attractiveness Score** (e.g., Ritu S. 96, Mukunda 90, Faizan A. 88).
  - Expandable accordion rows showing customer journey history, preferred product, cross-sell recommendation, and EMI details.
  - Full pagination controls with page indicators.
- **Incoming (Missed Calls):**
  - Banner showing total **Value at Stake** (₹46,970+ across missed calls).
  - Detailed missed call list with reason, timestamp, and **1-tap "Call Back"** button on every row.
- **Recent Calls:**
  - Call direction indicators (Incoming, Outgoing, Missed).
  - Call duration and CRM outcome badges.
  - **Click to review vs. SOP:** Opens a full 6-point QA rubric with actual transcript evidence quotes!
- **Interactive Call Simulator & Co-Pilot:**
  - Active call timer, sentiment tracker, mute, hold, and end call controls.
  - **Live Audio Transcript Streamer:** Real-time conversational turns stream in between agent and customer.
  - **AI Assist Right-Hand Co-Pilot:**
    - Main objective and pitch lines.
    - Live SOP checklist with automatic checkoffs and drifting alerts.
    - In-call Q&A search with knowledge-base grounding.
    - Quick action chips ("Send WhatsApp Quote", "12-Mo No-Cost EMI", etc.).
  - **Call Wrap-up Modal:** AI-drafted call summary and CRM outcome tagging on call completion.

### D. Shift Calendar
- Month view calendar with date grid, previous/next month navigation, and "Today" button.
- Event dot indicators on scheduled coaching and review days.
- Upcoming sessions list with time, title, and attendee metadata.
- **Share Invite Modal:** Instant sharing with Store Manager (Sunita Rao), Call Centre Team, or L&D Coach (Fahmy).

### E. Pulse (Team Channels, Agents & DMs)
- **AvaniBot Always-On Card:** Direct access to "Daily Brief" and "Ask a question".
- **Custom Agents Catalog:** Direct access to Skill Improvement Coach, My SOP Coach, and Recognition Bot.
- **WhatsApp Customer Discussions:** Live proxy view for real-time customer WhatsApp threads.
- **Kudos Received Banner:** Golden recognition card with all-time kudos tracker and manager feedback quotes.
- **Team Channels:** `#callcentre-team`, `#all-stores`, `#avani-coaching`, `#manage-shipment`, `#quotation-tickets`, `#new-hire-onboarding`, `#emi-push-nudges`, `#lead-conversion`.
- **In-Channel Experience:**
  - **Pinned "Needs your input" Card:** Persistent sticky card displaying actionable tasks with quick buttons or text reply inputs. Answering completes the task, updates the dashboard, and shoots celebratory confetti!
  - Real-time message bubbles with timestamps and user avatars.
  - Emoji picker and message composer.
  - In-channel AvaniBot search modal.

### F. Lead Dossier Modal
- Multi-page lead carousel (Lead X of N) with previous/next controls and indicator dots.
- Intent score and **ICP Fit Gauge** (0–100%).
- Collapsible **ICP Fit Breakdown** (Budget Fit, Need Match, Decision Stage).
- Collapsible **Multi-touch Journey Timeline** (Meta Ad → AI Agent → Voice AI → WhatsApp).
- Collapsible **Signal Pickups (Problem Buckets)** (Financing, Quotation, Warranty).
- Before-you-reach-out coaching guidance.
- Action triggers: "No Interest" reason sheet, "WhatsApp" messenger, "On-ground Call" with pre-call checklist, and "Came Back ✓" return logger.

### G. Compliance & Extras
- **DPDP Act (India) Compliance:** Privacy explainer covering Section 5 & 6 opt-in, Section 6 right to withdraw, Section 11 & 12 data access/correction, and Section 9 minor safeguards.
- **Selling Persona Customizer:** 5 customizable personas (Captain 🦸‍♂️, Valkyrie 🦸‍♀️, Vortex 🦹‍♀️, Blaze 🦹‍♂️, Shadow 🥷) with custom ring gradients.
- **Industry Vertical Switcher:** Switch between Retail (The Sleep Company) and Healthcare (Meridian Hospital) with instant data relabeling.
- **Multilingual Support:** 8 Indian languages (Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, Gujarati, Urdu) + English.

---

## 4. How to Run Locally

```bash
# 1. Clone the repository
git clone <YOUR_REPO_URL>
cd <REPO_DIRECTORY>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available on `http://localhost:3000`.

To build for production:
```bash
npm run build
npm run preview
```

---

## 5. What Was Skipped & Why
- **Live VoIP / SIP Trunking:** Hardware telephony trunks (e.g., Twilio/Exotel WebRTC) were replaced with a high-fidelity **interactive browser call simulator** that streams realistic transcripts, updates sentiment, evaluates live SOP adherence, and logs wrap-up summaries. This avoids costly external telecom configurations while accurately showcasing the frontend agent workflow.
- **Real Backend / Database:** As stated in the assignment brief (*"Sample data is fine; no backend is needed"*), state is managed client-side using React state and memory models, allowing full local testing without backend infrastructure.

---

## 6. AI Tools Used
- **Google AI Studio (Gemini 2.5/Flash)**: Code generation, architectural structuring, and component synthesis.
- **Anthropic Claude**: Copywriting review and conversational transcript data preparation.
- **On-Ground.ai Mock HTML**: Design reference for visual fidelity and domain-specific terminology.

---

*Submitted to: mukunda@on-ground.ai*  
*Candidate: Engineering Intern / Forward Deployed Engineer Assignment*
