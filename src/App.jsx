import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import FeaturesMarquee from './components/FeaturesMarquee/FeaturesMarquee';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer'; // (ح حسب مسار الملف لديك)
export default function App() {
  // حالة تخزين اللغة الحالية (الافتراضية: العربية)
  const [currentLang, setCurrentLang] = useState('ar');

  return (
    <div className="app-container">
      {/* 1. الناف بار (نمرر له اللغة ودالة التغيير setLang) */}
      <Navbar currentLang={currentLang} setLang={setCurrentLang} />

      {/* 2. قسم الـ Hero (نمرر له اللغة الحالية) */}
      <Hero currentLang={currentLang} />

      {/* 3. الشريط المتحرك للمميزات (نمرر له اللغة الحالية ليتغير معها) */}
      <FeaturesMarquee currentLang={currentLang} />

      {/* 4. المحتوى الرئيسي للمتجر (البحث، الفئات، الأقسام والمنتجات) */}
      <MainContent currentLang={currentLang} />
      <Footer currentLang={currentLang} />
      
    </div>
  );
  
}