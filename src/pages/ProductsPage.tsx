// @ts-nocheck
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ProductIcon } from "../components/ProductIcon";
import { KPPrintTemplate } from "../components/KPPrintTemplate";
import { ArrowLeft, Printer, Check, Info, User, Building2, Phone } from "lucide-react";

export function ProductsPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Состояния для кастомизации КП
  const [clientName, setClientName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");

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
      <div className="no-print min-h-screen bg-gray-50 pb-32 font-sans text-gray-900">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#1FCC59] transition-colors font-bold text-sm uppercase tracking-wider">
              <ArrowLeft size={20} /> Назад
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-bold">F</div>
              <span className="font-bold tracking-tight">Smart Restaurant</span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Секция ввода данных клиента */}
          <section className="mb-12 bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building2 size={20} className="text-[#1FCC59]" /> Данные для КП
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Название заведения</label>
                <input 
                  type="text" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Например: Ресторан «Paradise»"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1FCC59] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">ФИО сотрудника Choco</label>
                <input 
                  type="text" 
                  value={managerName} 
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1FCC59] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Телефон сотрудника</label>
                <input 
                  type="text" 
                  value={managerPhone} 
                  onChange={(e) => setManagerPhone(e.target.value)}
                  placeholder="+7 700 000 00 00"
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1FCC59] transition-all"
                />
              </div>
            </div>
          </section>

          <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter">ВЫБОР ПРОДУКТОВ</h1>
              <p className="text-gray-500">Выберите модули для включения в предложение.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`group relative p-8 rounded-[32px] border-2 transition-all cursor-pointer bg-white
                  ${selectedIds.includes(product.id) ? 'border-[#1FCC59] shadow-xl shadow-[#1FCC59]/10' : 'border-transparent hover:border-gray-200 shadow-sm'}
                `}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors
                  ${selectedIds.includes(product.id) ? 'bg-[#1FCC59] text-white' : 'bg-gray-100 text-gray-400'}
                `}>
                  <ProductIcon name={product.iconName} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-gray-900">{product.price}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2
                    ${selectedIds.includes(product.id) ? 'bg-[#1FCC59] border-[#1FCC59] text-white' : 'border-gray-200 text-transparent'}
                  `}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                </div>
                <Link to={`/products/${product.id}`} onClick={(e) => e.stopPropagation()} className="absolute top-6 right-6 p-2 text-gray-300 hover:text-[#1FCC59]">
                  <Info size={20} />
                </Link>
              </div>
            ))}
          </div>
        </main>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-2xl bg-gray-900 rounded-[24px] p-6 text-white shadow-2xl flex items-center justify-between">
              <div>
                <p className="text-white/50 text-xs font-bold uppercase mb-1">Выбрано продуктов: {selectedIds.length}</p>
                <p className="text-2xl font-black">{new Intl.NumberFormat("ru-RU").format(selectedData.reduce((sum, p) => sum + p.monthlyPrice, 0))} ₸ / мес</p>
              </div>
              <button onClick={handlePrint} className="bg-[#1FCC59] hover:bg-[#1bb34e] text-white px-8 py-3 rounded-xl font-bold transition-colors">
                Скачать КП (PDF)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Шаблон для печати с новыми данными */}
      <KPPrintTemplate 
        selectedProducts={selectedData} 
        clientName={clientName}
        managerName={managerName}
        managerPhone={managerPhone}
      />
    </>
  );
}
