import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Settings2, ChevronLeft, Info } from "lucide-react";
import { PRODUCT_BENEFITS } from "../config/constants";
import { productsData } from "../data/products";

const CalculatorPage = () => {
  const navigate = useNavigate();

  // Параметры бизнеса + Настройки цен
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70", aggr: "30",
    dly_day: "15", avg_delivery: "3500",
    price_app: "420000", // Цена за приложение
    price_loc_app: "0",    // Цена за локацию в приложении
    kiosk_count: "1",     // Количество киосков
    price_kiosk: "60000"   // Цена за 1 киоск
  });

  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});

  const handleParamChange = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value.replace(/[^0-9]/g, "") }));
  };

  const results = useMemo(() => {
    const L = parseFloat(params.loc) || 0;
    const CHD = parseFloat(params.chd) || 0;
    const AVG = parseFloat(params.avg) || 0;
    const MARG = (parseFloat(params.marg) || 0) / 100;
    const AGGR = (parseFloat(params.aggr) || 0) / 100;
    const DLY_CH = parseFloat(params.dly_day) || 0;
    const DLY_AVG = parseFloat(params.avg_delivery) || 0;
    
    const DAYS = 30;
    const IMPACT = 0.30;

    // 1. Текущая прибыль
    const now_profit = ((CHD * DAYS * L * AVG) + (DLY_CH * DAYS * L * DLY_AVG * (1 - AGGR))) * MARG;

    // 2. Расчет бустов
    let b_speed = 0, b_turnover = 0, b_loyalty = 0, upsell = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (!selectedProducts[id]) return;
      const b = (PRODUCT_BENEFITS as any)[id];
      if (!b) return;
      if (b.cat === "speed") b_speed = Math.max(b_speed, b.checkInc);
      if (b.cat === "turnover") b_turnover = Math.max(b_turnover, b.checkInc);
      if (b.cat === "loyalty") b_loyalty = Math.max(b_loyalty, b.checkInc);
      upsell = Math.max(upsell, b.avgInc);
    });

    const total_boost = b_speed + b_turnover + b_loyalty;
    const impacted_hall = (CHD * IMPACT * (1 + total_boost)) * (AVG * (1 + upsell)) * DAYS * L;
    const regular_hall = (CHD * (1 - IMPACT)) * AVG * DAYS * L;

    const dly_boost = selectedProducts.p3 ? 0.16 : 0;
    const impacted_dly = (DLY_CH * IMPACT) * (DLY_AVG * (1 + dly_boost)) * DAYS * L;
    const regular_dly = (DLY_CH * (1 - IMPACT)) * DLY_AVG * DAYS * L;

    // 3. Кастомный расчет затрат
    let cost = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (!selectedProducts[id]) return;
      
      if (id === 'p4') { // Приложение
        cost += parseFloat(params.price_app) + (parseFloat(params.price_loc_app) * L);
      } else if (id === 'p8') { // Киоск
        cost += parseFloat(params.price_kiosk) * (parseFloat(params.kiosk_count) || 1);
      } else {
        // Остальные по 60к или 64к (p9)
        const base = id === 'p9' ? 64000 : 60000;
        cost += base * L;
      }
    });

    const smart_profit = ((impacted_hall + regular_hall) + ((impacted_dly + regular_dly) * (1 - AGGR))) * MARG - cost;

    return { now: now_profit, smart: smart_profit, diff: smart_profit - now_profit, cost };
  }, [params, selectedProducts]);

  const fM = (v: number) => new Intl.NumberFormat("ru-RU").format(Math.round(v));

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-[#1FCC59] font-bold uppercase text-[10px] tracking-widest mb-10 transition-all">
          <ChevronLeft size={16} /> На главную
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Секция настроек */}
            <section className="bg-slate-800/40 border border-slate-700 p-8 rounded-[40px] backdrop-blur-md">
              <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                <Settings2 className="text-[#1FCC59]" /> Вводные данные
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Локаций</label>
                  <input type="text" value={params.loc} onChange={(e) => handleParamChange('loc', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Чеков/день</label>
                  <input type="text" value={params.chd} onChange={(e) => handleParamChange('chd', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Ср. чек</label>
                  <input type="text" value={params.avg} onChange={(e) => handleParamChange('avg', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Маржа %</label>
                  <input type="text" value={params.marg} onChange={(e) => handleParamChange('marg', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-white transition-all" />
                </div>
              </div>

              {/* Расширенные настройки для КП */}
              <div className="mt-8 pt-8 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-wider">Цена App</label>
                  <input type="text" value={params.price_app} onChange={(e) => handleParamChange('price_app', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-blue-900/30 rounded-2xl outline-none font-bold text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-wider">App (за лок)</label>
                  <input type="text" value={params.price_loc_app} onChange={(e) => handleParamChange('price_loc_app', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-blue-900/30 rounded-2xl outline-none font-bold text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-orange-400 uppercase tracking-wider">Кол-во Киосков</label>
                  <input type="text" value={params.kiosk_count} onChange={(e) => handleParamChange('kiosk_count', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-orange-900/30 rounded-2xl outline-none font-bold text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-orange-400 uppercase tracking-wider">Цена Киоска</label>
                  <input type="text" value={params.price_kiosk} onChange={(e) => handleParamChange('price_kiosk', e.target.value)} className="w-full h-12 px-4 bg-slate-900/50 border border-orange-900/30 rounded-2xl outline-none font-bold text-white" />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsData.map((item) => {
                const active = !!selectedProducts[item.id];
                return (
                  <motion.div 
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProducts(p => ({...p, [item.id]: !p[item.id]}))}
                    className={`p-6 rounded-[35px] border-2 cursor-pointer transition-all duration-300 ${active ? 'border-[#1FCC59] bg-[#1FCC59]/10 shadow-[0_0_20px_rgba(31,204,89,0.1)]' : 'border-slate-800 bg-slate-800/30 hover:bg-slate-800/50'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className={`font-black tracking-tight ${active ? 'text-[#1FCC59]' : 'text-white'}`}>{item.name}</h4>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${active ? 'bg-[#1FCC59] border-[#1FCC59] text-black' : 'border-slate-600 text-transparent'}`}>
                        <Check size={16} strokeWidth={4} />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.slice(0, 2).map((f, i) => (
                        <span key={i} className="text-[9px] font-bold text-slate-500 uppercase bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-700">{f}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[48px] p-10 text-white shadow-2xl border border-slate-700/50">
              <div className="relative z-10">
                <h3 className="text-[#1FCC59] font-black uppercase text-[10px] tracking-[0.2em] mb-10 opacity-80">Прогноз эффективности</h3>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase mb-2">Текущая прибыль</p>
                    <p className="text-2xl font-bold text-slate-300 line-through decoration-red-500/50">{fM(results.now)} ₸</p>
                  </div>
                  
                  <div className="pt-8 border-t border-slate-700/50">
                    <p className="text-[#1FCC59] text-[10px] font-black uppercase mb-2 tracking-widest">После внедрения</p>
                    <p className="text-5xl font-black text-white tracking-tighter">{fM(results.smart)} ₸</p>
                  </div>

                  <div className="bg-[#1FCC59] p-8 rounded-[35px] text-black shadow-[0_20px_40px_rgba(31,204,89,0.2)]">
                    <p className="text-[10px] font-black uppercase mb-1 opacity-70">Дополнительная прибыль</p>
                    <p className="text-4xl font-black">+{fM(results.diff)} ₸</p>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/50 rounded-2xl border border-slate-700">
                    <Info size={14} className="text-[#1FCC59]" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Затраты: {fM(results.cost)} ₸</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
