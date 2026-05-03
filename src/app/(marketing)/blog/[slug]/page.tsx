import Link from 'next/link';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = {
    title: 'Bitcoin Breaks $45,000: What Next for Crypto Markets?',
    category: 'Market Analysis',
    date: '2024-03-15',
    readTime: '5 min read',
    author: 'PulseChain AI',
    content: `
## Executive Summary

Bitcoin has surged past the $45,000 mark for the first time since early 2022, driven by institutional accumulation and growing anticipation of spot ETF approvals. This analysis breaks down the key factors behind the rally and what traders should watch next.

## Market Overview

The cryptocurrency market has added over $200 billion in total market cap over the past week. Bitcoin dominance has risen to 52.3%, indicating that the current rally is primarily BTC-led.

### Key Metrics:
- **BTC Price**: $45,200 (+8.4% 7d)
- **24h Volume**: $32.5 billion
- **Market Cap**: $885 billion
- **Fear & Greed Index**: 72 (Greed)

## What's Driving the Rally?

### 1. Institutional Inflows
Bitcoin ETFs have seen record weekly inflows of over $2.5 billion, signaling strong institutional demand.

### 2. Halving Anticipation
With the Bitcoin halving approximately 30 days away, historical patterns suggest continued upward momentum.

### 3. Macro Economic Factors
Cooling inflation data and potential Fed rate cuts have boosted risk-on assets including cryptocurrencies.

## Technical Analysis

### Support Levels:
- Strong support at $42,000
- Secondary support at $40,500

### Resistance Levels:
- Immediate resistance at $46,000
- Major resistance at $48,500

The 50-day moving average has crossed above the 200-day MA (golden cross) on the daily chart, a historically bullish signal.

## AI Price Prediction

Our machine learning model forecasts:
- **7-day target**: $47,200
- **30-day target**: $52,500
- **Confidence level**: 78%

## Key Events to Watch

1. **ETF Decision Dates** - March 20, March 25
2. **FOMC Meeting** - March 19-20
3. **Bitcoin Halving** - Approximately April 18

## Trading Tips

1. **Take partial profits** at resistance levels
2. **Set stop-losses** below $42,000
3. **Watch volume** for confirmation of breakouts
4. **Diversify** into strong altcoins on BTC pullbacks

## Conclusion

The current Bitcoin rally appears fundamentally driven with strong institutional backing. While short-term corrections are healthy, the medium-term outlook remains bullish heading into the halving.

*Disclaimer: This article is for informational purposes only and does not constitute financial advice. Cryptocurrency trading carries significant risk. Always do your own research.*

---

*💡 Trade Bitcoin with confidence: [Get started with Binance](https://www.binance.com/en/register?ref=DEFAULT) and receive 10% off trading fees.*
    `,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-white">{post.title.substring(0, 50)}...</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.date}</span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              PA
            </div>
            <div>
              <div className="font-medium">{post.author}</div>
              <div className="text-sm text-gray-400">AI Market Analyst</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>').replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^- (.*)/g, '<li class="ml-4 text-gray-300">$1</li>') }} />
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-gray-400">Share:</span>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">Twitter</button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">LinkedIn</button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700">Reddit</button>
        </div>

        {/* Related Posts */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/defi-summer-2024" className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition">
              <h3 className="font-semibold mb-2">DeFi Summer 2.0: Top Protocols to Watch</h3>
              <p className="text-sm text-gray-400">New DeFi protocols are emerging with innovative yield strategies.</p>
            </Link>
            <Link href="/blog/ethereum-price-prediction-march" className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition">
              <h3 className="font-semibold mb-2">AI Price Prediction: Ethereum 7-Day Forecast</h3>
              <p className="text-sm text-gray-400">Our AI model predicts ETH price movement for the upcoming week.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}