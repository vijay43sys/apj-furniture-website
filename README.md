# APJ Furniture & Interior — Production Architecture

Modern, high-performance website and content management system for **APJ Furniture & Interior**.

---

## Architecture Overview

1. **Frontend**: React 19 + Vite + Tailwind CSS + Lucide Icons + Framer Motion.
2. **Content Management**: **Sanity CMS (v3)** is the single source of truth for all public content (products, categories, product images, interior projects, customer feedback, catalogue, business information, and SEO).
3. **Transactional Database**: **Supabase (PostgreSQL with Row Level Security)** strictly for storing incoming customer enquiries and consultation requests.
4. **Deployment**: **Vercel** with global edge CDN caching.

> **Security Note**: No fake custom admin username/password or mock dashboard exists in this application. Sanity Studio at `/studio` provides role-based authentication via Google/GitHub/Email single sign-on. Supabase credentials use only the public `anon` key with write-only Row-Level Security.

---

## Client vs. Developer Ownership Model

```
┌────────────────────────────────────────────────────────┐
│                        CLIENT                          │
│  - Owns the Sanity project (invites developer)        │
│  - Owns the Supabase project (invites developer)      │
│  - Owns the Vercel team/project                       │
│  - Owns the domain name (DNS points to Vercel)         │
│  - Never needs to share personal passwords             │
└──────────────────────────┬─────────────────────────────┘
                           │ Invites developer
┌──────────────────────────▼─────────────────────────────┐
│                      DEVELOPER                         │
│  - Has Developer / Editor access on Sanity             │
│  - Has Developer access on Supabase                   │
│  - Maintains codebase, schemas, and CI/CD pipelines    │
└────────────────────────────────────────────────────────┘
```

---

## Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SANITY_PROJECT_ID` | Client's Sanity Project ID (from [sanity.io/manage](https://sanity.io/manage)) |
| `VITE_SANITY_DATASET` | Sanity dataset name (`production`) |
| `VITE_SANITY_API_VERSION` | Sanity API version (`2024-03-01`) |
| `VITE_SUPABASE_URL` | Supabase Project URL (`https://your-ref.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anonymous key (never service role!) |
| `VITE_DEFAULT_WHATSAPP` | Default WhatsApp phone number (e.g. `919876543210`) |

---

## Sanity CMS Schemas (`src/sanity/schemas/`)

The CMS manages the following content types:
- `category.js`: Product category titles, slugs, cover images, descriptions, and display orders.
- `product.js`: Furniture title, category reference, price, original discount price, multi-angle images, dimensions, materials, in-stock badge, and homepage highlight toggle.
- `interiorProject.js`: Completed turnkey interior spaces, project type (Living Room, Modular Kitchen, Bedroom, Office), hero image, gallery, location, and scope of work.
- `feedback.js`: Verified customer reviews, ratings (1–5 stars), customer avatar, location, and featured flags.
- `catalogueItem.js`: Technical catalogue listings, model codes/SKUs, dimensions, specifications, and PDF brochure link.
- `businessSettings.js`: Singleton document managing company name, tagline, phone, WhatsApp business number, showroom address, opening hours, Google Maps embed, social links, and about page narrative.
- `seoSettings.js`: Meta titles, descriptions, and OpenGraph social sharing assets.

### Accessing Sanity Studio

- Navigate to `/studio` in your browser.
- Log in securely using your invited Sanity team account credentials.

---

## Supabase Transactional Setup

Customer contact enquiries and consultation requests are persisted in Supabase with strict Row-Level Security (RLS).

1. In your Supabase Dashboard, open the **SQL Editor**.
2. Run the migration script located in [`supabase/migrations/01_enquiries_schema.sql`](./supabase/migrations/01_enquiries_schema.sql).
3. The migration automatically creates:
   - `public.enquiries` table with constraints and indexes.
   - Row Level Security policy allowing anonymous visitors **only** to `INSERT` records.
   - Secure access policies allowing authenticated staff to view and update enquiry statuses (`new`, `contacted`, `in_progress`, `completed`).

---

## Local Development & Testing

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Check linting standards
npm run lint

# 4. Compile production build
npm run build
```

---

## Customer Pages

- **Home**: Hero banner, value propositions, featured categories, promo split banner, top products, and testimonial preview.
- **About**: Brand heritage narrative ("Crafting Beautiful Spaces Since 2010"), craftsmanship pillars, why choose APJ checklist, and consultation prompt.
- **Products**: Filterable furniture grid by category (Living Room, Bedroom, Dining Room, Office, Storage), item details modal, specs, and WhatsApp inquiry buttons.
- **Catalogue**: Specification sheet view with SKU codes, dimensions, category sidebar counts, and full PDF catalogue request.
- **Interior Design**: Turnkey residential and commercial interior solutions, 4-stage process workflow, and portfolio gallery.
- **Customer Feedback**: Real customer stories, verified 5-star reviews, and review submission dialog.
- **Contact Us**: Showroom address, phone, email, Google Maps embed, and secure Supabase-backed enquiry form with instant WhatsApp fallback.
