'use client';

import { useState } from 'react';
import { BlogCard } from './blog-card';
import { Input } from '@/components/ui/input';

const posts = [
  {
    slug: 'bitcoin-breaks-45000',
    title: 'Bitcoin Breaks $45,000: What Next for Crypto Markets?',
    excerpt: 'BTC reaches new heights as institutional demand grows and ETF approvals approach.',
    category: 'Market Analysis',
    date: '2024-03-15',
    readTime: '5 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'defi-summer-2024',
    title: 'DeFi Summer 2.0: Top Protocols to Watch in 2024',
    excerpt: 'New DeFi protocols are emerging with innovative yield strategies and tokenomics.',
    category: 'DeFi',
    date: '2024-03-14',
    readTime: '7 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'ethereum-price-prediction',
    title: 'AI Price Prediction: Ethereum 7-Day Forecast',
    excerpt: 'Our machine learning models predict ETH price movement with high confidence.',
    category: 'Prediction',
    date: '2024-03-13',
    readTime: '4 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'solana-memecoin-mania',
    title: 'Solana Memecoin Mania: Bubble or New Paradigm?',
    excerpt: 'Solana ecosystem sees explosive growth driven by memecoin trading volume.',
    category: 'Analysis',
    date: '2024-03-12',
    readTime: '6 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'crypto-tax-guide',
    title: 'Complete Crypto Tax Guide 2024: Everything You Need to Know',
    excerpt: 'Navigate cryptocurrency taxes with our comprehensive step-by-step guide.',
    category: 'Tutorial',
    date: '2024-03-11',
    readTime: '10 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'layer-2-comparison',
    title: 'Layer 2 Scaling Solutions: Arbitrum vs Optimism vs zkSync',
    excerpt: 'Deep dive into Ethereum L2 solutions and which one leads the race.',
    category: 'Technical',
    date: '2024-03-10',
    readTime: '8 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'nft-market-revival',
    title: 'NFT Market Shows Signs of Life: What Changed?',
    excerpt: 'After months of decline, NFT trading volumes are picking up across major platforms.',
    category: 'News',
    date: '2024-03-09',
    readTime: '5 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'bitcoin-halving-guide',
    title: 'Bitcoin Halving 2024: The Ultimate Preparation Guide',
    excerpt: 'Everything traders need to know about the upcoming Bitcoin halving event.',
    category: 'Tutorial',
    date: '2024-03-08',
    readTime: '12 min read',
    author: 'PulseChain AI',
  },
  {
    slug: 'ai-crypto-trading',
    title: 'How AI is Revolutionizing Cryptocurrency Trading in 2024',
    excerpt: 'Machine learning models are changing how traders analyze and predict markets.',
    category: 'Analysis',
    date: '2024-03-07',
    readTime: '6 min read',
    author: 'PulseChain AI',
  },
];

const categories = ['All', 'Market Analysis', 'DeFi', 'Prediction', 'Analysis', 'Tutorial', 'Technical', 'News'];

export function BlogGrid() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg">No articles found</p>
          <p className="text-sm">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Load More */}
      {filtered.length > 6 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}