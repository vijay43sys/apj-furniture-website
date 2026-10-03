import { ArrowRight, Sparkles, Award, Clock, Headphones, MessageSquare } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { urlFor } from '../lib/sanity';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function HomePage({
  businessInfo,
  categories = [],
  featuredProducts = [],
  testimonials = [],
  onNavigate,
  onSelectProduct,
  onCategoryClick,
}) {
  const whatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  const valueProps = [
    {
      icon: Sparkles,
      title: 'Custom Interior Design',
      desc: 'Tailored to your style and space',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      desc: 'Seasoned solid timber & durable fabrics',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      desc: 'Guaranteed execution and handover',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      desc: 'From initial 3D design to installation',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section matching design mockup */}
      <section className="relative min-h-[580px] lg:min-h-[640px] bg-brand-espresso text-white flex items-center overflow-hidden">
        {/* Background Image with warm gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-100 transform"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-espresso via-brand-espresso/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-brand-gold font-bold bg-brand-warm/60 px-3 py-1 rounded-full border border-brand-gold/30">
              Design Your Dream Space
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Premium Interiors & Furniture for a Better Life
            </h1>

            <p className="text-brand-sand/90 text-base sm:text-lg leading-relaxed font-light">
              Stylish. Comfortable. Timeless. At APJ, we bring your vision to life with bespoke interiors and high-quality furniture for homes, offices, and commercial spaces.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 bg-brand-caramel hover:bg-brand-brown text-white font-semibold px-6 py-3.5 rounded-lg shadow-card hover:shadow-hover transition-all group"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-lg border border-white/20 transition-all backdrop-blur-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Quick WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Value Props Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-10">
        <div className="bg-white rounded-2xl border border-brand-border/80 shadow-card p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-brand-cream">
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 pt-4 sm:pt-0 lg:px-4 first:pt-0 first:pl-0">
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-caramel shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-espresso">{item.title}</h4>
                  <p className="text-xs text-brand-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Categories Section matching mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso">
              Our Featured Categories
            </h2>
            <p className="text-brand-muted text-sm sm:text-base mt-2">
              Explore our wide range of furniture and interior solutions
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-caramel hover:text-brand-espresso transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <div
              key={cat.id || cat._id}
              onClick={() => onCategoryClick ? onCategoryClick(cat.title) : onNavigate('products')}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-brand-border/70 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                <img
                  src={urlFor(cat.image) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-brand-espresso group-hover:text-brand-caramel transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {cat.subtitle || cat.description?.slice(0, 40) || 'Sofas, Units, Furnishings'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Split Promo Banner matching mockup ("Modern Designs for Modern Living") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-brand-warm rounded-3xl overflow-hidden shadow-card text-white flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 space-y-5">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
              Exclusive Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Modern Designs for Modern Living
            </h2>
            <p className="text-brand-sand/90 text-sm sm:text-base leading-relaxed font-light">
              From elegant bespoke furniture to complete home interiors, we create inspiring spaces that blend aesthetic beauty with everyday functionality.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('catalogue')}
                className="inline-flex items-center gap-2 bg-white text-brand-espresso hover:bg-brand-light font-semibold px-6 py-3 rounded-lg shadow-sm transition-all"
              >
                <span>View Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-64 md:h-96 relative">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
              alt="APJ Modern Designs"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. Featured Furniture Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-brand-espresso">
              Featured Furnishings
            </h2>
            <p className="text-brand-muted text-sm mt-1">
              Top-selling handcrafted units ready for home delivery
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-sm font-semibold text-brand-caramel hover:text-brand-espresso transition-colors"
          >
            See All Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
              onSelect={onSelectProduct}
              whatsappNumber={businessInfo?.whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* 6. Testimonial Snippet */}
      {testimonials.length > 0 && (
        <section className="bg-brand-cream/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
              Client Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-espresso mt-2 mb-10">
              Loved by Homeowners Across Tamil Nadu
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {testimonials.slice(0, 3).map((item) => (
                <div
                  key={item.id || item._id}
                  className="bg-white rounded-2xl p-6 border border-brand-border/70 shadow-soft"
                >
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {'★'.repeat(item.rating || 5)}
                  </div>
                  <p className="text-sm text-brand-espresso italic leading-relaxed mb-4">
                    "{item.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={urlFor(item.clientAvatar) || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-brand-espresso">{item.clientName}</h4>
                      <p className="text-xs text-brand-muted">{item.location} • {item.projectType || 'Interior Client'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigate('feedback')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-caramel hover:text-brand-espresso transition-colors"
              >
                <span>Read More Customer Stories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
