import { useState } from 'react';
import { Star, MessageSquare, Quote, Heart } from 'lucide-react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import { urlFor } from '../lib/sanity';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function FeedbackPage({
  testimonials = [],
  onNavigate,
  onOpenReviewModal,
  businessInfo,
}) {
  const [filterRating, setFilterRating] = useState('All');

  const filtered = filterRating === 'All'
    ? testimonials
    : testimonials.filter((t) => Number(t.rating) === Number(filterRating));

  const whatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header */}
      <BreadcrumbHeader
        title="Customer Feedback"
        subtitle="Genuine stories and reviews from homeowners and commercial clients who partnered with APJ."
        breadcrumb={[{ label: 'Feedback' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Title Section matching mockup */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso mt-1">
            What Our Customers Say
          </h2>
          <p className="text-brand-muted text-base mt-2">
            Real stories. Happy homes.
          </p>

          {/* Rating filter tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterRating('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterRating === 'All'
                  ? 'bg-brand-espresso text-white shadow-soft'
                  : 'bg-white text-brand-muted hover:bg-brand-cream border border-brand-border/80'
              }`}
            >
              All Reviews ({testimonials.length})
            </button>
            <button
              onClick={() => setFilterRating('5')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                filterRating === '5'
                  ? 'bg-brand-espresso text-white shadow-soft'
                  : 'bg-white text-brand-muted hover:bg-brand-cream border border-brand-border/80'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </button>
          </div>
        </div>

        {/* 3. Feedback Cards Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const avatarUrl = item.clientAvatar ? urlFor(item.clientAvatar) : '';
            return (
              <div
                key={item.id || item._id}
                className="bg-white rounded-3xl p-8 border border-brand-border/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <Quote className="w-10 h-10 text-brand-gold/30 mb-4 group-hover:text-brand-gold/60 transition-colors" />

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (item.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-brand-espresso leading-relaxed italic mb-6">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-cream flex items-center gap-3">
                  <img
                    src={avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'}
                    alt={item.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-border"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-brand-espresso">
                      {item.clientName}
                    </h4>
                    <p className="text-xs text-brand-muted">
                      {item.location || 'Chennai'} {item.projectType ? `• ${item.projectType}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Bottom Callout Banner matching mockup ("Be a Part of Our Happy Family") */}
        <section className="bg-brand-espresso text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-card">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold flex items-center justify-center md:justify-start gap-1.5">
              <Heart className="w-4 h-4 fill-brand-gold text-brand-gold" />
              Community of Happy Homes
            </span>
            <h3 className="font-serif text-3xl font-bold leading-tight">
              Be a Part of Our Happy Family
            </h3>
            <p className="text-brand-sand/80 text-sm sm:text-base leading-relaxed">
              Have you recently furnished your home with APJ or completed an interior project with us? Share your feedback with prospective clients!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenReviewModal}
              className="bg-brand-caramel hover:bg-brand-brown text-white font-semibold px-6 py-3.5 rounded-lg shadow-soft transition-colors text-sm"
            >
              Write a Review →
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-lg border border-white/20 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </section>

        {businessInfo?.isDemoNoticeActive && (
          <div className="p-4 rounded-xl bg-brand-cream border border-brand-border/60 text-xs text-brand-muted text-center max-w-2xl mx-auto">
            <strong>Demonstration Transparency:</strong> Testimonials displayed above represent sample reviews designed to demonstrate layout presentation. All genuine client reviews can be managed through the Sanity Studio.
          </div>
        )}
      </div>
    </div>
  );
}
