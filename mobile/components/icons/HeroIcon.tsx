import React from 'react';
import { Text } from 'react-native';

type IconName = 'home' | 'clipboard' | 'sparkles' | 'chart-bar' | 'user' | 'check';

type Props = {
  name: IconName;
  color?: string;
  size?: number;
};

const icons: Record<IconName, string[]> = {
  home: [
    'M2.25 12 11.7 3.787a.75.75 0 0 1 .9 0L22.05 12',
    'M4.5 9.75v10.5A1.5 1.5 0 0 0 6 21.75h3.75v-6.75h4.5v6.75H18A1.5 1.5 0 0 0 19.5 20.25V9.75',
  ],
  clipboard: [
    'M9.75 4.5h4.5V6A1.5 1.5 0 0 1 12.75 7.5h-1.5A1.5 1.5 0 0 1 9.75 6V4.5Z',
    'M9.75 4.5H8.25A2.25 2.25 0 0 0 6 6.75v10.5A2.25 2.25 0 0 0 8.25 19.5h7.5A2.25 2.25 0 0 0 18 17.25V6.75A2.25 2.25 0 0 0 15.75 4.5h-1.5',
    'M9 12.75 11.25 15 15 11.25',
  ],
  sparkles: [
    'M12 3v2.25m0 13.5V21m7.5-7.5H21M3 12h2.25m12.62-6.87-1.59 1.59m-9.06 9.06-1.59 1.59m12.24 0-1.59-1.59m-9.06-9.06-1.59-1.59',
    'M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
  ],
  'chart-bar': [
    'M3 4.5h18',
    'M6.75 9.75v7.5a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75Z',
    'M12.75 6.75v10.5a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V6.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75Z',
    'M18.75 12.75v4.5a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75Z',
  ],
  user: [
    'M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Z',
    'M4.5 20.25a7.5 7.5 0 0 1 15 0',
  ],
  check: [
    'M4.5 12.75 9 17.25l10.5-10.5',
  ],
};

/**
 * Minimal Heroicons-outline renderer.
 * Falls back to a dot if react-native-svg is not available (before deps are installed).
 */
export function HeroIcon({ name, color = '#1f2937', size = 24 }: Props) {
  let Svg: any;
  let Path: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const svg = require('react-native-svg');
    Svg = svg.Svg ?? svg.default?.Svg ?? svg.default;
    Path = svg.Path;
  } catch (err) {
    Svg = null;
  }

  const paths = icons[name];

  if (Svg && Path && paths) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {paths.map((d, idx) => (
          <Path
            key={idx}
            d={d}
            stroke={color}
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    );
  }

  return (
    <Text style={{ color, fontSize: size * 0.9 }} accessibilityElementsHidden>
      •
    </Text>
  );
}

