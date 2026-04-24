import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calculator as CalcIcon, Settings2, ChevronLeft, TrendingUp } from "lucide-react";
import { PRODUCT_COSTS, PRODUCT_BENEFITS, CALCULATOR_CONSTANTS } from "../config/constants";
import { productsData } from "../data/products";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  const [params, setParams] = useState({
    loc: "1", chd: "100", avg: "5000", marg: "70", aggr: "30", disc: "0",
    dly_day: "15", avg_delivery: "3500"
  });

  const [products, setProducts] = useState<Record<string, boolean>>({});
  const [appPrice, setAppPrice] = useState("420000");

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

    // --- БАЗОВЫЙ РАСЧЕТ (БЕЗ SMART) ---
    const now_hall_rev = (CHD * DAYS * L) * AVG;
    const now_dly_rev = (DLY_CH * DAYS * L) * DLY_AVG;
    const now_profit = (now_hall_rev * MARG) + (now_dly_rev * (1 - AGGR) * MARG);

    // --- SMART РАСЧЕТ (С ПРИМЕНЕНИЕМ 30% ПРОНИКНОВЕНИЯ) ---
    let b_speed = 0, b_turnover = 0, b_loyalty = 0, avg_upsell = 0;
    
    Object.keys(products).forEach(key => {
      if (!products[key]) return;
      const b = (PRODUCT_BENEFITS as any)[key];
      if (b.cat === "speed") b_speed = Math.max(b_speed, b.checkInc);
      if (b.cat === "turnover") b_turnover = Math.max(b_turnover, b.checkInc);
      if (b.cat === "loyalty") b_loyalty = Math.max(b_loyalty, b.checkInc);
      avg_upsell = Math.max(avg_upsell, b.avgInc);
    });

    const total_check_inc = b_speed + b_turnover + b_loyalty;

    // Математика Зала: (30% чеков растут) + (70% чеков как обычно)
    const hall_rev_smart = (
      ((CHD * DAYS * L * IMPACT) * (1 + total_check_inc) * (AVG * (1 + avg_upsell))) +
      ((CHD * DAYS * L * (1 - IMPACT)) * AVG)
    );

    // Математика Доставки: (Рост среднего чека только если есть p3)
    const dly_upsell = products.p3 ? 0.16 : 0;
    const dly_rev_smart = (
      ((DLY_CH * DAYS * L * IMPACT) * (DLY_AVG * (1 + dly_upsell))) +
      ((DLY_CH * DAYS * L * (1 - IMPACT)) * DLY_AVG)
    );

    // Затраты
    let total_cost = 0;
    Object.keys(products).forEach(key => {
      if (!products[key]) return;
      if (key === 'p4') total_cost += parseFloat(appPrice) || 0;
      else total_cost += ((PRODUCT_COSTS as any)[key] || 0) * L;
    });

    const final_cost = total_cost * (1 - DISC);
    const smart_profit = (hall_rev_smart * MARG) + (dly_rev_smart * (1 - AGGR) * MARG) - final_cost;

    return { 
      now: now_profit, 
      smart: smart_profit, 
      diff: smart_profit - now_profit, 
      cost: final_cost,
      roi: final_cost > 0 ? (smart_profit - now_profit) / final_cost * 100 : 0
    };
  }, [params, products, appPrice]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-[#1FCC59] transition-colors font-bold uppercase text-xs tracking-widest">
          <ChevronLeft size={18} /> Назад в меню
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* ЛЕВАЯ КОЛОНКА (ВВОД) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#1FCC59]/10 rounded-xl flex items-center justify-center text-[#1FCC59]">
                  <Settings2 size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-800">Параметры бизнеса</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InputField label="Локаций" value={params.loc} onChange={(v) => handleParamChange('loc', v)} />
                <InputField label="Чеков/день" value={params.chd} onChange={(v) => handleParamChange('chd', v)} />
                <InputField label="Ср. чек (зал)" value={params.avg} onChange={(v) => handleParamChange('avg', v)} suffix="₸" />
                <InputField label="Маржа" value={params.marg} onChange={(v) => handleParamChange('marg', v)} suffix="%" />
                <InputField label="Доставок/день" value={params.dly_day} onChange={(v) => handleParamChange('dly_day', v)} />
                <InputField label="Ср. чек доставки" value={params.avg_delivery} onChange={(v) => handleParamChange('avg_delivery', v)} suffix="₸" />
                <InputField label="Комиссия агр." value={params.aggr} onChange={(v) => handleParamChange('aggr', v)} suffix="%" />
                <InputField label="Скидка на софт" value={params.disc} onChange={(v) => handleParamChange('disc', v)} suffix="%" />
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productsData.map((item) => (
                <ProductToggle 
                  key={item.id}
                  data={item}
                  isActive={!!products[item.id]}
                  onClick={() => setProducts(prev => ({...prev, [item.id]: !prev[item.id]}))}
                />
              ))}
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (РЕЗУЛЬТАТ) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-4">
              <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FCC59] blur-[100px] opacity-20" />
                
                <h3 className="text-[#1FCC59] font-black uppercase text-xs tracking-[0.2em] mb-8">Эффективность Smart Restaurant</h3>
                
                <div className="space-y-6">
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Текущая прибыль</span>
                    <span className="text-2xl font-bold opacity-60">{formatMoney(results.now)} ₸</span>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <span className="text-[#1FCC59] text-xs font-bold uppercase block mb-1">С решением Smart</span>
                    <span className="text-4xl font-black text-white">{formatMoney(results.smart)} ₸</span>
                  </div>

                  <div className="bg-[#1FCC59] p-6 rounded-3xl mt-4">
                    <span className="text-slate-900 text-xs font-bold uppercase block">Дополнительный доход</span>
                    <span className="text-3xl font-black text-slate-900">+{formatMoney(results.diff)} ₸</span>
                  </div>
                </div>

                {results.cost > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-end">
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Затраты (мес)</span>
                      <span className="text-lg font-bold text-red-400">-{formatMoney(results.cost)} ₸</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#1FCC59] text-[10px] font-bold uppercase block">Окупаемость (ROI)</span>
                      <span className="text-xl font-black text-[#1FCC59]">{Math.round(results.roi)}%</span>
                    </div>
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

// Компоненты UI
function InputField({ label, value, onChange, suffix }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#1FCC59] focus:bg-white outline-none font-bold text-slate-700 transition-all"
        />
        {suffix && <span className="absolute right-4 top-3 text-slate-300 font-bold">{suffix}</span>}
      </div>
    </div>
  );
}

function ProductToggle({ data, isActive, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all ${isActive ? 'border-[#1FCC59] bg-[#1FCC59]/5 shadow-md' : 'border-white bg-white shadow-sm'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-black text-slate-800 leading-tight">{data.name}</h4>
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-[#1FCC59] text-white' : 'bg-slate-100 text-slate-300'}`}>
          <Check size={14} strokeWidth={4} />
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">{data.description}</p>
      <div className="space-y-1">
        {data.features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
            <div className="w-1 h-1 bg-[#1FCC59] rounded-full" /> {f}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
