export default function PredictionsPage() {
  const predictions = [
    { coin: 'Bitcoin', symbol: 'BTC', current: '$68,000', predicted: '$72,500', change: '+6.6%', trend: 'bullish', confidence: 85 },
    { coin: 'Ethereum', symbol: 'ETH', current: '$3,400', predicted: '$3,650', change: '+7.4%', trend: 'bullish', confidence: 82 },
    { coin: 'Solana', symbol: 'SOL', current: '$112', predicted: '$125', change: '+11.6%', trend: 'bullish', confidence: 78 },
    { coin: 'Cardano', symbol: 'ADA', current: '$0.62', predicted: '$0.58', change: '-6.5%', trend: 'bearish', confidence: 73 },
    { coin: 'Avalanche', symbol: 'AVAX', current: '$42.80', predicted: '$48.00', change: '+12.1%', trend: 'bullish', confidence: 80 },
    { coin: 'Polkadot', symbol: 'DOT', current: '$8.95', predicted: '$9.50', change: '+6.1%', trend: 'bullish', confidence: 76 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">AI Price Predictions</h1>
      <p className="text-gray-400 mb-6">7-day price forecasts powered by machine learning</p>

      <div className="space-y-4">
        {predictions.map((p) => (
          <div key={p.symbol} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{p.coin}</h3>
                <span className="text-sm text-gray-400">{p.symbol}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Current</div>
                <div className="font-bold">{p.current}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${p.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400">{p.confidence}% confidence</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">7-Day Target</div>
                <div className="font-bold text-lg">{p.predicted}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                p.trend === 'bullish' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {p.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}