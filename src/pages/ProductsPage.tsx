import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid, ArrowRight } from "lucide-react";

// Временные данные прямо здесь для надежности
const TEMP_PRODUCTS = [
  { id: "no-cashier", title: "Без кассира", desc: "Автоматизация процесса оплаты и заказа." },
  { id: "no-waiter", title: "Без официанта", desc: "QR-меню и заказы прямо со стола." },
  { id: "sr-delivery", title: "SR Delivery", desc: "Ваша собственная служба доставки." },
  { id: "loyalty", title: "Лояльность", desc: "Система удержания и кэшбэка." }
];

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Кнопка назад */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] mb-12 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Назад в меню</span>
        </Link>

        {/* Заголовок страницы */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#1FCC59]/10 rounded-2xl flex items-center justify-center text-[#1FCC59]">
              <LayoutGrid size={28} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Наши продукты</h1>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Подробная информация о решениях экосистемы Smart Restaurant. Выберите продукт, чтобы узнать о нем больше.
          </p>
        </motion.div>

        {/* Сетка продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMP_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F8F9FA] rounded-[32px] p-8 border border-transparent hover:border-[#1FCC59]/30 hover:bg-white hover:shadow-2xl transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#1FCC59] transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                {product.desc}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#1FCC59] transition-colors">
                  Подробнее
                </span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:bg-[#1FCC59] group-hover:text-white shadow-sm transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
