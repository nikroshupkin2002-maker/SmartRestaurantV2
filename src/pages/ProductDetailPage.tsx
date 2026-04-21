// @ts-nocheck
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentIndex = PRODUCTS.findIndex(p => p.id === id);
  const product = PRODUCTS[currentIndex];

  if (!product) return <div className="p-20 text-center">Продукт не найден</div>;

  const prevProduct = PRODUCTS[currentIndex - 1];
  const nextProduct = PRODUCTS[currentIndex + 1];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/products" className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium text-sm">Назад к списку</span>
          </Link>
          <div className="flex gap-4">
             <button 
               disabled={!prevProduct}
               onClick={() => navigate(`/products/${prevProduct?.id}`)}
               className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-10 transition-all border border-gray-100"
             >
               <ChevronLeft size={24} />
             </button>
             <button 
               disabled={!nextProduct}
               onClick={() => navigate(`/products/${nextProduct?.id}`)}
               className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-10 transition-all border border-gray-100"
             >
               <ChevronRight size={24} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight leading-[1.1]">{product.title}</h1>
                <p className="text-2xl text-gray-400 leading-relaxed mb-16">
                {product.fullDescription}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <div className="bg-[#F8F9FA] p-10 rounded-[48px] border border-gray-100">
                <h3 className="text-xl font-bold mb-10">Что дает вашему бизнесу:</h3>
                <ul className="space-y-6">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1.5 bg-[#1FCC59] p-1 rounded-full shadow-lg shadow-[#1FCC59]/20">
                        <CheckCircle2 className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700 font-medium text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6 justify-center">
                {product.stats ? (
                  product.stats.map((s, i) => (
                    <div key={i} className="bg-white border-2 border-gray-50 p-12 rounded-[48px] shadow-sm flex flex-col items-center">
                      <span className="text-7xl font-black text-[#1FCC59] mb-2">{s.value}</span>
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{s.label}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-900 text-white p-12 rounded-[48px] h-full flex flex-col justify-end">
                     <p className="text-3xl font-bold mb-4">Готовое к интеграции решение</p>
                     <p className="text-gray-400">Часть экосистемы Smart Restaurant</p>
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
