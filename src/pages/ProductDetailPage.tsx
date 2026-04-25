// @ts-nocheck
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { ProductIcon } from "../components/ProductIcon";
import { PRODUCTS } from "../data/products";

export function ProductDetailPage() {
  const { productId } = useParams();
  
  // Ищем данные продукта в общем массиве данных
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Продукт не найден</h2>
          <Link to="/products" className="text-[#1FCC59] font-bold hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={18} /> Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-wider"
          >
            <ArrowLeft size={18} /> Назад к продуктам
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-bold">F</div>
            <span className="font-black tracking-tight text-xl uppercase">Smart Restaurant</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        {/* Заголовок и главная метрика */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-[#1FCC59] mb-6 border border-gray-100"
            >
              <ProductIcon name={product.iconName} size={32} />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none"
            >
              {product.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 leading-relaxed font-medium"
            >
              {product.fullDescription}
            </motion.p>
          </div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="bg-[#1FCC59] p-8 rounded-[40px] text-white shadow-2xl shadow-[#1FCC59]/20 text-center min-w-[220px]"
          >
            <div className="text-5xl font-black mb-1">{product.res}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{product.resLabel}</div>
          </motion.div>
        </div>

        {/* Галерея (с защитой от обрезки) */}
        {product.images && product.images.length > 0 && (
          <section className="mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
              <Zap size={14} className="text-[#1FCC59]" /> Визуальный интерфейс
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {product.images.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-[4/5] rounded-[48px] overflow-hidden bg-gray-50 border-[12px] border-gray-50 shadow-inner flex items-center justify-center p-4">
                    <img 
                      src={img.url} 
                      alt={img.desc} 
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <p className="mt-6 text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">{img.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Преимущества и QR тест-драйв */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="md:col-span-2 space-y-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Ключевые преимущества</h2>
            {product.benefits?.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 p-8 rounded-[32px] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
              >
                <div className="mt-1 text-[#1FCC59] bg-green-50 p-2 rounded-xl h-fit">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">{benefit.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {product.qrImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-[48px] p-10 text-white text-center sticky top-24"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1FCC59] mb-8">Попробуйте сейчас</p>
              <div className="bg-white p-6 rounded-[32px] mb-8 inline-block shadow-xl">
                <img src={product.qrImage.url} alt="QR Code" className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Сканируйте QR</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium italic">
                "{product.qrImage.desc}"
              </p>
            </motion.div>
          )}
        </div>

        {/* Финальный блок стоимости */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-gray-50 rounded-[56px] flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-2 uppercase tracking-tighter text-gray-900">Стоимость решения</h3>
            <p className="text-gray-500 text-lg font-medium italic">Абонентская плата за использование модуля в месяц</p>
          </div>
          <div className="text-center md:text-right relative z-10">
            <div className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">{product.price}</div>
            <p className="text-sm font-bold text-[#1FCC59] uppercase tracking-[0.3em]">включая поддержку 24/7</p>
          </div>
          {/* Декоративный элемент на фоне */}
          <div className="absolute -right-10 -bottom-10 text-gray-200 opacity-20 pointer-events-none">
            <ProductIcon name={product.iconName} size={200} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
