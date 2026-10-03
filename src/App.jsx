import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CataloguePage from './pages/CataloguePage';
import InteriorDesignPage from './pages/InteriorDesignPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import StudioPage from './pages/StudioPage';
import ProductModal from './components/common/ProductModal';
import SearchModal from './components/common/SearchModal';
import ReviewModal from './components/common/ReviewModal';
import {
  fetchBusinessSettings,
  fetchCategories,
  fetchProducts,
  fetchFeedback,
  fetchInteriorProjects,
  fetchCatalogueItems,
} from './lib/sanity';
import { getGeneralWhatsAppUrl } from './utils/whatsapp';
import { MessageSquare } from 'lucide-react';

export default function App() {
  // Page Routing State
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '');
    const hash = window.location.hash.replace(/^#/, '');
    if (path === 'studio' || hash === 'studio') return 'studio';
    if (['about', 'products', 'catalogue', 'interiors', 'feedback', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Dynamic Data State
  const [businessInfo, setBusinessInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [interiorProjects, setInteriorProjects] = useState([]);
  const [catalogueItems, setCatalogueItems] = useState([]);

  // Interaction & Modal States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Pre-filled consultation intent
  const [consultationPrefill, setConsultationPrefill] = useState({
    subject: 'General Enquiry',
    product: '',
  });

  // Load Content from Sanity (or fallback gracefully)
  useEffect(() => {
    async function loadContent() {
      try {
        const [
          bizData,
          catData,
          prodData,
          feedData,
          projData,
          catItemsData,
        ] = await Promise.all([
          fetchBusinessSettings(),
          fetchCategories(),
          fetchProducts(),
          fetchFeedback(),
          fetchInteriorProjects(),
          fetchCatalogueItems(),
        ]);

        setBusinessInfo(bizData);
        setCategories(catData);
        setProducts(prodData);
        setTestimonials(feedData);
        setInteriorProjects(projData);
        setCatalogueItems(catItemsData);
      } catch (err) {
        console.error('Error loading Sanity CMS content:', err);
      }
    }

    loadContent();
  }, []);

  // Update hash when navigating for simple bookmarking
  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    if (pageId === 'studio') {
      window.history.pushState(null, '', '/studio');
    } else if (pageId === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/#${pageId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const hash = window.location.hash.replace(/^#/, '');
      if (path === 'studio' || hash === 'studio') {
        setCurrentPage('studio');
      } else if (hash && ['about', 'products', 'catalogue', 'interiors', 'feedback', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle category card click from home/catalogue
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigateTo('products');
  };

  // Handle consultation booking trigger from modal or projects
  const handleBookConsultation = (subjectOrProduct) => {
    setConsultationPrefill({
      subject: 'Interior Consultation',
      product: subjectOrProduct,
    });
    navigateTo('contact');
  };

  // If user opens the Sanity Studio directly
  if (currentPage === 'studio') {
    return <StudioPage onNavigate={navigateTo} />;
  }

  const whatsappFloatingUrl = getGeneralWhatsAppUrl(businessInfo?.whatsappNumber);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      {/* 1. Global Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        businessInfo={businessInfo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Main Page Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            businessInfo={businessInfo}
            categories={categories}
            featuredProducts={products}
            testimonials={testimonials}
            onNavigate={navigateTo}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            businessInfo={businessInfo}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={navigateTo}
            businessInfo={businessInfo}
          />
        )}

        {currentPage === 'catalogue' && (
          <CataloguePage
            catalogueItems={catalogueItems}
            categories={categories}
            onNavigate={navigateTo}
            onSelectProduct={(p) => setSelectedProduct(p)}
            businessInfo={businessInfo}
          />
        )}

        {currentPage === 'interiors' && (
          <InteriorDesignPage
            projects={interiorProjects}
            businessInfo={businessInfo}
            onNavigate={navigateTo}
            onBookConsultation={handleBookConsultation}
          />
        )}

        {currentPage === 'feedback' && (
          <FeedbackPage
            testimonials={testimonials}
            onNavigate={navigateTo}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
            businessInfo={businessInfo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            businessInfo={businessInfo}
            onNavigate={navigateTo}
            prefilledSubject={consultationPrefill.subject}
            prefilledProduct={consultationPrefill.product}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer
        onNavigate={navigateTo}
        businessInfo={businessInfo}
      />

      {/* 4. Floating WhatsApp Quick Connect Button */}
      <aside aria-label="Quick Connect" className="fixed bottom-6 right-6 z-40">
        <a
          href={whatsappFloatingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-full shadow-hover hover:scale-105 transition-all duration-300 font-semibold text-xs tracking-wide group"
          title="Chat with APJ Interior on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* 5. Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBookConsultation={handleBookConsultation}
        whatsappNumber={businessInfo?.whatsappNumber}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
