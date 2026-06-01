import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RSVPEntry {
  id: string;
  name: string;
  attending: boolean;
  guestCount: number;
  notes: string;
  submittedAt: string;
}

interface AdminState {
  isAdminOpen: boolean;
  isAuthenticated: boolean;
  rsvpEntries: RSVPEntry[];
  weddingDate: string; // ISO string
  addRSVP: (entry: Omit<RSVPEntry, 'id' | 'submittedAt'>) => void;
  setAdminOpen: (open: boolean) => void;
  setAuthenticated: (auth: boolean) => void;
  setWeddingDate: (date: string) => void;
}

const ADMIN_PASSWORD = 'admin1234';

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminOpen: false,
      isAuthenticated: false,
      rsvpEntries: [],
      weddingDate: '2026-06-29T18:00:00+03:00',
      addRSVP: (entry) =>
        set((state) => ({
          rsvpEntries: [
            ...state.rsvpEntries,
            {
              ...entry,
              id: crypto.randomUUID(),
              submittedAt: new Date().toISOString(),
            },
          ],
        })),
      setAdminOpen: (open) => set({ isAdminOpen: open }),
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setWeddingDate: (date) => set({ weddingDate: date }),
    }),
    { name: 'marhaba-admin' }
  )
);

export { ADMIN_PASSWORD };
