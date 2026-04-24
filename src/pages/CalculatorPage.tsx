import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Settings2, ChevronLeft } from "lucide-react";
import { PRODUCT_COSTS, PRODUCT_BENEFITS, CALCULATOR_CONSTANTS } from "../config/constants";
import { productsData } from "../data/products";

// Форматирование денег
const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  // Поля ввода
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70", aggr: "30", disc: "0",
    dly_day: "15", avg_delivery: "3500"
  });

  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});

  const handleParamChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };

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
    const IMPACT = CALCULATOR_CONSTANTS.IMPACT_RATE;

    // 1. Текущая прибыль
    const now_profit = ((CHD * DAYS * L * AVG) + (DLY_CH * DAYS * L * DLY_AVG * (1 - AGGR))) * MARG;

    // 2. Расчет преимуществ (логика категорий)
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

    // 3. Математика "30% проникновения" для зала
    const impacted_hall_revenue = (CHD * IMPACT * (1 + total_check_boost)) * (AVG * (1 + upsell)) * DAYS * L;
    const regular_hall_revenue = (CHD * (1 - IMPACT)) * AVG * DAYS * L;

    // 4. Математика для доставки (SR Delivery - p3)
    const dly_upsell = selectedProducts.p3 ? 0.16 : 0;
    const impacted_dly_rev = (DLY_CH * IMPACT) * (DLY_AVG * (1 + dly_upsell)) * DAYS * L;
    const regular_dly_rev = (DLY_CH * (1 - IMPACT)) * DLY_AVG * DAYS * L;

    // 5. Затраты
    let cost = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (selectedProducts[id]) {
        // Приложение p4 и Guest 360 p9 / Лояльность p5 обычно считаются разово или иначе, но по твоей просьбе умножаем на локации где надо
        const basePrice = (PRODUCT_COSTS as any)[id] || 0;
        cost += (id === 'p4' || id === 'p5' || id === 'p9') ? basePrice : basePrice * L;
      }
    });
    const final_cost = cost * (1 - DISC);

    const smart_profit = ((impacted_hall_revenue + regular_hall_revenue) + ((impacted_dly_rev + regular_dly_rev) * (1 - AGGR))) * MARG - final_cost;

    return { now: now_profit, smart: smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, selectedProducts]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-[#1FCC59] font-bold uppercase text-xs">
          <ChevronLeft size={18} /> Назад
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Ввод данных */}
            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Settings2 /> Параметры бизнеса</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InputField label="Локаций" value={params.loc} onChange={(v: string) => handleParamChange('loc', v)} />
                <InputField label="Чеков/день" value={params.chd} onChange={(v: string) => handleParamChange('chd', v)} />
                <InputField label="Ср. чек" value={params.avg} onChange={(v: string) => handleParamChange('avg', v)} suffix="₸" />
                <InputField label="Маржа %" value={params.marg} onChange={(v: string) => handleParamChange('marg', v)} />
                <InputField label="Доставок" value={params.dly_day} onChange={(v: string) => handleParamChange('dly_day', v)} />
                <InputField label="Ср. чек дост." value={params.avg_delivery} onChange={(v: string) => handleParamChange('avg_delivery', v)} suffix="₸" />
                <InputField label="Агрегатор %" value={params.aggr} onChange={(v: string) => handleParamChange('aggr', v)} />
                <InputField label="Скидка %" value={params.disc} onChange={(v: string) => handleParamChange('disc', v)} />
              </div>
            </section>

            {/* Карточки продуктов */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsData.map((item) => (
                <ProductToggle 
                  key={item.id}
                  data={item}
                  isActive={!!selectedProducts[item.id]}
                  onClick={() => setSelectedProducts(prev => ({...prev, [item.id]: !prev[item.id]}))}
                />
              ))}
            </div>
          </div>

          {/* Результаты */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl">
              <h3 className="text-[#1FCC59] font-black uppercase text-xs mb-8">Результат за 30 дней</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Было:</p>
                  <p className="text-2xl font-bold opacity-60">{formatMoney(results.now)} ₸</p>
                </div>
                <div className="pt-6 border-t border-slate-800">
                  <p className="text-[#1FCC59] text-xs font-bold uppercase">Станет:</p>
                  <p className="text-4xl font-black">{formatMoney(results.smart)} ₸</p>
                </div>
                <div className="bg-[#1FCC59] p-6 rounded-3xl text-slate-900">
                  <p className="text-xs font-bold uppercase">Чистая выгода:</p>
                  <p className="text-3xl font-black">+{formatMoney(results.diff)} ₸</p>
                </div>
                {results.cost > 0 && (
                  <p className="text-center text-[10px] text-slate-500 uppercase font-bold">
                    Затраты на внедрение: {formatMoney(results.cost)} ₸
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Внутренние компоненты
function InputField({ label, value, onChange, suffix }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{label}</label>
      <div className="relative">
        <input 
          type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] outline-none font-bold text-slate-700"
        />
        {suffix && <span className="absolute right-4 top-3 text-slate-300 font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

function ProductToggle({ data, isActive, onClick }: any) {
  return (
    <motion.div 
      onClick={onClick}
      className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${isActive ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'border-white bg-white shadow-sm'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-black text-slate-800">{data.name}</h4>
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#1FCC59] text-white' : 'bg-slate-100'}`}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mb-4">{data.description}</p>
      <div className="flex flex-wrap gap-2">
        {data.features.map((f: string, i: number) => (
          <span key={i} className="text-[9px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">{f}</span>
        ))}
      </div>
    </motion.div>
  );
}
