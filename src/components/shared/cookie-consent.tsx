'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem('cookie-consent');
    if (!consented) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-96 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">🍪</span>
          <div>
            <h3 className="text-sm font-semibold mb-1">Cookie Consent</h3>
            <p className="text-xs text-gray-400">
              We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="default" onClick={accept} className="flex-1">
            Accept
          </Button>
          <Button size="sm" variant="outline" onClick={decline} className="flex-1">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}