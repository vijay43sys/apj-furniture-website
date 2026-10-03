import { useState } from 'react';
import { X, Star, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitEnquiry } from '../../services/enquiryService';

export default function ReviewModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    rating: 5,
    serviceType: 'Living Room Furniture',
    comment: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    const result = await submitEnquiry({
      name: formData.name,
      phone: formData.phone || '0000000000',
      serviceType: `Review: ${formData.rating} Stars (${formData.serviceType})`,
      message: `Location: ${formData.location || 'Tamil Nadu'}\nRating: ${formData.rating}/5\nService: ${formData.serviceType}\nReview: ${formData.comment}`,
    });

    if (result.success) {
      setStatus({ submitting: false, success: true, error: null });
      setTimeout(() => {
        onClose();
        setStatus({ submitting: false, success: false, error: null });
        setFormData({
          name: '',
          phone: '',
          location: '',
          rating: 5,
          serviceType: 'Living Room Furniture',
          comment: '',
        });
      }, 2500);
    } else {
      setStatus({
        submitting: false,
        success: false,
        error: result.error || 'Failed to submit review.',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-hover relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-cream text-brand-muted"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-brand-caramel font-bold">
            Share Experience
          </span>
          <h3 className="font-serif text-2xl font-bold text-brand-espresso mt-0.5">
            Write a Customer Review
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            Your review will be verified by the APJ team and featured in our customer showcase.
          </p>
        </div>

        {status.success ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900">Thank you for your review!</h4>
            <p className="text-xs text-emerald-700">
              We appreciate you sharing your experience with APJ Furniture & Interior.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {status.error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-brand-espresso mb-1">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-espresso mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh K."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-brand-espresso outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-espresso mb-1">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-brand-espresso outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-brand-espresso mb-1">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-brand-espresso outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-espresso mb-1">Product / Project</label>
                <input
                  type="text"
                  placeholder="e.g. L-Shape Sofa"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-border text-brand-espresso outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-espresso mb-1">Your Review *</label>
              <textarea
                required
                rows={3}
                placeholder="How was the wood craftsmanship, finish, and delivery experience?"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-border text-brand-espresso outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-espresso hover:bg-brand-brown text-white font-semibold py-3 rounded-xl transition-colors shadow-soft"
            >
              <Send className="w-4 h-4" />
              <span>{status.submitting ? 'Submitting...' : 'Submit Review'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
