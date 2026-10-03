import { useState, useMemo } from 'react';
import { Download, MessageSquare, ArrowRight, FileText } from 'lucide-react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import { urlFor } from '../lib/sanity';
import { getCatalogueWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function CataloguePage({
  catalogueItems = [],
  onNavigate,
  businessInfo,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryList = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Storage'];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return catalogueItems;
    return catalogueItems.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      return cat === target || cat.includes(target);
    });
  }, [catalogueItems, selectedCategory]);

  const generalWhatsappUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Page Header */}
      <BreadcrumbHeader
        title="Catalogue"
        subtitle="Detailed specification sheets, dimensions, and model codes for interior designers and homeowners."
        breadcrumb={[{ label: 'Catalogue' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 2. Left Sidebar Filter matching mockup */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-border/80 shadow-soft p-5 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-brand-espresso pb-3 border-b border-brand-cream">
                Categories
              </h3>
              <div className="space-y-1.5 mt-3">
                {categoryList.map((catName) => {
                  const isActive = selectedCategory === catName;
                  const count = catName === 'All'
                    ? catalogueItems.length
                    : catalogueItems.filter((i) => (i.category || '').toLowerCase().includes(catName.toLowerCase())).length;

                  return (
                    <button
                      key={catName}
                      onClick={() => setSelectedCategory(catName)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-espresso text-white font-semibold shadow-soft'
                          : 'text-brand-muted hover:bg-brand-cream hover:text-brand-espresso'
                      }`}
                    >
                      <span>{catName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-brand-cream text-brand-muted'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Brochure CTA box */}
              <div className="mt-8 p-4 rounded-xl bg-brand-cream/80 border border-brand-border/60 text-center space-y-3">
                <FileText className="w-8 h-8 text-brand-caramel mx-auto" />
                <h4 className="text-xs font-bold text-brand-espresso uppercase tracking-wider">
                  Request Full PDF Catalogue
                </h4>
                <p className="text-[11px] text-brand-muted">
                  Get our high-resolution 2026 interior catalogue with complete dimensional schematics sent to your WhatsApp.
                </p>
                <a
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-soft transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3. Right Catalogue Items Grid matching mockup */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border/60">
              <span className="text-sm font-medium text-brand-muted">
                Showing <strong className="text-brand-espresso">{filteredItems.length}</strong> items in{' '}
                <strong className="text-brand-caramel">{selectedCategory}</strong>
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-brand-border p-6">
                <p className="text-brand-muted text-sm">No catalogue items listed under this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                  const itemWhatsappUrl = getCatalogueWhatsAppUrl(businessInfo?.whatsappNumber, item);
                  const img = item.image ? urlFor(item.image) : '';

                  return (
                    <div
                      key={item.id || item._id}
                      className="group bg-white rounded-xl border border-brand-border/80 shadow-soft hover:shadow-hover overflow-hidden transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-brand-cream overflow-hidden">
                        <img
                          src={img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {item.itemCode && (
                          <span className="absolute top-3 left-3 bg-brand-espresso/90 text-brand-gold text-[10px] font-mono uppercase px-2 py-0.5 rounded shadow-sm">
                            {item.itemCode}
                          </span>
                        )}
                        <a
                          href={itemWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 bg-white hover:bg-[#25D366] text-brand-espresso hover:text-white p-2 rounded-full shadow-card transition-colors"
                          title="Enquire on WhatsApp"
                          aria-label={`Enquire about ${item.title}`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-caramel">
                            {item.category}
                          </span>
                          <h4 className="font-serif text-base font-bold text-brand-espresso mt-0.5">
                            {item.title}
                          </h4>
                          {item.price && (
                            <p className="text-sm font-bold text-brand-espresso mt-1">
                              ₹ {Number(item.price).toLocaleString('en-IN')}
                            </p>
                          )}
                          {item.dimensions && (
                            <p className="text-xs text-brand-muted mt-1">
                              Dim: {item.dimensions}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 mt-3 border-t border-brand-cream flex items-center justify-between text-xs">
                          <a
                            href={itemWhatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-brand-espresso hover:text-brand-caramel transition-colors"
                          >
                            <span>WhatsApp Quote</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
