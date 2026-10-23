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
  const [cartItems, setCartItems] = useState([]);

  // دالة إضافة المنتج إلى السلة وفتح السلة الجانبية تلقائياً
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image_url || product.image || '/logo.jpg'
        }
      ];
    });
    setIsCartOpen(true); // فتح لوحة السلة مباشرة عند إضافة منتج
  };

  // دالة تحديث الكمية داخل السلة
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  // دالة حذف عنصر من السلة
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // حساب إجمالي عدد القطع في السلة لشعار الهيدر
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        
        {/* شريط التنقل */}
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
              <MainContent currentLang={currentLang} onAddToCart={handleAddToCart} />
            </>
          } />
          
          {/* مسار المنتجات مع تمرير دالة الإضافة */}
          <Route 
            path="/products" 
            element={<ProductsPage currentLang={currentLang} onAddToCart={handleAddToCart} />} 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer currentLang={currentLang} />

        {/* السلة الجانبية */}
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