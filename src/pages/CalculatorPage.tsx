import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Info, Check, Calculator as CalcIcon, Plus, Settings2, ChevronLeft } from "lucide-react";
import { PRODUCT_COSTS, PRODUCT_BENEFITS, CALCULATOR_CONSTANTS } from "../config/constants";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  // Состояние параметров (строки для свободного ввода)
  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70", aggr: "30", disc: "0",
    dly_day: "15", avg_delivery: "3500"
  });

  const [products, setProducts] = useState<Record<string, boolean>>({
    p1: false, p2: false, p3: false, p4: false, p5: false, p6: false, p7: false, p8: false, p9: false
  });

  const [appPrice, setAppPrice] = useState("420000");
  const [kioskCount, setKioskCount] = useState("1");

  const handleParamChange = (field: string, value: string) => {
    // Разрешаем вводить пустую строку, чтобы можно было всё стереть и написать заново
    const cleanValue = value.replace(/[^0-9.,]/g, "").replace(",", ".");
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

    // --- РАСЧЕТ "СЕЙЧАС" ---
    const now_hall_rev = (CHD * DAYS * L) * AVG;
    const now_dly_rev = (DLY_CH * DAYS * L) * DLY_AVG;
    // Комиссия агрегатора вычитается до маржи
    const now_profit = ((now_hall_rev) + (now_dly_rev * (1 - AGGR))) * MARG;

    // --- РАСЧЕТ "SMART" ---
    // 1. Собираем максимальные бусты по категориям (чтобы не складывать одинаковые)
    let boost_speed = 0;    // p1, p8
    let boost_turnover = 0; // p2, p7
    let boost_loyalty = 0;  // p4, p5, p9
    let avg_upsell = 0;     // p1, p2, p4, p8
    
    Object.keys(products).forEach(key => {
      if (!products[key]) return;
      const b = (PRODUCT_BENEFITS as any)[key];
      if (b.cat === "speed") boost_speed = Math.max(boost_speed, b.checkInc);
      if (b.cat === "turnover") boost_turnover = Math.max(boost_turnover, b.checkInc);
      if (b.cat === "loyalty") boost_loyalty = Math.max(boost_loyalty, b.checkInc);
      avg_upsell = Math.max(avg_upsell, b.avgInc);
    });

    const total_check_inc = boost_speed + boost_turnover + boost_loyalty;

    // Математика для Зала (30% проникновение)
    const hall_impacted_checks = (CHD * DAYS * L) * IMPACT;
    const hall_regular_checks = (CHD * DAYS * L) * (1 - IMPACT);
    
    const hall_rev_smart = (
      (hall_impacted_checks * (1 + total_check_inc)) * (AVG * (1 + avg_upsell)) 
      + (hall_regular_checks * AVG)
    );

    // Математика для Доставки
    const dly_impacted_checks = (DLY_CH * DAYS * L) * IMPACT;
    const dly_regular_checks = (DLY_CH * DAYS * L) * (1 - IMPACT);
    
    // SR Delivery (p3) увеличивает средний чек на 16%
    const dly_avg_smart = products.p3 ? DLY_AVG * 1.16 : DLY_AVG;
    
    const dly_rev_smart = (
      (dly_impacted_checks * dly_avg_smart) + (dly_regular_checks * DLY_AVG)
    );

    // Считаем затраты
    let cost = 0;
    if (products.p1) cost += PRODUCT_COSTS.p1 * L;
    if (products.p2) cost += PRODUCT_COSTS.p2 * L;
    if (products.p3) cost += PRODUCT_COSTS.p3 * L;
    if (products.p4) cost += parseFloat(appPrice) || 0;
    if (products.p5) cost += PRODUCT_COSTS.p5;
    if (products.p6) cost += PRODUCT_COSTS.p6 * L;
    if (products.p7) cost += PRODUCT_COSTS.p7 * L;
    if (products.p8) cost += PRODUCT_COSTS.p8 * (parseFloat(kioskCount) || 1);
    if (products.p9) cost += PRODUCT_COSTS.p9;

    const final_cost = cost * (1 - DISC);
    const smart_profit = ((hall_rev_smart) + (dly_rev_smart * (1 - AGGR))) * MARG - final_cost;

    return { now_profit, smart_profit, diff: smart_profit - now_profit, cost: final_cost };
  }, [params, products, appPrice, kioskCount]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] font-bold text-sm uppercase">
          <ChevronLeft size={20} /> Назад в меню
        </button>

        <div className="flex flex-col lg:row gap-8 mt-8">
          {/* Левая часть: Ввод данных */}
          <div className="flex-1 flex flex-col gap-8">
            <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Settings2 size={20}/> Параметры бизнеса</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input field="loc" label="Локаций" value={params.loc} onChange={handleParamChange} />
                <Input field="chd" label="Чеков/день (зал)" value={params.chd} onChange={handleParamChange} />
                <Input field="avg" label="Ср. чек (зал)" value={params.avg} onChange={handleParamChange} suffix="₸" />
                <Input field="marg" label="Маржа" value={params.marg} onChange={handleParamChange} suffix="%" />
                <Input field="dly_day" label="Доставок/день" value={params.dly_day} onChange={handleParamChange} />
                <Input field="avg_delivery" label="Ср. чек доставки" value={params.avg_delivery} onChange={handleParamChange} suffix="₸" />
                <Input field="aggr" label="Ком. агрегатора" value={params.aggr} onChange={handleParamChange} suffix="%" />
                <Input field="disc" label="Скидка" value={params.disc} onChange={handleParamChange} suffix="%" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(PRODUCT_COSTS).map((key) => (
                <ProductCard 
                  key={key}
                  id={key}
                  label={getLabel(key)}
                  isChecked={products[key]}
                  onToggle={() => setProducts(p => ({...p, [key]: !p[key]}))}
                />
              ))}
            </section>
          </div>

          {/* Правая часть: Результат */}
          <div className="lg:w-80">
            <div className="sticky top-6 bg-white p-8 rounded-[32px] shadow-xl border border-gray-100">
              <h3 className="text-center font-bold text-gray-400 uppercase text-xs tracking-widest mb-6">Прогноз прибыли (30 дней)</h3>
              <ResultBlock label="Сейчас" value={results.now_profit} gray />
              <ResultBlock label="Smart Restaurant" value={results.smart_profit} green />
              <div className="mt-6 p-4 rounded-2xl bg-[#1FCC59]/10 border border-[#1FCC59]/20 text-center">
                <span className="block text-xs font-bold text-[#0CB055] uppercase">Чистая выгода</span>
                <span className="text-2xl font-black text-[#0CB055]">+{formatMoney(results.diff)} ₸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательные мини-компоненты
