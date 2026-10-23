import React from 'react';
import { Phone, MapPin } from 'lucide-react';
// تأكد من صحة مسار الاستيراد حسب هيكل مجلداتك
import { translations } from '../../locales/translations';
import './Footer.css';

export default function Footer({ currentLang }) {
  // استخدام السطر الآمن لجلب الترجمة لمنع أي انهيار
  const t = translations?.[currentLang]?.footer || translations?.['ar']?.footer || {};

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* العمود الأيمن: تواصل معنا */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">{t.contactTitle}</h3>
          <div className="contact-item">
            <span className="contact-text" dir="ltr">0541721442</span>
            <Phone size={16} className="contact-icon" />
          </div>
          <div className="contact-item">
            <span className="contact-text" dir="ltr">0778980164</span>
            <Phone size={16} className="contact-icon" />
          </div>
          <div className="contact-item">
            <span className="contact-text">{t.address}</span>
            <MapPin size={16} className="contact-icon" />
          </div>
        </div>

        {/* الخط الفاصل العمودي الأول */}
        <div className="footer-divider"></div>

        {/* العمود الأوسط: العناوين */}
        <div className="footer-col links-col">
          <h3 className="footer-title">{t.linksTitle}</h3>
          <ul className="footer-links-list">
            <li><a href="#accessories">{t.accessories}</a></li>
            <li><a href="#subscriptions">{t.subscriptions}</a></li>
            <li><a href="#devices">{t.devices}</a></li>
            <li><a href="#consoles">{t.consoles}</a></li>
          </ul>
        </div>

        {/* الخط الفاصل العمودي الثاني */}
        <div className="footer-divider"></div>

        {/* العمود الأيسر: الشعار، وسائل التواصل، والنبذة */}
        <div className="footer-col brand-col">
          <div className="footer-logo-circle">
            <img src="/logo.jpg" alt="AKGAME Logo" className="footer-logo-img" />
          </div>
          <h2 className="footer-brand-name">AKGAME</h2>
          <div className="footer-social-circles">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle" 
              title="Instagram"
            >
              <img src="/instagram.png" alt="Instagram" className="social-icon-img" />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle" 
              title="TikTok"
            >
              <img src="/tik-tok.png" alt="TikTok" className="social-icon-img" />
            </a>
          </div>
          <p className="footer-description">
            {t.description}
          </p>
        </div>

      </div>

      {/* الخط الفاصل السفلي */}
      <div className="footer-bottom-line"></div>

      {/* حقوق الملكية */}
      <div className="footer-copyright">
        {t.copyright}
      </div>
    </footer>
  );
}