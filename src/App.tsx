import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импортируем компоненты страниц
// Важно: путь должен точно совпадать с папкой, где лежит файл
import CalculatorPage from './pages/CalculatorPage'; 

// Если у тебя есть главная страница, импортируй её тоже
// import HomePage from './pages/HomePage'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Главная страница (если она есть, если нет - можно поставить калькулятор первой) */}
          <Route path="/" element={<CalculatorPage />} />
          
          {/* Отдельный путь для калькулятора */}
          <Route path="/calculator" element={<CalculatorPage />} />
          
          {/* Сюда можно добавить другие страницы в будущем */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
