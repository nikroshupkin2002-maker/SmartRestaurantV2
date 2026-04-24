import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, UserRound, Truck, Smartphone, 
  Star, Zap, CreditCard, Monitor, BarChart3, ArrowRight 
} from 'lucide-react';
import { productsData } from '../data/products';

const HomePage = () => {
  const navigate = useNavigate();

  const getIcon = (id: string) => {
    const props = { size: 24, className: "text-[#1FCC59]" };
    switch (id) {
      case 'p1': return <LayoutGrid {...props} />;
      case 'p2': return <UserRound {...props} />;
      case 'p3': return <Truck {...props} />;
      case 'p4': return <Smartphone {...props} />;
      case 'p5': return <Star {...props} />;
      case 'p6': return <Zap {...props} />;
      case 'p7': return <CreditCard {...props} />;
      case 'p8': return <Monitor {...props} />;
      case 'p9': return <BarChart3 {...props} />;
      default: return <LayoutGrid {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Шапка */}
      <header className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1FCC59] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1FCC59]/20">
            <span className="text-white font-black text-2xl">S</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">SMART</h1>
            <p className="text-[#1FCC59] font-black text-xs tracking-[0.2em] leading-none mt-1">RESTAURANT</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/calculator')}
          className="bg-[#1FCC59] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#1dbb52] transition-all shadow-xl shadow-[#1FCC59]/10 flex items-center gap-3"
        >
          Калькулятор выгоды <ArrowRight size={14} />
        </button>
      </header>

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-16">
          <h2 className="text-5xl font-black tracking-tight mb-4 text-slate-900">
            Наши <span className="text-[#1FCC59]">продукты</span>
          </h2>
          <div className="w-20 h-2 bg-[#1FCC59] rounded-full"></div>
        </div>

        {/* Сетка как на фото */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-[#1FCC59]/5 transition-all duration-500 flex flex-col h-full"
            >
              {/* Иконка */}
              <div className="w-16 h-16 bg-slate-50 rounded-[22px] flex items-center justify-center mb-8 group-hover:bg-[#1FCC59]/10 transition-colors duration-300">
                {getIcon(product.id)}
              </div>
              
              {/* Заголовок */}
              <h3 className="text-2xl font-black mb-4 text-slate-800 group-hover:text-[#1FCC59] transition-colors">
                {product.name}
              </h3>
              
              {/* Описание */}
              <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-grow">
                {product.description}
              </p>

              {/* Теги/Фичи */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                {product.features.map((feature, i) => (
                  <span 
                    key={i} 
                    className="text-[9px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-2 rounded-xl"
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
