// @ts-nocheck
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

// Здесь можно импортировать главную страницу, если она у тебя есть
// Например: import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Если у тебя есть главная страница, замени ProductsPage ниже на HomePage */}
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

// ВОТ ЭТА СТРОЧКА САМАЯ ВАЖНАЯ:
export default App;
