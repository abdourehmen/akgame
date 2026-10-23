import React, { useState, useEffect } from 'react';
import { Filter, ArrowRight, ArrowLeft, Gamepad2 } from 'lucide-react';
import { translations } from '../../locales/translations';
import { supabase } from '../../supabaseClient';
import './ProductsPage.css';

export default function ProductsPage({ currentLang, onAddToCart }) {
  const isRtl = currentLang === 'ar';

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
      outOfStock: 'غير متوفر',
      newBadge: 'جديد',
      discountBadge: 'تخفيض',
      loading: 'جاري تحميل المنتجات...',
      noProducts: 'لا توجد منتجات مطابقة للفلاتر المحددة'
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
      outOfStock: 'Out of Stock',
      newBadge: 'New',
      discountBadge: 'Sale',
      loading: 'Loading products...',
      noProducts: 'No products found matching filters'
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
      outOfStock: 'Rupture de stock',
      newBadge: 'Nouveau',
      discountBadge: 'Promo',
      loading: 'Chargement des produits...',
      noProducts: 'Aucun produit trouvé'
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
      outOfStock: 'Agotado',
      newBadge: 'Nuevo',
      discountBadge: 'Oferta',
      loading: 'Cargando productos...',
      noProducts: 'No se encontraron productos'
    }
  };

  const t = translations?.[currentLang]?.store || storeTranslations[currentLang] || storeTranslations['ar'];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات التحديد الديناميكي
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGamePlatform, setSelectedGamePlatform] = useState('');

  // حالات التوفر
  const [inStockOnly, setInStockOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [newlyArrived, setNewlyArrived] = useState(false);

  // حالة الترتيب حسب السعر
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc'

  // متغيرات شريط السعر
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const maxLimit = 100000;

  // ترقيم الصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const platforms = ['الكل', 'PS5', 'Xbox Series', 'PS4', 'Switch', 'Switch 2'];
  const gamePlatforms = ['الكل', 'PS5', 'PS4', 'Xbox Series', 'Xbox One', 'Switch', 'Switch 2'];

  // جلب البيانات مع ربط كافّة الفلاتر بـ Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*');

        // 1. فلترة المنصة العامة أو منصة الألعاب
        const activePlatform = selectedPlatform !== 'الكل' ? selectedPlatform : (selectedGamePlatform !== 'الكل' ? selectedGamePlatform : '');
        if (activePlatform) {
          query = query.eq('platform', activePlatform);
        }

        // 2. فلتر المتوفر فقط
        if (inStockOnly) {
          query = query.eq('in_stock', true);
        }

        // 3. فلتر العروض فقط (المنتجات التي تمتلك شارة تخفيض)
        if (offersOnly) {
          query = query.or('badge.eq.تخفيض,badge.eq.Sale,badge.eq.Promo,badge.eq.Oferta');
        }

        // 4. فلتر وصل حديثاً (آخر 30 يوماً)
        if (newlyArrived) {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          query = query.gte('created_at', thirtyDaysAgo.toISOString());
        }

        // 5. فلتر نطاق السعر
        query = query.gte('price', minPrice).lte('price', maxPrice);

        // 6. الترتيب حسب الخيار المختار
        if (sortBy === 'price_asc') {
          query = query.order('price', { ascending: true });
        } else if (sortBy === 'price_desc') {
          query = query.order('price', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching products:', error.message);
        } else {
          setProducts(data || []);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedPlatform, selectedGamePlatform, inStockOnly, offersOnly, newlyArrived, minPrice, maxPrice, sortBy]);

  return (
    <div className="products-page-container" dir={isRtl ? 'rtl' : 'ltr'}>
      
      <h1 className="page-main-title">{t.title}</h1>

      <div className="advanced-filter-box">
        <div className="filter-box-header">
          <div className="filter-title-side">
            <Filter size={18} />
            <span>{t.filter}</span>
          </div>
          <div className="sort-side">
            <select 
              className="sort-btn" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ cursor: 'pointer', outline: 'none', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px 12px' }}
            >
              <option value="newest">{isRtl ? 'الأحدث' : 'Newest'}</option>
              <option value="price_asc">{isRtl ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price_desc">{isRtl ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>

        <div className="filter-box-body">
          
          {/* العمود الأول: المنصة */}
          <div className="filter-col">
            <h3 className="filter-col-title">{t.platform}</h3>
            <div className="filter-grid platform-grid">
              {platforms.map((plat) => (
                <button 
                  key={plat} 
                  className={`filter-item-btn ${(selectedPlatform === plat || (!selectedPlatform && plat === 'الكل')) ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPlatform(plat === 'الكل' ? '' : plat);
                    setSelectedGamePlatform('');
                  }}
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

          {/* العمود الثالث: السعر */}
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

          {/* العمود الرابع: الفئات (الكبسولات) */}
          <div className="filter-col">
            <h3 className="filter-col-title" style={{ width: '100%', textAlign: isRtl ? 'right' : 'left' }}>
              {t.platformGames}
            </h3>
            <div className="filter-pills-grid">
              {gamePlatforms.map((gPlat) => (
                <button 
                  key={gPlat} 
                  className={`filter-pill-btn ${(selectedGamePlatform === gPlat || (!selectedGamePlatform && gPlat === 'الكل')) ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedGamePlatform(gPlat === 'الكل' ? '' : gPlat);
                    setSelectedPlatform('');
                  }}
                >
                  <span className="pill-text">{gPlat}</span>
                  <Gamepad2 size={16} className="pill-icon" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* شبكة المنتجات */}
      <div className="products-grid-4">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            {t.loading}
          </div>
        ) : products.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            {t.noProducts}
          </div>
        ) : (
          currentProducts.map((prod) => (
            <div key={prod.id} className="product-card">
              {prod.badge && <span className="product-badge">{prod.badge}</span>}
              <div className="product-image-container">
                {prod.image_url ? (
                  <img src={prod.image_url} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>photo</span>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title" title={prod.title}>{prod.title}</h3>
                <div className="product-price-stock">
                  <span className="product-status">
                    <span className="status-dot"></span> {prod.in_stock !== false ? t.inStock : t.outOfStock}
                  </span>
                  <span className="product-price">{prod.price} DZD</span>
                </div>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => onAddToCart && onAddToCart(prod)}
                >
                  {t.addToCart}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ترقيم الصفحات */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button 
            className="page-nav-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button 
              key={pageNum} 
              className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className="page-nav-btn" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </button>
        </div>
      )}

    </div>
  );
}