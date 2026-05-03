export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI-Powered Crypto
          </span>
          <br />
          <span>Market Intelligence</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Real-time prices, AI predictions, smart alerts, and automated insights.
          Dominate the crypto market with institutional-grade analytics.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/signup" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Get Started Free
          </a>
          <a href="/predictions" className="px-8 py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-semibold transition">
            Try AI Predictions
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-blue-400">10K+</div>
            <div className="text-gray-400 text-sm mt-1">Coins Tracked</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-green-400">95%</div>
            <div className="text-gray-400 text-sm mt-1">AI Accuracy</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-purple-400">24/7</div>
            <div className="text-gray-400 text-sm mt-1">Monitoring</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-800">
            <div className="text-3xl font-bold text-yellow-400">Free</div>
            <div className="text-gray-400 text-sm mt-1">Forever Plan</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">AI Price Predictions</h3>
            <p className="text-gray-400 text-sm">7-day forecasts powered by machine learning models with confidence scores.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Live Market Data</h3>
            <p className="text-gray-400 text-sm">Real-time prices, volume, and market cap for 10,000+ cryptocurrencies.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">🔔</div>
            <h3 className="text-lg font-semibold mb-2">Smart Alerts</h3>
            <p className="text-gray-400 text-sm">Price targets, volume spikes, whale movements. Never miss a move.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">💼</div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Tracker</h3>
            <p className="text-gray-400 text-sm">Track your holdings with real-time P&L and asset allocation.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">Auto Blog Posts</h3>
            <p className="text-gray-400 text-sm">AI generates daily market analysis. SEO optimized. Fully automated.</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-2xl mb-3">💰</div>
            <h3 className="text-lg font-semibold mb-2">Affiliate Program</h3>
            <p className="text-gray-400 text-sm">Refer users and earn commissions from exchange signups and trades.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Dominate the Market?</h2>
          <p className="text-lg mb-6 opacity-90">Join thousands of traders using PulseChain Analytics.</p>
          <a href="/signup" className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start Free Now
          </a>
        </div>
      </section>
    </div>
  );
}