'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

// ============================================================
// EDIT ME: this is the one number that decides which items you
// approve yourself (soft check) vs. route to your financing
// partner (Katapult/Acima-style). Items at or under this dollar
// amount are self-approved; above it, they go to the partner.
// ============================================================
export const SELF_APPROVAL_THRESHOLD = 500;

export type Tier = 'self' | 'partner';

export function tierForCost(cost: number): Tier {
  return cost <= SELF_APPROVAL_THRESHOLD ? 'self' : 'partner';
}

export type RtoItem = {
  name: string;
  price: string;
  tier: Tier;
};

type AppContextValue = {
  // Rent-to-own application modal
  rtoItem: RtoItem | null;
  isRtoOpen: boolean;
  openRto: (item: RtoItem) => void;
  closeRto: () => void;

  // Month-to-month catalog -> contact form prefill
  requestedItem: string | null;
  requestItem: (name: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [rtoItem, setRtoItem] = useState<RtoItem | null>(null);
  const [isRtoOpen, setIsRtoOpen] = useState(false);
  const [requestedItem, setRequestedItem] = useState<string | null>(null);

  const openRto = useCallback((item: RtoItem) => {
    setRtoItem(item);
    setIsRtoOpen(true);
  }, []);

  const closeRto = useCallback(() => {
    setIsRtoOpen(false);
  }, []);

  const requestItem = useCallback((name: string) => {
    setRequestedItem(name);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <AppContext.Provider
      value={{ rtoItem, isRtoOpen, openRto, closeRto, requestedItem, requestItem }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}
