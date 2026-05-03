'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ReferralLink() {
  const [referralLink] = useState('https://pulsechain-analytics.vercel.app/?ref=DEMO2024');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      const input = document.createElement('input');
      input.value = referralLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareText = encodeURIComponent(
    '🚀 Track crypto prices, get AI predictions, and earn rewards with PulseChain Analytics! Sign up with my link:'
  );

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>

      {/* Link Display */}
      <div className="flex gap-2 mb-4">
        <Input
          value={referralLink}
          readOnly
          className="flex-1 font-mono text-sm"
        />
        <Button onClick={copyToClipboard} variant={copied ? 'success' : 'default'}>
          {copied ? '✓ Copied!' : 'Copy'}
        </Button>
      </div>

      {/* Share Buttons */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400">Share your link:</p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 rounded-lg text-sm hover:bg-[#1DA1F2]/20 transition"
          >
            <span>🐦</span> Twitter
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2 bg-[#0088cc]/10 border border-[#0088cc]/30 rounded-lg text-sm hover:bg-[#0088cc]/20 transition"
          >
            <span>📱</span> Telegram
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(referralLink)}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2 bg-[#FF4500]/10 border border-[#FF4500]/30 rounded-lg text-sm hover:bg-[#FF4500]/20 transition"
          >
            <span>🤖</span> Reddit
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2 bg-[#4267B2]/10 border border-[#4267B2]/30 rounded-lg text-sm hover:bg-[#4267B2]/20 transition"
          >
            <span>👤</span> Facebook
          </a>
        </div>
      </div>

      {/* Embed Options */}
      <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Banner Code</h3>
        <p className="text-xs text-gray-400 mb-2">Add this banner to your website:</p>
        <textarea
          readOnly
          className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs font-mono text-gray-300 resize-none"
          value={`<a href="${referralLink}" target="_blank">\n  <img src="https://pulsechain-analytics.vercel.app/og-image.png" alt="PulseChain Analytics" />\n</a>`}
        />
        <Button size="sm" variant="outline" className="mt-2" onClick={() => {
          const textarea = document.querySelector('textarea');
          if (textarea) {
            textarea.select();
            document.execCommand('copy');
          }
        }}>
          Copy Code
        </Button>
      </div>
    </Card>
  );
}