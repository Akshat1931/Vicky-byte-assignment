# 📺 StreamSphere — Production-Ready Live Streaming Engine

**Live Deployment Link:** [https://vickybytes-stream.vercel.app](https://vickybytes-stream.vercel.app)

> **StreamSphere** is a high-fidelity, professional-grade streaming engine built to solve the most complex challenges in web-based media delivery. It features a "Zero-Latency" PiP architecture, a robust "Persistence Shield" for playback continuity, and a **fully interactive discovery suite** designed to exceed the "Bonus" requirements of the VickyBytes assignment.

---

## 🚀 Getting Started

To launch the StreamSphere engine locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-username]/event-streaming-ui.git
   cd event-streaming-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✅ Assignment Checklist & Features

### 🟢 Part 1 — Event Listing Page
- [x] **Responsive Grid**: Fluid layout for Mobile, Tablet, and Desktop.
- [x] **Event Cards**: Rich imagery, creators, and metadata.
- [x] **❤️ Like Button**: UI toggle with Framer Motion reaction.
- [x] **🔗 Share Pulse**: Tactile feedback (Icon swap + Indigo pulse) on click.
- [x] **Filter HUD**: Category-specific shelves and chip filtering.

### 🔵 Part 2 — Event Details Page
- [x] **Hardened Video Player**: "Zero-Latency" verify-and-retry seek engine.
- [x] **Interactive Chat**: High-fidelity messaging with entry animations.
- [x] **Live/Upcoming Tags**: Real-time status indicators across the UI.
- [x] **Engagement Hub**: Multi-step Donation HUD and "Custom Tip" inputs.

### 🔥 "Elite" Bonus Implementations
- [x] **Advanced Discovery Engine**: Functional Search, sorting (Trending/Newest), and "Live Now" Pulse Toggles.
- [x] **Continuity Handshake**: Picture-in-Picture (PiP) that persists across all pages.
- [x] **YouTube-Style Auto-Play**: Automatic "Next Up" sequence with thumbnail previews.
- [x] **Ambient Miniplayer**: Manual "Minimize-in-Place" logic (Stay on page while shrinking).
- [x] **Cinematic Waiting Rooms**: Professional landing experience for upcoming (scheduled) streams with blurred-poster HUDs.
- [x] **Pre-show Chat Lounge**: Context-aware chat feeds with sticky glassmorphic "Lounge Active" banners for scheduled events.
- [x] **Hardware-Level Sync**: Bi-directional Volume/Mute locking across all player states.

---

## 🏗️ The "Bonus" Discovery Engine
*Engineered to meet and exceed the "Better Filtering Logic" requirements:*

### 1. 🔍 Reactive Discovery pulses
- **Live-Only Toggle**: Implemented a "Live Now" pulse filter that instantly scans the grid for active streams with zero reloads.
- **Categorical HUD**: A unified chip-based filter system that syncs across Home and Browse categories seamlessly.

### 2. 📈 Multi-Dimensional Sorting
- **Trending Engine**: A real-time sort that prioritizes streams by viewer count.
- **Recency Logic**: A "Newest" sort that surfaces the latest events, using the `mockEvents` date schema for accurate recency.

---

## 🧠 Under the Hood: The "Elite" Technical Solves
*Developed to overcome common browser and media limitations:*

### 1. 🎞️ YouTube-Style "Auto-Play Next" Sequence
StreamSphere implements a cinema-grade **Continuity Handshake** when a stream concludes:
- **"Next Up" Discovery**: Automatically finds the most relevant successor (prioritizing same-genre live events).
- **Cinematic Countdown**: Displays a 5-second glassmorphic HUD with a **Thumbnail preview** of the next event.
- **Seamless Navigation**: Performs the transition while preserving global audio and PiP states.

### 2. 🪄 Ambient "Minimize-in-Place" (Miniplayer)
Unlike basic PiP triggers, our **Manual Miniplayer** allows for true multi-tasking on the *same page*:
- **Manual Toggle**: A dedicated button shrinks the main video into the corner without navigating away.
- **Placeholder Handshake**: The main video stage transitions into a "Watching in Miniplayer" card to prevent dual-audio conflicts and keep the UI clean.

### 3. 🛡️ The "Persistence Shield" (State Gravity)
To prevent "Metadata-Wipe" when components re-mount during navigation:
- **Immutable Merger**: The global `StreamingContext` uses a high-gravity merger that **strictly rejects** any `0:00` timestamp resets if valid progress already exists.
- **Bidirectional Volume Lock**: Syncs audio levels across the Main Player, PiP Overlay, and Miniplayer using a Layout-Level lock.

---

## ✨ The Interactive engagement Suite

### 🎬 Super Chat & Linked Tips
- **Message-Aware Donations**: Users can type a message and select a tip amount ($5, $10, $50) to instantly transform their words into a **Gold-Glow Super Chat**.

### 🔄 Global Interaction Sync
- **Share/Save Handoff**: Clicking **Share** or **Save** instantly swaps the icon for a `CheckCircle2` with an **Indigo/Emerald Pulse**, ensuring tactile confirmation.

---

## 🛠️ Tech Stack & Architecture

- **React 18**: Custom hooks for media state, context-driven discovery, and theme management.
- **Framer Motion**: Powering the 3D grid, cinematic HUD transitions, and "Goated" countdown rings.
- **Lucide React**: Vector-perfect, production-ready iconography.
- **Tailwind CSS**: 100% custom, glassmorphic utility architecture.

---

## 📊 The "Separators" — Comparison Table

| Feature | Standard Implementation | StreamSphere Implementation |
| :--- | :--- | :--- |
| **Discovery** | Simple static lists | **Functional Sort HUD (Trending/Newest)** |
| **Filtering** | Basic text search | **Pulse-Status (Live Only) + Category Chips** |
| **Continuity** | Video stops at end | **Auto-Play 'Next Up' Sequence + Icons** |
| **PiP Mode** | Auto-hide on navigate | **Manual 'Minimize-in-Place' Miniplayer** |
| **Audio Logic** | Overlapping audio | **Bi-directional Layout-Level Volume Lock** |
| **Interaction** | Silent actions (Copied) | **Icon-Swap + Indigo Pulse Feedback** |

---

*Developed with ❤️ to set the definitive standard for high-fidelity streaming engineering.*
