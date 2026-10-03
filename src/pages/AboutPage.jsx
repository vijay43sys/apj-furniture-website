import { Award, Compass, HeartHandshake, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function AboutPage({ businessInfo, onNavigate }) {
  const whatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  const pillars = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      desc: 'We never compromise on quality. Every joint, seam, and wood finish undergoes stringent durability checks.',
    },
    {
      icon: Compass,
      title: 'Creative Designs',
      desc: 'Unique designs that match your personal lifestyle and maximize the spatial harmony of your architecture.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      desc: 'Your happiness is our success. We maintain complete transparency and continuous communication.',
    },
  ];

  const reasons = [
    'Wide range of furniture & interior solutions',
    'Experienced design team & certified carpenters',
    '100% customizable finishes, materials & dimensions',
    'Reliable delivery & hassle-free on-site installation',
    'Transparent pricing with zero hidden surcharges',
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Page Header */}
      <BreadcrumbHeader
        title="About Us"
        subtitle="Dedicated to crafting enduring living environments and timeless furniture since 2010."
        breadcrumb={[{ label: 'About' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
      />

      {/* 2. Our Story Section matching mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] bg-brand-cream">
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80"
              alt="APJ Interior Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso leading-tight">
              {businessInfo?.aboutStoryTitle || 'Crafting Beautiful Spaces Since 2010'}
            </h2>
            <p className="text-brand-muted text-base leading-relaxed">
              {businessInfo?.aboutStoryText ||
                'APJ Interior & Furniture started with a simple vision — to create beautiful, functional and affordable spaces for every home and business. With years of experience in the industry, we specialize in custom interiors, modern furniture and complete space solutions.'}
            </p>
            <p className="text-brand-muted text-sm leading-relaxed">
              From our flagship studio in Chennai, our designers and master carpenters unite traditional solid wood joinery with cutting-edge 3D space planning. Whether it is a single bespoke dining table or a complete turnkey residential villa, we approach every blueprint with dedicated precision.
            </p>

            <div className="pt-2 flex items-center gap-8">
              <div>
                <span className="font-serif text-3xl font-bold text-brand-espresso">
                  {businessInfo?.statsYearsExperience || 14}+
                </span>
                <p className="text-xs text-brand-muted mt-1 uppercase font-semibold">Years of Excellence</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div>
                <span className="font-serif text-3xl font-bold text-brand-espresso">
                  {businessInfo?.statsProjectsCompleted || 850}+
                </span>
                <p className="text-xs text-brand-muted mt-1 uppercase font-semibold">Spaces Furnished</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div>
                <span className="font-serif text-3xl font-bold text-brand-espresso">
                  {businessInfo?.statsHappyClients || 1200}+
                </span>
                <p className="text-xs text-brand-muted mt-1 uppercase font-semibold">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Highlight Pillars */}
      <section className="bg-brand-cream/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-brand-border/70 shadow-soft space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-caramel">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-espresso">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose APJ Section matching mockup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
              The APJ Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso">
              Why Choose APJ?
            </h2>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              We combine creativity, quality, and affordability to deliver interiors and handcrafted furniture that truly feel like home.
            </p>

            <div className="space-y-3.5 pt-2">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-medium text-brand-espresso">{reason}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 bg-brand-espresso hover:bg-brand-brown text-white font-semibold px-6 py-3 rounded-lg shadow-soft transition-colors"
              >
                <span>Book Free Design Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] bg-brand-cream">
            <img
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80"
              alt="APJ Bedroom Design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. Callout Banner matching mockup ("Your Dream Space Is Our Mission") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative bg-brand-cream rounded-3xl overflow-hidden border border-brand-border p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-espresso">
              Your Dream Space Is Our Mission
            </h3>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Ready to elevate your home or commercial space? Connect with our interior architects for personal consultation and quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-espresso hover:bg-brand-brown text-white font-semibold px-6 py-3 rounded-lg shadow-soft transition-colors"
            >
              Get in Touch →
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold px-5 py-3 rounded-lg transition-colors shadow-soft"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
