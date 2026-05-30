import { create } from 'zustand';
import type { Locale, AppPhase } from '@/types';

interface AppState {
  locale: Locale;
  direction: 'rtl' | 'ltr';
  appPhase: AppPhase;
  setLocale: (locale: Locale) => void;
  setAppPhase: (phase: AppPhase) => void;
  toggleLocale: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'ar',
  direction: 'rtl',
  appPhase: 'envelope',
  setLocale: (locale) =>
    set({
      locale,
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    }),
  setAppPhase: (phase) => set({ appPhase: phase }),
  toggleLocale: () =>
    set((state) => ({
      locale: state.locale === 'ar' ? 'en' : 'ar',
      direction: state.locale === 'ar' ? 'ltr' : 'rtl',
    })),
}));
