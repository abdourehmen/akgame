import React, { useState } from 'react';
import { Filter, ArrowRight, ArrowLeft } from 'lucide-react';
import './ProductsPage.css';

export default function ProductsPage({ currentLang }) {
  const isRtl = currentLang === 'ar';
  
  // منتجات تجريبية لملء الشبكة الرباعية
  const products = [
    { id: 1, title: "HALLOWEEN: THE GAME | PS5", price: "3500 دج", badge: "جديد", status: "متوفر" },
    { id: 2, title: "CYBERPUNK 2077 | PS5", price: "4200 دج", badge: "جديد", status: "متوفر" },
    { id: 3, title: "SPIDER-MAN 2 | PS5", price: "5500 دج", badge: "تخفيض", status: "متوفر" },
    { id: 4, title: "EA SPORTS FC 25 | PS5", price: "6000 دج", badge: "جديد", status: "متوفر" },
    { id: 5, title: "HALLOWEEN: THE GAME | PS5", price: "3500 دج", badge: "جديد", status: "متوفر" },
    { id: 6, title: "CYBERPUNK 2077 | PS5", price: "4200 دج", badge: "جديد", status: "متوفر" },
    { id: 7, title: "SPIDER-MAN 2 | PS5", price: "5500 دج", badge: "جديد", status: "متوفر" },
    { id: 8, title: "EA SPORTS FC 25 | PS5", price: "6000 دج", badge: "جديد", status: "متوفر" },
  ];
// أضف هذه المتغيرات مع باقي الـ useState
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const maxLimit = 100000; // أقصى سعر في الشريط
  return (
    <div className="products-page-container" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* عنوان الصفحة */}
      <h1 className="page-main-title">{isRtl ? 'المتجر' : 'Store'}</h1>

      {/* صندوق الفلترة الاحترافي */}
      <div className="advanced-filter-box">
        {/* الشريط العلوي للفلترة */}
        <div className="filter-box-header">
          <div className="filter-title-side">
            <Filter size={18} />
            <span>{isRtl ? 'تصفية' : 'Filter'}</span>
          </div>
          <div className="sort-side">
            <button className="sort-btn">{isRtl ? 'ترتيب حسب' : 'Sort By'}</button>
          </div>
        </div>

        {/* جسم الفلترة (الأعمدة الثلاثة) */}
        <div className="filter-box-body">
          
          {/* العمود الأول: المنصة */}
          <div className="filter-col">
            <h3 className="filter-col-title">{isRtl ? 'المنصة (ألعاب)' : 'Platform'}</h3>
            <div className="filter-grid platform-grid">
              <button className="filter-item-btn">PS5</button>
              <button className="filter-item-btn">Xbox Series</button>
              <button className="filter-item-btn">PS4</button>
              <button className="filter-item-btn">Switch</button>
              <button className="filter-item-btn">Switch 2</button>
            </div>
          </div>

        {/* العمود الثاني: السعر بشريط ديناميكي */}
          <div className="filter-col price-col">
            <h3 className="filter-col-title">{isRtl ? 'السعر (دج)' : 'Price (DZD)'}</h3>
            <div className="price-slider-wrapper">
              <div className="price-values">
                <span>{minPrice} دج</span>
                <span>{maxPrice} دج</span>
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
          {/* العمود الثالث: الفئات */}
          <div className="filter-col">
            <h3 className="filter-col-title">{isRtl ? 'الفئات' : 'Categories'}</h3>
            <div className="filter-grid category-grid">
              <button className="filter-item-btn">{isRtl ? 'ألعاب' : 'Games'}</button>
              <button className="filter-item-btn">{isRtl ? 'أجهزة' : 'Consoles'}</button>
              <button className="filter-item-btn">{isRtl ? 'إكسسوارات' : 'Accessories'}</button>
              <button className="filter-item-btn">{isRtl ? 'رقمي' : 'Digital'}</button>
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
              <button className="add-to-cart-btn">{isRtl ? 'اضف الى السلة' : 'Add to Cart'}</button>
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