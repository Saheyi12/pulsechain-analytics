'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:bg-[#1DA1F2]/20',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-[#0A66C2]/20',
    },
    {
      name: 'Reddit',
      icon: '🤖',
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:bg-[#FF4500]/20',
    },
    {
      name: 'Telegram',
      icon: '📱',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-[#0088cc]/20',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-3">Share This Article</h3>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-lg transition ${link.color}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyLink}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition text-lg ${
            copied ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
          title="Copy link"
        >
          {copied ? '✓' : '🔗'}
        </button>
      </div>
      {copied && (
        <p className="text-xs text-green-400 mt-2">Link copied to clipboard!</p>
      )}
    </Card>
  );
}