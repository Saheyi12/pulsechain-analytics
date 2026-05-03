'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-400 mb-6">An error occurred while loading this page.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        Try Again
      </button>
    </div>
  );
}