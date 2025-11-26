import { clsx } from 'clsx';
import type { BeltLevel } from '@/types';

interface BeltBadgeProps {
  belt: BeltLevel;
  stripe?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const beltStyles: Record<BeltLevel, { bg: string; text: string; emoji: string }> = {
  white: {
    bg: 'bg-gradient-to-r from-gray-100 to-gray-200',
    text: 'text-gray-900',
    emoji: '⚪',
  },
  blue: {
    bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
    text: 'text-white',
    emoji: '🔵',
  },
  purple: {
    bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
    text: 'text-white',
    emoji: '🟣',
  },
  brown: {
    bg: 'bg-gradient-to-r from-amber-700 to-amber-800',
    text: 'text-white',
    emoji: '🟤',
  },
  black: {
    bg: 'bg-gradient-to-r from-gray-900 to-black',
    text: 'text-white',
    emoji: '⚫',
  },
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs gap-1',
  md: 'px-3 py-1.5 text-sm gap-1.5',
  lg: 'px-4 py-2 text-base gap-2',
};

export function BeltBadge({ belt, stripe = 0, size = 'md', showLabel = true }: BeltBadgeProps) {
  const styles = beltStyles[belt];

  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-full font-semibold',
        styles.bg,
        styles.text,
        sizeStyles[size]
      )}
    >
      <span>{styles.emoji}</span>
      {showLabel && (
        <span className="capitalize">{belt} Belt</span>
      )}
      {stripe > 0 && (
        <span className="ml-1 opacity-80">
          {'|'.repeat(stripe)}
        </span>
      )}
    </div>
  );
}

