import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import FeaturesMarquee from './components/FeaturesMarquee/FeaturesMarquee';
import MainContent from './components/MainContent/MainContent';
import ProductsPage from './components/ProductsPage/ProductsPage';
import CartDrawer from './components/CartDrawer/CartDrawer';

export default function App() {
  const [currentLang, setCurrentLang] = useState('ar');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // قائمة منتجات تجريبية داخل السلة (مطابقة للصورة)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'BATMAN: ARKHAM CITY | PS3 (NTSC-J)',
      price: 9000,
      quantity: 1,
      image: '/logo.jpg'
    }
  ]);

  // تحديث الكميات
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  // حذف عنصر
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        
        {/* شريط التنقل مع زر السلة */}
        <Navbar 
          currentLang={currentLang} 
          setLang={setCurrentLang} 
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalItemsCount}
        />

        <Routes>
          <Route path="/" element={
            <>
              <Hero currentLang={currentLang} />
              <FeaturesMarquee currentLang={currentLang} />
              <MainContent currentLang={currentLang} />
            </>
          } />
          
          <Route path="/products" element={<ProductsPage currentLang={currentLang} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer currentLang={currentLang} />

        {/* مكون السلة الجانبي */}
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          currentLang={currentLang}
        />

      </div>
    </Router>
  );
}