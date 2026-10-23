import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import FeaturesMarquee from './components/FeaturesMarquee/FeaturesMarquee';
import MainContent from './components/MainContent/MainContent';
// تأكد أن هذا الملف موجود فعلاً في هذا المسار
import ProductsPage from './components/ProductsPage/ProductsPage'; 

export default function App() {
  const [currentLang, setCurrentLang] = useState('ar');

  return (
    <Router>
      <div className="app-container">
        <Navbar currentLang={currentLang} setLang={setCurrentLang} />

        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={
            <>
              <Hero currentLang={currentLang} />
              <FeaturesMarquee currentLang={currentLang} />
              <MainContent currentLang={currentLang} />
            </>
          } />
          
          {/* صفحة المنتجات الجديدة */}
          <Route path="/products" element={<ProductsPage currentLang={currentLang} />} />

          {/* مسار احتياطي: إذا كان الرابط خاطئاً، عد إلى الصفحة الرئيسية */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer currentLang={currentLang} />
      </div>
    </Router>
  );
}