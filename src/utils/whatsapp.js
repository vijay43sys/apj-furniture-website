/**
 * Formats a phone number for wa.me URL (digits only, e.g. 919876543210)
 * @param {string} phone
 * @returns {string}
 */
export function sanitizeWhatsAppNumber(phone) {
  if (!phone) return '919876543210';
  const digits = phone.replace(/\D/g, '');
  // Default to India country code 91 if 10 digits provided
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Creates a prefilled WhatsApp link
 * @param {string} phone
 * @param {string} message
 * @returns {string}
 */
export function createWhatsAppLink(phone, message) {
  const cleanNumber = sanitizeWhatsAppNumber(phone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * General enquiry message
 */
export function getGeneralWhatsAppUrl(phone) {
  const msg = `Hello APJ Furniture & Interior, I would like to enquire about your furniture collections and custom interior design services.`;
  return createWhatsAppLink(phone, msg);
}

/**
 * Product-specific enquiry message
 */
export function getProductWhatsAppUrl(phone, product) {
  if (!product) return getGeneralWhatsAppUrl(phone);
  const priceText = product.price ? ` (₹${Number(product.price).toLocaleString('en-IN')})` : '';
  const msg = `Hello APJ Furniture & Interior, I am interested in "${product.title}"${priceText}. Could you please share more details, customization options, and delivery timeline?`;
  return createWhatsAppLink(phone, msg);
}

/**
 * Interior project enquiry message
 */
export function getProjectWhatsAppUrl(phone, project) {
  if (!project) return getGeneralWhatsAppUrl(phone);
  const msg = `Hello APJ Furniture & Interior, I saw your interior project "${project.title}" on your website. I would like to schedule a design consultation for my space.`;
  return createWhatsAppLink(phone, msg);
}

/**
 * Catalogue item enquiry message
 */
export function getCatalogueWhatsAppUrl(phone, item) {
  if (!item) return getGeneralWhatsAppUrl(phone);
  const code = item.itemCode ? ` [Code: ${item.itemCode}]` : '';
  const msg = `Hello APJ Furniture & Interior, I am interested in catalogue model "${item.title}"${code}. Please share catalogue brochure and price details.`;
  return createWhatsAppLink(phone, msg);
}

/**
 * Direct contact form fallback message
 */
export function getContactFormWhatsAppUrl(phone, { name, phone: customerPhone, serviceType, message }) {
  const msg = `Hello APJ Furniture & Interior,\n\nName: ${name}\nPhone: ${customerPhone}\nService: ${serviceType || 'General Enquiry'}\nMessage: ${message}`;
  return createWhatsAppLink(phone, msg);
}
