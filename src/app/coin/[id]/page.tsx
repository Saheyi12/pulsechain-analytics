import Link from 'next/link';

export default function CoinPage({ params }: { params: { id: string } }) {
  const coin = {
    id: params.id,
    name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
    symbol: params.id.substring(0, 3).toUpperCase(),
    price: '$68,245.50',
    change24h: '+2.45%',
    change7d: '+8.32%',
    change30d: '+15.67%',
    marketCap: '$1,340,000,000,000',
    volume24h: '$32,500,000,000',
    circulatingSupply: '19,600,000',
    totalSupply: '21,000,000',
    ath: '$69,045',
    athDate: '2024-03-05',
    description: 'The worlds first and largest cryptocurrency by market capitalization. A decentralized digital currency that enables peer-to-peer transactions without intermediaries.',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
        <span>/</span>
        <span className="text-white">{coin.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-2xl font-bold">
          {coin.symbol[0]}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <span className="text-xl text-gray-400">{coin.symbol}</span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-3xl font-bold">{coin.price}</span>
            <span className="text-green-400 font-medium">{coin.change24h}</span>
          </div>
        </div>
      </div>

      {/* Price Changes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <div className="text-sm text-gray-400 mb-1">24h Change</div>
          <div className="text-green-400 font-semibold">{coin.change24h}</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <div className="text-sm text-gray-400 mb-1">7d Change</div>
          <div className="text-green-400 font-semibold">{coin.change7d}</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 text-center">
          <div className="text-sm text-gray-400 mb-1">30d Change</div>
          <div className="text-green-400 font-semibold">{coin.change30d}</div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
        <h2 className="text-lg font-semibold mb-4">Price Chart</h2>
        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">📈</div>
            <p>Chart will render here with real data</p>
            <p className="text-sm">7d · 30d · 90d · 1y · All</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Market Stats */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Market Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap</span>
              <span>{coin.marketCap}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">24h Volume</span>
              <span>{coin.volume24h}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Circulating Supply</span>
              <span>{coin.circulatingSupply}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Supply</span>
              <span>{coin.totalSupply}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">All-Time High</span>
              <span>{coin.ath}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ATH Date</span>
              <span>{coin.athDate}</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">About {coin.name}</h2>
          <p className="text-gray-400 leading-relaxed">{coin.description}</p>
        </div>
      </div>

      {/* AI Prediction Card */}
      <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">AI Price Prediction</h2>
            <p className="text-gray-400 text-sm">7-day forecast powered by machine learning</p>
          </div>
          <Link
            href={`/predictions?coin=${coin.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            View Prediction
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm text-gray-400">Predicted Price</div>
            <div className="text-xl font-bold text-green-400">$72,500</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Confidence</div>
            <div className="text-xl font-bold text-blue-400">85%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Sentiment</div>
            <div className="text-xl font-bold text-green-400">Bullish</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
          Add to Watchlist
        </button>
        <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition">
          Set Price Alert
        </button>
        <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition">
          Add to Portfolio
        </button>
      </div>
    </div>
  );
}