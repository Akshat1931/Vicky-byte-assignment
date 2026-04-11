export const mockUser = {
  name: 'Vicky Bytes',
  username: 'vickybytes_pro',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
  bio: 'Professional streamer and creative developer exploring the boundaries of virtual interaction. Join me for daily tech deep-dives and gaming sessions!',
  location: 'San Francisco, CA',
  website: 'vickybytes.dev',
  joinedDate: 'March 2024',
  stats: [
    { label: 'Followers', value: '12.4K', change: '+12%', trend: 'up' },
    { label: 'Following', value: '842', change: '+5', trend: 'up' },
    { label: 'Total Views', value: '1.2M', change: '+150K', trend: 'up' },
    { label: 'Streams', value: '156', change: '+8', trend: 'up' },
  ],
  followerGoal: {
    current: 12400,
    target: 15000,
  },
  socialLinks: [
    { platform: 'Twitter', url: 'https://twitter.com/vickybytes', icon: 'Twitter' },
    { platform: 'Discord', url: 'https://discord.gg/vickybytes', icon: 'MessageSquare' },
    { platform: 'GitHub', url: 'https://github.com/vickybytes', icon: 'Github' }
  ],
  recentStreams: [
    { id: 'rs1', title: 'Late Night Coding: React Deep Dive', views: '12.4K', date: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop' },
    { id: 'rs2', title: 'Vibe & Build: Aesthetic UI Session', views: '8.2K', date: '5 days ago', thumbnail: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop' },
    { id: 'rs3', title: 'The Future of AI in Web Design', views: '15.1K', date: '1 week ago', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop' },
    { id: 'rs4', title: 'Weekly Tech Wrap-up #148', views: '2.4K', date: '2 weeks ago', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop' },
  ],
  notifications: [
    { id: 'n1', text: 'Neon Nights Virtual Concert is live now', time: '2m ago' },
    { id: 'n2', text: 'New event in Technology you may like', time: '15m ago' },
    { id: 'n3', text: 'Your followed creator just scheduled a stream', time: '1h ago' },
  ],
  activities: [
    { id: 'a1', user: 'Sarah King', action: 'subscribed to your channel', time: '2m ago', type: 'subscription' },
    { id: 'a2', user: 'StreamBot', action: 'moderated spam in chat', time: '15m ago', type: 'mod' },
    { id: 'a3', user: 'Global Network', action: 'hosted your stream (2.4K viewers)', time: '1h ago', type: 'host' },
  ]
};
