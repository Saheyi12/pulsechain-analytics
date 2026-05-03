import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Clean existing data (optional - comment out to preserve)
  console.log('🧹 Cleaning existing data...');
  await prisma.payout.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.affiliate.deleteMany();
  await prisma.watchlistCoin.deleteMany();
  await prisma.priceAlert.deleteMany();
  await prisma.portfolioHolding.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.session.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Data cleaned\n');

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@pulsechain.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log(`  ✅ Admin: admin@pulsechain.com / admin123\n`);

  // Create demo user
  console.log('👤 Creating demo user...');
  const demoPassword = await bcrypt.hash('demo123', 10);
  const demo = await prisma.user.create({
    data: {
      email: 'demo@pulsechain.com',
      password: demoPassword,
      name: 'Demo User',
      role: 'USER',
    },
  });
  console.log(`  ✅ Demo: demo@pulsechain.com / demo123\n`);

  // Create affiliate for demo
  console.log('💰 Creating affiliate profile...');
  const affiliate = await prisma.affiliate.create({
    data: {
      userId: demo.id,
      referralCode: 'DEMO2024',
      tier: 'SILVER',
      totalEarnings: 250.50,
      referrals: {
        create: [
          { referredEmail: 'trader1@email.com', status: 'ACTIVE', commission: 12.50 },
          { referredEmail: 'trader2@email.com', status: 'ACTIVE', commission: 8.75 },
          { referredEmail: 'crypto3@email.com', status: 'PENDING', commission: 0 },
          { referredEmail: 'investor4@email.com', status: 'ACTIVE', commission: 25.00 },
          { referredEmail: 'user5@email.com', status: 'CHURNED', commission: 5.00 },
        ],
      },
      payouts: {
        create: [
          { amount: 150.00, status: 'COMPLETED', method: 'USDC', address: '0x1234...5678', paidAt: new Date('2024-03-01') },
          { amount: 54.75, status: 'COMPLETED', method: 'BTC', address: 'bc1q...xyz', paidAt: new Date('2024-02-15') },
          { amount: 45.75, status: 'PENDING', method: 'USDC', address: '0x1234...5678' },
        ],
      },
    },
  });
  console.log('  ✅ Affiliate created with 5 referrals\n');

  // Create portfolio
  console.log('💼 Creating portfolio...');
  const portfolio = await prisma.portfolio.create({
    data: {
      userId: demo.id,
      name: 'My Crypto Portfolio',
      totalValue: 59000,
      pnl: 25000,
      holdings: {
        create: [
          { coinId: 'bitcoin', amount: 0.5, buyPrice: 35000 },
          { coinId: 'ethereum', amount: 5, buyPrice: 2000 },
          { coinId: 'solana', amount: 50, buyPrice: 80 },
          { coinId: 'cardano', amount: 2000, buyPrice: 0.40 },
          { coinId: 'avalanche-2', amount: 25, buyPrice: 35 },
        ],
      },
    },
  });
  console.log('  ✅ Portfolio created with 5 holdings\n');

  // Create alerts
  console.log('🔔 Creating price alerts...');
  await prisma.priceAlert.createMany({
    data: [
      { userId: demo.id, coinId: 'bitcoin', targetPrice: 50000, condition: 'ABOVE', notificationType: 'EMAIL' },
      { userId: demo.id, coinId: 'ethereum', targetPrice: 2000, condition: 'BELOW', notificationType: 'EMAIL' },
      { userId: demo.id, coinId: 'solana', targetPrice: 150, condition: 'ABOVE', notificationType: 'PUSH' },
    ],
  });
  console.log('  ✅ 3 alerts created\n');

  // Create watchlist
  console.log('⭐ Creating watchlist...');
  await prisma.watchlistCoin.createMany({
    data: [
      { userId: demo.id, coinId: 'bitcoin' },
      { userId: demo.id, coinId: 'ethereum' },
      { userId: demo.id, coinId: 'solana' },
      { userId: demo.id, coinId: 'cardano' },
      { userId: demo.id, coinId: 'avalanche-2' },
      { userId: demo.id, coinId: 'polkadot' },
      { userId: demo.id, coinId: 'chainlink' },
      { userId: demo.id, coinId: 'uniswap' },
    ],
  });
  console.log('  ✅ 8 coins added to watchlist\n');

  // Create blog posts
  console.log('📝 Creating sample blog posts...');
  const blogPosts = [
    {
      title: 'Bitcoin Breaks $68,000: What Next for Crypto Markets?',
      slug: 'bitcoin-breaks-68000',
      content: getBlogContent('bitcoin'),
      excerpt: 'BTC reaches new heights as institutional demand grows and ETF inflows surge.',
      category: 'MARKET_ANALYSIS',
      tags: ['bitcoin', 'btc', 'market', 'analysis', 'institutional'],
      authorId: admin.id,
    },
    {
      title: 'DeFi Summer 2.0: Top 5 Protocols to Watch in 2024',
      slug: 'defi-summer-2024',
      content: getBlogContent('defi'),
      excerpt: 'New DeFi protocols are emerging with innovative yield strategies and tokenomics.',
      category: 'DEFI',
      tags: ['defi', 'ethereum', 'yield', 'farming', 'protocols'],
      authorId: admin.id,
    },
    {
      title: 'AI Price Prediction: Ethereum 7-Day Forecast',
      slug: 'ethereum-price-prediction-march-2024',
      content: getBlogContent('ethereum'),
      excerpt: 'Our machine learning models predict ETH price movement with 85% confidence.',
      category: 'PREDICTION',
      tags: ['ethereum', 'eth', 'prediction', 'ai', 'forecast'],
      authorId: admin.id,
    },
    {
      title: 'Solana Memecoin Mania: Bubble or New Paradigm?',
      slug: 'solana-memecoin-mania',
      content: getBlogContent('solana'),
      excerpt: 'Solana ecosystem sees explosive growth driven by memecoin trading volume.',
      category: 'ANALYSIS',
      tags: ['solana', 'memecoin', 'trading', 'defi'],
      authorId: admin.id,
    },
    {
      title: 'Complete Crypto Tax Guide 2024: Everything You Need to Know',
      slug: 'crypto-tax-guide-2024',
      content: getBlogContent('tax'),
      excerpt: 'Navigate cryptocurrency taxes with our comprehensive step-by-step guide.',
      category: 'TUTORIAL',
      tags: ['tax', 'guide', 'tutorial', 'regulation'],
      authorId: admin.id,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        isPublished: true,
        publishedAt: new Date(),
        seoTitle: `${post.title} | PulseChain Analytics`,
        seoDescription: post.excerpt,
      },
    });
    console.log(`  ✓ ${post.title}`);
  }
  console.log('  ✅ 5 blog posts created\n');

  console.log('═══════════════════════════════════════');
  console.log('🌱 Database seeded successfully!');
  console.log('═══════════════════════════════════════');
  console.log('\n📋 Login Credentials:');
  console.log('   Admin: admin@pulsechain.com / admin123');
  console.log('   Demo:  demo@pulsechain.com / demo123');
  console.log('\n📊 Seed Data:');
  console.log('   👤 2 Users');
  console.log('   💼 1 Portfolio (5 holdings)');
  console.log('   🔔 3 Price Alerts');
  console.log('   ⭐ 8 Watchlist Coins');
  console.log('   💰 Affiliate (5 referrals)');
  console.log('   💵 3 Payouts');
  console.log('   📝 5 Blog Posts');
  console.log('═══════════════════════════════════════\n');
}

