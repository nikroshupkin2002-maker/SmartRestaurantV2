// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, FileText, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { KPPrintTemplate } from "../components/KPPrintTemplate";

export function ProductsPage() {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleProduct = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedData = PRODUCTS.filter(p => selectedIds.includes(p.id));

  return (
    <>
      {/* ЭТОТ БЛОК ВИДЕН ТОЛЬКО НА ЭКРАНЕ */}
      <div className="no-print min-h-screen bg-gray-50 pb-32">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Назад</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <span className="font-bold">Smart Restaurant</span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Продукты Choco</h1>
            <p className="text-gray-600 text-lg">Выберите решения для вашего коммерческого предложения.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white ${
                    isSelected ? "border-green-500 shadow-lg" : "border-transparent shadow-sm hover:border-gray-200"
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    {isSelected ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle className="text-gray-200" size={24} />}
                  </div>
                  <h3 className="text-xl font-bold mb-3 pr-8">{product.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">{product.description}</p>
                  <Link 
                    to={`/products/${product.id}`} 
                    onClick={(e) => e.stopPropagation()} 
                    className="inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:underline"
                  >
                    Подробнее <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </main>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ y: 100 }} 
              animate={{ y: 0 }} 
              exit={{ y: 100 }} 
              className="fixed bottom-6 left-0 right-0 px-4 z-40"
            >
              <div className="max-w-md mx-auto bg-gray-900 rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-white/10">
                <span className="text-white font-medium ml-2">Выбрано: {selectedIds.length}</span>
                <button 
                  onClick={handlePrint} 
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
                >
                  <FileText size={18} /> Сформировать КП
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ЭТОТ БЛОК ВИДЕН ТОЛЬКО ПРИ ПЕЧАТИ */}
      <div className="print-only">
        <KPPrintTemplate selectedProducts={selectedData} />
      </div>
    </>
  );
}
