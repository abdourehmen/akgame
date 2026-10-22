import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { translations } from '../../locales/translations';
import './Navbar.css';

export default function Navbar({ currentLang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق قائمة اللغات عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' }
  ];

  // جلب الترجمات الخاصة بالروابط حسب اللغة الحالية
  const t = translations[currentLang]?.nav || translations['ar'].nav;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* اللوجو واسم المتجر مستوحى من الهوية السوداء والبيضاء */}
        <div className="navbar-logo">
          <img src="/logo.jpg" alt="AKGAME Logo" className="navbar-logo-img" />
          <span className="logo-text">AKGAME</span>
        </div>

        {/* روابط التنقل الرئيسية المحدثة */}
        <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="#new" className="nav-link" onClick={() => setMenuOpen(false)}>{t.newProducts}</a>
          <a href="#bestsellers" className="nav-link" onClick={() => setMenuOpen(false)}>{t.bestSellers}</a>
          <a href="#discounts" className="nav-link" onClick={() => setMenuOpen(false)}>{t.discounts}</a>
          <a href="#digital" className="nav-link" onClick={() => setMenuOpen(false)}>{t.digitalProducts}</a>
        </nav>

        {/* أدوات التحكم والجراءات */}
        <div className="navbar-actions">
          
          {/* قائمة اختيار اللغة المنسدلة */}
          <div className="lang-dropdown-container" ref={dropdownRef}>
            <button 
              className="lang-btn" 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <Globe size={18} />
              <span style={{ textTransform: 'uppercase' }}>{currentLang}</span>
              <ChevronDown size={14} className={`chevron-icon ${langDropdownOpen ? 'open' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="lang-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                    onClick={() => {
                      setLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* سلة المشتريات */}
          <div className="cart-icon-wrapper">
            <ShoppingCart size={20} />
            <span className="cart-badge">0</span>
          </div>

          {/* زر القائمة للهواتف */}
          <button className="menu-toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>
    </header>
  );
}