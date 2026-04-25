// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  BarChart3,
  FileText,
  Calculator as CalcIcon
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductIcon } from '../components/ProductIcon';

export function HomePage() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Рост среднего чека', value: '+16%', icon: <TrendingUp className="text-[#1FCC59]" />, desc: 'За счет системы рекомендаций' },
    { label: 'Экономия времени', value: '-15 мин', icon: <Zap className="text-[#1FCC59]" />, desc: 'На каждом цикле обслуживания' },
    { label: 'Оборачиваемость', value: '+30%', icon: <Users className="text-[#1FCC59]" />, desc: 'Больше гостей в пиковые часы' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-8 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <div className="w-6 h-6 bg-[#1FCC59] rounded flex items-center justify-center text-white font-bold text-xs">F</div>
              <span className="text-sm font-bold tracking-wide uppercase text-gray-500">Smart Restaurant Ecosystem</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl leading-[0.9] md:leading-[0.9]">
              ЦИФРОВАЯ ЭВОЛЮЦИЯ <span className="text-[#1FCC59]">ВАШЕГО РЕСТОРАНА</span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              Автоматизация, которая увеличивает прибыль, оцифровывает каждого гостя и освобождает персонал от рутины.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/calculator')}
                className="bg-[#1FCC59] hover:bg-[#1bb34e] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#1FCC59]/20 transition-all flex items-center justify-center gap-3 group"
              >
                <CalcIcon size={22} />
                Рассчитать выгоду
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/products')}
                className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                <FileText size={22} />
                Собрать КП
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-gray-100">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="font-bold text-sm text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 uppercase">Наши решения</h2>
              <p className="text-gray-500 font-medium">Экосистема инструментов для роста на каждом этапе</p>
            </div>
            <button 
              onClick={() => navigate('/products')}
              className="hidden md:flex items-center gap-2 text-[#1FCC59] font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all"
            >
              Все продукты <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/products`)}
                className="group p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#1FCC59] group-hover:text-white transition-colors">
                  <ProductIcon name={product.iconName} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{product.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">{product.description}</p>
                <div className="font-bold text-gray-900 group-hover:text-[#1FCC59] transition-colors">{product.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-gray-900 py-20 px-6 rounded-t-[60px]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
            ГОТОВЫ ТРАНСФОРМИРОВАТЬ <br/> СВОЙ БИЗНЕС?
          </h2>
          <button 
            onClick={() => navigate('/calculator')}
            className="bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:bg-[#1FCC59] hover:text-white transition-all inline-flex items-center gap-3"
          >
            Начать расчет прибыли
            <ArrowRight size={22} />
          </button>
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white/50 font-bold tracking-tight">
              <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-white text-[10px]">F</div>
              Smart Restaurant 2026
            </div>
            <div className="text-white/30 text-xs uppercase tracking-widest font-medium">
              Powered by Freedom Bank x Choco
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
