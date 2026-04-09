export const USER_NAMES = [
  'DarkKnight99', 'PixelHunter', 'CryptoKing', 'LunaMoth', 'StarGazer', 
  'IronFist', 'TechPioneer', 'EchoChamber', 'NeonNinja', 'QuantumLeap',
  'CodeBreaker', 'StreamSniper', 'GamerGirl_xox', 'SpeedDemon', 'GhostRider'
];

export const CHAT_MESSAGES = [
  'This is amazing! 🔥',
  'Who is winning?',
  'Let\'s goooooo!',
  'I can\'t believe this is happening.',
  'PogChamp',
  'Stream lagging for anyone else?',
  'W',
  'LMAO',
  'What a play!',
  'Hi YouTube!',
  'Can we get some hype in the chat?',
  'GG',
  'I\'ve been waiting all day for this.',
  'Epic moment right here.',
  'Kappa',
  'The quality is insane.',
  'Is it over?',
  'Nice move!',
  'Wow, just wow.',
  'My heart is pounding.'
];

export const generateChatMessage = () => ({
  id: Math.random().toString(36).substr(2, 9),
  user: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
  message: CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isDonation: Math.random() > 0.9, 
  amount: Math.random() > 0.9 ? Math.floor(Math.random() * 50) + 5 : 0
});
