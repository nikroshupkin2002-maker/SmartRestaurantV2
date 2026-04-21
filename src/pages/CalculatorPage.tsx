// @ts-nocheck
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Info, Check, Calculator as CalcIcon, Plus, 
  Settings2, ArrowRight, ChevronLeft 
} from "lucide-react";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  const [params, setParams] = useState({
    loc: 1,
    chd: 100,
    avg: 5000,
    marg: 70,
    aggr: 30,
    discount: 0,
  });

  const [products, setProducts] = useState({
    p1: false, p2: false, p3: false, p4: false,
    p5: false, p6: false, p7: false, p8: false,
    p9: true, // Guest 360 включен по умолчанию
  });

  const [appPrice, setAppPrice] = useState(420000);
  const [kioskCount, setKioskCount] = useState(1);

  const handleParamChange = (field: keyof typeof params, value: number) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };
  
  const toggleProduct = (key: keyof typeof products) => {
    setProducts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const results = useMemo(() => {
    const loc = params.loc || 0;
    const chd = params.chd || 0;
    const avg = params.avg || 0;
    const marg = (params.marg || 0) / 100;
    const aggr_pct = (params.aggr || 0) / 100;

    const days = 30;
    const delivery_share_in_revenue = 0.3; // Доля доставки в обороте ресторана
    const impact = 0.3; // ИСПРАВЛЕНО: Расчет на 30% проникновения

    const total_checks = chd * days * loc;
    const base_revenue = total_checks * avg;
    
    // Комиссия агрегаторов СЕЙЧАС (от всей суммы доставки)
    const current_aggr_loss = base_revenue * delivery_share_in_revenue * aggr_pct;
    const now_profit = (base_revenue * marg) - current_aggr_loss;

    // СТОИМОСТЬ ПРОДУКТОВ
    let cost = 0;
    if (products.p1) cost += 84000 * loc;
    if (products.p2) cost += 120000 * loc;
    if (products.p3) cost += 60000 * loc;
    if (products.p4) cost += appPrice || 0;
    if (products.p5) cost += 60000;
    if (products.p6) cost += 35000 * loc;
    if (products.p7) cost += 60000 * loc;
    if (products.p8) cost += 60000 * (kioskCount || 0);
    if (products.p9) cost += 64000; // Guest 360 за сеть

    const has_boost = products.p1 || products.p2 || products.p3 || products.p4 || products.p8;
    const has_speed = products.p2;
    const has_loyalty = products.p5;
    const has_return = products.p1 || products.p2 || products.p3 || products.p4 || products.p5 || products.p7 || products.p8 || products.p9;

    const n_avg = has_boost ? (avg * (1 - impact)) + (avg * 1.16 * impact) : avg;
    const n_ch = has_speed ? (total_checks * (1 - impact)) + (total_checks * 1.25 * impact) : total_checks;
    
    const ret_rev = has_return ? (n_ch * 0.2 * n_avg) : 0;
    const loy_rev = has_loyalty ? (n_ch * 0.2 * n_avg * 0.3) : 0;

    const smart_rev = (n_ch * n_avg) + ret_rev + loy_rev;
    const final_cost = cost * (1 - (params.discount || 0) / 100);

    // НОВАЯ ПРИБЫЛЬ: Считаем комиссию только на те 70% доставки, что НЕ перешли в Smart
    let smart_profit = (smart_rev * marg) - final_cost;
    
    const remaining_aggr_volume = smart_rev * delivery_share_in_revenue * (1 - impact);
    smart_profit -= (remaining_aggr_volume * aggr_pct);

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, products, appPrice, kioskCount]);

  const InputField = ({ label, value, field, suffix="" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <div className="relative flex items-center">
        <input
          type="number" value={value}
          onChange={(e) => handleParamChange(field, parseFloat(e.target.value) || 0)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1FCC59]/30 focus:border-[#1FCC59] focus:bg-white transition-all"
        />
        {suffix && <span className="absolute right-4 text-gray-400 font-medium">{suffix}</span>}
      </div>
    </div>
  );

  const ProductCard = ({ label, priceLabel, isChecked, onToggle, extraInputs = null }: any) => (
    <div
      className={`relative flex flex-col p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none
        ${isChecked ? 'border-[#1FCC59] bg-[#1FCC59]/5 shadow-sm' : 'border-transparent bg-white shadow-sm hover:shadow-md'}
      `}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-1 gap-2">
        <h4 className={`font-bold text-[15px] leading-tight ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}>
          {label}
        </h4>
        <div className={`w-5 h-5 flex-shrink-0 rounded-md flex items-center justify-center transition-colors ${isChecked ? 'bg-[#1FCC59] text-white' : 'bg-gray-100 border border-gray-300'}`}>
          {isChecked && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{priceLabel}</p>
      {isChecked && extraInputs && (
        <div className="mt-4 border-t border-[#1FCC59]/20 pt-4" onClick={(e) => e.stopPropagation()}>
          {extraInputs}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors font-bold text-sm uppercase tracking-wider">
          <ChevronLeft size={20} /> Назад
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-8 py-8 md:py-12 max-w-6xl pb-24 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          <div className="w-full lg:w-[65%] flex flex-col gap-8 pb-12">
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <CalcIcon size={32} className="text-[#1FCC59]" />
                Smart Restaurant Calc
              </h1>
              <div className="inline-flex items-center mt-4 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg border border-blue-100">
                <Info size={16} className="mr-2 opacity-80" />
                Расчет ведется на 30% проникновения продукта
              </div>
            </div>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2 text-gray-400">
                <Settings2 size={20} /> 1. Основные параметры
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <InputField label="Локаций" value={params.loc} field="loc" />
                <InputField label="Чеков/день" value={params.chd} field="chd" />
                <InputField label="Ср. чек" value={params.avg} field="avg" suffix="₸" />
                <InputField label="Маржа" value={params.marg} field="marg" suffix="%" />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2 text-gray-400">
                <Plus size={20} /> 2. Дополнительно
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <InputField label="Комиссия агр." value={params.aggr} field="aggr" suffix="%" />
                <InputField label="Скидка" value={params.discount} field="discount" suffix="%" />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2 text-gray-400">
                <Check size={20} /> 3. Продукты
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductCard label="Guest 360 (Аналитика)" priceLabel="64 000 ₸ / сеть" isChecked={products.p9} onToggle={() => toggleProduct('p9')} />
                <ProductCard label="Без кассира" priceLabel="84 000 ₸ / лок" isChecked={products.p1} onToggle={() => toggleProduct('p1')} />
                <ProductCard label="Без официанта" priceLabel="120 000 ₸ / лок" isChecked={products.p2} onToggle={() => toggleProduct('p2')} />
                <ProductCard label="SR Delivery" priceLabel="60 000 ₸ / лок" isChecked={products.p3} onToggle={() => toggleProduct('p3')} />
                <ProductCard label="Приложение" priceLabel="Фикс. цена" isChecked={products.p4} onToggle={() => toggleProduct('p4')} 
                  extraInputs={<input type="number" value={appPrice} onChange={e => setAppPrice(parseFloat(e.target.value)||0)} className="w-full h-10 px-3 rounded-lg border border-[#1FCC59]/30 bg-white text-sm" />} 
                />
                <ProductCard label="Лояльность" priceLabel="60 000 ₸" isChecked={products.p5} onToggle={() => toggleProduct('p5')} />
                <ProductCard label="AppClip" priceLabel="35 000 ₸ / лок" isChecked={products.p6} onToggle={() => toggleProduct('p6')} />
                <ProductCard label="Автосчет" priceLabel="60 000 ₸ / лок" isChecked={products.p7} onToggle={() => toggleProduct('p7')} />
                <ProductCard label="Киоск" priceLabel="60 000 ₸ / ед" isChecked={products.p8} onToggle={() => toggleProduct('p8')} 
                  extraInputs={
                    <div className="flex items-center gap-2"><button onClick={(e) => { e.stopPropagation(); setKioskCount(Math.max(1, kioskCount - 1)); }} className="w-8 h-8 rounded bg-gray-100">-</button>
                    <input type="number" value={kioskCount} onChange={e => setKioskCount(parseInt(e.target.value)||1)} className="w-12 text-center font-bold" />
                    <button onClick={(e) => { e.stopPropagation(); setKioskCount(kioskCount + 1); }} className="w-8 h-8 rounded bg-gray-100">+</button></div>
                  } 
                />
              </div>
            </section>
          </div>

          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Итого (30 дней)</h3>

                <div className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-100 flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase mb-1">Прибыль сейчас</span>
                  <span className="text-2xl font-bold text-gray-700">{formatMoney(results.now_profit)} ₸</span>
                </div>

                <div className="bg-gradient-to-br from-[#1FCC59] to-[#0CB055] rounded-2xl p-6 text-white flex flex-col items-center shadow-lg shadow-[#1FCC59]/20">
                  <span className="text-xs font-bold text-white/80 uppercase mb-1">Со Smart Restaurant</span>
                  <span className="text-3xl font-extrabold">{formatMoney(results.smart_profit)} ₸</span>
                  {results.cost > 0 && <span className="mt-2 text-[10px] bg-white/20 px-2 py-1 rounded">Затраты: -{formatMoney(results.cost)} ₸</span>}
                </div>

                <div className={`mt-6 rounded-2xl p-5 border-2 flex flex-col items-center ${results.diff >= 0 ? 'bg-[#1FCC59]/10 border-[#1FCC59]/30 text-[#0CB055]' : 'bg-red-50 border-red-200 text-red-600'}`}>
                   <span className="text-xs font-bold uppercase mb-1">Чистая выгода</span>
                   <span className="text-2xl font-black">{results.diff > 0 ? '+' : ''}{formatMoney(results.diff)} ₸</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
