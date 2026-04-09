# Live Event Streaming Platform UI (VickyBytes Assignment)

A frontend-only, responsive live event platform built with React and Tailwind CSS.

This project includes:
- An event listing page with search/filter controls and interactive event cards
- A cinematic hero section
- An event streaming page with responsive video, event details, and simulated live chat
- Smooth UI transitions and micro-interactions

## Project Overview

This app is designed to simulate a real live-event experience without any backend APIs.

Core goals:
- Production-style component structure
- Clean and responsive UI across mobile/tablet/desktop
- Lightweight interaction logic for likes, shares (UI), previews, and chat simulation
- Readable and scalable frontend code

## Tech Stack

- React (Vite)
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Features Implemented

### Part 1 — Event Listing Page
- Responsive grid layout with 15 event cards
- Card includes:
  - Event image
  - Event title
  - Like toggle button (UI)
  - Share button (UI)
  - View/Open Stream action
  - Schedule/live status with viewer info
- Search bar with basic filtering
- Category filter chips
- Live badges and preview snippets for selected events

### Part 2 — Event Streaming Page
- Responsive video section
- Live chat UI:
  - Simulated incoming messages with random intervals
  - Usernames + timestamps
  - Auto-scroll behavior with scroll-position awareness
  - Smooth message animations
- Event description and creator info

### UI/UX Enhancements
- Cinematic scroll-driven hero section
- Page transition animations
- Responsive spacing and layout refinements
- Reduced-motion handling and smoother mobile interaction intensity

## Folder Structure

```text
src/
  components/
    Event/
    Home/
    Layout/
  data/
  pages/
  App.jsx
  main.jsx
  index.css
```

## Setup Instructions

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Deployment

Recommended: **Vercel**

### Quick deploy steps
1. Push this project to a public GitHub repository
2. Import the repo in Vercel
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

## Submission Checklist

- [ ] Public GitHub repo
- [ ] Deployed link (Vercel/Render/Railway)
- [x] Responsive UI (mobile/tablet/desktop)
- [x] Event listing page with interactive cards
- [x] Event streaming page with chat simulation
- [x] Clean component-based frontend architecture

## Deployment Link

Add your deployed URL here after deployment:

`https://<your-deployment-url>`

## Design Decisions

- **Frontend-only simulation:** all live behaviors (chat, viewer shifts, controls) are mocked locally for fast UI iteration.
- **Cinematic but usable hero:** scroll-driven hero is visually bold while event grid and stream page stay straightforward for usability.
- **Component-first structure:** event listing, stream page, and shared layout are split into focused components for readability.
- **Progressive enhancement:** advanced effects are layered on top of a stable baseline UI rather than requiring backend integration.

## Performance Notes

- Transform/opacity-first animations to reduce layout thrashing.
- Randomized chat simulation runs via lightweight timed updates.
- Card images use lazy-loading and async decoding.
- Reduced-motion handling is included for better accessibility and smoother low-end behavior.

## Screenshots / Demo

Add screenshots or short GIF clips here before final submission:

- `Hero parallax + event listing`
- `Event detail stream + chat`
- `Mobile responsive views`

## Trade-offs

- Chat, controls, and live metrics are simulated (no real-time backend).
- Focus was placed on UI quality, responsiveness, and interaction realism over data persistence.
- Hero animation is intentionally prominent to create a memorable first impression while keeping core page flows clean.
