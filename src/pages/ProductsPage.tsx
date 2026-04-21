import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, FileText, CheckCircle2, Circle, ArrowRight, X } from "lucide-react";

export function ProductsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = () => {
    // Вместо генерации PDF пока просто показываем состав КП
    setShowModal(true);
  };

  const selectedData = PRODUCTS.filter(p => selectedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32 font-sans text-gray-900">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium text-sm">Назад</span>
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
          <p className="text-gray-500 text-lg max-w-2xl">Выберите решения для формирования КП.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`relative bg-white p-8 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col ${
                  isSelected ? "border-[#1FCC59] shadow-xl shadow-[#1FCC59]/10" : "border-transparent shadow-sm hover:shadow-md"
                }`}
              >
                <div className="absolute top-6 right-6">
                  {isSelected ? <CheckCircle2 className="text-[#1FCC59]" size={28} /> : <Circle className="text-gray-200" size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-4 pr-10">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{product.description}</p>
                <Link to={`/products/${product.id}`} onClick={(e) => e.stopPropagation()} className="text-xs font-black text-[#1FCC59] uppercase tracking-widest flex items-center gap-2">
                  Подробнее <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Панель КП */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-8 left-0 right-0 z-30 px-6">
            <div className="max-w-xl mx-auto bg-gray-900 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between">
              <div className="ml-4 font-bold">{selectedIds.length} выбрано</div>
              <button onClick={handleAction} className="bg-[#1FCC59] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3">
                <FileText size={20} /> СФОРМИРОВАТЬ КП
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модалка вместо PDF */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[40px] p-10 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
              <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-8">Состав вашего КП</h2>
              <div className="space-y-6">
                {selectedData.map(p => (
                  <div key={p.id} className="border-b border-gray-100 pb-4">
                    <div className="font-bold text-lg text-[#1FCC59]">{p.title}</div>
                    <div className="text-sm text-gray-500 mt-1">Ценность: {p.valueImpact}</div>
                    <div className="text-sm font-bold mt-1">Стоимость: {p.price}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowModal(false)} className="w-full mt-10 bg-gray-100 py-4 rounded-2xl font-bold">Закрыть</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
