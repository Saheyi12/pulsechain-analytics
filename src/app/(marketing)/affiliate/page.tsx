import Link from 'next/link';

export default function AffiliatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Earn Crypto with Our{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Affiliate Program
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Refer users to PulseChain Analytics and earn commissions from exchange signups, trades, and premium subscriptions.
        </p>
        <Link href="/signup" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
          Become an Affiliate
        </Link>
      </div>

      {/* Commission Tiers */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
          <div className="text-4xl mb-4">🥉</div>
          <h3 className="text-xl font-bold mb-2">Bronze</h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">20%</div>
          <p className="text-gray-400 text-sm">Commission Rate</p>
          <div className="mt-4 text-sm text-gray-400">0-10 referrals</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-8 border border-blue-500 text-center relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-xs px-3 py-1 rounded-full">POPULAR</div>
          <div className="text-4xl mb-4">🥈</div>
          <h3 className="text-xl font-bold mb-2">Silver</h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
          <p className="text-gray-400 text-sm">Commission Rate</p>
          <div className="mt-4 text-sm text-gray-400">11-50 referrals</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
          <div className="text-4xl mb-4">🥇</div>
          <h3 className="text-xl font-bold mb-2">Gold</h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">40%</div>
          <p className="text-gray-400 text-sm">Commission Rate</p>
          <div className="mt-4 text-sm text-gray-400">51+ referrals</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Sign Up</h3>
              <p className="text-gray-400">Create your account and get your unique referral link instantly.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Share Your Link</h3>
              <p className="text-gray-400">Share your referral link on social media, blogs, YouTube, or with friends.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Earn Commissions</h3>
              <p className="text-gray-400">Earn every time your referrals sign up for exchanges or trade through our links.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shrink-0">4</div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Get Paid</h3>
              <p className="text-gray-400">Request payouts in crypto or fiat. Monthly payments, no minimum threshold.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Start Earning Today</h2>
        <p className="text-lg mb-6 opacity-90">Join hundreds of affiliates already earning with PulseChain.</p>
        <Link href="/signup" className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started Free
        </Link>
      </div>
    </div>
  );
}