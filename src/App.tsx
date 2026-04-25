// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />
        
        {/* Калькулятор — теперь он сам по себе */}
        <Route path="/calculator" element={<CalculatorPage />} />
        
        {/* Детальная страница продукта */}
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        {/* Если кто-то введет /products, вернем на главную */}
        <Route path="/products" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
