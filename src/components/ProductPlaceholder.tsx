export function ProductPlaceholder() {
  // Hidden by default - enable later for affiliate products
  const showProducts = false;

  if (!showProducts) return null;

  return (
    <section className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recommended Products
      </h3>
      <p className="text-gray-600 text-sm">
        Product recommendations coming soon.
      </p>
      {/* Placeholder for affiliate links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-100 rounded-lg aspect-square animate-pulse" />
        ))}
      </div>
    </section>
  );
}
