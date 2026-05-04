// ============================================================
//  MODEL: services.model.js
//  Defines all event service categories and their details.
// ============================================================

export const SERVICES = [
  {
    id: 'wedding',
    title: 'Wedding Planning',
    description:
      'End-to-end wedding management — from venue scouting and décor to catering and day-of coordination. We turn your dream into a flawless reality.',
    icon: '💍',
    color: '#7C3AED',
    features: [
      'Venue selection & booking',
      'Theme & décor design',
      'Catering management',
      'Photography & videography',
      'Vendor coordination',
      'Day-of event management',
    ],
    startingFrom: '₹4 Lakhs',
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Shoot',
    description:
      'Cinematic pre-wedding storytelling at stunning locations — from local heritage sites to breathtaking destinations.',
    icon: '📸',
    color: '#9333EA',
    features: [
      'Location scouting',
      'Professional cinematographers',
      'Drone / aerial footage',
      'Costume & styling support',
      'Same-day preview',
      'Cinematic highlight film',
    ],
    startingFrom: '₹50,000',
  },
  {
    id: 'engagement',
    title: 'Engagement Ceremony',
    description:
      'Intimate and elegant engagement celebrations, beautifully styled and perfectly executed for your most cherished milestone.',
    icon: '💑',
    color: '#D4AF37',
    features: [
      'Intimate venue decoration',
      'Ring ceremony setup',
      'Photography & candid shots',
      'Floral arrangements',
      'Custom invitation design',
      'Catering & cake',
    ],
    startingFrom: '₹1.5 Lakhs',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    description:
      'Professional corporate event management — conferences, product launches, team outings, and gala nights executed with precision.',
    icon: '🏢',
    color: '#06B6D4',
    features: [
      'Conference & seminar setup',
      'AV & technical support',
      'Brand-aligned décor',
      'Corporate catering',
      'Team-building activities',
      'Post-event documentation',
    ],
    startingFrom: '₹2 Lakhs',
  },
  {
    id: 'birthday',
    title: 'Birthday Parties',
    description:
      "From kids' magical parties to milestone adult celebrations — creative themes, fun setups, and unforgettable memories.",
    icon: '🎂',
    color: '#EC4899',
    features: [
      'Theme-based decoration',
      'Custom cake arrangement',
      'Entertainment & games',
      'Photography',
      'Catering & snacks',
      'Return gift coordination',
    ],
    startingFrom: '₹30,000',
  },
  {
    id: 'anniversary',
    title: 'Anniversary Events',
    description:
      'Celebrate your love story with bespoke anniversary events — intimate dinners, surprise setups, or grand family gatherings.',
    icon: '🥂',
    color: '#F59E0B',
    features: [
      'Romantic décor setup',
      'Floral & candle arrangements',
      'Photography & video',
      'Curated music playlist',
      'Catering & cake',
      'Surprise planning',
    ],
    startingFrom: '₹25,000',
  },
]

export const PRE_WEDDING_LEVELS = [
  {
    id: 'basic',
    name: 'Basic Shoot',
    price: 50000,
    features: ['Local location', 'No drone', '1 day shoot', 'Standard edit', 'Online gallery'],
  },
  {
    id: 'medium',
    name: 'Premium Shoot',
    price: 120000,
    features: ['Premium location', 'Drone included', '2 day shoot', 'Cinematic edit', 'Physical album'],
  },
  {
    id: 'high',
    name: 'Destination Shoot',
    price: 300000,
    features: ['Destination of choice', 'Full aerial coverage', '3 day shoot', 'Cinematic production', 'Premium album + film'],
  },
]
