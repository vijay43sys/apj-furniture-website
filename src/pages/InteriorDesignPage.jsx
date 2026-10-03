import { useState, useMemo } from 'react';
import { Check, ArrowRight, MessageSquare, Compass, Eye, Hammer, KeyRound } from 'lucide-react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import { urlFor } from '../lib/sanity';
import { getProjectWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function InteriorDesignPage({
  projects = [],
  businessInfo,
  onNavigate,
  onBookConsultation,
}) {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Living Room', 'Bedroom', 'Modular Kitchen', 'Commercial & Office'];

  const filteredProjects = useMemo(() => {
    if (selectedType === 'All') return projects;
    return projects.filter((p) => {
      const type = (p.projectType || '').toLowerCase();
      const target = selectedType.toLowerCase();
      return type === target || type.includes(target);
    });
  }, [projects, selectedType]);

  const steps = [
    {
      step: '01',
      icon: Compass,
      title: 'Consultation & Site Visit',
      desc: 'Our senior interior architects visit your site in Chennai / Tamil Nadu to measure dimensions and understand your lifestyle.',
    },
    {
      step: '02',
      icon: Eye,
      title: '3D Design & Space Planning',
      desc: 'Photorealistic 3D visualization showing exact materials, ambient lighting, ergonomics, and furniture layout.',
    },
    {
      step: '03',
      icon: Hammer,
      title: 'Precision Factory Woodcraft',
      desc: 'High-precision manufacturing with seasoned marine-grade ply, natural veneers, and German soft-close hardware.',
    },
    {
      step: '04',
      icon: KeyRound,
      title: 'On-Time Turnkey Handover',
      desc: 'Seamless on-site installation, deep clean, and timely key handover with warranty documentation.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header */}
      <BreadcrumbHeader
        title="Interior Design Services"
        subtitle="Turnkey residential and commercial interior solutions customized for luxury, comfort, and functionality."
        breadcrumb={[{ label: 'Interior Design' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
      />

      {/* 2. Process Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
            How We Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-espresso mt-2">
            From Blueprint to Dream Space
          </h2>
          <p className="text-brand-muted text-sm sm:text-base mt-2">
            A structured, transparent four-stage turnkey methodology guaranteeing quality and fixed delivery timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-brand-border/70 shadow-soft relative overflow-hidden group hover:shadow-hover transition-all"
              >
                <span className="font-serif text-5xl font-black text-brand-cream absolute -top-1 -right-1 select-none group-hover:text-brand-sand/70 transition-colors">
                  {st.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-brand-cream flex items-center justify-center text-brand-caramel mb-4 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-espresso mb-2 relative z-10">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed relative z-10">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-espresso mt-1">
              Featured Completed Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedType === t
                    ? 'bg-brand-espresso text-white shadow-soft'
                    : 'bg-white text-brand-muted hover:bg-brand-cream border border-brand-border/80'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const whatsappUrl = getProjectWhatsAppUrl(businessInfo?.whatsappNumber, project);
            const img = project.mainImage ? urlFor(project.mainImage) : '';

            return (
              <div
                key={project.id || project._id}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-brand-cream overflow-hidden">
                  <img
                    src={img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-brand-espresso/90 backdrop-blur-sm text-brand-gold text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                      {project.projectType}
                    </span>
                    {project.clientLocation && (
                      <span className="bg-white/90 backdrop-blur-sm text-brand-espresso text-xs font-medium px-3 py-1 rounded-md shadow-sm">
                        {project.clientLocation}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-brand-espresso group-hover:text-brand-caramel transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {project.description}
                    </p>

                    {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        {project.scopeOfWork.map((scope, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-brand-cream text-brand-warm px-2.5 py-1 rounded-md"
                          >
                            <Check className="w-3 h-3 text-emerald-600" />
                            {scope}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-brand-cream flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-soft transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire About Similar Project</span>
                    </a>

                    <button
                      onClick={() => onBookConsultation(project.title)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-espresso hover:text-brand-caramel py-2"
                    >
                      <span>Book Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-espresso rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">
              Turnkey Interior Solutions
            </span>
            <h3 className="font-serif text-3xl font-bold leading-tight">
              Ready to Design Your Dream Space?
            </h3>
            <p className="text-brand-sand/80 text-sm sm:text-base leading-relaxed">
              Schedule a site inspection or 1-on-1 design consultation with our interior architects. We provide 3D renders, itemized quotation, and fixed handover schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-brand-caramel hover:bg-brand-brown text-white font-semibold px-6 py-3.5 rounded-lg shadow-card transition-colors text-sm"
            >
              Request Free Site Inspection
            </button>
            <a
              href={getGeneralWhatsAppUrl(businessInfo?.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-lg border border-white/20 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
