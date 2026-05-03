import { create } from 'zustand';

interface Alert {
  id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  targetPrice: number;
  condition: string;
  notificationType: string;
  isActive: boolean;
}

interface AlertState {
  alerts: Alert[];
  loading: boolean;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  loading: false,
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) =>
    set((state) => ({ alerts: [alert, ...state.alerts] })),
  removeAlert: (id) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
  toggleAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, isActive: !a.isActive } : a
      ),
    })),
  setLoading: (loading) => set({ loading }),
}));