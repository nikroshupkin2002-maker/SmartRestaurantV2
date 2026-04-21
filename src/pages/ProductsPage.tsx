import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { generatePDF } from "../utils/pdfGenerator";
import { ArrowLeft, FileText, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export function ProductsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    const selectedData = PRODUCTS.filter(p => selectedIds.includes(p.id));
    generatePDF(selectedData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32 font-sans text-gray-900">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium text-sm">Назад в меню</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold text-sm">Smart Restaurant</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Наши продукты</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Выберите решения, чтобы добавить их в коммерческое предложение, или изучите каждое подробнее.
          </p>
        </header>

        {/* Сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleProduct(product.id)}
                className={`relative bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer h-full flex flex-col ${
                  isSelected ? "border-[#1FCC59] shadow-xl shadow-[#1FCC59]/10" : "border-transparent shadow-sm"
                }`}
              >
                <div className="absolute top-6 right-6">
                  {isSelected ? (
                    <CheckCircle2 className="text-[#1FCC59]" size={28} fill="#1FCC5920" />
                  ) : (
                    <Circle className="text-gray-200" size={28} />
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-4 pr-10 leading-tight">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-8 flex-grow">{product.description}</p>
                
                {product.stats && (
                  <div className="flex gap-2 mb-8">
                    {product.stats.map(s => (
                      <div key={s.label} className="bg-[#1FCC59]/10 px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="text-[#1FCC59] font-black text-xs">{s.value}</span>
                        <span className="text-gray-400 text-[10px] font-bold uppercase">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                  <Link 
                    to={`/products/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-xs font-black text-[#1FCC59] uppercase tracking-widest hover:translate-x-1 transition-transform"
                  >
                    Подробнее <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Плавающая панель для КП */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-8 left-0 right-0 z-30 px-6"
          >
            <div className="max-w-xl mx-auto bg-gray-900 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-4 ml-2">
                <div className="bg-[#1FCC59] w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  {selectedIds.length}
                </div>
                <span className="font-bold">продуктов в КП</span>
              </div>
              <button
                onClick={handleDownload}
                className="bg-[#1FCC59] hover:bg-[#1db951] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95"
              >
                <FileText size={20} />
                СКАЧАТЬ КП (PDF)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
