import { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import { submitEnquiry } from '../services/enquiryService';
import { getContactFormWhatsAppUrl } from '../utils/whatsapp';

export default function ContactPage({
  businessInfo,
  onNavigate,
  prefilledSubject = 'General Enquiry',
  prefilledProduct = '',
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: prefilledSubject || 'General Enquiry',
    message: prefilledProduct ? `I am interested in ${prefilledProduct}. Please share pricing and details.` : '',
    productReference: prefilledProduct || '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error) setStatus({ ...status, error: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, message: '' });

    const result = await submitEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      message: formData.message,
      productReference: formData.productReference,
    });

    if (result.success) {
      setStatus({
        submitting: false,
        success: true,
        error: null,
        message: result.message || 'Thank you! Your enquiry has been received.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: 'General Enquiry',
        message: '',
        productReference: '',
      });
    } else {
      setStatus({
        submitting: false,
        success: false,
        error: result.error || 'Failed to submit enquiry. Please try WhatsApp.',
        message: '',
      });
    }
  };

  const whatsappDirectUrl = getContactFormWhatsAppUrl(businessInfo?.whatsappNumber, formData);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header */}
      <BreadcrumbHeader
        title="Contact Us"
        subtitle="Visit our Chennai showroom or send us an enquiry for custom furniture, site visits, and interior quotes."
        breadcrumb={[{ label: 'Contact' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 2. Left Column: Get in Touch matching mockup */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-espresso mt-1">
                Get in Touch
              </h2>
              <p className="text-brand-muted text-sm sm:text-base mt-2 leading-relaxed">
                We'd love to hear from you. Feel free to reach out for any queries, bespoke design consultations, or order support.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border/80 shadow-soft space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-caramel shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-muted">Phone</h4>
                  <a
                    href={`tel:${businessInfo?.phone || '+919841079487'}`}
                    className="text-base font-bold text-brand-espresso hover:text-brand-caramel transition-colors"
                  >
                    {businessInfo?.phone || '+91 9841079487'}
                  </a>
                  <p className="text-xs text-brand-muted mt-0.5">
                    {businessInfo?.workingHours || 'Mon - Sat: 9:00 AM - 7:00 PM'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-caramel shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-muted">Email</h4>
                  <a
                    href={`mailto:${businessInfo?.email || 'info@apjinteriors.com'}`}
                    className="text-base font-bold text-brand-espresso hover:text-brand-caramel transition-colors"
                  >
                    {businessInfo?.email || 'info@apjinteriors.com'}
                  </a>
                  <p className="text-xs text-brand-muted mt-0.5">Direct design proposals & inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-caramel shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-muted">Showroom & Workshop</h4>
                  <p className="text-sm font-semibold text-brand-espresso mt-0.5 leading-snug">
                    {businessInfo?.address || 'No. 12, Anna Salai, Chennai, Tamil Nadu - 600001'}
                  </p>
                  <p className="text-xs text-brand-muted mt-0.5">Customer parking available on-site</p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-brand-border shadow-soft h-64 bg-brand-cream">
              <iframe
                title="APJ Furniture Location"
                src="https://maps.google.com/maps?q=Anna+Salai+Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* 3. Right Column: Send Us a Message (Supabase Form) matching mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border/80 shadow-card">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
                  Enquiry Form
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-espresso mt-1">
                  Send Us a Message
                </h3>
                <p className="text-sm text-brand-muted mt-1">
                  Fill in your details below. Your enquiry is stored securely in our database and our team will get in touch within 24 hours.
                </p>
              </div>

              {/* Status Alerts */}
              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Enquiry Submitted Successfully!</h4>
                    <p className="text-xs mt-0.5 text-emerald-700">{status.message}</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Submission Error</h4>
                    <p className="text-xs mt-0.5 text-rose-700">{status.error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-espresso mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-espresso focus:ring-1 focus:ring-brand-espresso text-sm text-brand-espresso bg-brand-cream/30 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-espresso mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9841079487"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-espresso focus:ring-1 focus:ring-brand-espresso text-sm text-brand-espresso bg-brand-cream/30 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-espresso mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-espresso focus:ring-1 focus:ring-brand-espresso text-sm text-brand-espresso bg-brand-cream/30 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-espresso mb-1.5">
                      Service / Enquiry Type
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-espresso focus:ring-1 focus:ring-brand-espresso text-sm text-brand-espresso bg-brand-cream/30 outline-none transition-all"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Living Room Interior">Living Room Interior</option>
                      <option value="Bedroom Interior & Wardrobe">Bedroom Interior & Wardrobe</option>
                      <option value="Modular Kitchen Consultation">Modular Kitchen Consultation</option>
                      <option value="Commercial & Office Fitout">Commercial & Office Fitout</option>
                      <option value="Custom Furniture Manufacturing">Custom Furniture Manufacturing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-espresso mb-1.5">
                    Your Requirements / Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your room dimensions, preferred furniture models, design ideas, or budget expectations..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-espresso focus:ring-1 focus:ring-brand-espresso text-sm text-brand-espresso bg-brand-cream/30 outline-none transition-all"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-espresso hover:bg-brand-brown text-white font-semibold px-8 py-3.5 rounded-xl shadow-soft hover:shadow-card transition-all disabled:opacity-50 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status.submitting ? 'Submitting to Database...' : 'Send Message'}</span>
                  </button>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold px-6 py-3.5 rounded-xl shadow-soft transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp Instead</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
