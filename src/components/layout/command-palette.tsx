'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CommandItem {
  label: string;
  description?: string;
  href: string;
  icon?: string;
}

const commands: CommandItem[] = [
  { label: 'Dashboard', description: 'Market overview', href: '/dashboard', icon: '📊' },
  { label: 'Portfolio', description: 'Your holdings', href: '/dashboard/portfolio', icon: '💼' },
  { label: 'Predictions', description: 'AI price forecasts', href: '/dashboard/predictions', icon: '🤖' },
  { label: 'Alerts', description: 'Price alerts', href: '/dashboard/alerts', icon: '🔔' },
  { label: 'Watchlist', description: 'Tracked coins', href: '/dashboard/watchlist', icon: '⭐' },
  { label: 'Settings', description: 'Platform settings', href: '/dashboard/settings', icon: '⚙️' },
  { label: 'Blog', description: 'Market analysis', href: '/blog', icon: '📝' },
  { label: 'Affiliate', description: 'Earn commissions', href: '/affiliate', icon: '💰' },
  { label: 'API Docs', description: 'Developer API', href: '/api', icon: '🔌' },
  { label: 'Home', description: 'Landing page', href: '/', icon: '🏠' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex].href);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
            autoFocus
          />
          <kbd className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No results found</p>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.href}
                onClick={() => handleSelect(cmd.href)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition',
                  index === selectedIndex
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                )}
              >
                <span className="text-lg">{cmd.icon}</span>
                <div>
                  <div className="font-medium text-sm">{cmd.label}</div>
                  {cmd.description && (
                    <div className="text-xs opacity-70">{cmd.description}</div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-gray-800 text-xs text-gray-500 flex items-center justify-between">
          <span>Press ⌘K to toggle</span>
          <span>↑↓ Navigate · ↵ Select</span>
        </div>
      </div>
    </div>
  );
}