import { create } from 'zustand';

interface Holding {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

interface PortfolioState {
  holdings: Holding[];
  totalValue: number;
  totalPnl: number;
  loading: boolean;
  setHoldings: (holdings: Holding[]) => void;
  addHolding: (holding: Holding) => void;
  removeHolding: (id: string) => void;
  setTotalValue: (value: number) => void;
  setTotalPnl: (pnl: number) => void;
  setLoading: (loading: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  holdings: [],
  totalValue: 0,
  totalPnl: 0,
  loading: false,
  setHoldings: (holdings) => set({ holdings }),
  addHolding: (holding) =>
    set((state) => ({ holdings: [...state.holdings, holding] })),
  removeHolding: (id) =>
    set((state) => ({ holdings: state.holdings.filter((h) => h.id !== id) })),
  setTotalValue: (totalValue) => set({ totalValue }),
  setTotalPnl: (totalPnl) => set({ totalPnl }),
  setLoading: (loading) => set({ loading }),
}));