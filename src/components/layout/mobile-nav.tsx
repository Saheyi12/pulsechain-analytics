'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/predictions', label: 'AI', icon: '🤖' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-lg transition min-w-[60px]',
                pathname === item.href
                  ? 'text-blue-400'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-gray-500 hover:text-gray-300 transition min-w-[60px]"
          >
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-medium">Account</span>
          </button>
        </div>
      </div>

      {/* Account Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 rounded-t-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                DU
              </div>
              <div>
                <p className="font-medium">Demo User</p>
                <p className="text-sm text-gray-400">demo@pulsechain.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/login" className="block py-2 text-gray-400 hover:text-white">Sign In</Link>
              <Link href="/signup" className="block py-2 text-gray-400 hover:text-white">Create Account</Link>
              <Link href="/settings" className="block py-2 text-gray-400 hover:text-white">Settings</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}