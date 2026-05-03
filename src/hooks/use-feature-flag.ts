'use client';

import { useState, useEffect } from 'react';
import { FeatureFlags, type FeatureFlag, isFeatureEnabled } from '@/lib/feature-flags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isFeatureEnabled(flag));
  }, [flag]);

  return enabled;
}

export function useAllFeatures(): Record<FeatureFlag, boolean> {
  const [features, setFeatures] = useState<Record<FeatureFlag, boolean>>({} as any);

  useEffect(() => {
    const flags = {} as Record<FeatureFlag, boolean>;
    for (const key of Object.keys(FeatureFlags) as FeatureFlag[]) {
      flags[key] = isFeatureEnabled(key);
    }
    setFeatures(flags);
  }, []);

  return features;
}

export function useToggleFeature(flag: FeatureFlag): [boolean, (value: boolean) => void] {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isFeatureEnabled(flag));
  }, [flag]);

  const toggle = (value: boolean) => {
    setEnabled(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`feature:${flag}`, String(value));
    }
  };

  return [enabled, toggle];
}