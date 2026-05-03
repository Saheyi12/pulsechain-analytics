export default function ApiPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-xl text-gray-400 mb-12">
          Integrate PulseChain Analytics into your applications with our RESTful API.
        </p>

        <div className="space-y-8">
          <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-green-400 mb-4">
              https://pulsechain-analytics.vercel.app/api
            </div>
            <p className="text-gray-400 mb-4">Get your API key from the dashboard settings page.</p>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm">
              <span className="text-gray-500">curl -H </span>
              <span className="text-yellow-400">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span>
              <span className="text-gray-500"> </span>
              <span className="text-green-400">https://pulsechain-analytics.vercel.app/api/coins/bitcoin</span>
            </div>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Endpoints</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-600 text-xs rounded">GET</span>
                  <code className="text-blue-400">/api/coins</code>
                </div>
                <p className="text-gray-400 text-sm">Get all coins with market data</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-600 text-xs rounded">GET</span>
                  <code className="text-blue-400">/api/coins/:id</code>
                </div>
                <p className="text-gray-400 text-sm">Get single coin details</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-purple-600 text-xs rounded">GET</span>
                  <code className="text-blue-400">/api/predictions/:coinId</code>
                </div>
                <p className="text-gray-400 text-sm">Get AI price predictions</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-purple-600 text-xs rounded">GET</span>
                  <code className="text-blue-400">/api/predictions/:coinId/sentiment</code>
                </div>
                <p className="text-gray-400 text-sm">Get market sentiment analysis</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">100</div>
                <div className="text-sm text-gray-400">Free Tier (req/min)</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">300</div>
                <div className="text-sm text-gray-400">Authenticated</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">1000</div>
                <div className="text-sm text-gray-400">Premium</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}