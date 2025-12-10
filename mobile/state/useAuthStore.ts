import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStore } from '../lib/secureStore';

type AuthState = {
  token: string | null;
  user?: { name: string; email: string };
  setToken: (token: string | null) => void;
  setUser: (user?: { name: string; email: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: undefined,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: undefined }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => secureStore),
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