function Input({ field, label, value, onChange, suffix }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1FCC59] outline-none font-bold"
        />
        {suffix && <span className="absolute right-4 top-3 text-gray-400">{suffix}</span>}
      </div>
    </div>
  );
}

function ProductCard({ label, isChecked, onToggle }: any) {
  return (
    <div 
      onClick={onToggle}
      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${isChecked ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'border-transparent bg-white shadow-sm'}`}
    >
      <span className="font-bold text-sm">{label}</span>
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isChecked ? 'bg-[#1FCC59] text-white' : 'bg-gray-100'}`}>
        {isChecked && <Check size={16} strokeWidth={3} />}
      </div>
    </div>
  );
}

function ResultBlock({ label, value, gray, green }: any) {
  return (
    <div className={`p-4 rounded-2xl mb-4 text-center ${gray ? 'bg-gray-50 text-gray-400' : ''} ${green ? 'bg-[#1FCC59] text-white shadow-lg' : ''}`}>
      <span className="text-[10px] font-bold uppercase tracking-tighter block opacity-80">{label}</span>
      <span className="text-2xl font-black">{formatMoney(value)} ₸</span>
    </div>
  );
}

function getLabel(id: string) {
  const labels: any = { p1: "Без кассира", p2: "Без официанта", p3: "SR Delivery", p4: "Приложение", p5: "Лояльность", p6: "AppClip", p7: "Автосчет", p8: "Киоск", p9: "Guest 360" };
  return labels[id];
}
