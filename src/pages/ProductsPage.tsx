import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/products";
import { ArrowRight, LayoutGrid } from "lucide-react";

export function ProductsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-12 max-w-6xl relative z-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#1FCC59]/10 rounded-xl flex items-center justify-center text-[#1FCC59]">
            <LayoutGrid size={24} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Продукты
          </h1>
        </div>
        <p className="text-lg text-gray-500 max-w-2xl">
          Подробная информация о каждом решении из экосистемы Smart Restaurant. Выберите продукт, чтобы узнать больше.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product, index) => (
          <Link key={product.id} to={`/products/${product.id}`} className="block outline-none group">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#1FCC59]/30 transition-all duration-300 h-full flex flex-col"
            >
              {product.image && (
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="text-[#1FCC59] font-semibold text-sm uppercase tracking-wider">Подробнее</span>
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#1FCC59] group-hover:bg-[#1FCC59] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={20} strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
