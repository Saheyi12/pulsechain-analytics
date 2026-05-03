import { create } from 'zustand';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
}

interface MarketState {
  coins: Coin[];
  globalData: any;
  trending: any[];
  loading: boolean;
  error: string | null;
  setCoins: (coins: Coin[]) => void;
  setGlobalData: (data: any) => void;
  setTrending: (trending: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  coins: [],
  globalData: null,
  trending: [],
  loading: false,
  error: null,
  setCoins: (coins) => set({ coins }),
  setGlobalData: (globalData) => set({ globalData }),
  setTrending: (trending) => set({ trending }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));