export const USER_NAMES = [
  'DarkKnight99', 'PixelHunter', 'CryptoKing', 'LunaMoth', 'StarGazer', 
  'IronFist', 'TechPioneer', 'EchoChamber', 'NeonNinja', 'QuantumLeap',
  'CodeBreaker', 'StreamSniper', 'GamerGirl_xox', 'SpeedDemon', 'GhostRider'
];

export const CHAT_MESSAGES = [
  'LFG! 🚀',
  'This is amazing! 🔥',
  '@You check this out!',
  'W developer for this UI.',
  'Can we get a replay?',
  'GG WP',
  'SHEEEEEEEESH',
  'Wait for it...',
  'Nice move!',
  'Wow, just wow.',
  '@You is a legend.',
  'My heart is pounding.'
];

export const generateChatMessage = () => {
  const roles = ['user', 'user', 'user', 'sub', 'sub', 'vip', 'mod', 'founder', 'top_fan'];
  const role = roles[Math.floor(Math.random() * roles.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    user: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
    message: CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    role,
    isVerified: Math.random() > 0.85,
    isDonation: Math.random() > 0.92, 
    amount: Math.random() > 0.92 ? Math.floor(Math.random() * 50) + 5 : 0
  };
};
