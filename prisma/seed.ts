import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // Clean existing data
  console.log('Cleaning existing data...');
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
  console.log('Done\n');

  // Create admin user
  console.log('Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@pulsechain.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // Create demo user
  console.log('Creating demo user...');
  const demoPassword = await bcrypt.hash('demo123', 10);
  const demo = await prisma.user.create({
    data: {
      email: 'demo@pulsechain.com',
      password: demoPassword,
      name: 'Demo User',
      role: 'USER',
    },
  });

  // Create demo affiliate
  console.log('Creating affiliate...');
  await prisma.affiliate.create({
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
        ],
      },
      payouts: {
        create: [
          { amount: 150.00, status: 'COMPLETED', address: '0x1234...5678', method: 'USDC' },
          { amount: 54.75, status: 'COMPLETED', address: 'bc1q...xyz', method: 'BTC' },
          { amount: 45.75, status: 'PENDING', address: '0x1234...5678', method: 'USDC' },
        ],
      },
    },
  });

  // Create demo portfolio
  console.log('Creating portfolio...');
  await prisma.portfolio.create({
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

  // Create demo alerts
  console.log('Creating alerts...');
  await prisma.priceAlert.createMany({
    data: [
      { userId: demo.id, coinId: 'bitcoin', targetPrice: 50000, condition: 'ABOVE', notificationType: 'EMAIL' },
      { userId: demo.id, coinId: 'ethereum', targetPrice: 2000, condition: 'BELOW', notificationType: 'EMAIL' },
      { userId: demo.id, coinId: 'solana', targetPrice: 150, condition: 'ABOVE', notificationType: 'PUSH' },
    ],
  });

  // Create demo watchlist
  console.log('Creating watchlist...');
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

  // Create sample blog posts
  console.log('Creating blog posts...');
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Bitcoin Breaks $68,000: What Next for Crypto Markets?',
        slug: 'bitcoin-breaks-68000',
        content: '## Executive Summary\n\nBitcoin has surged past $68,000 driven by strong institutional demand.',
        excerpt: 'BTC reaches new heights as institutional demand grows and ETF inflows surge.',
        category: 'MARKET_ANALYSIS',
        tags: 'bitcoin,btc,market,analysis',
        seoTitle: 'Bitcoin Price Analysis 2024',
        seoDescription: 'Comprehensive Bitcoin price analysis and prediction.',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        title: 'DeFi Summer 2.0: Top 5 Protocols to Watch',
        slug: 'defi-summer-2024',
        content: '## DeFi Analysis\n\nThe DeFi sector is heating up with new protocols.',
        excerpt: 'New DeFi protocols are emerging with innovative yield strategies.',
        category: 'DEFI',
        tags: 'defi,ethereum,yield,farming',
        seoTitle: 'Top DeFi Protocols 2024',
        seoDescription: 'Discover the most promising DeFi protocols.',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        title: 'AI Price Prediction: Ethereum 7-Day Forecast',
        slug: 'ethereum-price-prediction-march',
        content: '## ETH Prediction\n\nOur AI model predicts ETH price for the next 7 days.',
        excerpt: 'AI model forecasts ETH price movement for next week.',
        category: 'PREDICTION',
        tags: 'ethereum,eth,prediction,ai',
        seoTitle: 'Ethereum Price Prediction March 2024',
        seoDescription: 'AI-powered Ethereum price prediction for the next 7 days.',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        title: 'Solana Memecoin Mania: Bubble or New Paradigm?',
        slug: 'solana-memecoin-mania',
        content: '## Solana Analysis\n\nMemecoin trading brings unprecedented activity to Solana.',
        excerpt: 'Solana ecosystem sees explosive growth driven by memecoin trading.',
        category: 'MARKET_ANALYSIS',
        tags: 'solana,memecoin,trading,defi',
        seoTitle: 'Solana Memecoin Analysis 2024',
        seoDescription: 'Deep dive into Solana memecoin phenomenon.',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
      {
        title: 'Complete Crypto Tax Guide 2024',
        slug: 'crypto-tax-guide-2024',
        content: '## Tax Guide\n\nEverything you need to know about crypto taxes.',
        excerpt: 'Navigate cryptocurrency taxes with our comprehensive guide.',
        category: 'TUTORIAL',
        tags: 'tax,guide,tutorial,crypto',
        seoTitle: 'Crypto Tax Guide 2024',
        seoDescription: 'Complete guide to cryptocurrency taxes in 2024.',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
      },
    ],
  });

  console.log('\n═══════════════════════════════════════');
  console.log(' Database seeded successfully!');
  console.log('═══════════════════════════════════════');
  console.log('\nLogin Credentials:');
  console.log('  Admin: admin@pulsechain.com / admin123');
  console.log('  Demo:  demo@pulsechain.com / demo123');
  console.log('\nSeed Data:');
  console.log('  2 Users (Admin + Demo)');
  console.log('  1 Portfolio (5 holdings)');
  console.log('  1 Affiliate (3 referrals, 3 payouts)');
  console.log('  3 Price Alerts');
  console.log('  8 Watchlist Coins');
  console.log('  5 Blog Posts');
  console.log('═══════════════════════════════════════\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });