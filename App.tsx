import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CalculatorPage } from "./pages/CalculatorPage";
import { ProductsPage } from "./pages/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* В будущем добавишь сюда детальную страницу продукта */}
      </Routes>
    </Router>
  );
}

export default App;
