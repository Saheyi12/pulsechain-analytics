import Link from 'next/link';

const blogPosts = [
  {
    slug: 'bitcoin-breaks-45000',
    title: 'Bitcoin Breaks $45,000: What Next for Crypto Markets?',
    excerpt: 'BTC reaches new heights as institutional demand grows and ETF approvals loom.',
    category: 'Market Analysis',
    date: '2024-03-15',
    readTime: '5 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
  {
    slug: 'defi-summer-2024',
    title: 'DeFi Summer 2.0: Top Protocols to Watch in 2024',
    excerpt: 'New DeFi protocols are emerging with innovative yield strategies.',
    category: 'DeFi',
    date: '2024-03-14',
    readTime: '7 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
  {
    slug: 'ethereum-price-prediction-march',
    title: 'AI Price Prediction: Ethereum 7-Day Forecast',
    excerpt: 'Our AI model predicts ETH price movement for the upcoming week.',
    category: 'Prediction',
    date: '2024-03-13',
    readTime: '4 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
  {
    slug: 'solana-memecoin-mania',
    title: 'Solana Memecoin Mania: Bubble or New Paradigm?',
    excerpt: 'Solana ecosystem sees explosive growth driven by memecoin trading.',
    category: 'Analysis',
    date: '2024-03-12',
    readTime: '6 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
  {
    slug: 'crypto-tax-guide-2024',
    title: 'Complete Crypto Tax Guide 2024: What You Need to Know',
    excerpt: 'Navigate crypto taxes with our comprehensive guide for this year.',
    category: 'Tutorial',
    date: '2024-03-11',
    readTime: '10 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
  {
    slug: 'layer-2-scaling-solutions',
    title: 'Layer 2 Scaling Solutions Compared: Arbitrum vs Optimism vs zkSync',
    excerpt: 'Deep dive into Ethereum L2 solutions and which one leads the race.',
    category: 'Technical',
    date: '2024-03-10',
    readTime: '8 min read',
    image: '/images/blog/default-blog-hero.webp',
  },
];

const categories = ['All', 'Market Analysis', 'DeFi', 'Prediction', 'Analysis', 'Tutorial', 'Technical', 'News'];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">PulseChain Blog</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          AI-powered crypto market insights, price predictions, and trading strategies.
          New posts generated daily.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              cat === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-600 transition group"
          >
            <div className="h-48 bg-gray-800 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
              <div className="text-xs text-gray-500">{post.date}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm">Previous</button>
        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm">1</button>
        <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm">2</button>
        <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm">3</button>
        <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm">Next</button>
      </div>
    </div>
  );
}