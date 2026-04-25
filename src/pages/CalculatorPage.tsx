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
    aggr: "30", discount: "0", deli: "15", deliAvg: "3500"
  });

  const [selectedProducts, setSelectedProducts] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  const handleInputChange = (field: string, value: string) => {
    setParams(prev => ({ ...prev, [field]: value.replace(/[^0-9]/g, "") }));
  };

  const results = useMemo(() => {
    const loc = Number(params.loc) || 0;
    const marg = (Number(params.marg) || 0) / 100;
    const aggr_rate = (Number(params.aggr) || 0) / 100;
    const disc = (Number(params.discount) || 0) / 100;
    const days = 30;
    const penetration = 0.3;

    const chd = Number(params.chd) || 0;
    const avg = Number(params.avg) || 0;
    const deli = Number(params.deli) || 0;
    const deliAvg = Number(params.deliAvg) || 0;
    
    // СЕЙЧАС
    const curHall = chd * avg * days * loc;
    const curDeli = deli * deliAvg * days * loc;
    const now_profit = ((curHall + curDeli) * marg) - (curDeli * aggr_rate);

    // SMART
    let sChd = selectedProducts.p7 ? (chd * (1 - penetration)) + (chd * 1.30 * penetration) : chd;
    let sDeli = selectedProducts.p3 ? (deli * (1 - penetration)) + (deli * 1.20 * penetration) : deli;
    let sDeliAvg = selectedProducts.p3 ? (deliAvg * (1 - penetration)) + (deliAvg * 1.16 * penetration) : deliAvg;

    let sHallRev = sChd * avg * days * loc;
    if (selectedProducts.p5) sHallRev *= 1.10; // +10% лояльность
    
    let sDeliRev = sDeli * sDeliAvg * days * loc;

    let cost = 0;
    PRODUCTS.forEach(p => {
      if (selectedProducts[p.id]) {
        cost += (p.id === 'p8' ? p.monthlyPrice * 1 : p.monthlyPrice * loc);
      }
    });
    const final_cost = cost * (1 - disc);

    let smart_profit = ((sHallRev + sDeliRev) * marg) - final_cost;
    if (!selectedProducts.p3) smart_profit -= (sDeliRev * aggr_rate);

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, selectedProducts]);

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6">
          <ChevronLeft size={14} /> Назад
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <CalcIcon size={28} className="text-[#1FCC59]" />
               <h1 className="text-2xl font-black tracking-tight">Калькулятор выгоды</h1>
            </div>
            
            <p className="text-[11px] text-[#1FCC59] bg-[#E8F9EE] inline-block px-3 py-1 rounded-full font-bold">
              Расчет на основе 30% оцифровки базы
            </p>

            {/* 1. ПАРАМЕТРЫ БИЗНЕСА */}
            <section className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
               <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Settings2 size={14} /> 1. Параметры бизнеса
               </h2>
               <div className="grid grid-cols-4 gap-4">
                 <MiniInput label="Локаций" value={params.loc} onChange={v => handleInputChange('loc', v)} />
                 <MiniInput label="Чеков/день" value={params.chd} onChange={v => handleInputChange('chd', v)} />
                 <MiniInput label="Ср. чек" value={params.avg} onChange={v => handleInputChange('avg', v)} suffix="₸" />
                 <MiniInput label="Маржа" value={params.marg} onChange={v => handleInputChange('marg', v)} suffix="%" />
               </div>
            </section>

            {/* 2. КОМИССИИ И СКИДКИ */}
            <section className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
               <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Plus size={14} /> 2. Комиссии и скидки
               </h2>
               <div className="grid grid-cols-4 gap-4">
                 <MiniInput label="Комиссия агр." value={params.aggr} onChange={v => handleInputChange('aggr', v)} suffix="%" />
                 <MiniInput label="Скидка Choco" value={params.discount} onChange={v => handleInputChange('discount', v)} suffix="%" />
                 <MiniInput label="Дост./день" value={params.deli} onChange={v => handleInputChange('deli', v)} />
                 <MiniInput label="Ср. чек дост." value={params.deliAvg} onChange={v => handleInputChange('deliAvg', v)} suffix="₸" />
               </div>
            </section>

            {/* 3. ВЫБЕРИТЕ РЕШЕНИЯ */}
            <div className="space-y-4 pt-4">
              <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-2">3. Выберите решения</h2>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.map(p => (
                  <div key={p.id} onClick={() => setSelectedProducts(prev => ({...prev, [p.id]: !prev[p.id]}))} 
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${selectedProducts[p.id] ? 'border-[#1FCC59] bg-white shadow-md' : 'border-transparent bg-white shadow-sm'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <ProductIcon name={p.iconName} size={18} className={selectedProducts[p.id] ? "text-[#1FCC59]" : "text-gray-300"} />
                        <span className="font-bold text-[14px]">{p.title}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${selectedProducts[p.id] ? 'bg-[#1FCC59] border-[#1FCC59] text-white' : 'border-gray-100'}`}>
                        {selectedProducts[p.id] && <Check size={12} strokeWidth={4} />}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug mt-2 line-clamp-2">{p.description}</p>
                    <div className="mt-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ ПАНЕЛЬ (ИТОГИ) */}
          <div className="w-full lg:w-[340px]">
            <div className="sticky top-10 bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/40 border border-gray-50 flex flex-col items-center">
              <h3 className="font-bold text-gray-900 mb-8">Прогноз прибыли (30 дней)</h3>
              
              <div className="w-full space-y-4">
                <div className="bg-gray-50 p-5 rounded-2xl text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Сейчас</span>
                  <div className="text-xl font-black">{formatMoney(results.now_profit)} ₸</div>
                </div>

                <div className="bg-[#1FCC59] p-6 rounded-2xl text-white text-center shadow-lg shadow-[#1FCC59]/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block">Co Smart Restaurant</span>
                  <div className="text-2xl font-black">{formatMoney(results.smart_profit)} ₸</div>
                  <div className="text-[9px] mt-1 opacity-70">Затраты на ПО: -{formatMoney(results.cost)} ₸</div>
                </div>

                <div className={`p-6 rounded-2xl text-center border-2 ${results.diff >= 0 ? 'bg-[#FEF2F2] border-[#FEE2E2]' : 'bg-[#FEF2F2] border-[#FEE2E2]'}`}>
                  <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-widest mb-1 block">Чистая выгода</span>
                  <div className="text-2xl font-black text-[#EF4444]">
                    {results.diff > 0 ? `+${formatMoney(results.diff)}` : formatMoney(results.diff)} ₸
                  </div>
                </div>
              </div>

              <p className="mt-8 text-[9px] text-gray-300 text-center leading-relaxed">
                *Расчет является прогнозным. Эффективность зависит от уровня вовлечения персонала и трафика.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniInput({ label, value, onChange, suffix = "" }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 px-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-bold outline-none focus:bg-white focus:border-[#1FCC59] transition-all" />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-300">{suffix}</span>}
      </div>
    </div>
  );
}
