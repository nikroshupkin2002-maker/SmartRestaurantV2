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
    aggr: 35, // Установил стандарт 35%
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
    const delivery_share_total = 0.3; // Доля доставки в обороте
    const impact = 0.3; // ИСПРАВЛЕНО: 30% проникновения

    const total_checks = chd * days * loc;
    const base_revenue = total_checks * avg;

    // Расчет комиссии сейчас (от всего оборота доставки)
    const current_aggr_loss = base_revenue * delivery_share_total * aggr_pct;
    const now_profit = (base_revenue * marg) - current_aggr_loss;

    // Затраты на продукты
    let cost = 0;
    if (products.p1) cost += 84000 * loc;
    if (products.p2) cost += 120000 * loc;
    if (products.p3) cost += 60000 * loc;
    if (products.p4) cost += appPrice || 0;
    if (products.p5) cost += 60000;
    if (products.p6) cost += 35000 * loc;
    if (products.p7) cost += 60000 * loc;
    if (products.p8) cost += 60000 * (kioskCount || 0);
    if (products.p9) cost += 64000; // Guest 360 за всю сеть

    const has_boost = products.p1 || products.p2 || products.p3 || products.p4 || products.p8;
    const has_speed = products.p2;
    const has_loyalty = products.p5;
    const has_return = products.p1 || products.p2 || products.p3 || products.p4 || products.p5 || products.p7 || products.p8 || products.p9;

    // Новые показатели с учетом проникновения
    const n_avg = has_boost ? (avg * (1 - impact)) + (avg * 1.16 * impact) : avg;
    const n_ch = has_speed ? (total_checks * (1 - impact)) + (total_checks * 1.25 * impact) : total_checks;
    
    const ret_rev = has_return ? (n_ch * 0.2 * n_avg) : 0;
    const loy_rev = has_loyalty ? (n_ch * 0.2 * n_avg * 0.3) : 0;

    const smart_rev = (n_ch * n_avg) + ret_rev + loy_rev;
    const final_cost = cost * (1 - (params.discount || 0) / 100);

    // Расчет комиссии Smart (Экономим 35% от тех заказов, что перешли в 30% проникновения)
    let smart_profit = (smart_rev * marg) - final_cost;
    
    // Если SR Delivery (p3) НЕ выбран, вычитаем комиссию от оставшегося оборота
    const remaining_aggr_revenue = smart_rev * delivery_share_total * (1 - impact);
    smart_profit -= (remaining_aggr_revenue * aggr_pct);

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, products, appPrice, kioskCount]);

  const InputField = ({ label, value, field, suffix="" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="relative flex items-center">
        <input
          type="number" value={value}
          onChange={(e) => handleParamChange(field, parseFloat(e.target.value) || 0)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-bold focus:ring-2 focus:ring-[#1FCC59] outline-none transition-all"
        />
        {suffix && <span className="absolute right-4 text-gray-400 font-bold">{suffix}</span>}
      </div>
    </div>
  );

  const ProductCard = ({ label, priceLabel, isChecked, onToggle, extraInputs = null }: any) => (
    <div
      className={`relative flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer 
        ${isChecked ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'border-transparent bg-white shadow-sm hover:shadow-md'}
      `}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-[15px] leading-tight text-gray-900">{label}</h4>
        <div className={`w-5 h-5 rounded flex items-center justify-center ${isChecked ? 'bg-[#1FCC59] text-white' : 'bg-gray-100 border border-gray-300'}`}>
          {isChecked && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{priceLabel}</p>
      {isChecked && extraInputs && (
        <div className="mt-4 pt-4 border-t border-[#1FCC59]/20" onClick={(e) => e.stopPropagation()}>
          {extraInputs}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="container mx-auto px-6 pt-6 max-w-6xl flex justify-between items-center">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] font-bold text-xs uppercase">
          <ChevronLeft size={18} /> Назад
        </button>
        <div className="text-[#1FCC59] font-black text-xl">Choco</div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="w-full lg:w-[65%] flex flex-col gap-10">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Калькулятор прибыли</h1>
              <div className="inline-flex items-center bg-[#1FCC59]/10 text-[#0CB055] text-xs font-bold px-4 py-2 rounded-lg">
                <Info size={14} className="mr-2" />
                Расчет ведется на 30% проникновения продукта
              </div>
            </div>

            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-[2px] mb-8">1. Параметры бизнеса</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Локаций в сети" value={params.loc} field="loc" />
                <InputField label="Чеков в день на 1 лок." value={params.chd} field="chd" />
                <InputField label="Средний чек" value={params.avg} field="avg" suffix="₸" />
                <InputField label="Маржинальность" value={params.marg} field="marg" suffix="%" />
                <InputField label="Комиссия агрегаторов" value={params.aggr} field="aggr" suffix="%" />
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-[2px] mb-6">2. Выбор продуктов</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductCard label="Smart Аналитика (Guest 360)" priceLabel="64 000 ₸ / сеть" isChecked={products.p9} onToggle={() => toggleProduct('p9')} />
                <ProductCard label="Без кассира" priceLabel="84 000 ₸ / лок" isChecked={products.p1} onToggle={() => toggleProduct('p1')} />
                <ProductCard label="Без официанта" priceLabel="120 000 ₸ / лок" isChecked={products.p2} onToggle={() => toggleProduct('p2')} />
                <ProductCard label="SR Delivery" priceLabel="60 000 ₸ / лок" isChecked={products.p3} onToggle={() => toggleProduct('p3')} />
                <ProductCard label="Loyalty (Лояльность)" priceLabel="60 000 ₸ / сеть" isChecked={products.p5} onToggle={() => toggleProduct('p5')} />
                <ProductCard label="Киоск самообслуживания" priceLabel="60 000 ₸ / ед" isChecked={products.p8} onToggle={() => toggleProduct('p8')} 
                  extraInputs={
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold">Кол-во:</span>
                      <input type="number" value={kioskCount} onChange={e => setKioskCount(parseInt(e.target.value)||1)} className="w-20 h-8 rounded bg-white border border-gray-200 text-center font-bold text-sm" />
                    </div>
                  }
                />
              </div>
            </section>
          </div>

          {/* RESULTS SIDEBAR */}
          <div className="w-full lg:w-[35%]">
            <div className="sticky top-24 bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl">
              <h3 className="text-lg font-bold mb-8 opacity-60 uppercase tracking-widest text-center">Итоги (30 дней)</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-400 font-bold uppercase">Прибыль сейчас</span>
                  <span className="text-xl font-bold">{formatMoney(results.now_profit)} ₸</span>
                </div>
                
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <span className="text-xs text-[#1FCC59] font-bold uppercase">С Smart Restaurant</span>
                  <span className="text-3xl font-black text-[#1FCC59]">{formatMoney(results.smart_profit)} ₸</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 mt-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">Затраты на ПО:</span>
                    <span className="text-red-400">-{formatMoney(results.cost)} ₸</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1FCC59] rounded-3xl p-6 text-center shadow-lg shadow-[#1FCC59]/20">
                <span className="text-[10px] font-black uppercase tracking-[2px] block mb-2 text-white/80">Чистая выгода</span>
                <div className="text-4xl font-black">{results.diff >= 0 ? '+' : ''}{formatMoney(results.diff)} ₸</div>
              </div>

              <button className="w-full mt-8 py-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-black text-sm uppercase tracking-widest active:scale-95">
                Сформировать КП
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
