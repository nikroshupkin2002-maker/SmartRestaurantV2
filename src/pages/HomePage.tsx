import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  UserRound, 
  Truck, 
  Smartphone, 
  Star, 
  Zap, 
  CreditCard, 
  Monitor, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { productsData } from '../data/products';

const HomePage = () => {
  const navigate = useNavigate();

  // Маппинг иконок для продуктов
  const getIcon = (id: string) => {
    switch (id) {
      case 'p1': return <LayoutGrid className="text-[#1FCC59]" size={24} />;
      case 'p2': return <UserRound className="text-[#1FCC59]" size={24} />;
      case 'p3': return <Truck className="text-[#1FCC59]" size={24} />;
      case 'p4': return <Smartphone className="text-[#1FCC59]" size={24} />;
      case 'p5': return <Star className="text-[#1FCC59]" size={24} />;
      case 'p6': return <Zap className="text-[#1FCC59]" size={24} />;
      case 'p7': return <CreditCard className="text-[#1FCC59]" size={24} />;
      case 'p8': return <Monitor className="text-[#1FCC59]" size={24} />;
      case 'p9': return <BarChart3 className="text-[#1FCC59]" size={24} />;
      default: return <LayoutGrid className="text-[#1FCC59]" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans">
      {/* Шапка */}
      <header className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1FCC59] rounded-xl flex items-center justify-center">
            <span className="text-black font-black text-xl">S</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">
            Smart <span className="text-[#1FCC59]">Restaurant</span>
          </h1>
        </div>
        
        <button 
          onClick={() => navigate('/calculator')}
          className="bg-[#1FCC59] text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(31,204,89,0.3)] flex items-center gap-2"
        >
          Калькулятор выгоды <ArrowRight size={16} />
        </button>
      </header>

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-4">Наши продукты</h2>
          <p className="text-slate-400 max-w-2xl">
            Экосистема решений для автоматизации ресторанов, которая увеличивает средний чек, 
            ускоряет обслуживание и оцифровывает каждого гостя.
          </p>
        </div>

        {/* Сетка продуктов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-slate-800/30 border border-slate-700/50 p-8 rounded-[40px] hover:border-[#1FCC59]/50 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                {getIcon(product.id)}
              </div>
              
              <h3 className="text-xl font-black mb-3 text-white group-hover:text-[#1FCC59] transition-colors">
                {product.name}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {product.features.map((feature, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-tight bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
