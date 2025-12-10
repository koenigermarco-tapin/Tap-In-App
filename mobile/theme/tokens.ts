export const color = {
  primary: '#1a365d',
  primaryAlt: '#2d4a7c',
  purple: '#7c3aed',
  gold: '#f59e0b',
  goldSoft: '#f6e05e',
  red: '#ef4444',
  redDeep: '#b91c1c',
  green: '#10b981',
  text: '#1f2937',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textOnDark: '#ffffff',
  bg: '#f8fafc',
  bgCard: '#1e293b',
  bgDark: '#0a0a0a',
  bgCardDark: '#141414',
  bgCardHoverDark: '#1a1a1a',
  border: '#334155',
  borderDark: '#2d2d2d',
};

export const space = [0, 4, 8, 16, 24, 32, 40, 48] as const;
export const radius = { sm: 4, md: 8, lg: 12, xl: 16 } as const;
export const font = { family: 'Inter', size: 16, lineHeight: 1.6 } as const;
export const weight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const shadow = {
  sm: {
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
  },
};

