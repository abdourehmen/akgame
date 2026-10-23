import React, { useEffect } from 'react';
import { translations } from '../../locales/translations';
import './MainContent.css';

export default function MainContent({ currentLang }) {
  const t = translations[currentLang]?.home || translations['ar'].home;

  // تفعيل مراقبة التمرير لتشغيل الأنيميشن عند النزول
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 } // يبدأ الأنيميشن عندما يظهر 10% من القسم
    );

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const categories = [1, 2, 3, 4, 5, 6];
  
  const products = [
    { id: 1, title: "HALLOWEEN: THE GAME | PS5", price: "3500 دج", badge: "جديد", status: "متوفر" },
    { id: 2, title: "CYBERPUNK 2077 | PS5", price: "4200 دج", badge: "جديد", status: "متوفر" },
    { id: 3, title: "SPIDER-MAN 2 | PS5", price: "5500 دج", badge: "تخفيض", status: "متوفر" },
    { id: 4, title: "EA SPORTS FC 25 | PS5", price: "6000 دج", badge: "الأكثر مبيعا", status: "متوفر" },
    { id: 5, title: "GOD OF WAR RAGNAROK | PS5", price: "5800 دج", badge: "مميز", status: "متوفر" },
  ];

  return (
    <main className="store-main-container">
      {/* 1. شريط البحث */}
      <div className="search-section fade-in-section">
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          className="store-search-input"
        />
      </div>

      {/* 2. تصفح حسب الفئة */}
      <section className="categories-section fade-in-section">
        <h2 className="section-title">{t.categoriesTitle}</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="category-circle" 
              style={{ '--cat-index': index }}
            >
              {/* إذا أضفت صوراً لاحقاً ستكون هنا */}
            </div>
          ))}
        </div>
      </section>

      {/* 3. قسم الاكسسوارات (الجديد) */}
      <section id="accessories" className="products-section fade-in-section">
        <div className="section-header">
          <h2 className="section-title">{t.newProducts}</h2>
          <button className="view-all-btn">{t.viewAll}</button>
        </div>
        <div className="products-grid">
          {products.map((prod, index) => (
            <div key={prod.id} className="product-card" style={{ '--card-index': index }}>
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
      </section>

      {/* 4. قسم الاشتراكات (الأكثر مبيعا) */}
      <section id="subscriptions" className="products-section fade-in-section">
        <div className="section-header">
          <h2 className="section-title">{t.bestSellers}</h2>
          <button className="view-all-btn">{t.viewAll}</button>
        </div>
        <div className="products-grid">
          {products.map((prod, index) => (
            <div key={prod.id} className="product-card" style={{ '--card-index': index }}>
              <span className="product-badge">{prod.badge}</span>
              <div className="product-image-container"><span>photo</span></div>
              <div className="product-info">
                <h3 className="product-title">{prod.title}</h3>
                <div className="product-price-stock">
                  <span className="product-status"><span className="status-dot"></span> {prod.status}</span>
                  <span className="product-price">{prod.price}</span>
                </div>
                <button className="add-to-cart-btn">{t.addToCart}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. قسم الأجهزة (التخفيضات) */}
      <section id="devices" className="products-section fade-in-section">
        <div className="section-header">
          <h2 className="section-title">{t.discounts}</h2>
          <button className="view-all-btn">{t.viewAll}</button>
        </div>
        <div className="products-grid">
          {products.map((prod, index) => (
            <div key={prod.id} className="product-card" style={{ '--card-index': index }}>
              <span className="product-badge">{prod.badge}</span>
              <div className="product-image-container"><span>photo</span></div>
              <div className="product-info">
                <h3 className="product-title">{prod.title}</h3>
                <div className="product-price-stock">
                  <span className="product-status"><span className="status-dot"></span> {prod.status}</span>
                  <span className="product-price">{prod.price}</span>
                </div>
                <button className="add-to-cart-btn">{t.addToCart}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. قسم الألعاب (المنتجات الرقمية) */}
      <section id="consoles" className="products-section fade-in-section">
        <div className="section-header">
          <h2 className="section-title">{t.digitalProducts}</h2>
          <button className="view-all-btn">{t.viewAll}</button>
        </div>
        <div className="products-grid">
          {products.map((prod, index) => (
            <div key={prod.id} className="product-card" style={{ '--card-index': index }}>
              <span className="product-badge">رقمي</span>
              <div className="product-image-container"><span>photo</span></div>
              <div className="product-info">
                <h3 className="product-title" title="بطاقة شحن 20$ | PSN">بطاقة شحن 20$ | PSN</h3>
                <div className="product-price-stock">
                  <span className="product-status"><span className="status-dot"></span> متوفر فوري</span>
                  <span className="product-price">4500 دج</span>
                </div>
                <button className="add-to-cart-btn">{t.addToCart}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. قسم جميع أقسام المتجر في الأسفل */}
      <section id="all-categories" className="store-categories-section fade-in-section">
        <h2 className="section-title">{t.allCategories}</h2>
        <div className="store-categories-grid">
          {[
            { id: 1, image: "/categories/section1.png" },
            { id: 2, image: "/categories/section2.png" },
            { id: 3, image: "/categories/section3.png" },
            { id: 4, image: "/categories/section4.png" },
            { id: 5, image: "/categories/section5.png" },
            { id: 6, image: "/categories/section6.png" },
          ].map((item, index) => (
            <div 
              key={item.id} 
              className="store-category-box" 
              style={{ '--box-index': index }}
            >
              <img src={item.image} alt="Category" className="store-box-img" />
            </div>
          ))}
        </div>
      </section>

      {/* 8. قسم تابعونا (شبكات التواصل الاجتماعي) */}
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