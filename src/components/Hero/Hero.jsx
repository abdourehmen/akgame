import React from 'react';
import { Compass } from 'lucide-react';
import { translations } from '../../locales/translations';
import '@google/model-viewer';
import './Hero.css';

export default function Hero({ currentLang }) {
  const t = translations[currentLang]?.hero || translations['ar'].hero;

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* جهة النصوص (ثابتة في الجهة اليسرى) */}
        <div className="hero-content">
          <h1 className="hero-title">{t.title}</h1>

          <p className="hero-description">{t.description}</p>

          <div className="hero-buttons">
            <a href="#consoles" className="hero-btn white-long-btn">
              <Compass size={20} />
              <span>{t.btnPrimary}</span>
            </a>
          </div>
        </div>

        {/* جهة الصورة ومجسم model-viewer فوقها */}
        <div className="hero-image-wrapper">
          <div className="hero-glow"></div>
          <div className="hero-3d-card">
            {/* صورة الخلفية black.jpg */}
            <img src="/black.jpg" alt="AKGAME Hero Visual" className="hero-game-img" />
            
            {/* عنصر عرض المجسم الثلاثي الأبعاد */}
            <model-viewer
              src="/model.glb"
              alt="AKGAME 3D Model"
              auto-rotate
              camera-controls
              disable-zoom
              shadow-intensity="1"
              className="hero-model-viewer"
            ></model-viewer>
          </div>
        </div>

      </div>
    </section>
  );
}