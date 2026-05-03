'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    aiPredictions: true,
    blogAutomation: true,
    affiliateProgram: true,
    walletSync: false,
    whaleTracking: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6 max-w-2xl">
        {/* Feature Toggles */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Feature Toggles</h2>
          <div className="space-y-4">
            {[
              { key: 'aiPredictions' as const, label: 'AI Price Predictions', desc: 'Enable AI-powered price forecasts' },
              { key: 'blogAutomation' as const, label: 'Blog Automation', desc: 'Auto-generate daily blog posts' },
              { key: 'affiliateProgram' as const, label: 'Affiliate Program', desc: 'Enable referral and commission system' },
              { key: 'walletSync' as const, label: 'Wallet Sync', desc: 'Sync portfolio from wallet addresses' },
              { key: 'whaleTracking' as const, label: 'Whale Tracking', desc: 'Track large wallet movements' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </div>
                <button
                  onClick={() => toggle(key)}
                  className={`w-12 h-6 rounded-full transition ${
                    settings[key] ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition mx-0.5 ${
                    settings[key] ? 'ml-6' : 'ml-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { key: 'emailNotifications' as const, label: 'Email Alerts', desc: 'Receive price alerts via email' },
              { key: 'pushNotifications' as const, label: 'Push Notifications', desc: 'Browser push notifications' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </div>
                <button
                  onClick={() => toggle(key)}
                  className={`w-12 h-6 rounded-full transition ${
                    settings[key] ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition mx-0.5 ${
                    settings[key] ? 'ml-6' : 'ml-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-400">Email</div>
              <div>demo@pulsechain.com</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Plan</div>
              <div className="text-green-400">Free</div>
            </div>
            <button className="text-red-400 hover:text-red-300 text-sm transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}