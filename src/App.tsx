// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
// Импортируй файл, где лежит сам калькулятор (проверь название файла!)
import { CalculatorPage } from './pages/CalculatorPage'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* ВОТ ЭТА СТРОЧКА ИСПРАВИТ БЕЛЫЙ ЭКРАН: */}
        <Route path="/calculator" element={<CalculatorPage />} /> 
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}
