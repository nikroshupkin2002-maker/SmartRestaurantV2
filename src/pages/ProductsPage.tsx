import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, FileText, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export function ProductsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const generateKP = () => {
    const selectedData = PRODUCTS.filter(p => selectedIds.includes(p.id));
    alert(`Генерирую КП для: ${selectedData.map(p => p.title).join(", ")}\n\n(Здесь подключается скрипт генерации PDF)`);
    // В реальном проекте здесь вызывается функция jspdf
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1FCC59] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">В меню инструментов</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold text-gray-900">Smart Restaurant</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Наши продукты</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Выберите решения, которые хотите включить в коммерческое предложение, или изучите их подробнее.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className={`relative group bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer ${
                  isSelected ? "border-[#1FCC59] shadow-lg shadow-[#1FCC59]/10" : "border-transparent shadow-sm"
                }`}
                onClick={() => toggleProduct(product.id)}
              >
                {/* Checkbox Icon */}
                <div className="absolute top-6 right-6">
                  {isSelected ? (
                    <CheckCircle2 className="text-[#1FCC59]" size={28} fill="#1FCC5910" />
                  ) : (
                    <Circle className="text-gray-200 group-hover:text-gray-300" size={28} />
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-4 pr-8">{product.title}</h3>
                <p className="text-gray-500 mb-8 line-clamp-2">{product.description}</p>
                
                {product.stats && (
                  <div className="flex gap-4 mb-8">
                    {product.stats.map(s => (
                      <div key={s.label} className="bg-[#1FCC59]/5 px-3 py-1 rounded-full">
                        <span className="text-[#1FCC59] font-bold text-sm">{s.value}</span>
                        <span className="text-gray-400 text-xs ml-1 font-medium">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <Link 
                    to={`/products/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm font-bold text-[#1FCC59] hover:underline"
                  >
                    ПОДРОБНЕЕ <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-0 right-0 z-30 px-6"
          >
            <div className="max-w-2xl mx-auto bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-4 ml-2">
                <div className="bg-[#1FCC59] w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {selectedIds.length}
                </div>
                <span className="font-medium">продуктов выбрано</span>
              </div>
              <button
                onClick={generateKP}
                className="bg-[#1FCC59] hover:bg-[#1db951] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <FileText size={20} />
                СОСТАВИТЬ КП (PDF)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
