#!/bin/bash

# ============================================
# PULSECHAIN ANALYTICS - DEPLOYMENT SCRIPT
# ============================================

set -e  # Exit on error

echo "🚀 PulseChain Analytics - Deployment"
echo "═══════════════════════════════════════"
echo ""

# Check environment
echo "🔍 Checking environment..."
if [ ! -f ".env.local" ]; then
  echo "❌ .env.local not found. Creating from .env.example..."
  cp .env.example .env.local
  echo "⚠️  Please update .env.local with your real values"
fi
echo "✅ Environment checked"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Push database schema
echo "🗄️  Pushing database schema..."
npx prisma db push
echo "✅ Database schema pushed"
echo ""

# Run database seed (optional)
if [ "$1" = "--seed" ] || [ "$1" = "-s" ]; then
  echo "🌱 Seeding database..."
  npx tsx scripts/seed-database.ts
  echo "✅ Database seeded"
  echo ""
fi

# Sync market data
echo "🔄 Syncing market data..."
npx tsx scripts/sync-market-data.ts
echo "✅ Market data synced"
echo ""

# Generate sitemap
echo "🗺️  Generating sitemap..."
npx tsx scripts/update-sitemap.ts
echo "✅ Sitemap generated"
echo ""

# Run build
echo "🏗️  Building application..."
npm run build
echo "✅ Build complete"
echo ""

# Deploy to Vercel (if installed)
if command -v vercel &> /dev/null; then
  echo "▲ Deploying to Vercel..."
  
  if [ "$1" = "--prod" ] || [ "$2" = "--prod" ]; then
    vercel --prod
    echo "✅ Deployed to production!"
  else
    vercel
    echo "✅ Deployed to preview!"
  fi
else
  echo "💡 Tip: Install Vercel CLI to deploy directly:"
  echo "   npm i -g vercel"
  echo "   vercel"
fi

echo ""
echo "═══════════════════════════════════════"
echo "🎉 Deployment complete!"
echo "═══════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Visit your Vercel dashboard"
echo "  2. Configure custom domain (optional)"
echo "  3. Set up Google Search Console"
echo "  4. Enable analytics"
echo "  5. Submit sitemap to search engines"
echo ""
echo "📋 Useful commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run db:studio    - Open Prisma Studio"
echo "   npm run blog:generate - Generate blog posts"
echo "   npm run market:sync   - Sync market data"
echo ""