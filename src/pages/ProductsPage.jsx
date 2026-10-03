import { useState, useMemo } from 'react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import ProductCard from '../components/common/ProductCard';

export default function ProductsPage({
  products = [],
  selectedCategory = 'All',
  onSelectCategory,
  onSelectProduct,
  onNavigate,
  businessInfo,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return products;
    }
    return products.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      const pCatSlug = (p.categorySlug || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      return pCat === target || pCatSlug === target || pCat.includes(target);
    });
  }, [products, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (catName) => {
    onSelectCategory(catName);
    setCurrentPage(1);
  };

  const categoryList = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Storage'];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Page Header */}
      <BreadcrumbHeader
        title="Our Products"
        subtitle="Explore our curated collection of handcrafted solid wood furniture, bespoke sofas, and functional storage systems."
        breadcrumb={[{ label: 'Products' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 2. Category Filter Pills matching mockup */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categoryList.map((catName) => {
            const isActive = selectedCategory.toLowerCase() === catName.toLowerCase();
            return (
              <button
                key={catName}
                onClick={() => handleCategoryChange(catName)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-brand-espresso text-white shadow-soft scale-105'
                    : 'bg-white hover:bg-brand-cream text-brand-muted hover:text-brand-espresso border border-brand-border/80'
                }`}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* 3. Products Grid matching mockup */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-border p-8">
            <h3 className="font-serif text-xl font-bold text-brand-espresso mb-2">
              No products found in "{selectedCategory}"
            </h3>
            <p className="text-sm text-brand-muted mb-6">
              Try selecting another category or browse our full catalogue.
            </p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="bg-brand-espresso text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-brown transition-colors"
            >
              Reset Category Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                onSelect={onSelectProduct}
                whatsappNumber={businessInfo?.whatsappNumber}
              />
            ))}
          </div>
        )}

        {/* 4. Pagination matching mockup (< 1 2 3 >) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg border border-brand-border bg-white text-brand-espresso flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-cream transition-colors"
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  currentPage === pageNum
                    ? 'bg-brand-espresso text-white shadow-soft'
                    : 'bg-white text-brand-espresso border border-brand-border hover:bg-brand-cream'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg border border-brand-border bg-white text-brand-espresso flex items-center justify-center text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-cream transition-colors"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
