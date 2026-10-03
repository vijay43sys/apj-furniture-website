import { ArrowRight, MessageSquare } from 'lucide-react';
import { urlFor } from '../../lib/sanity';
import { getProductWhatsAppUrl } from '../../utils/whatsapp';

export default function ProductCard({
  product,
  onSelect,
  whatsappNumber = '+91 98765 43210',
}) {
  const imageUrl = product?.images?.[0]
    ? urlFor(product.images[0])
    : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

  const formattedPrice = product?.price
    ? `₹ ${Number(product.price).toLocaleString('en-IN')}`
    : 'Price on Request';

  const formattedOriginalPrice = product?.originalPrice
    ? `₹ ${Number(product.originalPrice).toLocaleString('en-IN')}`
    : null;

  const whatsappUrl = getProductWhatsAppUrl(whatsappNumber, product);

  return (
    <div className="group bg-white rounded-xl border border-brand-border/70 overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
        <img
          src={imageUrl}
          alt={product?.title || 'APJ Furniture'}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Promotional Badge */}
        {product?.badge && (
          <span className="absolute top-3 left-3 bg-brand-espresso/90 backdrop-blur-sm text-brand-gold text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Quick WhatsApp Action Button overlay */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-[#25D366] text-brand-espresso hover:text-white p-2.5 rounded-full shadow-card transition-all duration-200"
          title="Instant WhatsApp Enquiry"
          aria-label={`Enquire about ${product.title} on WhatsApp`}
        >
          <MessageSquare className="w-4 h-4" />
        </a>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {product?.category && (
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-caramel mb-1">
              {product.category}
            </p>
          )}

          <h3 className="font-serif text-lg font-bold text-brand-espresso group-hover:text-brand-caramel transition-colors line-clamp-1">
            {product?.title}
          </h3>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-brand-espresso">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-brand-muted line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>

        {/* View Details Action */}
        <div className="pt-4 mt-2 border-t border-brand-cream flex items-center justify-between">
          <button
            onClick={() => onSelect(product)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-espresso group-hover:text-brand-caramel transition-colors py-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
