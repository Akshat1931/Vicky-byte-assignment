# 📺 StreamSphere — Premium Live Event Streaming UI

**Live Deployment Link:** [https://vickybytes-stream.vercel.app](https://vickybytes-stream.vercel.app)

> **StreamSphere** is a high-fidelity, creator-first streaming platform designed to replicate the elite UX of industry leaders like Twitch and YouTube. Built with a focus on "Cinematic Interaction," it features a state-of-the-art global peripheral system, advanced video playback controls, and a fully modular component architecture.

---

## 🚀 Why This Project Stands Out (The "Pro" Difference)

Most submissions focus on basic grids; **StreamSphere** focuses on **User Experience Paradigms**. Here is what makes this submission 1-of-1:

### 1. ⚡ Twitch-Style Global Navigation
- **Fixed Collapsible Sidebar**: A production-grade left-rail developed with `framer-motion` that persists your layout state. 
- **Dynamic Density**: Real-time mock data for "Followed Channels" (with online/offline states) and "Live Channels" (with red pulse indicators).
- **Persistence**: Sidebar state is handled globally, ensuring a seamless experience as you navigate between pages.

### 2. 😊 The "Hype" Reaction System (YouTube Mobile Style)
- **Horizontal Reaction Strip**: Tapping the "React" button (😊) on mobile slides out a horizontal emote bar, preserving vertical screen space while allowing instant engagement.
- **Particle Physics**: Integrated `AnimatePresence` to trigger floating emote particles (❤️, 🔥, 😂, ⭐) that fly up the video player with randomized physics—synchronized with the stream context.
- **Dedicated Toggle Like**: A sophisticated toggle-based Like system with visual state persistence (Rose-400 glow when active).

### 3. 🎮 Master-Class Video Player (0-Regressions)
- **Top-Right Settings Hub**: Moved global controls to the top-right corner, separating stream metadata from playback logic for a cleaner UI.
- **Granular Control Restoration**: Full support for Quality (1080p to 360p), Playback Speed (0.5x to 2x including 1.25x), and Latency Modes.
- **Adaptive Bottom-Sheet**: On mobile, the settings menu transforms from a dropdown into a **Native-App Bottom Sheet** with horizontal scrollable sections to ensure it **never** covers the video area or gets cut off.

### 4. 🛡️ Professional Event Card Architecture
- **Twitch-Style Layout**: Title, Like count, Share icon, and a More (⋮) menu all occupy a single, clean headline row.
- **Smart Truncation**: Utilizes single-line ellipsis truncation for long titles.
- **Interactive Feedback**: 
  - **"Not Interested" State**: Immediately swaps cards for an "Undo" placeholder to minimize user friction.
  - **Spring-Based Toggles**: Custom-coded UI switches (Captions, Theater Mode) using spring physics (`stiffness: 500`) for a premium "Apple-like" feel.

### 5. 📱 Adaptive Mobile Flow
- **Intelligent Re-ordering**: On desktop, chat sits on the right. On mobile, the layout intelligently stacks: **Video → Live Chat (Primary) → Event Metadata (Secondary)**.
- **Safe-Height Logic**: The UI dynamically calculates available viewport height to ensure menus are always scrollable and never overflow off-screen.

---

## 🎯 Assignment Requirements Checklist

### ✅ Landing Page (Part 1)
- [x] **20+ Event Cards**: Populated from a simulated global data set.
- [x] **Interactive Tags**: Large, readable category and status (LIVE/Upcoming) indicators.
- [x] **Search & Filter**: Real-time search and category-based pill filtering.

### ✅ Streaming Page (Part 2)
- [x] **Fluid Routing**: Dynamic `/event/:id` routing with shared state.
- [x] **Live Chat System**: Auto-scrolling container with distinct user coloring and timestamps.
- [x] **Theater Mode**: Interactive toggle that expands the player and collapses the sidebar layout.

---

## 🛠️ Tech Stack & Architecture

- **React 18**: Utilizing `useState`, `useCallback`, `useMemo`, and `AnimatePresence`.
- **Framer Motion**: Powering all layout transitions, particle physics, and coordinate-based spring animations.
- **Tailwind CSS**: 100% Custom utility-first styling (zero component libraries like Shadcn/MUI).
- **Lucide React**: Premium iconography.
- **Viewport Engineering**: Specialized CSS for "Safe Area" insets and viewport-relative scaling.

---

## 🏁 Setup & Installation

1. **Clone & Enter**:
   ```bash
   git clone <repository-url>
   cd event-streaming-ui
   ```
2. **Install**:
   ```bash
   npm install
   ```
3. **Run Dev**:
   ```bash
   npm run dev
   ```

---

*Developed with ❤️ to provide the best possible live event experience.*
