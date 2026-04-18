import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная */}
        <Route path="/" element={<HomePage />} />
        
        {/* Калькулятор */}
        <Route path="/calculator" element={<CalculatorPage />} />
        
        {/* Продукты */}
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
