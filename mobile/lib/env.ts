import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, any>;

export const env = {
  apiUrl: (extra.apiUrl as string | undefined) ?? '',
  appEnv: (extra.env as string | undefined) ?? 'dev',
  supabaseUrl: (extra.supabaseUrl as string | undefined) ?? '',
  supabaseKey: (extra.supabaseKey as string | undefined) ?? '',
};

