interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  canonical: string;
  schema: Record<string, any>;
}

export function optimizeSEOTags(page: string, data?: Record<string, any>): SEOData {
  const baseUrl = 'https://pulsechain-analytics.vercel.app';
  
  const pages: Record<string, SEOData> = {
    home: {
      title: 'PulseChain Analytics - AI-Powered Crypto Market Intelligence',
      description: 'Advanced cryptocurrency analytics platform with AI price predictions, real-time alerts, portfolio tracking, and automated market insights.',
      keywords: ['crypto', 'bitcoin', 'ethereum', 'price prediction', 'AI', 'crypto analytics', 'portfolio tracker', 'crypto alerts'],
      ogTitle: 'PulseChain Analytics - AI Crypto Intelligence',
      ogDescription: 'Real-time prices, AI predictions, smart alerts, and automated insights.',
      ogImage: `${baseUrl}/og-image.png`,
      twitterCard: 'summary_large_image',
      canonical: baseUrl,
      schema: {
        '@type': 'WebApplication',
        name: 'PulseChain Analytics',
      },
    },
    dashboard: {
      title: 'Dashboard - PulseChain Analytics',
      description: 'Real-time cryptocurrency market dashboard with live prices, portfolio tracking, and AI predictions.',
      keywords: ['crypto dashboard', 'market data', 'portfolio', 'trading'],
      ogTitle: 'Crypto Dashboard | PulseChain Analytics',
      ogDescription: 'Track your portfolio and monitor markets in real-time.',
      ogImage: `${baseUrl}/og-image.png`,
      twitterCard: 'summary_large_image',
      canonical: `${baseUrl}/dashboard`,
      schema: {},
    },
    predictions: {
      title: 'AI Price Predictions - PulseChain Analytics',
      description: 'AI-powered cryptocurrency price predictions with confidence scores and technical analysis.',
      keywords: ['crypto predictions', 'AI forecast', 'price prediction', 'machine learning'],
      ogTitle: 'AI Crypto Predictions | PulseChain Analytics',
      ogDescription: '7-day price forecasts powered by machine learning.',
      ogImage: `${baseUrl}/og-image.png`,
      twitterCard: 'summary_large_image',
      canonical: `${baseUrl}/predictions`,
      schema: {},
    },
    blog: {
      title: 'Crypto Blog - PulseChain Analytics',
      description: 'Daily cryptocurrency market analysis, price predictions, and trading strategies.',
      keywords: ['crypto blog', 'market analysis', 'trading tips', 'crypto news'],
      ogTitle: 'Crypto Blog | PulseChain Analytics',
      ogDescription: 'AI-generated market insights and trading strategies.',
      ogImage: `${baseUrl}/og-image.png`,
      twitterCard: 'summary_large_image',
      canonical: `${baseUrl}/blog`,
      schema: {},
    },
    affiliate: {
      title: 'Affiliate Program - Earn Crypto - PulseChain Analytics',
      description: 'Join our affiliate program and earn commissions by referring users to PulseChain Analytics.',
      keywords: ['crypto affiliate', 'earn crypto', 'referral program', 'commission'],
      ogTitle: 'Crypto Affiliate Program | PulseChain Analytics',
      ogDescription: 'Earn up to 40% commission by referring users.',
      ogImage: `${baseUrl}/og-image.png`,
      twitterCard: 'summary_large_image',
      canonical: `${baseUrl}/affiliate`,
      schema: {},
    },
  };

  const pageData = pages[page] || pages.home;

  if (data) {
    return {
      ...pageData,
      title: data.title || pageData.title,
      description: data.description || pageData.description,
    };
  }

  return pageData;
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  category: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'PulseChain Analytics',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PulseChain Analytics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pulsechain-analytics.vercel.app/logo.svg',
      },
    },
    about: { '@type': 'Thing', name: article.category },
    keywords: article.tags.join(', '),
  };
}

export function generateSitemap(posts: { slug: string; updatedAt: string }[]) {
  const baseUrl = 'https://pulsechain-analytics.vercel.app';
  
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFreq: 'hourly' },
    { url: `${baseUrl}/dashboard`, priority: 0.9, changeFreq: 'hourly' },
    { url: `${baseUrl}/predictions`, priority: 0.9, changeFreq: 'hourly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFreq: 'daily' },
    { url: `${baseUrl}/affiliate`, priority: 0.7, changeFreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.5, changeFreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.5, changeFreq: 'monthly' },
  ];

  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.7,
    changeFreq: 'weekly',
    lastmod: post.updatedAt,
  }));

  return [...staticPages, ...blogPages];
}