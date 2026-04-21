import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Находим текущий продукт и его индекс в массиве
  const currentIndex = PRODUCTS.findIndex(p => p.id === id);
  const product = PRODUCTS[currentIndex];

  if (!product) return <div className="p-20 text-center">Продукт не найден</div>;

  // Логика для кнопок "Туда-Сюда"
  const prevProduct = PRODUCTS[currentIndex - 1];
  const nextProduct = PRODUCTS[currentIndex + 1];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Верхняя навигация */}
      <div className="border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">К списку продуктов</span>
          </Link>
          <div className="flex gap-2">
             <button 
               disabled={!prevProduct}
               onClick={() => navigate(`/products/${prevProduct?.id}`)}
               className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-20 transition-all"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               disabled={!nextProduct}
               onClick={() => navigate(`/products/${nextProduct?.id}`)}
               className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-20 transition-all"
             >
               <ChevronRight size={24} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">{product.title}</h1>
            
            <p className="text-2xl text-gray-500 leading-relaxed mb-16 max-w-3xl">
              {product.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[#1FCC59] rounded-full" />
                    Преимущества решения
                </h3>
                <ul className="space-y-6">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-[#1FCC59]/10 p-1 rounded-full">
                        <CheckCircle2 className="text-[#1FCC59]" size={18} />
                      </div>
                      <span className="text-gray-700 font-medium text-lg leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {product.stats ? (
                  product.stats.map((s, i) => (
                    <div key={i} className="bg-white border-2 border-gray-50 p-10 rounded-[40px] flex flex-col items-center justify-center text-center shadow-sm">
                      <span className="text-6xl font-black text-[#1FCC59] mb-2">{s.value}</span>
                      <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">{s.label}</span>
                    </div>
                  ))
                ) : (
                  <div className="h-full bg-[#1FCC59] rounded-[40px] p-10 text-white flex flex-col justify-end">
                     <p className="text-2xl font-bold leading-tight">Готовое решение для вашего бизнеса</p>
                     <p className="opacity-80 mt-2">Экосистема Smart Restaurant</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
