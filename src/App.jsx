import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import FeaturesMarquee from './components/FeaturesMarquee/FeaturesMarquee';
import MainContent from './components/MainContent/MainContent';
import ProductsPage from './components/ProductsPage/ProductsPage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CartDrawer from './components/CartDrawer/CartDrawer';

// مكون الفرعي للتحكم بإظهار الـ Navbar والـ Footer
function AppContent() {
  const location = useLocation();
  const [currentLang, setCurrentLang] = useState('ar');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // التحقق مما إذا كنا في مسار الآدمن
  const isAdminRoute = location.pathname.startsWith('/admin');

  // دالة إضافة المنتج إلى السلة وفتح السلة الجانبية تلقائياً
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += (product.quantity || 1);
        return updated;
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: product.quantity || 1,
          image: product.image_url || product.image || '/logo.jpg'
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      
      {/* عرض الـ Navbar فقط إذا لم نكن في صفحة الآدمن */}
      {!isAdminRoute && (
        <Navbar 
          currentLang={currentLang} 
          setLang={setCurrentLang} 
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalItemsCount}
        />
      )}

      <Routes>
        <Route path="/" element={
          <>
            <Hero currentLang={currentLang} />
            <FeaturesMarquee currentLang={currentLang} />
            <MainContent currentLang={currentLang} onAddToCart={handleAddToCart} />
          </>
        } />
        
        <Route 
          path="/products" 
          element={<ProductsPage currentLang={currentLang} onAddToCart={handleAddToCart} />} 
        />
        
        <Route 
          path="/product/:id" 
          element={<ProductDetails currentLang={currentLang} onAddToCart={handleAddToCart} />} 
        />

        <Route 
          path="/cart" 
          element={
            <CartPage 
              currentLang={currentLang} 
              cartItems={cartItems} 
              onUpdateQuantity={handleUpdateQuantity} 
              onRemoveItem={handleRemoveItem} 
            />
          } 
        />

        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              currentLang={currentLang} 
              cartItems={cartItems} 
              onClearCart={handleClearCart} 
            />
          } 
        />

        {/* مسار لوحة تحكم الآدمن */}
        <Route 
          path="/admin" 
          element={<AdminDashboard />} 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* عرض الـ Footer والسلة الجانبية فقط إذا لم نكن في صفحة الآدمن */}
      {!isAdminRoute && <Footer currentLang={currentLang} />}

      {!isAdminRoute && (
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          currentLang={currentLang}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}