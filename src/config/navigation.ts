export interface NavItem {
  href: string;
  label: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
  badge?: string;
}

export const mainNavigation: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/predictions', label: 'AI Predictions', icon: '🤖' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/affiliate', label: 'Affiliate', icon: '💰' },
];

export const dashboardNavigation: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: '💼' },
  { href: '/dashboard/predictions', label: 'AI Predictions', icon: '🤖' },
  { href: '/dashboard/alerts', label: 'Alerts', icon: '🔔' },
  { href: '/dashboard/watchlist', label: 'Watchlist', icon: '⭐' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export const footerNavigation = {
  Platform: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/predictions', label: 'AI Predictions' },
    { href: '/portfolio', label: 'Portfolio Tracker' },
    { href: '/alerts', label: 'Price Alerts' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/api', label: 'API Documentation' },
    { href: '/docs/FEATURES.md', label: 'Features' },
    { href: '/docs/SECURITY.md', label: 'Security' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/affiliate', label: 'Affiliate Program' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
};

export const mobileNavigation: NavItem[] = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/predictions', label: 'AI', icon: '🤖' },
  { href: '/blog', label: 'Blog', icon: '📝' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export const socialLinks = [
  { href: 'https://twitter.com/pulsechain', label: 'Twitter', icon: '🐦' },
  { href: 'https://discord.gg/pulsechain', label: 'Discord', icon: '💬' },
  { href: 'https://t.me/pulsechain', label: 'Telegram', icon: '📱' },
  { href: 'https://github.com/pulsechain', label: 'GitHub', icon: '💻' },
];