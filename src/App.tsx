// @ts-nocheck
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импорт твоих страниц
import { CalculatorPage } from './pages/CalculatorPage'; // Главная с калькулятором
import { ProductDetailPage } from './pages/ProductDetailPage'; // Деталка

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F7F9]">
        <Routes>
          {/* Главная страница с расчетом КП */}
          <Route path="/" element={<CalculatorPage />} />

          {/* Важно: используем :productId. 
              Это позволит странице ProductDetailPage вытащить ID из ссылки.
          */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />

          {/* Редирект на главную, если зашли по странному адресу */}
          <Route path="*" element={<CalculatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
