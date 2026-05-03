'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubscribed(true);
    setLoading(false);
  };

  if (subscribed) {
    return (
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
        <div className="text-2xl mb-2">✅</div>
        <p className="text-sm font-medium text-green-400">Subscribed!</p>
        <p className="text-xs text-gray-400 mt-1">Check your inbox for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-sm font-semibold">Stay Updated</h3>
      <p className="text-xs text-gray-400">
        Get daily crypto market insights delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          error={error}
        />
        <Button type="submit" loading={loading} size="default">
          Subscribe
        </Button>
      </div>
    </form>
  );
}