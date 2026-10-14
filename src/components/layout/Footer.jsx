import { Phone, Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

export default function Footer({ onNavigate, businessInfo }) {
  const whatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  return (
    <footer className="bg-brand-espresso text-brand-light border-t border-brand-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                APJ
              </span>
              <span className="text-[11px] tracking-[0.25em] uppercase text-brand-gold font-bold">
                Interior & Furniture
              </span>
            </div>
            <p className="text-brand-sand/80 text-sm leading-relaxed">
              {businessInfo?.tagline || 'Beautiful spaces. Better living.'}
            </p>
            <p className="text-brand-sand/60 text-xs leading-relaxed">
              Transforming homes, villas, and commercial spaces with custom woodcraft, contemporary design, and complete turnkey interiors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={businessInfo?.instagramUrl || 'https://www.instagram.com/furnitureapj/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-warm flex items-center justify-center text-brand-light hover:text-brand-gold hover:bg-brand-brown transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={businessInfo?.facebookUrl || 'https://www.facebook.com/APJ.Furniture.Interior/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-warm flex items-center justify-center text-brand-light hover:text-brand-gold hover:bg-brand-brown transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('interiors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Interior Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('feedback'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Customer Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-brand-sand/80 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white tracking-wide mb-5">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-brand-sand/80">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${businessInfo?.phone || '+919876543210'}`} className="hover:text-white transition-colors">
                    {businessInfo?.phone || '+91 98765 43210'}
                  </a>
                  <p className="text-xs text-brand-sand/60">{businessInfo?.workingHours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <a href={`mailto:${businessInfo?.email || 'info@apjinteriors.com'}`} className="hover:text-white transition-colors">
                  {businessInfo?.email || 'info@apjinteriors.com'}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>{businessInfo?.address || 'No. 12, Anna Salai, Chennai, Tamil Nadu - 600001'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-warm/60 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-sand/60 gap-4">
          <p>© 2026 APJ Interior & Furniture. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('studio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 text-brand-sand/50 hover:text-brand-gold transition-colors"
              title="Open Sanity Studio CMS login"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sanity CMS Studio</span>
            </button>
            <span>Chennai, India</span>
          </div>
        </div>

        {businessInfo?.isDemoNoticeActive && (
          <div className="mt-4 p-3 rounded bg-brand-warm/40 border border-brand-warm text-[11px] text-brand-sand/70 text-center">
            <strong>Sample Demonstration Notice:</strong> Product names, imagery, prices, and testimonials shown are mock samples. All live content will be published directly by the business owner via Sanity CMS.
          </div>
        )}
      </div>
    </footer>
  );
}
