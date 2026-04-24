import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Settings2, ChevronLeft } from "lucide-react";
import { PRODUCT_COSTS, PRODUCT_BENEFITS, CALCULATOR_CONSTANTS } from "../config/constants";
import { productsData } from "../data/products";

// --- НАЧАЛО КОДА ---

export function CalculatorPage() {
  const navigate = useNavigate();

  // 1. Поля для ввода цифр
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70", aggr: "30", disc: "0",
    dly_day: "15", avg_delivery: "3500"
  });

  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});

  const handleParamChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };

  // 2. Расчет логики (30% проникновения)
  const results = useMemo(() => {
    const L = parseFloat(params.loc) || 0;
    const CHD = parseFloat(params.chd) || 0;
    const AVG = parseFloat(params.avg) || 0;
    const MARG = (parseFloat(params.marg) || 0) / 100;
    const AGGR = (parseFloat(params.aggr) || 0) / 100;
    const DISC = (parseFloat(params.disc) || 0) / 100;
    const DLY_CH = parseFloat(params.dly_day) || 0;
    const DLY_AVG = parseFloat(params.avg_delivery) || 0;
    const DAYS = CALCULATOR_CONSTANTS.DAYS;
    const IMPACT = CALCULATOR_CONSTANTS.IMPACT_RATE; // 0.30

    // Считаем "Как сейчас"
    const now_profit = ((CHD * DAYS * L * AVG) + (DLY_CH * DAYS * L * DLY_AVG * (1 - AGGR))) * MARG;

    // Считаем бонусы от продуктов
    let b_speed = 0, b_turnover = 0, b_loyalty = 0, upsell = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (!selectedProducts[id]) return;
      const b = (PRODUCT_BENEFITS as any)[id];
      if (b.cat === "speed") b_speed = Math.max(b_speed, b.checkInc);
      if (b.cat === "turnover") b_turnover = Math.max(b_turnover, b.checkInc);
      if (b.cat === "loyalty") b_loyalty = Math.max(b_loyalty, b.checkInc);
      upsell = Math.max(upsell, b.avgInc);
    });

    const total_check_boost = b_speed + b_turnover + b_loyalty;

    // Применяем рост только к 30% чеков (Impact)
    const impacted_hall = (CHD * IMPACT * (1 + total_check_boost)) * (AVG * (1 + upsell)) * DAYS * L;
    const regular_hall = (CHD * (1 - IMPACT)) * AVG * DAYS * L;

    const dly_boost = selectedProducts.p3 ? 0.16 : 0;
    const impacted_dly = (DLY_CH * IMPACT) * (DLY_AVG * (1 + dly_boost)) * DAYS * L;
    const regular_dly = (DLY_CH * (1 - IMPACT)) * DLY_AVG * DAYS * L;

    // Считаем затраты
    let cost = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (selectedProducts[id]) {
        const base = (PRODUCT_COSTS as any)[id] || 0;
        cost += (id === 'p4' || id === 'p5' || id === 'p9') ? base : base * L;
      }
    });
    const final_cost = cost * (1 - DISC);

    const smart_profit = ((impacted_hall + regular_hall) + ((impacted_dly + regular_dly) * (1 - AGGR))) * MARG - final_cost;

    return { now: now_profit, smart: smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, selectedProducts]);

  // 3. Форматирование денег
  const fM = (v: number) => new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(v));

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-[#1FCC59] font-bold uppercase text-[10px] tracking-widest mb-8 transition-colors">
          <ChevronLeft size={16} /> Назад в меню
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ЛЕВАЯ ЧАСТЬ */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-800"><Settings2 size={20} /> Параметры</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Локаций</label>
                  <input type="text" value={params.loc} onChange={(e) => handleParamChange('loc', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Чеков/день</label>
                  <input type="text" value={params.chd} onChange={(e) => handleParamChange('chd', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Ср. чек</label>
                  <div className="relative">
                    <input type="text" value={params.avg} onChange={(e) => handleParamChange('avg', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                    <span className="absolute right-4 top-3 text-slate-300 font-bold">₸</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Маржа %</label>
                  <input type="text" value={params.marg} onChange={(e) => handleParamChange('marg', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Доставок</label>
                  <input type="text" value={params.dly_day} onChange={(e) => handleParamChange('dly_day', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Ср. чек дост.</label>
                  <div className="relative">
                    <input type="text" value={params.avg_delivery} onChange={(e) => handleParamChange('avg_delivery', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                    <span className="absolute right-4 top-3 text-slate-300 font-bold">₸</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Агрегатор %</label>
                  <input type="text" value={params.aggr} onChange={(e) => handleParamChange('aggr', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Скидка %</label>
                  <input type="text" value={params.disc} onChange={(e) => handleParamChange('disc', e.target.value)} className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700" />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsData.map((item) => {
                const active = !!selectedProducts[item.id];
                return (
                  <motion.div 
                    key={item.id}
                    onClick={() => setSelectedProducts(p => ({...p, [item.id]: !p[item.id]}))}
                    className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${active ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'border-white bg-white shadow-sm'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-800">{item.name}</h4>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? 'bg-[#1FCC59] text-white' : 'bg-slate-100 text-slate-300'}`}>
                        <Check size={14} strokeWidth={4} />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((f, i) => (
                        <span key={i} className="text-[9px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">{f}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ (РЕЗУЛЬТАТ) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FCC59] blur-[100px] opacity-20" />
              <h3 className="text-[#1FCC59] font-black uppercase text-xs tracking-widest mb-8">Результат за 30 дней</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Текущая прибыль</p>
                  <p className="text-2xl font-bold opacity-60">{fM(results.now)} ₸</p>
                </div>
                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[#1FCC59] text-xs font-bold uppercase mb-1">Со Smart Restaurant</p>
                  <p className="text-4xl font-black text-white">{fM(results.smart)} ₸</p>
                </div>
                <div className="bg-[#1FCC59] p-6 rounded-3xl text-slate-900">
                  <p className="text-[10px] font-black uppercase mb-1">Чистая выгода</p>
                  <p className="text-3xl font-black">+{fM(results.diff)} ₸</p>
                </div>
                {results.cost > 0 && (
                  <div className="text-center pt-4">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Затраты на внедрение: {fM(results.cost)} ₸</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