function getBlogContent(topic: string): string {
  const templates: Record<string, string> = {
    bitcoin: `## Executive Summary\n\nBitcoin has surged past $68,000 driven by strong institutional demand and growing ETF inflows.\n\n## Market Overview\n\n- **BTC Price**: $68,245.50\n- **24h Change**: +2.45%\n- **Market Cap**: $1.34T\n- **Volume**: $32.5B\n\n## Key Drivers\n\n1. Record ETF inflows\n2. Halving anticipation\n3. Institutional accumulation\n\n*Disclaimer: Not financial advice.*`,
    ethereum: `## ETH Price Prediction\n\nOur AI model forecasts Ethereum price for the next 7 days.\n\n## Prediction Summary\n\n- **Current**: $3,420.80\n- **7-Day Target**: $3,650.00\n- **Confidence**: 85%\n- **Trend**: Bullish\n\n*Disclaimer: Not financial advice.*`,
    defi: `## DeFi Landscape 2024\n\nThe DeFi sector continues to evolve with new protocols and innovations.\n\n## Top Protocols\n\n1. Aave - Leading lending protocol\n2. Uniswap - DEX dominance\n3. Lido - Liquid staking leader\n\n*Disclaimer: Not financial advice.*`,
    solana: `## Solana Ecosystem Growth\n\nMemecoin trading has brought unprecedented activity to Solana.\n\n## Key Metrics\n\n- Daily Active Users: 1.2M+\n- DEX Volume: $3.2B\n- TVL: $4.8B\n\n*Disclaimer: Not financial advice.*`,
    tax: `## Crypto Tax Guide 2024\n\nEverything you need to know about cryptocurrency taxes.\n\n## Key Points\n\n1. Track all transactions\n2. Understand short vs long term gains\n3. Report staking rewards\n\n*Disclaimer: Consult a tax professional.*`,
  };
  return templates[topic] || '## Article Content\n\nContent coming soon.';
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });