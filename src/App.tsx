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
        
        {/* Страница калькулятора */}
        <Route path="/calculator" element={<CalculatorPage />} />
        
        {/* Детальная страница КОНКРЕТНОГО продукта */}
        {/* :productId — это переменная, которая будет принимать p1, p2 и т.д. */}
        <Route path="/product/:productId" element={<ProductDetailPage />} />

        {/* Если юзер нажал на старую ссылку /products, кидаем его в калькулятор */}
        <Route path="/products" element={<CalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
