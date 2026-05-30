import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GuestState {
  guestName: string;
  setGuestName: (name: string) => void;
}

export const useGuestStore = create<GuestState>()(
  persist(
    (set) => ({
      guestName: '',
      setGuestName: (name) => set({ guestName: name }),
    }),
    {
      name: 'marhaba-guest',
    }
  )
);
