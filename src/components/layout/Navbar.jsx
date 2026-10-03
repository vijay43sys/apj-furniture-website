import { useState } from 'react';
import { Menu, X, Phone, MessageSquare, Search } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../../utils/whatsapp';

export default function Navbar({
  currentPage,
  onNavigate,
  businessInfo,
  onOpenSearch,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'interiors', label: 'Interior Design' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border/60 shadow-soft">
      {/* Top micro announcement bar */}
      <div className="bg-brand-espresso text-brand-light text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-gold" />
              <a href={`tel:${businessInfo?.phone || '+919876543210'}`} className="hover:text-brand-gold transition-colors">
                {businessInfo?.phone || '+91 98765 43210'}
              </a>
            </span>
            <span className="hidden sm:inline text-brand-muted/60">|</span>
            <span className="hidden sm:inline text-brand-sand/80">
              {businessInfo?.address?.split(',')[1] || 'Chennai, Tamil Nadu'} • Mon - Sat: 9:00 AM - 7:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>
            {businessInfo?.isDemoNoticeActive && (
              <span className="hidden md:inline-block bg-brand-warm/30 text-brand-sand px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
                Demo Mode (Sanity Ready)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start text-left focus:outline-none group"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-extrabold tracking-tight text-brand-espresso group-hover:text-brand-caramel transition-colors">
                APJ
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brand-muted -mt-1 group-hover:text-brand-brown transition-colors">
              Interior & Furniture
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-brand-espresso font-semibold bg-brand-cream'
                      : 'text-brand-muted hover:text-brand-espresso hover:bg-brand-cream/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-brand-muted hover:text-brand-espresso hover:bg-brand-cream rounded-full transition-colors"
              title="Search products"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-espresso hover:bg-brand-brown text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-all duration-200 shadow-soft hover:shadow-card"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Enquire Now</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-brand-muted hover:text-brand-espresso rounded-md"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-espresso hover:bg-brand-cream rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-hover">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-cream text-brand-espresso font-semibold border-l-4 border-brand-caramel'
                    : 'text-brand-muted hover:bg-brand-cream/50 hover:text-brand-espresso'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-brand-border/60">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-brand-espresso text-white py-3 rounded-lg font-medium text-center shadow-soft"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Quick WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
