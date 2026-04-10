# 📺 StreamSphere — Premium Live Event Streaming UI

**Live Deployment Link:** [https://vickybytes-stream.vercel.app](https://vickybytes-stream.vercel.app) *(Update with your actual link)*

> **StreamSphere** is a high-fidelity, creator-first streaming platform designed to replicate the elite UX of industry leaders like Twitch and YouTube. Built with a focus on "Cinematic Interaction," it features a state-of-the-art global peripheral system, advanced video playback controls, and a fully modular component architecture.

---

## 🚀 Why This Project Stands Out (The "Pro" Difference)

Most submissions focus on basic grids; **StreamSphere** focuses on **User Experience Paradigms**. Here is what makes this submission 1-of-1:

### 1. ⚡ Twitch-Style Global Navigation
- **Fixed Collapsible Sidebar**: A production-grade left-rail developed with `framer-motion` that persists your layout state. 
- **Dynamic Density**: Real-time mock data for "Followed Channels" (with online/offline states), "Live Channels" (with red pulse indicators), and "Recommended Categories."
- **Persistence**: Sidebar state (Collapsed/Expanded) is handled globally via `App.jsx`, ensuring a seamless experience as you navigate between pages.

### 2. 🎮 Advanced Video Playback (YouTube/Twitch Parity)
- **Overlay Settings Engine**: No more clunky settings sections below the video. We implemented a **Floating Settings Overlay** (⚙️ gear icon) directly on the video player.
- **Granular Controls**: Toggle Quality (1080p to 360p), Playback Speed (0.5x to 2x), and Latency Modes (Balanced/Ultra-Low).
- **Interactive UI Toggles**: Fully functional UI switches for **Captions**, **Theater Mode** (wraps video to 21:9 cinematic aspect), and **Autoplay Next**.

### 3. 🛡️ Professional Event Card Architecture
- **Twitch-Style Layout**: Title, Like count (❤), Share icon (🔗), and a More (⋮) menu all occupy a single, clean headline row.
- **Smart Truncation**: Utilizes single-line ellipsis truncation for long titles, matching professional platform metadata handling.
- **Behavioral Logic**:
  - **"Not Interested"**: Clicking this hides the card and shows an "Undo" state (standard Twitch behavior).
  - **"Report Stream"**: Built-in menu action for simulated moderation.
  - **Inline Share**: Pill-style share button that copies links directly to the clipboard with visual feedback.

### 4. 📱 Adaptive Mobile Flow
- **Intelligent Re-ordering**: On desktop, chat sits on the right. On mobile, the layout intelligently stacks: **Video → Live Chat → Event Metadata**.
- **Touch-Optimized**: All interactive elements (tags, pills, buttons) use expanded hit areas for mobile ease-of-use.

---

## 🎯 Assignment Requirements Checklist

### ✅ Landing Page (Part 1)
- [x] **20+ Event Cards**: Populated from a simulated global data set.
- [x] **Interactive Tags**: Large, readable category and status (LIVE/Upcoming) indicators.
- [x] **Search & Filter**: Real-time search by title/creator and category-based pill filtering.

### ✅ Streaming Page (Part 2)
- [x] **Fluid Routing**: Dynamic `/event/:id` routing with shared state.
- [x] **Live Chat System**: Auto-scrolling message container with distinct user/message coloring and timestamps.
- [x] **Theater Mode**: Interactive toggle that expands the player and collapses the sidebar/chat layout.

---

## 🛠️ Tech Stack & Architecture

- **React 18**: Utilizing `useState`, `useEffect`, `useMemo`, and `useLocation`.
- **Framer Motion**: Powering all layout transitions, sidebar animations, and the settings overlay.
- **Tailwind CSS**: 100% Custom styling with zero dependency on component libraries (no Shadcn, no MUI).
- **Lucide React**: Premium iconography.
- **Folder Structure**:
  - `src/components`: Atomic UI components (Cards, Rails, Video).
  - `src/pages`: Higher-level route containers.
  - `src/data`: Centralized mock data source.

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
4. **Build for Production**:
   ```bash
   npm run build
   ```

---

*Developed with ❤️ by [Your Name]*
