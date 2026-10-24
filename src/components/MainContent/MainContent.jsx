import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../../locales/translations';
import { supabase } from '../../supabaseClient';
import './MainContent.css';

export default function MainContent({ currentLang, onAddToCart }) {
  const isRtl = currentLang === 'ar';
  const t = translations[currentLang]?.home || translations['ar'].home;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالة كلمة البحث
  const [searchQuery, setSearchQuery] = useState('');

  // قاموس ترجمات الشارات (Badge Translations)
  const badgeTranslations = {
    'تخفيض': { ar: 'تخفيض', en: 'Sale', fr: 'Promo', es: 'Oferta' },
    'Sale': { ar: 'تخفيض', en: 'Sale', fr: 'Promo', es: 'Oferta' },
    'جديد': { ar: 'جديد', en: 'New', fr: 'Nouveau', es: 'Nuevo' },
    'New': { ar: 'جديد', en: 'New', fr: 'Nouveau', es: 'Nuevo' },
    'الأكثر مبيعا': { ar: 'الأكثر مبيعة', en: 'Best Seller', fr: 'Meilleure vente', es: 'Más vendido' },
    'Best Seller': { ar: 'الأكثر مبيعة', en: 'Best Seller', fr: 'Meilleure vente', es: 'Más vendido' },
    'رقمي': { ar: 'رقمي', en: 'Digital', fr: 'Numérique', es: 'Digital' },
    'مجسمات': { ar: 'مجسمات', en: 'Figures', fr: 'Figurines', es: 'Figuras' }
  };

  // قاموس ترجمات عنوان قسم المجسمات
  const figuresTitles = {
    ar: 'المجسمات',
    en: 'Figures',
    fr: 'Figurines',
    es: 'Figuras'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [loading, searchQuery]);

  useEffect(() => {
    async function fetchHomeProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching home products from Supabase:', error.message);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeProducts();
  }, []);

  // معالجة البحث عند الضغط على Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products', { state: { searchQuery: searchQuery.trim() } });
    }
  };

  // الفلترة الفورية للمنتجات أثناء الكتابة
  const filteredProducts = searchQuery.trim()
    ? products.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const categories = [
    { id: 1, image: "/6photo(1).png", key: "أجهزة الألعاب", name: { ar: "أجهزة الألعاب", en: "Consoles", fr: "Consoles", es: "Consolas" } },
    { id: 2, image: "/6photo(2).png", key: "مجسمات", name: { ar: "مجسمات", en: "Figures", fr: "Figurines", es: "Figuras" } },
    { id: 3, image: "/6photo(3).png", key: "إكسسوارات", name: { ar: "إكسسوارات", en: "Accessories", fr: "Accessoires", es: "Accesorios" } },
    { id: 4, image: "/6photo(4).png", key: "اجهزة مستعملة", name: { ar: "اجهزة مستعملة", en: "Used Consoles", fr: "Consoles d'occasion", es: "Consolas usadas" } },
    { id: 5, image: "/6photo(5).png", key: "ألعاب", name: { ar: "ألعاب", en: "Games", fr: "Jeux", es: "Juegos" } },
    { id: 6, image: "/6photo(6).png", key: "بطاقات رقمية", name: { ar: "بطاقات رقمية", en: "Digital Cards", fr: "Cartes Cadeaux", es: "Tarjetas Digitales" } },
  ];

  // تصفية قسم وصل حديثاً
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newlyArrivedProducts = filteredProducts.filter(p => 
    (p.created_at && new Date(p.created_at) >= thirtyDaysAgo) || 
    ['جديد', 'New'].includes(p.badge)
  );

  const newProducts = newlyArrivedProducts.length > 0 
    ? newlyArrivedProducts.slice(0, 5) 
    : filteredProducts.slice(0, 5);

  const bestSellers = filteredProducts.filter(p => p.badge === 'الأكثر مبيعا' || p.badge === 'Best Seller').slice(0, 5);
  
  // تصفية قسم العروض
  const discountProducts = filteredProducts.filter(p => 
    (p.discount_price && Number(p.discount_price) > 0) || 
    ['تخفيض', 'Sale', 'Promo', 'Oferta'].includes(p.badge)
  ).slice(0, 5);

  const digitalProducts = filteredProducts.filter(p => p.category === 'digital' || p.badge === 'رقمي' || p.category === 'بطاقات رقمية').slice(0, 5);
  const figuresProducts = filteredProducts.filter(p => p.category === 'مجسمات' || p.category === 'figures' || p.badge === 'مجسمات').slice(0, 5);

  // دالة تحديد كلاس الشارة بناءً على نوعها
  const getBadgeClass = (badgeText) => {
    if (!badgeText) return 'sale-badge';
    if (['تخفيض', 'Sale', 'Promo', 'Oferta'].includes(badgeText)) return 'sale-badge';
    if (['جديد', 'New'].includes(badgeText)) return 'new-badge';
    return 'default-badge';
  };

  // دالة ترجمة النص الخاص بالشارة حسب اللغة الحالية
  const translateBadge = (rawBadge) => {
    if (!rawBadge) return '';
    const translatedObj = badgeTranslations[rawBadge];
    if (translatedObj) {
      return translatedObj[currentLang] || translatedObj['ar'] || rawBadge;
    }
    return rawBadge;
  };

  const renderProductCard = (prod, index, isDirectVisible = false) => {
    const rawBadge = prod.badge || (prod.discount_price ? 'تخفيض' : null);
    const displayedBadge = translateBadge(rawBadge);

    return (
      <div 
        key={prod.id} 
        className="product-card" 
        onClick={() => navigate(`/product/${prod.id}`)}
        style={{ 
          cursor: 'pointer',
          '--card-index': index,
          ...(isDirectVisible ? { opacity: 1, transform: 'none', visibility: 'visible' } : {})
        }}
      >
        {rawBadge && (
          <span className={`product-badge ${getBadgeClass(rawBadge)}`}>
            {displayedBadge}
          </span>
        )}
        <div className="product-image-container">
          {prod.image_url ? (
            <img src={prod.image_url} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          ) : (
            <span>photo</span>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-title" title={prod.title}>{prod.title}</h3>
          
          <div className="product-price-row">
            <div className="product-price-box">
              {prod.discount_price ? (
                <>
                  <span className="product-price discount">{prod.discount_price} DZD</span>
                  <span className="product-price old">{prod.price} DZD</span>
                </>
              ) : (
                <span className="product-price">{prod.price} DZD</span>
              )}
            </div>
          </div>

          <button 
            className="add-to-cart-btn" 
            onClick={(e) => {
              e.stopPropagation();
              // التأكد من تحديد السعر النهائي المخفض قبل الإرسال للسلة
              const effectivePrice = (prod.discount_price && Number(prod.discount_price) > 0)
                ? prod.discount_price
                : prod.price;

              onAddToCart && onAddToCart({
                ...prod,
                price: effectivePrice
              });
            }}
          >
            {t.addToCart}
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="store-main-container">
      {/* 1. قسم البحث */}
      <div 
        className="search-section fade-in-section" 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          margin: '20px 0' 
        }}
      >
        <form 
          onSubmit={handleSearchSubmit} 
          style={{ 
            width: '100%', 
            maxWidth: '650px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'center' 
          }}
        >
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            className="store-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%' }}
          />
        </form>
      </div>

      {/* نتائج البحث */}
      {searchQuery.trim() && (
        <section className="products-section fade-in-section is-visible" style={{ marginBottom: '30px', opacity: 1, visibility: 'visible' }}>
          <div className="section-header">
            <h2 className="section-title">
              {isRtl ? 'نتائج البحث' : 'Search Results'} ({filteredProducts.length})
            </h2>
            <button 
              className="view-all-btn" 
              onClick={() => navigate('/products', { state: { searchQuery: searchQuery.trim() } })}
            >
              {t.viewAll}
            </button>
          </div>
          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>
                {isRtl ? 'لا توجد منتجات مطابقة لـ' : 'No products found matching'} "{searchQuery}"
              </p>
            ) : (
              filteredProducts.slice(0, 10).map((prod, idx) => renderProductCard(prod, idx, true))
            )}
          </div>
        </section>
      )}

      {/* 2. تصفح حسب الفئة */}
      <section className="categories-section fade-in-section">
        <h2 className="section-title">{t.categoriesTitle}</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className="category-item"
              onClick={() => navigate('/products', { state: { category: cat.key } })}
            >
              <div 
                className="category-circle" 
                style={{ '--cat-index': index }}
              >
                <img src={cat.image} alt={cat.name[currentLang] || cat.name['ar']} className="category-img" />
              </div>
              <span className="category-name">
                {cat.name[currentLang] || cat.name['ar']}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. قسم وصل حديثاً */}
      <section id="new" className="products-section fade-in-section" style={{ scrollMarginTop: '100px' }}>
        <div className="section-header">
          <h2 className="section-title">{t.newProducts}</h2>
          <button 
            className="view-all-btn" 
            onClick={() => navigate('/products', { state: { newlyArrived: true } })}
          >
            {t.viewAll}
          </button>
        </div>
        <div className="products-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
          ) : (
            newProducts.map((prod, idx) => renderProductCard(prod, idx))
          )}
        </div>
      </section>

      {/* 4. قسم الأكثر مبيعاً */}
      <section id="bestsellers" className="products-section fade-in-section" style={{ scrollMarginTop: '100px' }}>
        <div className="section-header">
          <h2 className="section-title">{t.bestSellers}</h2>
          <button 
            className="view-all-btn" 
            onClick={() => navigate('/products', { state: { bestSellersOnly: true } })}
          >
            {t.viewAll}
          </button>
        </div>
        <div className="products-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
          ) : (
            (bestSellers.length > 0 ? bestSellers : products.slice(0, 5)).map((prod, idx) => renderProductCard(prod, idx))
          )}
        </div>
      </section>

      {/* 5. قسم التخفيضات والعروض */}
      <section id="discounts" className="products-section fade-in-section" style={{ scrollMarginTop: '100px' }}>
        <div className="section-header">
          <h2 className="section-title">{t.discounts}</h2>
          <button 
            className="view-all-btn" 
            onClick={() => navigate('/products', { state: { offersOnly: true } })}
          >
            {t.viewAll}
          </button>
        </div>
        <div className="products-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
          ) : (
            (discountProducts.length > 0 ? discountProducts : products.slice(0, 5)).map((prod, idx) => renderProductCard(prod, idx))
          )}
        </div>
      </section>

      {/* 6. قسم المنتجات الرقمية */}
      <section id="digital" className="products-section fade-in-section" style={{ scrollMarginTop: '100px' }}>
        <div className="section-header">
          <h2 className="section-title">{t.digitalProducts}</h2>
          <button 
            className="view-all-btn" 
            onClick={() => navigate('/products', { state: { category: 'بطاقات رقمية' } })}
          >
            {t.viewAll}
          </button>
        </div>
        <div className="products-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
          ) : (
            (digitalProducts.length > 0 ? digitalProducts : products.slice(0, 5)).map((prod, idx) => renderProductCard(prod, idx))
          )}
        </div>
      </section>

      {/* 7. قسم المجسمات */}
      <section id="figures" className="products-section fade-in-section" style={{ scrollMarginTop: '100px' }}>
        <div className="section-header">
          <h2 className="section-title">
            {t.figuresTitle || figuresTitles[currentLang] || figuresTitles['ar']}
          </h2>
          <button 
            className="view-all-btn" 
            onClick={() => navigate('/products', { state: { category: 'مجسمات' } })}
          >
            {t.viewAll}
          </button>
        </div>
        <div className="products-grid">
          {loading ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8' }}>{isRtl ? 'جاري التحميل...' : 'Loading...'}</p>
          ) : (
            (figuresProducts.length > 0 ? figuresProducts : products.slice(0, 5)).map((prod, idx) => renderProductCard(prod, idx))
          )}
        </div>
      </section>

      {/* 8. قسم جميع أقسام المتجر */}
      <section id="all-categories" className="store-categories-section fade-in-section">
        <h2 className="section-title">{t.allCategories}</h2>
        <div className="store-categories-grid">
          {[
            { id: 1, image: "/a9sam(1).jpg", category: "ألعاب" },
            { id: 2, image: "/a9sam(2).jpg", category: "بطاقات رقمية" },
            { id: 3, image: "/a9sam(3).jpg", category: "مجسمات" },
            { id: 4, image: "/a9sam(4).jpg", category: "إكسسوارات" },
            { id: 5, image: "/a9sam(5).jpg", category: "أجهزة الألعاب" },
            { id: 6, image: "/a9sam(6).jpg", category: "اجهزة مستعملة" },
          ].map((item, index) => (
            <div 
              key={item.id} 
              className="store-category-box" 
              style={{ '--box-index': index }}
              onClick={() => navigate('/products', { state: { category: item.category } })}
            >
              <img src={item.image} alt={`Category ${item.id}`} className="store-box-img" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. قسم وسائل التواصل */}
      <section className="social-section fade-in-section">
        <h2 className="section-title">{t.followUs}</h2>
        <div className="social-circles-grid">
          {[
            { id: 1, name: "Instagram", icon: "/instagram.png", link: "https://instagram.com" },
            { id: 2, name: "TikTok", icon: "/tik-tok.png", link: "https://tiktok.com" },
          ].map((social, index) => (
            <a 
              key={social.id} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-circle" 
              style={{ '--social-index': index }}
              title={social.name}
            >
              <img src={social.icon} alt={social.name} className="social-img" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}