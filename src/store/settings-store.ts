import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Settings {
  theme: 'dark' | 'light';
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  features: Record<string, boolean>;
}

interface SettingsState {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  toggleFeature: (feature: string) => void;
  toggleNotification: (type: 'email' | 'push' | 'sms') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setCurrency: (currency: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        theme: 'dark',
        currency: 'USD',
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        features: {
          aiPredictions: true,
          blogAutomation: true,
          affiliateProgram: true,
          walletSync: false,
          whaleTracking: false,
        },
      },
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      toggleFeature: (feature) =>
        set((state) => ({
          settings: {
            ...state.settings,
            features: {
              ...state.settings.features,
              [feature]: !state.settings.features[feature],
            },
          },
        })),
      toggleNotification: (type) =>
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: {
              ...state.settings.notifications,
              [type]: !state.settings.notifications[type],
            },
          },
        })),
      setTheme: (theme) =>
        set((state) => ({
          settings: { ...state.settings, theme },
        })),
      setCurrency: (currency) =>
        set((state) => ({
          settings: { ...state.settings, currency },
        })),
    }),
    { name: 'pulsechain-settings' }
  )
);