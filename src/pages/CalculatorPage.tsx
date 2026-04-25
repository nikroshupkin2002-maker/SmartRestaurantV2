// @ts-nocheck
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calculator as CalcIcon, Settings2, Plus, ChevronLeft } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ProductIcon } from "../components/ProductIcon";

const formatMoney = (val: number) => {
  const isNeg = val < 0;
  const formatted = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.abs(Math.round(val)));
  return isNeg ? `-${formatted}` : formatted;
};

export function CalculatorPage() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70",
    aggr: "30", discount: "0", deli: "15", deliAvg: "3500",
    kiosksPerLoc: "1" // Добавили параметр количества киосков
  });

  const [selectedProducts, setSelectedProducts] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  const handleInputChange = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value.replace(/[^0-9]/g, "") }));
  };

  const results = useMemo(() => {
    const L = Number(params.loc) || 0;
    const M = (Number(params.marg) || 0) / 100;
    const AR = (Number(params.aggr) || 0) / 100;
    const D = (Number(params.discount) || 0) / 100;
    const K = Number(params.kiosksPerLoc) || 0;
    const days = 30;
    const P = 0.3; // 30% проникновения

    const chd = Number(params.chd) || 0;
    const avg = Number(params.avg) || 0;
    const deli = Number(params.deli) || 0;
    const dAvg = Number(params.deliAvg) || 0;
    
    const curHallRev = chd * avg * days * L;
    const curDeliRev = deli * dAvg * days * L;
    const now_profit = ((curHallRev + curDeliRev) * M) - (curDeliRev * AR);

    let boostChd = 0; 
    let boostAvg = 0; 

    if (selectedProducts.p1) { boostChd = Math.max(boostChd, 0.20); boostAvg = Math.max(boostAvg, 0.16); }
    if (selectedProducts.p2) { boostChd = Math.max(boostChd, 0.25); boostAvg = Math.max(boostAvg, 0.16); }
    if (selectedProducts.p4) { boostChd = Math.max(boostChd, 0.30); boostAvg = Math.max(boostAvg, 0.16); }
    if (selectedProducts.p5) { boostChd = Math.max(boostChd, 0.30); boostAvg = Math.max(boostAvg, 0.12); }
    if (selectedProducts.p7) { boostChd = Math.max(boostChd, 0.25); }
    if (selectedProducts.p8) { boostChd = Math.max(boostChd, 0.20); boostAvg = Math.max(boostAvg, 0.16); }
    if (selectedProducts.p9) { boostChd = Math.max(boostChd, 0.30); }

    const sChd = (chd * (1 - P)) + (chd * (1 + boostChd) * P);
    const sAvg = (avg * (1 - P)) + (avg * (1 + boostAvg) * P);
    const sHallRev = sChd * sAvg * days * L;

    let sDeli = deli;
    let sDAvg = dAvg;
    if (selectedProducts.p3) {
      sDAvg = (dAvg * (1 - P)) + (dAvg * 1.16 * P);
    }
    const sDeliRev = sDeli * sDAvg * days * L;

    // --- РАСХОДЫ НА ПО (с учетом киосков) ---
    let totalCost = 0;
    PRODUCTS.forEach(p => {
      if (selectedProducts[p.id]) {
        if (p.id === 'p4' || p.id === 'p9') {
          totalCost += p.monthlyPrice; 
        } else if (p.id === 'p8') {
          // Киоск: цена * кол-во киосков * кол-во точек
          totalCost += p.monthlyPrice * K * L;
        } else {
          totalCost += p.monthlyPrice * L;
        }
      }
    });
    const final_cost = totalCost * (1 - D);

    let smart_profit = ((sHallRev + sDeliRev) * M) - final_cost;
    if (!selectedProducts.p3) {
      smart_profit -= (sDeliRev * AR);
    }

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, selectedProducts]);

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6 hover:text-[#1FCC59] transition-colors">
          <ChevronLeft size={14} /> Назад
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-black tracking-tight text-[#1A1D23] flex items-center gap-3">
               <CalcIcon size={28} className="text-[#1FCC59]" /> Калькулятор выгоды
            </h1>
            
            <div className="grid grid-cols-1 gap-6">
              <section className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Settings2 size={14} /> 1. Параметры бизнеса
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MiniInput label="Локаций" value={params.loc} onChange={v => handleInputChange('loc', v)} />
                  <MiniInput label="Чеков/день" value={params.chd} onChange={v => handleInputChange('chd', v)} />
                  <MiniInput label="Ср. чек" value={params.avg} onChange={v => handleInputChange('avg', v)} suffix="₸" />
                  <MiniInput label="Маржа" value={params.marg} onChange={v => handleInputChange('marg', v)} suffix="%" />
                </div>
              </section>

              <section className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
                <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Plus size={14} /> 2. Комиссии и доставка
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <MiniInput label="Комиссия агр." value={params.aggr} onChange={v => handleInputChange('aggr', v)} suffix="%" />
                  <MiniInput label="Скидка Choco" value={params.discount} onChange={v => handleInputChange('discount', v)} suffix="%" />
                  <MiniInput label="Дост./день" value={params.deli} onChange={v => handleInputChange('deli', v)} />
                  <MiniInput label="Ср. чек дост." value={params.deliAvg} onChange={v => handleInputChange('deliAvg', v)} suffix="₸" />
                  {/* Новая ячейка для киосков */}
                  <MiniInput label="Киосков/точка" value={params.kiosksPerLoc} onChange={v => handleInputChange('kiosksPerLoc', v)} />
                </div>
              </section>
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-2">3. Продукты Smart Restaurant</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCTS.map(p => (
                  <div key={p.id} onClick={() => setSelectedProducts(prev => ({...prev, [p.id]: !prev[p.id]}))} 
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${selectedProducts[p.id] ? 'border-[#1FCC59] bg-white shadow-md' : 'border-transparent bg-white shadow-sm hover:border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <ProductIcon name={p.iconName} size={18} className={selectedProducts[p.id] ? "text-[#1FCC59]" : "text-gray-300"} />
                        <span className="font-bold text-[14px] text-[#1A1D23]">{p.title}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedProducts[p.id] ? 'bg-[#1FCC59] border-[#1FCC59] text-white' : 'border-gray-100'}`}>
                        {selectedProducts[p.id] && <Check size={12} strokeWidth={4} />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-snug mt-2">{p.description}</p>
                    <div className="mt-3 text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[360px]">
            <div className="sticky top-10 bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/40 border border-gray-50 space-y-6">
              <h3 className="font-bold text-[#1A1D23] text-center text-[15px]">Прогноз за 30 дней</h3>
              
              <div className="bg-gray-50 p-5 rounded-2xl text-center border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Сейчас</span>
                <div className="text-xl font-black text-[#1A1D23]">{formatMoney(results.now_profit)} ₸</div>
              </div>

              <div className="bg-[#1FCC59] p-6 rounded-2xl text-white text-center shadow-lg shadow-[#1FCC59]/20">
                <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block opacity-90">Co Smart Restaurant</span>
                <div className="text-3xl font-black">{formatMoney(results.smart_profit)} ₸</div>
                <div className="text-[10px] mt-2 opacity-70 font-medium italic">Затраты на ПО: -{formatMoney(results.cost)} ₸</div>
              </div>

              <div className={`p-6 rounded-2xl text-center border-2 transition-all ${
                results.diff >= 0 ? 'bg-[#F1FDF5] border-[#1FCC59]/20' : 'bg-[#FEF2F2] border-[#EF4444]/20'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${
                  results.diff >= 0 ? 'text-[#1FCC59]' : 'text-[#EF4444]'
                }`}>
                  {results.diff >= 0 ? 'Чистая выгода' : 'Разница'}
                </span>
                <div className={`text-2xl font-black ${
                  results.diff >= 0 ? 'text-[#1FCC59]' : 'text-[#EF4444]'
                }`}>
                  {results.diff > 0 ? `+${formatMoney(results.diff)}` : formatMoney(results.diff)} ₸
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniInput({ label, value, onChange, suffix = "" }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 px-3 bg-gray-50 border border-gray-100 rounded-xl text-[14px] font-bold text-[#1A1D23] outline-none focus:bg-white focus:border-[#1FCC59] transition-all" />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-300">{suffix}</span>}
      </div>
    </div>
  );
}
