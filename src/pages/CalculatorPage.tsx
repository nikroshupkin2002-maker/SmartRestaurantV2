// @ts-nocheck
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Info, Check, Calculator as CalcIcon, Settings2, Plus, ChevronLeft 
} from "lucide-react";

import { PRODUCTS } from "../data/products";
import { ProductIcon } from "../components/ProductIcon";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  // Параметры бизнеса
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", deli: "15", deliAvg: "3500", 
    marg: "70", aggr: "30", discount: "0"
  });

  const [selectedProducts, setSelectedProducts] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  const [appPrice, setAppPrice] = useState("420000"); 
  const [kioskCount, setKioskCount] = useState("1");   

  // Обработка ввода без потери фокуса
  const handleInputChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const results = useMemo(() => {
    const loc = Number(params.loc) || 0;
    const marg = (Number(params.marg) || 0) / 100;
    const aggr_rate = (Number(params.aggr) || 0) / 100;
    const disc = (Number(params.discount) || 0) / 100;
    const days = 30;
    const penetration = 0.3; // 30% проникновения

    // Исходные данные
    const chd = Number(params.chd) || 0;
    const avg = Number(params.avg) || 0;
    const deli = Number(params.deli) || 0;
    const deliAvg = Number(params.deliAvg) || 0;
    
    // --- РАСЧЕТ "СЕЙЧАС" ---
    const curHall = chd * avg * days * loc;
    const curDeli = deli * deliAvg * days * loc;
    const now_profit = ((curHall + curDeli) * marg) - (curDeli * aggr_rate);

    // --- РАСЧЕТ SMART ---
    // 1. Автоподтягивание (p7): +30% к чекам (оборачиваемость)
    let sChd = selectedProducts.p7 ? (chd * (1 - penetration)) + (chd * 1.30 * penetration) : chd;
    
    // 2. SR Delivery (p3): +20% к кол-ву и +16% к чеку доставки
    let sDeli = selectedProducts.p3 ? (deli * (1 - penetration)) + (deli * 1.20 * penetration) : deli;
    let sDeliAvg = selectedProducts.p3 ? (deliAvg * (1 - penetration)) + (deliAvg * 1.16 * penetration) : deliAvg;

    let sHallRev = sChd * avg * days * loc;
    let sDeliRev = sDeli * sDeliAvg * days * loc;

    // 3. Лояльность (p5): +10% к возвращаемости (доп. чеки)
    if (selectedProducts.p5) {
        sHallRev += (sHallRev * 0.10);
    }

    // Расчет затрат на ПО
    let cost = 0;
    PRODUCTS.forEach(p => {
      if (selectedProducts[p.id]) {
        if (p.id === 'p4') cost += Number(appPrice) || 0;
        else if (p.id === 'p8') cost += p.monthlyPrice * (Number(kioskCount) || 1);
        else if (p.id === 'p5' || p.id === 'p9') cost += p.monthlyPrice;
        else cost += p.monthlyPrice * loc;
      }
    });
    const final_cost = cost * (1 - disc);

    let smart_profit = ((sHallRev + sDeliRev) * marg) - final_cost;
    if (!selectedProducts.p3) smart_profit -= (sDeliRev * aggr_rate);

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, selectedProducts, appPrice, kioskCount]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-[#2D3139] pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] font-bold text-[13px] uppercase tracking-wider transition-colors">
          <ChevronLeft size={18} /> Назад
        </button>

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* ЛЕВАЯ КОЛОНКА */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-[#1FCC59] rounded-xl flex items-center justify-center text-white">
                 <CalcIcon size={24} />
               </div>
               <h1 className="text-3xl font-black tracking-tight text-[#1A1D23]">Smart Restaurant Calc</h1>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
               <h2 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                 <Settings2 size={16} /> 1. Основные параметры
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <MiniInput label="Локаций" value={params.loc} onChange={v => handleInputChange('loc', v)} />
                 <MiniInput label="Чеков/день" value={params.chd} onChange={v => handleInputChange('chd', v)} />
                 <MiniInput label="Ср. чек" value={params.avg} onChange={v => handleInputChange('avg', v)} suffix="₸" />
                 <MiniInput label="Маржа" value={params.marg} onChange={v => handleInputChange('marg', v)} suffix="%" />
               </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
               <h2 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                 <Plus size={16} /> 2. Дополнительные параметры
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <MiniInput label="Комиссия агр." value={params.aggr} onChange={v => handleInputChange('aggr', v)} suffix="%" />
                 <MiniInput label="Скидка на услуги" value={params.discount} onChange={v => handleInputChange('discount', v)} suffix="%" />
                 <MiniInput label="Дост./день" value={params.deli} onChange={v => handleInputChange('deli', v)} />
                 <MiniInput label="Ср. чек дост." value={params.deliAvg} onChange={v => handleInputChange('deliAvg', v)} suffix="₸" />
               </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 pl-2">3. Продукты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCTS.map(p => (
                  <div key={p.id} onClick={() => toggleProduct(p.id)} className={`group relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[100px] ${selectedProducts[p.id] ? 'border-[#1FCC59] bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:shadow-md'}`}>
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-[15px] text-[#1A1D23]">{p.title}</span>
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedProducts[p.id] ? 'bg-[#1FCC59] border-[#1FCC59] text-white' : 'border-gray-200'}`}>
                          {selectedProducts[p.id] && <Check size={12} strokeWidth={4} />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight pr-6">{p.description}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.price}</span>
                      {selectedProducts[p.id] && p.id === 'p8' && (
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1" onClick={e => e.stopPropagation()}>
                          <button onClick={() => setKioskCount(String(Math.max(1, Number(kioskCount)-1)))} className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded-md text-[#1FCC59]">-</button>
                          <span className="text-[12px] font-bold w-8 text-center">{kioskCount}</span>
                          <button onClick={() => setKioskCount(String(Number(kioskCount)+1))} className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded-md text-[#1FCC59]">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (ИТОГИ) */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-10 bg-white rounded-[40px] p-10 shadow-2xl shadow-gray-200/50 border border-gray-50">
              <h3 className="text-center font-bold text-gray-900 mb-10">Итоговый расчет за 30 дней</h3>
              
              <div className="space-y-8">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-2">Прибыль сейчас</span>
                  <div className="text-2xl font-black text-[#1A1D23]">{formatMoney(results.now_profit)} ₸</div>
                </div>

                <div className="bg-[#1FCC59] p-8 rounded-[32px] text-white text-center shadow-lg shadow-[#1FCC59]/30 relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2 block">Со Smart Restaurant</span>
                    <div className="text-3xl font-black">{formatMoney(results.smart_profit)} ₸</div>
                    {results.cost > 0 && <div className="text-[10px] mt-2 opacity-60">Затраты на ПО: -{formatMoney(results.cost)} ₸</div>}
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-20"><CalcIcon size={60} /></div>
                </div>

                <div className="bg-[#F1FDF5] border border-[#1FCC59]/10 p-6 rounded-3xl text-center">
                  <span className="text-[10px] font-bold text-[#1FCC59] uppercase tracking-[0.2em] mb-1 block">Выгода от внедрения</span>
                  <div className="text-2xl font-black text-[#1FCC59]">+{formatMoney(results.diff)} ₸</div>
                </div>
              </div>

              <p className="mt-10 text-[10px] text-gray-300 text-center leading-relaxed italic">
                *Расчет является прогнозным, эффективность зависит от уровня внедрения продукта персоналом.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательный компонент инпута
function MiniInput({ label, value, onChange, suffix = "" }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative flex items-center">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-4 bg-gray-50 border border-gray-100 rounded-xl text-[14px] font-bold text-[#1A1D23] focus:bg-white focus:border-[#1FCC59] focus:ring-4 focus:ring-[#1FCC59]/5 transition-all outline-none"
        />
        {suffix && <span className="absolute right-4 text-[12px] font-bold text-gray-300">{suffix}</span>}
      </div>
    </div>
  );
}
