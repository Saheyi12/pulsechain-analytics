export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Market Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Global Market Cap</div>
          <div className="text-2xl font-bold">$2.4T</div>
          <div className="text-green-400 text-sm mt-1">+2.4%</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">24h Volume</div>
          <div className="text-2xl font-bold">$125B</div>
          <div className="text-green-400 text-sm mt-1">+12.7%</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">BTC Dominance</div>
          <div className="text-2xl font-bold">52.3%</div>
          <div className="text-gray-400 text-sm mt-1">+0.3%</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Fear & Greed</div>
          <div className="text-2xl font-bold text-yellow-400">65</div>
          <div className="text-yellow-400 text-sm mt-1">Greed</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Top Gainers</h2>
          <div className="space-y-3">
            {[
              { name: 'Solana', symbol: 'SOL', price: '$112.45', change: '+15.2%' },
              { name: 'Avalanche', symbol: 'AVAX', price: '$42.80', change: '+12.1%' },
              { name: 'Cardano', symbol: 'ADA', price: '$0.62', change: '+8.7%' },
              { name: 'Polkadot', symbol: 'DOT', price: '$8.95', change: '+7.3%' },
              { name: 'Chainlink', symbol: 'LINK', price: '$16.20', change: '+6.5%' },
            ].map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-gray-400">{coin.symbol}</div>
                </div>
                <div className="text-right">
                  <div>{coin.price}</div>
                  <div className="text-green-400 text-sm">{coin.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Top Losers</h2>
          <div className="space-y-3">
            {[
              { name: 'Dogecoin', symbol: 'DOGE', price: '$0.09', change: '-8.3%' },
              { name: 'Shiba Inu', symbol: 'SHIB', price: '$0.00001', change: '-6.2%' },
              { name: 'Litecoin', symbol: 'LTC', price: '$72.15', change: '-4.1%' },
              { name: 'Stellar', symbol: 'XLM', price: '$0.12', change: '-3.8%' },
              { name: 'Monero', symbol: 'XMR', price: '$158.30', change: '-2.9%' },
            ].map((coin) => (
              <div key={coin.symbol} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-sm text-gray-400">{coin.symbol}</div>
                </div>
                <div className="text-right">
                  <div>{coin.price}</div>
                  <div className="text-red-400 text-sm">{coin.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}