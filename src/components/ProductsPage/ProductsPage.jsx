import React, { useState } from 'react';
import { Filter, ArrowRight, ArrowLeft, Gamepad2 } from 'lucide-react';
import { translations } from '../../locales/translations';
import './ProductsPage.css';

export default function ProductsPage({ currentLang }) {
  const isRtl = currentLang === 'ar';

  // معجم ترجمات الصفحة للغات الأربع
  const storeTranslations = {
    ar: {
      title: 'المتجر',
      filter: 'تصفية',
      sortBy: 'ترتيب حسب',
      platform: 'المنصة',
      availability: 'التوفر',
      inStockOnly: 'المتوفر فقط',
      offersOnly: 'العروض فقط',
      newlyArrived: 'وصل حديثاً (آخر 30 يوماً)',
      price: 'السعر (دج)',
      platformGames: 'المنصة (ألعاب)',
      addToCart: 'اضف الى السلة',
      inStock: 'متوفر',
      newBadge: 'جديد',
      discountBadge: 'تخفيض'
    },
    en: {
      title: 'Store',
      filter: 'Filter',
      sortBy: 'Sort By',
      platform: 'Platform',
      availability: 'Availability',
      inStockOnly: 'In stock only',
      offersOnly: 'Offers only',
      newlyArrived: 'Newly arrived (last 30 days)',
      price: 'Price (DZD)',
      platformGames: 'Platform (Games)',
      addToCart: 'Add to Cart',
      inStock: 'In Stock',
      newBadge: 'New',
      discountBadge: 'Sale'
    },
    fr: {
      title: 'Boutique',
      filter: 'Filtrer',
      sortBy: 'Trier par',
      platform: 'Plateforme',
      availability: 'Disponibilité',
      inStockOnly: 'En stock uniquement',
      offersOnly: 'Offres uniquement',
      newlyArrived: 'Nouveautés (30 derniers jours)',
      price: 'Prix (DZD)',
      platformGames: 'Plateforme (Jeux)',
      addToCart: 'Ajouter au panier',
      inStock: 'En Stock',
      newBadge: 'Nouveau',
      discountBadge: 'Promo'
    },
    es: {
      title: 'Tienda',
      filter: 'Filtrar',
      sortBy: 'Ordenar por',
      platform: 'Plataforma',
      availability: 'Disponibilidad',
      inStockOnly: 'Solo en stock',
      offersOnly: 'Solo ofertas',
      newlyArrived: 'Novedades (últimos 30 días)',
      price: 'Precio (DZD)',
      platformGames: 'Plataforma (Juegos)',
      addToCart: 'Añadir al carrito',
      inStock: 'En Stock',
      newBadge: 'Nuevo',
      discountBadge: 'Oferta'
    }
  };

  // جلب ترجمة اللغة الحالية مع اعتماد العربية كخيار افتراضي
  const t = translations?.[currentLang]?.store || storeTranslations[currentLang] || storeTranslations['ar'];

  // منتجات تجريبية لملء الشبكة الرباعية
  const products = [
    { id: 1, title: "HALLOWEEN: THE GAME | PS5", price: "3500 دج", badge: t.newBadge, status: t.inStock },
    { id: 2, title: "CYBERPUNK 2077 | PS5", price: "4200 دج", badge: t.newBadge, status: t.inStock },
    { id: 3, title: "SPIDER-MAN 2 | PS5", price: "5500 دج", badge: t.discountBadge, status: t.inStock },
    { id: 4, title: "EA SPORTS FC 25 | PS5", price: "6000 دج", badge: t.newBadge, status: t.inStock },
    { id: 5, title: "HALLOWEEN: THE GAME | PS5", price: "3500 دج", badge: t.newBadge, status: t.inStock },
    { id: 6, title: "CYBERPUNK 2077 | PS5", price: "4200 دج", badge: t.newBadge, status: t.inStock },
    { id: 7, title: "SPIDER-MAN 2 | PS5", price: "5500 دج", badge: t.newBadge, status: t.inStock },
    { id: 8, title: "EA SPORTS FC 25 | PS5", price: "6000 دج", badge: t.newBadge, status: t.inStock },
  ];

  // حالات التحديد الديناميكي
  const [selectedPlatform, setSelectedPlatform] = useState('PS5');
  const [selectedGamePlatform, setSelectedGamePlatform] = useState('Switch');

  // حالات التوفر
  const [inStockOnly, setInStockOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [newlyArrived, setNewlyArrived] = useState(false);

  // متغيرات شريط السعر
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const maxLimit = 100000;

  const platforms = ['PS5', 'Xbox Series', 'PS4', 'Switch', 'Switch 2'];
  const gamePlatforms = ['PS5', 'PS4', 'Xbox Series', 'Xbox One', 'Switch', 'Switch 2'];

  return (
    <div className="products-page-container" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* عنوان الصفحة */}
      <h1 className="page-main-title">{t.title}</h1>

      {/* صندوق الفلترة الاحترافي */}
      <div className="advanced-filter-box">
        {/* الشريط العلوي للفلترة */}
        <div className="filter-box-header">
          <div className="filter-title-side">
            <Filter size={18} />
            <span>{t.filter}</span>
          </div>
          <div className="sort-side">
            <button className="sort-btn">{t.sortBy}</button>
          </div>
        </div>

        {/* جسم الفلترة (الأعمدة الأربعة) */}
        <div className="filter-box-body">
          
          {/* العمود الأول: المنصة */}
          <div className="filter-col">
            <h3 className="filter-col-title">{t.platform}</h3>
            <div className="filter-grid platform-grid">
              {platforms.map((plat) => (
                <button 
                  key={plat} 
                  className={`filter-item-btn ${selectedPlatform === plat ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(plat)}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          {/* العمود الثاني: التوفر */}
          <div className="filter-col">
            <h3 className="filter-col-title">{t.availability}</h3>
            <div className="toggle-group">
              
              <label className="toggle-item">
                <span className="toggle-label">{t.inStockOnly}</span>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly} 
                    onChange={() => setInStockOnly(!inStockOnly)} 
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>

              <label className="toggle-item">
                <span className="toggle-label">{t.offersOnly}</span>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={offersOnly} 
                    onChange={() => setOffersOnly(!offersOnly)} 
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>

              <label className="toggle-item">
                <span className="toggle-label">{t.newlyArrived}</span>
                <div className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={newlyArrived} 
                    onChange={() => setNewlyArrived(!newlyArrived)} 
                  />
                  <span className="toggle-slider"></span>
                </div>
              </label>

            </div>
          </div>

          {/* العمود الثالث: السعر بشريط ديناميكي */}
          <div className="filter-col price-col">
            <h3 className="filter-col-title">{t.price}</h3>
            <div className="price-slider-wrapper">
              <div className="price-values">
                <span>{minPrice} DZD</span>
                <span>{maxPrice} DZD</span>
              </div>
              <div className="multi-range-slider">
                <input 
                  type="range" 
                  min="0" 
                  max={maxLimit} 
                  step="500" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 500))} 
                  className="thumb thumb-min" 
                />
                <input 
                  type="range" 
                  min="0" 
                  max={maxLimit} 
                  step="500" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 500))} 
                  className="thumb thumb-max" 
                />
                <div className="slider-track"></div>
                <div 
                  className="slider-range" 
                  style={{ 
                    right: isRtl ? `${(minPrice / maxLimit) * 100}%` : 'auto',
                    left: isRtl ? 'auto' : `${(minPrice / maxLimit) * 100}%`, 
                    width: `${((maxPrice - minPrice) / maxLimit) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* العمود الرابع: الفئات (شكل الكبسولات) */}
          <div className="filter-col">
            <h3 className="filter-col-title" style={{ width: '100%', textAlign: isRtl ? 'right' : 'left' }}>
              {t.platformGames}
            </h3>
            <div className="filter-pills-grid">
              {gamePlatforms.map((gPlat) => (
                <button 
                  key={gPlat} 
                  className={`filter-pill-btn ${selectedGamePlatform === gPlat ? 'active' : ''}`}
                  onClick={() => setSelectedGamePlatform(gPlat)}
                >
                  <span className="pill-text">{gPlat}</span>
                  <Gamepad2 size={16} className="pill-icon" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* شبكة المنتجات (4 كروت في كل صف) */}
      <div className="products-grid-4">
        {products.map((prod) => (
          <div key={prod.id} className="product-card">
            <span className="product-badge">{prod.badge}</span>
            <div className="product-image-container"><span>photo</span></div>
            <div className="product-info">
              <h3 className="product-title" title={prod.title}>{prod.title}</h3>
              <div className="product-price-stock">
                <span className="product-status"><span className="status-dot"></span> {prod.status}</span>
                <span className="product-price">{prod.price}</span>
              </div>
              <button className="add-to-cart-btn">{t.addToCart}</button>
            </div>
          </div>
        ))}
      </div>

      {/* ترقيم الصفحات (Pagination) */}
      <div className="pagination-container">
        <button className="page-nav-btn"><ArrowRight size={20} /></button>
        <button className="page-num-btn">1</button>
        <button className="page-num-btn">2</button>
        <button className="page-num-btn">3</button>
        <span className="page-dots">...</span>
        <button className="page-num-btn">50</button>
        <button className="page-nav-btn"><ArrowLeft size={20} /></button>
      </div>

    </div>
  );
}