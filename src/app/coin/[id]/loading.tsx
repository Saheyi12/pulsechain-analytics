export default function CoinLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 bg-gray-800 rounded w-12"></div>
        <div className="h-4 bg-gray-800 rounded w-20"></div>
        <div className="h-4 bg-gray-800 rounded w-16"></div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-gray-800 rounded-full"></div>
        <div>
          <div className="h-8 bg-gray-800 rounded w-48 mb-2"></div>
          <div className="h-6 bg-gray-800 rounded w-32"></div>
        </div>
      </div>

      {/* Price Changes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="h-20 bg-gray-800 rounded-xl"></div>
        <div className="h-20 bg-gray-800 rounded-xl"></div>
        <div className="h-20 bg-gray-800 rounded-xl"></div>
      </div>

      {/* Chart */}
      <div className="h-80 bg-gray-800 rounded-xl mb-8"></div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-800 rounded-xl"></div>
        <div className="h-64 bg-gray-800 rounded-xl"></div>
      </div>

      {/* Prediction Card */}
      <div className="h-32 bg-gray-800 rounded-xl mt-8"></div>
    </div>
  );
}