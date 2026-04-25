// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт всех твоих страниц
import { HomePage } from './pages/HomePage'; // Твоя самая первая страница
import { CalculatorPage } from './pages/CalculatorPage'; // Страница расчета
import { ProductDetailPage } from './pages/ProductDetailPage'; // Страница продукта

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F7F9]">
        <Routes>
          {/* 1. Самая первая страница (Лендинг) */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Страница калькулятора (например, по адресу /calc) */}
          <Route path="/calculator" element={<CalculatorPage />} />

          {/* 3. Детальная страница продукта */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />

          {/* Редирект: если юзер запутался, кидаем на главную */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
