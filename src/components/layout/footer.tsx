import Link from 'next/link';

const footerLinks = {
  Platform: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/predictions', label: 'AI Predictions' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/alerts', label: 'Price Alerts' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/api', label: 'API Docs' },
    { href: '/docs/FEATURES.md', label: 'Features' },
    { href: '/docs/SECURITY.md', label: 'Security' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/affiliate', label: 'Affiliate Program' },
  ],
  Legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                PulseChain
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered crypto market intelligence platform.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white transition">💬</a>
              <a href="#" className="text-gray-400 hover:text-white transition">📧</a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-3 text-gray-300">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PulseChain Analytics. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              SSL Secured
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              GDPR Compliant
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Disclaimer: This is not financial advice. Crypto trading involves risk.
          </p>
        </div>
      </div>
    </footer>
  );
}