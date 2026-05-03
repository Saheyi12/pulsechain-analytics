export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About PulseChain Analytics</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            PulseChain Analytics is an AI-powered cryptocurrency market intelligence platform 
            built to give traders and investors an edge in the fast-moving crypto markets.
          </p>

          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400">
              We democratize institutional-grade crypto analytics by combining real-time market data 
              with advanced AI models. Our platform generates actionable insights, price predictions, 
              and automated content to help you make informed trading decisions.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">What Makes Us Different</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-2">🤖 AI-Powered</h3>
              <p className="text-gray-400 text-sm">Machine learning models trained on years of market data for accurate predictions.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-2">📊 Real-Time Data</h3>
              <p className="text-gray-400 text-sm">Live prices and market data for 10,000+ cryptocurrencies.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-2">📝 Auto Content</h3>
              <p className="text-gray-400 text-sm">Daily AI-generated blog posts keep our platform fresh and SEO-optimized.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-2">💰 Affiliate System</h3>
              <p className="text-gray-400 text-sm">Earn commissions by referring users to our platform and partners.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/50">
            <h2 className="text-2xl font-bold mb-4">Built for the Future</h2>
            <p className="text-gray-300">
              PulseChain Analytics is designed to scale. Our platform uses serverless architecture,
              automated content generation, and AI-driven insights to provide value without increasing costs.
              We believe in making powerful tools accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}