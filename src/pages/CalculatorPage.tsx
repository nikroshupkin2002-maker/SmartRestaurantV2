import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Settings2, ChevronLeft } from "lucide-react";
// Импортируем данные. Проверь, что эти файлы у тебя созданы!
import { PRODUCT_COSTS, PRODUCT_BENEFITS, CALCULATOR_CONSTANTS } from "../config/constants";
import { productsData } from "../data/products";

const CalculatorPage = () => {
  const navigate = useNavigate();

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
    const DAYS = 30;
    const IMPACT = 0.30; // Твои 30% проникновения

    const now_profit = ((CHD * DAYS * L * AVG) + (DLY_CH * DAYS * L * DLY_AVG * (1 - AGGR))) * MARG;

    let b_speed = 0, b_turnover = 0, b_loyalty = 0, upsell = 0;
    Object.keys(selectedProducts).forEach(id => {
      if (!selectedProducts[id]) return;
      const b = (PRODUCT_BENEFITS as any)[id];
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

  const fM = (v: number) => new Intl.NumberFormat("ru-RU").format(Math.round(v));

  return (
    <div className="min-h-screen bg-slate-50 pb-20 p-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px]">
          <ChevronLeft size={16} /> Назад
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-lg font-black mb-4 flex items-center gap-2"><Settings2 size={18}/> Параметры</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(params).map(([key, val]) => (
                  <div key={key}>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">{key}</label>
                    <input 
                      type="text" value={val} 
                      onChange={(e) => handleParamChange(key, e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border rounded-xl font-bold text-sm" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsData.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedProducts(prev => ({...prev, [p.id]: !prev[p.id]}))}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${selectedProducts[p.id] ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'bg-white border-transparent'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">{p.name}</span>
                    {selectedProducts[p.id] && <Check size={16} className="text-[#1FCC59]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white sticky top-4 shadow-xl">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Было</p>
                  <p className="text-xl font-medium opacity-50">{fM(results.now)} ₸</p>
                </div>
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-[#1FCC59] text-[10px] uppercase font-bold">Станет</p>
                  <p className="text-3xl font-black">{fM(results.smart)} ₸</p>
                </div>
                <div className="bg-[#1FCC59] p-5 rounded-2xl text-slate-900 text-center">
                  <p className="text-[10px] font-bold uppercase">Выгода в месяц</p>
                  <p className="text-2xl font-black">+{fM(results.diff)} ₸</p>
                </div>
                <p className="text-[9px] text-slate-500 text-center uppercase font-bold">Затраты: {fM(results.cost)} ₸</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
