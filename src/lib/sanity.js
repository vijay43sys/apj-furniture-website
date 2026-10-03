import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
  sampleBusinessSettings,
  sampleCategories,
  sampleProducts,
  sampleFeedback,
  sampleInteriorProjects,
  sampleCatalogue,
} from '../data/sampleData';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'evnielxz';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01';

export const isSanityConfigured = () => {
  return Boolean(
    projectId &&
    projectId !== 'your_sanity_project_id' &&
    projectId !== 'demo-project' &&
    projectId.trim().length > 3
  );
};

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Edge CDN caching for fast read performance
      perspective: 'published',
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Resolves image URL from Sanity asset or string fallback
 */
export function urlFor(source) {
  if (!source) return '';
  if (typeof source === 'string') return source;
  if (builder && source.asset) {
    return builder.image(source).auto('format').fit('max').url();
  }
  return source.asset?.url || '';
}

// ============================================================================
// DATA FETCHING FUNCTIONS (with graceful sample fallback)
// ============================================================================

/**
 * Fetch business information and settings
 */
export async function fetchBusinessSettings() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleBusinessSettings;
  }
  try {
    const query = `*[_type == "businessSettings"][0]`;
    const data = await sanityClient.fetch(query);
    return data || sampleBusinessSettings;
  } catch (err) {
    console.warn('Could not fetch businessSettings from Sanity, using fallback:', err);
    return sampleBusinessSettings;
  }
}

/**
 * Fetch categories
 */
export async function fetchCategories() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleCategories;
  }
  try {
    const query = `*[_type == "category"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      order
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : sampleCategories;
  } catch (err) {
    console.warn('Could not fetch categories from Sanity, using fallback:', err);
    return sampleCategories;
  }
}

/**
 * Fetch published products
 */
export async function fetchProducts() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleProducts;
  }
  try {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      "category": category->title,
      "categorySlug": category->slug.current,
      price,
      originalPrice,
      badge,
      inStock,
      dimensions,
      material,
      description,
      images,
      isFeatured
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : sampleProducts;
  } catch (err) {
    console.warn('Could not fetch products from Sanity, using fallback:', err);
    return sampleProducts;
  }
}

/**
 * Fetch customer feedback
 */
export async function fetchFeedback() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleFeedback;
  }
  try {
    const query = `*[_type == "feedback"] | order(date desc) {
      _id,
      clientName,
      location,
      rating,
      comment,
      clientAvatar,
      projectType,
      date,
      isFeatured
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : sampleFeedback;
  } catch (err) {
    console.warn('Could not fetch feedback from Sanity, using fallback:', err);
    return sampleFeedback;
  }
}

/**
 * Fetch interior projects
 */
export async function fetchInteriorProjects() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleInteriorProjects;
  }
  try {
    const query = `*[_type == "interiorProject"] | order(year desc) {
      _id,
      title,
      "slug": slug.current,
      projectType,
      clientLocation,
      year,
      mainImage,
      gallery,
      description,
      scopeOfWork,
      isFeatured
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : sampleInteriorProjects;
  } catch (err) {
    console.warn('Could not fetch interior projects from Sanity, using fallback:', err);
    return sampleInteriorProjects;
  }
}

/**
 * Fetch catalogue items
 */
export async function fetchCatalogueItems() {
  if (!isSanityConfigured() || !sanityClient) {
    return sampleCatalogue;
  }
  try {
    const query = `*[_type == "catalogueItem"] | order(itemCode asc) {
      _id,
      title,
      itemCode,
      "category": category->title,
      "categorySlug": category->slug.current,
      price,
      dimensions,
      image,
      specifications,
      "brochurePdfUrl": brochurePdf.asset->url,
      inStock
    }`;
    const data = await sanityClient.fetch(query);
    return data && data.length > 0 ? data : sampleCatalogue;
  } catch (err) {
    console.warn('Could not fetch catalogue items from Sanity, using fallback:', err);
    return sampleCatalogue;
  }
}
