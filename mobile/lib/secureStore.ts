// Wrapper to allow zustand persist storage using expo-secure-store when available.
import type { StateStorage } from 'zustand/middleware';

let SecureStore: typeof import('expo-secure-store') | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SecureStore = require('expo-secure-store');
} catch (err) {
  SecureStore = null;
}

const memoryStore: Record<string, string> = {};

export const secureStore: StateStorage = {
  getItem: async (name) => {
    if (SecureStore?.getItemAsync) return (await SecureStore.getItemAsync(name)) ?? null;
    return memoryStore[name] ?? null;
  },
  setItem: async (name, value) => {
    if (SecureStore?.setItemAsync) return SecureStore.setItemAsync(name, value);
    memoryStore[name] = value;
  },
  removeItem: async (name) => {
    if (SecureStore?.deleteItemAsync) return SecureStore.deleteItemAsync(name);
    delete memoryStore[name];
  },
};

