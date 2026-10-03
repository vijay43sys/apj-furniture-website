import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Submits a customer enquiry to Supabase (or demo storage if unconfigured).
 *
 * @param {Object} enquiry
 * @param {string} enquiry.name
 * @param {string} [enquiry.email]
 * @param {string} enquiry.phone
 * @param {string} [enquiry.serviceType]
 * @param {string} enquiry.message
 * @param {string} [enquiry.productReference]
 * @returns {Promise<{ success: boolean, data?: any, error?: string, isDemo?: boolean }>}
 */
export async function submitEnquiry({
  name,
  email = '',
  phone,
  serviceType = 'General Enquiry',
  message,
  productReference = '',
}) {
  // 1. Client-side validation
  if (!name || !name.trim()) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!phone || !phone.trim() || phone.trim().length < 7) {
    return { success: false, error: 'Please enter a valid phone number.' };
  }
  if (!message || !message.trim()) {
    return { success: false, error: 'Please enter your enquiry message.' };
  }

  const payload = {
    name: name.trim(),
    email: email ? email.trim() : null,
    phone: phone.trim(),
    service_type: serviceType,
    message: message.trim(),
    product_reference: productReference || null,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  // 2. Real Supabase submission if credentials exist
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([payload])
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase submission error:', error);
        return {
          success: false,
          error: error.message || 'Failed to submit enquiry. Please try again or reach out on WhatsApp.',
        };
      }

      return {
        success: true,
        data,
        isDemo: false,
        message: 'Your enquiry has been received. Our team will contact you shortly!',
      };
    } catch (err) {
      console.error('Unexpected Supabase error:', err);
      return {
        success: false,
        error: 'Network error submitting enquiry. Please connect directly via WhatsApp.',
      };
    }
  }

  // 3. Graceful demo fallback when Supabase keys are not yet provided
  console.info('Supabase is not configured yet. Saving enquiry locally for demo simulation.');
  await new Promise((res) => setTimeout(res, 600)); // Simulate network latency

  try {
    const existing = JSON.parse(localStorage.getItem('apj_demo_enquiries') || '[]');
    const demoRecord = { id: 'demo-' + Date.now(), ...payload };
    existing.unshift(demoRecord);
    localStorage.setItem('apj_demo_enquiries', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // ignore localStorage errors in private browsing
  }

  return {
    success: true,
    data: { id: 'demo-' + Date.now() },
    isDemo: true,
    message: 'Enquiry submitted successfully (Demo Mode - Supabase unlinked). Our team will connect with you!',
  };
}
