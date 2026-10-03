import { useState } from 'react';
import { X, MessageSquare, Check, Ruler, Layers, ShieldCheck, PhoneCall } from 'lucide-react';
import { urlFor } from '../../lib/sanity';
import { getProductWhatsAppUrl } from '../../utils/whatsapp';

export default function ProductModal({
  product,
  onClose,
  onBookConsultation,
  whatsappNumber = '+91 98765 43210',
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images.map((img) => urlFor(img))
    : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'];

  const formattedPrice = product.price
    ? `₹ ${Number(product.price).toLocaleString('en-IN')}`
    : 'Price on Request';

  const whatsappUrl = getProductWhatsAppUrl(whatsappNumber, product);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Dialog */}
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-hover overflow-hidden flex flex-col md:flex-row my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-brand-espresso rounded-full shadow-soft transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-brand-cream p-6 flex flex-col justify-between">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-soft">
            <img
              src={images[activeImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-brand-espresso text-brand-gold text-xs font-semibold px-2.5 py-1 rounded">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images exist */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-brand-espresso scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-brand-border/60 text-xs text-brand-muted flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-caramel shrink-0" />
            <span>Custom dimensions & fabric finishes available on request</span>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {product.category && (
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-caramel">
                {product.category}
              </span>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-espresso mt-1">
              {product.title}
            </h2>

            <div className="flex items-baseline gap-3 my-4">
              <span className="text-2xl font-bold text-brand-espresso">
                {formattedPrice}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-brand-muted line-through">
                  ₹ {Number(product.originalPrice).toLocaleString('en-IN')}
                </span>
              )}
              {product.inStock && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> In Stock / Ready to Order
                </span>
              )}
            </div>

            <p className="text-brand-muted text-sm leading-relaxed mb-6">
              {product.description || 'Handcrafted to perfection with high-durability materials and contemporary finish.'}
            </p>

            {/* Specifications */}
            <div className="space-y-3 py-4 border-y border-brand-cream text-xs sm:text-sm">
              {product.dimensions && (
                <div className="flex items-start gap-2.5">
                  <Ruler className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-espresso">Dimensions: </span>
                    <span className="text-brand-muted">{product.dimensions}</span>
                  </div>
                </div>
              )}

              {product.material && (
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-brand-caramel shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-espresso">Materials: </span>
                    <span className="text-brand-muted">{product.material}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-soft hover:shadow-card transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Enquire & Order on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookConsultation(product.title);
              }}
              className="flex items-center justify-center gap-2 w-full bg-brand-espresso hover:bg-brand-brown text-white py-3 px-4 rounded-xl font-semibold text-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Callback / Custom Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
