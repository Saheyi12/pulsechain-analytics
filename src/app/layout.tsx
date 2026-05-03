import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'PulseChain Analytics - AI Crypto Intelligence',
    template: '%s | PulseChain',
  },
  description: 'AI-powered cryptocurrency analytics with price predictions, portfolio tracking, and automated market insights.',
  keywords: ['crypto', 'bitcoin', 'price prediction', 'AI', 'analytics'],
  openGraph: {
    title: 'PulseChain Analytics',
    description: 'AI-Powered Crypto Intelligence',
    url: 'https://pulsechain-analytics.vercel.app',
    siteName: 'PulseChain Analytics',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PulseChain Analytics',
    description: 'AI-Powered Crypto Intelligence',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-gray-950 text-white antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                PulseChain
              </a>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="text-gray-300 hover:text-white transition">Home</a>
                <a href="/predictions" className="text-gray-300 hover:text-white transition">Predictions</a>
                <a href="/blog" className="text-gray-300 hover:text-white transition">Blog</a>
                <a href="/affiliate" className="text-gray-300 hover:text-white transition">Affiliate</a>
              </nav>
              <div className="flex gap-3">
                <a href="/login" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium">
                  Login
                </a>
                <a href="/signup" className="px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition text-sm font-medium">
                  Sign Up
                </a>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-800 py-8">
            <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
              <p>&copy; 2024 PulseChain Analytics. All rights reserved.</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href="/about" className="hover:text-white transition">About</a>
                <a href="/contact" className="hover:text-white transition">Contact</a>
                <a href="/blog" className="hover:text-white transition">Blog</a>
                <a href="/affiliate" className="hover:text-white transition">Affiliate</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}