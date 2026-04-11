# 📺 StreamSphere — Cinematic Live Streaming UI/UX Showcase

[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://vickybytes-stream.vercel.app)

> **"This project stands out through its cinematic scroll-based hero, realistic chat simulation, and product-level interaction design."**

StreamSphere is a high-fidelity frontend execution of a modern live-streaming platform. Built for the VickyBytes Engineering Assignment, it focuses on **Cinematic UI**, **Intuitive UI Interactions**, and **Simulated Media Continuity** to provide a production-grade user experience on the frontend.

---

## 📸 Production Showreels

> 🎥 Click the preview to watch the demo

| 🎬 Cinematic Hero | 🔍 Discovery HUD |
| :--- | :--- |
| [![Hero Demo](https://img.youtube.com/vi/gUkWF61638w/maxresdefault.jpg)](https://www.youtube.com/watch?v=gUkWF61638w) | [![Search Demo](https://img.youtube.com/vi/f2GuTEVaUas/maxresdefault.jpg)](https://www.youtube.com/watch?v=f2GuTEVaUas) |
| **Experience the Scroll** | **Reactive Search & Filters** |

| 💬 Community Lounge | 📺 Content Continuity |
| :--- | :--- |
| [![Chat Demo](https://img.youtube.com/vi/dvr-cXaOn8A/maxresdefault.jpg)](https://www.youtube.com/watch?v=dvr-cXaOn8A) | [![PiP Demo](https://img.youtube.com/vi/abT9glVJmtg/maxresdefault.jpg)](https://www.youtube.com/watch?v=abT9glVJmtg) |
| **Real-time Chat Interaction** | **Global Picture-in-Picture (PiP)** |

| ⚡ UX Interactions |  |
| :--- | :--- |
| [![UX Demo](https://img.youtube.com/vi/-nzy7jDVH0o/maxresdefault.jpg)](https://www.youtube.com/watch?v=-nzy7jDVH0o) |  |
| **Undo, Remove & Report Actions** |  |

---

## 🛠 Tech Stack

- **React (Vite)**: Core application architecture.
- **Tailwind CSS**: Modern, utility-first styling with custom glassmorphic tokens.
- **Framer Motion**: Production-grade micro-animations and layout transitions.
- **Lucide React**: Vector-perfect, accessible iconography.

---

## 🚀 Getting Started

To launch the StreamSphere UI locally:

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

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── Common/      # Reusable UI (Skeletons, Toasts)
│   ├── Core/        # App Foundation (Navbar, SEO, Themes)
│   ├── Event/       # Feature-rich Event Components (Player, Chat, PiP)
│   └── Home/        # Discovery HUD & Categorical Grid Logic
├── context/         # Global State Management (Streaming & Theme)
├── data/            # Mock Event & Chat Data Schemas
├── pages/           # High-fidelity Page Layouts
└── styles/          # Modern Glassmorphic UI Tokens
```

---

## ⚙️ Engineering & Performance Optimizations

*Beyond the UI, the platform implements several "Silent" technical solves:*

### 1. **Render Optimization (Memoization)**
To handle high-frequency updates in the Live Chat and Sidebar, I utilized **`React.memo`** and **`useMemo`**. This ensures that heavy components like the `LiveChannelsRail` only re-render when their core state changes, maintaining a smooth, high-performance experience even during "Hype" chat moments.

### 2. **Mobile Viewport Engineering**
Standard mobile browsers often suffer from "Keyboard Overlap" in fixed chat inputs. I solved this by integrating the **`visualViewport` API**, which dynamically calculates the available screen height when the keyboard opens, ensuring the chat input is always visible and perfectly snapped.

### 3. **Global State Persistence**
The platform features a **Global State Management System**. If you change the volume or mute a stream, that preference is "locked" across the entire app. Navigating to a new event or expanding the PiP will preserve your exact audio preferences, preventing jarring jumps during your watch session.

---

## 🎨 Design & UX Decisions (Reviewer's Guide)

*Why I chose this architecture for the assignment:*

### 1. **Cinematic Continuity (PiP Logic)**
Instead of stopping the user's journey when they navigate, I implemented a **Frontend Picture-in-Picture (PiP) Simulation**. This ensures that the global state manages the video window, keeping the stream "alive" conceptually while the user explores other events.

### 2. **Context-Aware Engagement**
A stream isn't always live. I built a **Scheduled Event Handshake**:
- If an event is upcoming, the UI transitions into a **Premieres Waiting Room**.
- The chat feed adapts to a **"Pre-show Chat Active"** mode with special status banners.
- This demonstrates an understanding of the **Content Life-cycle** and user behavior.

### 3. **Glassmorphic Visual Hierarchy**
I used a consistent **Glassmorphic Design System** to create depth. By using layered blurs and subtle borders, the active player HUDs and Chat overlays feel modern and premium without cluttering the viewport.

---

## ✅ Assignment Checklist & Features

### 🟢 Part 1 — Event Listing Page (35 Marks)
- [x] **Responsive Grid**: Fluid layout tested across Mobile, Tablet, and Desktop.
- [x] **Elite Event Cards**: Hand-crafted custom cards featuring Like toggles, Share pulses, and Schedule metadata.
- [x] **Discovery HUD (Bonus Marks)**: Functional local search, category chips, and **Trending/Newest** sorting engine.

### 🔵 Part 2 — Event Streaming Page (65 Marks)
- [x] **Simulated Live Media**: Responsive player container with cinematic loading states and verify-and-retry seek logic.
- [x] **Interactive Chat Lounge**: High-fidelity message simulation with "Super Chat" gold-glow messaging and auto-scroll.
- [x] **Engagement Suite**: Multi-step Donation HUD and "Custom Tip" inputs for a realistic community experience.

### 🔥 "Bonus" Frontend Engineering
- [x] **State Persistence**: UI-level state preservation for watch-time and volume across site navigation.
- [x] **YouTube-Style Continuity**: Automatic "Next Up" sequence with thumbnail previews to drive user retention.
- [x] **Ambient Miniplayer**: Manual "Minimize-in-Place" logic to shrink the video without leaving the page.
- [x] **Accessibility & Motion**: Optimized with Framer Motion and accessible iconography using Lucide React.

---

*Developed with ❤️ to showcase the definitive standard in frontend product engineering.*
