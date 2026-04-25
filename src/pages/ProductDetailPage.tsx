// @ts-nocheck
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { ProductIcon } from "../components/ProductIcon";
import { PRODUCTS } from "../data/products"; // Импортируем общие данные

export function ProductDetailPage() {
  const { productId } = useParams();
  
  // Ищем данные продукта в общем массиве
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Продукт не найден</h2>
          <Link to="/products" className="text-[#1FCC59] font-bold underline">Вернуться к списку</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/products" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-wider">
            <ArrowLeft size={18} /> Назад
          </Link>
          <div className="font-black tracking-tight text-xl">
            <span className="text-[#1FCC59]">Smart</span> Restaurant
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12">
        {/* Заголовок и главная метрика */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center text-[#1FCC59] mb-6">
              <ProductIcon name={product.iconName} size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
              {product.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              {product.fullDescription}
            </p>
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1FCC59] p-8 rounded-[40px] text-white shadow-2xl shadow-[#1FCC59]/20 text-center min-w-[200px]"
          >
            <div className="text-5xl font-black mb-1">{product.res}</div>
            <div className="text-xs font-bold uppercase tracking-widest opacity-80">{product.resLabel}</div>
          </motion.div>
        </div>

        {/* Галерея */}
        {product.images && (
          <section className="mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center gap-2">
              <Zap size={14} className="text-[#1FCC59]" /> Интерфейс решения
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.images.map((img, idx) => (
                <div key={idx} className="group">
                  <div className="aspect-[3/4] rounded-[48px] overflow-hidden bg-gray-100 border-8 border-gray-50 shadow-inner">
                    <img src={img.url} alt={img.desc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="mt-4 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">{img.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Преимущества и QR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Почему это выгодно</h2>
            {product.benefits?.map((benefit, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="mt-1 text-[#1FCC59]"><CheckCircle2 size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>

          {product.qrImage && (
            <div className="bg-gray-900 rounded-[48px] p-8 text-white text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1FCC59] mb-6">Проверьте в деле</p>
              <div className="bg-white p-4 rounded-3xl mb-6 inline-block">
                <img src={product.qrImage.url} alt="QR Code" className="w-32 h-32" />
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">Отсканируйте QR</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{product.qrImage.desc}</p>
            </div>
          )}
        </div>

        {/* Нижний блок цены */}
        <div className="mt-20 p-10 bg-gray-50 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
          <div>
            <h3 className="text-3xl font-black mb-2 uppercase">Стоимость решения</h3>
            <p className="text-gray-500 font-medium italic">Ежемесячное сервисное обслуживание модуля</p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-5xl font-black text-gray-900 mb-1">{product.price}</div>
            <p className="text-sm font-bold text-[#1FCC59] uppercase tracking-widest">без скрытых комиссий</p>
          </div>
        </div>
      </main>
    </div>
  );
}
