// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт твоих страниц
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F7F9]">
        <Routes>
          {/* 1. Главная страница (Лендинг) */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Страница калькулятора прибыли */}
          <Route path="/calculator" element={<CalculatorPage />} />

          {/* 3. Общий список продуктов (Выбор для КП и печать) */}
          <Route path="/products" element={<ProductsPage />} />

          {/* 4. Детальная страница конкретного продукта 
              Важно: путь начинается с /products/, чтобы совпадать с Link из ProductsPage 
          */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />

          {/* Редирект на главную для любых неопознанных путей */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
