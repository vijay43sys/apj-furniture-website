import { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { urlFor } from '../../lib/sanity';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  onSelectProduct,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = searchTerm.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-hover overflow-hidden border border-brand-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-brand-border flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-muted shrink-0" />
          <input
            type="text"
            placeholder="Search sofas, beds, dining sets, wardrobes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-base bg-transparent border-none outline-none text-brand-espresso placeholder:text-brand-muted/70"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-cream text-brand-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-brand-cream">
          {searchTerm.trim() === '' ? (
            <p className="text-center py-8 text-xs text-brand-muted">
              Type keywords to search across furniture collections and categories...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center py-8 text-sm text-brand-muted">
              No matching products found for "{searchTerm}".
            </p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id || item._id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-brand-cream/60 rounded-xl text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images?.[0] ? urlFor(item.images[0]) : ''}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-brand-espresso group-hover:text-brand-caramel">
                      {item.title}
                    </h4>
                    <span className="text-xs text-brand-muted">{item.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand-espresso">
                    ₹{Number(item.price).toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 group-hover:text-brand-caramel transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
