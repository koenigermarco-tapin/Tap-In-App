import 'dotenv/config';
import { ConfigContext, ExpoConfig } from '@expo/config';

const APP_NAME = process.env.APP_NAME ?? 'tapin-mobile';
const SLUG = process.env.APP_SLUG ?? 'tapin-mobile';
const BUNDLE_ID = process.env.BUNDLE_ID ?? 'com.tap.in.mobile';
const PACKAGE = process.env.PACKAGE ?? 'com.tap.in.mobile';
const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.SUPABASE_KEY ?? '';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  scheme: 'tapin',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1a365d'
  },
  ios: {
    bundleIdentifier: BUNDLE_ID,
    supportsTablet: true
  },
  android: {
    package: PACKAGE,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#1a365d'
    }
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? ''
    },
    apiUrl: process.env.API_URL ?? '',
    env: process.env.APP_ENV ?? 'dev',
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY
  }
});

