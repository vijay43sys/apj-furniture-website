import { Suspense, lazy } from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2, ArrowLeft } from 'lucide-react';
import sanityConfig from '../sanity/sanity.config';
import { isSanityConfigured } from '../lib/sanity';

// Lazy load Studio to keep main bundle lean
const LazyStudio = lazy(() =>
  import('sanity').then((mod) => ({ default: mod.Studio })).catch(() => ({
    default: () => null,
  }))
);

export default function StudioPage({ onNavigate }) {
  const configured = isSanityConfigured();

  if (configured) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="bg-brand-espresso text-white px-4 py-2 flex items-center justify-between text-xs border-b border-brand-warm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span className="font-semibold">APJ Furniture — Sanity Studio Content Management</span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1 text-brand-sand hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[80vh] text-white">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-slate-300">Loading Sanity Studio...</p>
              </div>
            </div>
          }
        >
          <LazyStudio config={sanityConfig} />
        </Suspense>
      </div>
    );
  }

  // Helpful Setup & Security Guide when Project ID is yet to be plugged into .env
  return (
    <div className="min-h-screen bg-brand-light py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-espresso hover:text-brand-caramel transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to APJ Furniture Website</span>
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border/80 shadow-card space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-caramel">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
                Content Management System
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-espresso">
                Sanity Studio Portal
              </h1>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-border/60 text-sm text-brand-muted leading-relaxed">
            <p className="font-semibold text-brand-espresso mb-1">
              Zero Hardcoded Credentials Security Architecture:
            </p>
            This website does <strong>not</strong> use a fake admin login with hardcoded passwords. All content editing is managed securely through <strong>Sanity Studio</strong> with official role-based single sign-on (Google, GitHub, email).
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg font-bold text-brand-espresso">
              Setup Steps for Client & Developer:
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-espresso">1. Sanity Project Ownership:</strong>
                  <p className="text-brand-muted">
                    The client creates their project at <a href="https://sanity.io/manage" target="_blank" rel="noreferrer" className="text-brand-caramel underline">sanity.io/manage</a> and invites the developer as a team member.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-espresso">2. Configure Environment Variable:</strong>
                  <p className="text-brand-muted">
                    Add your Sanity Project ID to <code className="bg-brand-cream px-1.5 py-0.5 rounded text-xs font-mono text-brand-espresso">.env</code> or Vercel Environment Variables:
                    <br />
                    <code className="block bg-slate-900 text-emerald-400 p-2.5 rounded-lg text-xs font-mono mt-1">
                      VITE_SANITY_PROJECT_ID="your_project_id"
                    </code>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-brand-espresso">3. Manageable Schemas Included:</strong>
                  <p className="text-brand-muted">
                    The schemas for <strong>Products, Categories, Interior Projects, Customer Feedback, Catalogue, Business Information, and SEO</strong> are already fully configured in this codebase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-cream flex flex-wrap gap-4">
            <a
              href="https://www.sanity.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-espresso hover:bg-brand-brown text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-soft transition-colors"
            >
              <span>Sanity Documentation</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl border border-brand-border text-brand-espresso hover:bg-brand-cream text-sm font-semibold transition-colors"
            >
              View Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
