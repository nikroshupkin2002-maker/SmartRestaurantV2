// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage'; // Проверь название этого файла!
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Теперь на главной будет Калькулятор (HomePage) */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* Список всех продуктов будет тут */}
        <Route path="/products" element={<ProductsPage />} />
        
        {/* Детальная страница продукта */}
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}
