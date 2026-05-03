export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-800 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
        <div className="grid grid-cols-4 gap-4 mt-12">
          <div className="h-24 bg-gray-800 rounded-xl"></div>
          <div className="h-24 bg-gray-800 rounded-xl"></div>
          <div className="h-24 bg-gray-800 rounded-xl"></div>
          <div className="h-24 bg-gray-800 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="h-48 bg-gray-800 rounded-xl"></div>
          <div className="h-48 bg-gray-800 rounded-xl"></div>
          <div className="h-48 bg-gray-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}