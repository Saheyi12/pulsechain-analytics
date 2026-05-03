import { prisma } from '../src/lib/prisma';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://pulsechain-analytics.vercel.app';

interface SitemapURL {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

async function main() {
  console.log('🗺️  Generating sitemap...\n');

  const urls: SitemapURL[] = [];

  // Static pages
  const staticPages = [
    { url: BASE_URL, changefreq: 'hourly', priority: 1.0 },
    { url: `${BASE_URL}/dashboard`, changefreq: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/predictions`, changefreq: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/affiliate`, changefreq: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changefreq: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/api`, changefreq: 'monthly', priority: 0.6 },
  ];

  for (const page of staticPages) {
    urls.push({
      url: page.url,
      lastmod: new Date().toISOString(),
      changefreq: page.changefreq,
      priority: page.priority,
    });
    console.log(`  ✓ ${page.url}`);
  }

  // Blog posts
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
      take: 1000,
    });

    for (const post of posts) {
      urls.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastmod: post.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }

    console.log(`  ✓ ${posts.length} blog posts`);
  } catch (error) {
    console.warn('  ⚠️  Could not fetch blog posts:', error);
  }

  // Coin pages
  const topCoins = ['bitcoin', 'ethereum', 'solana', 'cardano', 'avalanche-2', 'polkadot', 'dogecoin', 'chainlink'];
  for (const coin of topCoins) {
    urls.push({
      url: `${BASE_URL}/coin/${coin}`,
      lastmod: new Date().toISOString(),
      changefreq: 'hourly',
      priority: 0.8,
    });
  }

  // Generate XML
  const xml = generateSitemapXML(urls);

  // Write to file
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);

  console.log(`\n✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`📁 Saved to: ${outputPath}`);
}

function generateSitemapXML(urls: SitemapURL[]): string {
  const urlElements = urls
    .map(
      (item) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlElements}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('❌ Sitemap generation failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });