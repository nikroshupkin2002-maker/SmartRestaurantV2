// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт твоих страниц
import { HomePage } from './pages/HomePage';       // Та самая страница, код которой ты скинул
import { CalculatorPage } from './pages/CalculatorPage'; // Страница с калькулятором
import { ProductDetailPage } from './pages/ProductDetailPage'; // Детальная страница продукта

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F7F9]">
        <Routes>
          {/* 1. Главная (Лендинг) — теперь она открывается первой */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Калькулятор / Список продуктов */}
          <Route path="/calculator" element={<CalculatorPage />} />
          
          {/* Дополнительный путь, если в HomePage кнопки ведут на /products */}
          <Route path="/products" element={<CalculatorPage />} />

          {/* 3. Детальная страница продукта (с поддержкой ID) */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />

          {/* Редирект на главную, если путь не существует */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
