import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function BreadcrumbHeader({
  title,
  subtitle,
  breadcrumb = [],
  bgImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80',
  onNavigate,
}) {
  return (
    <div className="relative bg-brand-espresso text-white py-16 sm:py-20 overflow-hidden">
      {/* Background image with warm dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-espresso via-brand-espresso/90 to-brand-brown/80" />

      {/* Decorative ambient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-brand-sand/80 text-sm sm:text-base max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Breadcrumb path */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center sm:justify-end gap-1.5 text-xs sm:text-sm text-brand-sand/80 font-medium">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="hover:text-brand-gold transition-colors"
          >
            Home
          </button>
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-brand-sand/40" />
              {crumb.id ? (
                <button
                  onClick={() => onNavigate && onNavigate(crumb.id)}
                  className="hover:text-brand-gold transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-brand-gold font-semibold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
