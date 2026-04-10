# VickyBytes Live Event Platform (StreamSphere)

**Live Deployment Link:** [https://your-vercel-deployment-link.vercel.app](https://your-vercel-deployment-link.vercel.app) *(Replace with your actual link before submitting!)*

This project is a high-fidelity, highly responsive Single Page Application (SPA) built for the **Frontend Engineering Assignment — Live Event Platform**. It was developed strictly adhering to the "No Backend" and "No Shadcn UI" rules, utilizing custom components to bridge robust desktop broadcasting with adaptive mobile-first interactions.

---

## 🎯 Assignment Fulfillment & Core Features

### 🟢 PART 1 — Event Listing Page (Landing)
- **Responsive Grid Layout**: Features a dynamic CSS grid that seamlessly adapts across Mobile, Tablet, and Desktop breakpoints. Populates exactly 20 rich event cards.
- **Interactive Event Cards**: 
  - Displays high-quality Event Images and Titles with text-clamping.
  - Custom UI Toggles for **❤️ Like** and **🔗 Share** functions (with navigator clipboard integration).
  - Hover-state **👁️‍🗨️ Watch Now (View)** buttons that route via React Router.
  - Contextual Schedule Status logic (shows 'LIVE Viewers' or 'Upcoming Date/Time').
- **Advanced Filtering**: Integrates a fully functional Search input and category pill-filter strip that instantly queries event states.

### 🔴 PART 2 — Event Streaming Page
- **Dynamic Routing**: Fluid client-side navigation (`/event/:id`) passing local data sets.
- **Responsive Video Player**: A containerized 16:9 iframe pulling remote Livestreams that intelligently scales while preserving aspect ratios.
- **Interactive Live Chat UI**: 
  - Complete with an input box and simulated localized message pushing.
  - Integrates the requested **Bonus Auto-Scroll** functionality whenever new messages simulate.
  - Desktop-optimized right-sidebar layout that seamlessly restacks below the video on Mobile viewports.
- **Rich Description Layout**: Clean, nicely-spaced typography rendering the host profile, viewing preferences, and the core event description beneath the media.

### 💡 Bonus Features & Differentiators
- **Twitch-Style Theater Mode**: An engineered state-driven modifier that natively collapses the chat component and expands the video boundaries to 12-columns horizontally.
- **Interactive Particle Physics**: High-frequency "Like" interactions trigger unique, floating heart particles with randomized trajectories mapped via `framer-motion` (mimicking TikTok LIVE behavior).
- **Advanced Visual Processing**: Multi-layered Tailwind `backdrop-filter` utilities ensure clean glassmorphism, while LIVE broadcast indicators utilize tracking nested CSS (`animate-ping`) to simulate urgency.

---

## 🛠️ Technology Stack

- **React 18** (Functional Hooks, Context)
- **Vite** (Optimized build tooling)
- **Tailwind CSS** (Utility-first responsive styling natively replacing component libraries)
- **Framer Motion** (Declarative layout transitions & particle simulations)
- **React Router DOM** (SPA history management)
- **Lucide React** (Vector iconography)

---

## 🚀 Setup & Installation Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-streaming-ui
   ```

2. **Install core dependencies**:
   ```bash
   npm install
   ```

3. **Initialize the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**: 
   Navigate to `http://localhost:5173` via your preferred web browser.

### Production Fixes
The deployment architecture utilizes a root-level `vercel.json` routing configuration to permanently resolve standard SPA `404 Not Found` errors upon hard refreshes across the deployment platform.
