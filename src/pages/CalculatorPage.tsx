// @ts-nocheck
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Info, Check, Calculator as CalcIcon, Plus, 
  Settings2, ArrowRight, ChevronLeft 
} from "lucide-react";

// Импортируем наши данные и компонент иконки
import { PRODUCTS } from "../data/products";
import { ProductIcon } from "../components/ProductIcon";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  // Основные параметры бизнеса
  const [params, setParams] = useState({
    loc: "1",      // Количество локаций
    chd: "100",    // Чеков в день
    avg: "5000",   // Средний чек
    marg: "70",    // Маржинальность (%)
    aggr: "30",    // Комиссия агрегаторов (%)
    discount: "0", // Скидка (%)
  });

  // Состояние выбранных продуктов (динамически создается из PRODUCTS)
  const [selectedProducts, setSelectedProducts] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  // Специфические поля для калькулятора
  const [appPrice, setAppPrice] = useState("420000"); // Цена за приложение
  const [kioskCount, setKioskCount] = useState("1");   // Кол-во киосков

  const handleParamChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9.,]/g, "").replace(",", ".");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ЛОГИКА РАСЧЕТА
  const results = useMemo(() => {
    const loc = parseFloat(params.loc) || 0;
    const chd = parseFloat(params.chd) || 0;
    const avg = parseFloat(params.avg) || 0;
    const marg = (parseFloat(params.marg) || 0) / 100;
    const aggr_rate = (parseFloat(params.aggr) || 0) / 100;
    const disc = (parseFloat(params.discount) || 0) / 100;
    
    const days = 30;
    const delivery_share = 0.3; // Доля доставки 30%
    const impact = 0.3;         // Оцифровка/внедрение на 30% базы
    
    const total_checks = chd * days * loc;
    const base_revenue = total_checks * avg;

    // 1. Прибыль СЕЙЧАС (Выручка * Маржа - Комиссия агрегаторов)
    const now_profit = (base_revenue * marg) - (base_revenue * delivery_share * aggr_rate);

    // 2. Расчет СТОИМОСТИ выбранных продуктов
    let total_cost = 0;
    PRODUCTS.forEach(p => {
      if (selectedProducts[p.id]) {
        if (p.id === 'p4') {
          total_cost += parseFloat(appPrice) || 0; // Приложение - разово/фикс
        } else if (p.id === 'p8') {
          total_cost += p.monthlyPrice * (parseFloat(kioskCount) || 0); // Киоски поштучно
        } else if (p.id === 'p5' || p.id === 'p9') {
          total_cost += p.monthlyPrice; // Лояльность и Аналитика обычно за сеть
        } else {
          total_cost += p.monthlyPrice * loc; // Остальное за локацию
        }
      }
    });

    const final_cost = total_cost * (1 - disc);

    // 3. Расчет ВЫГОДЫ (Smart Profit)
    // Эффекты: p1, p2, p8 (Киоск) повышают чек и кол-во заказов
    const has_boost = selectedProducts.p1 || selectedProducts.p2 || selectedProducts.p8;
    const has_loyalty = selectedProducts.p5;

    const n_avg = has_boost ? (avg * (1 - impact)) + (avg * 1.16 * impact) : avg;
    const n_ch = has_boost ? (total_checks * (1 - impact)) + (total_checks * 1.10 * impact) : total_checks;
    
    // Доп. выручка от возвращаемости (Лояльность)
    const loy_rev = has_loyalty ? (n_ch * 0.1 * n_avg) : 0; 
    
    const smart_rev = (n_ch * n_avg) + loy_rev;
    
    let smart_profit = (smart_rev * marg) - final_cost;

    // Если нет своей доставки (p3), продолжаем платить агрегаторам
    if (!selectedProducts.p3) {
      smart_profit -= (smart_rev * delivery_share * aggr_rate);
    }

    return { 
      now_profit, 
      smart_profit, 
      diff: smart_profit - now_profit, 
      cost: final_cost 
    };
  }, [params, selectedProducts, appPrice, kioskCount]);

  // Вспомогательные компоненты для верстки
  const InputField = ({ label, value, field, suffix = "" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => handleParamChange(field, e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#1FCC59]/30 focus:border-[#1FCC59] focus:bg-white transition-all"
        />
        {suffix && <span className="absolute right-4 text-gray-400 font-medium">{suffix}</span>}
      </div>
    </div>
  );

  const ProductCard = ({ product, isChecked, onToggle, extraInputs = null }: any) => (
    <div
      className={`relative flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer select-none
        ${isChecked ? 'border-[#1FCC59] bg-[#1FCC59]/5 shadow-sm' : 'border-transparent bg-white shadow-sm hover:shadow-md'}
      `}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isChecked ? 'bg-[#1FCC59] text-white' : 'bg-gray-100 text-gray-400'}`}>
            <ProductIcon name={product.iconName} size={20} />
          </div>
          <h4 className={`font-bold text-[15px] leading-tight ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}>
            {product.title}
          </h4>
        </div>
        <div className={`w-5 h-5 flex-shrink-0 rounded-md flex items-center justify-center transition-colors ${isChecked ? 'bg-[#1FCC59] text-white' : 'bg-gray-100 border border-gray-300'}`}>
          {isChecked && <Check size={14} strokeWidth={3} />}
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{product.price}</p>
      
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* ЛЕВАЯ ЧАСТЬ: ВВОД ДАННЫХ */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8 pb-12">
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <CalcIcon size={32} className="text-[#1FCC59]" />
                Калькулятор выгоды
              </h1>
              <div className="inline-flex items-center mt-4 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg border border-blue-100">
                <Info size={16} className="mr-2 opacity-80" />
                Расчет на основе 30% оцифровки базы
              </div>
            </div>

            {/* Блок 1: Параметры */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Settings2 size={20} className="text-gray-400" /> 1. Параметры бизнеса
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <InputField label="Локаций" value={params.loc} field="loc" />
                <InputField label="Чеков/день" value={params.chd} field="chd" />
                <InputField label="Ср. чек" value={params.avg} field="avg" suffix="₸" />
                <InputField label="Маржа" value={params.marg} field="marg" suffix="%" />
              </div>
            </section>

            {/* Блок 2: Доп параметры */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Plus size={20} className="text-gray-400" /> 2. Комиссии и скидки
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <InputField label="Комиссия агр." value={params.aggr} field="aggr" suffix="%" />
                <InputField label="Скидка Choco" value={params.discount} field="discount" suffix="%" />
              </div>
            </section>

            {/* Блок 3: Выбор продуктов (ДИНАМИЧЕСКИЙ) */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Check size={20} className="text-gray-400" /> 3. Выберите решения
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isChecked={selectedProducts[product.id]}
                    onToggle={() => toggleProduct(product.id)}
                    extraInputs={
                      product.id === 'p4' ? (
                        <div className="flex flex-col gap-1 w-full">
                          <label className="text-xs font-semibold text-gray-600">Индивидуальная цена (₸)</label>
                          <input 
                            type="text" 
                            value={appPrice} 
                            onChange={e => setAppPrice(e.target.value.replace(/[^0-9]/g, ""))} 
                            className="w-full h-10 px-3 rounded-lg border border-[#1FCC59]/30 bg-white text-sm" 
                          />
                        </div>
                      ) : product.id === 'p8' ? (
                        <div className="flex items-center gap-2 mt-1">
                           <button onClick={(e) => { e.stopPropagation(); setKioskCount(String(Math.max(1, (parseInt(kioskCount)||1) - 1))); }} className="w-8 h-8 rounded-lg bg-[#1FCC59]/10 text-[#1FCC59] flex items-center justify-center">-</button>
                           <input type="text" value={kioskCount} onChange={e => setKioskCount(e.target.value.replace(/[^0-9]/g, ""))} className="w-full text-center h-10 border border-[#1FCC59]/30 bg-white text-sm font-bold rounded-lg" />
                           <button onClick={(e) => { e.stopPropagation(); setKioskCount(String((parseInt(kioskCount)||1) + 1)); }} className="w-8 h-8 rounded-lg bg-[#1FCC59]/10 text-[#1FCC59] flex items-center justify-center">+</button>
                        </div>
                      ) : null
                    }
                  />
                ))}
              </div>
            </section>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: ИТОГИ (STICKY) */}
          <div className="w-full lg:w-[35%]">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-10 flex flex-col gap-6">
              <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Прогноз прибыли (30 дней)</h3>
                
                <div className="bg-gray-50 rounded-2xl p-5 mb-4 border border-gray-100 flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Сейчас</span>
                  <span className="text-2xl font-extrabold text-gray-800">
                    {formatMoney(results.now_profit)} <span className="text-lg text-gray-500 font-normal">₸</span>
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#1FCC59] to-[#0CB055] rounded-2xl p-6 text-white flex flex-col items-center shadow-lg shadow-[#1FCC59]/20">
                  <span className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1">Со Smart Restaurant</span>
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {formatMoney(results.smart_profit)} <span className="text-xl text-white/80 font-normal">₸</span>
                  </span>
                  {results.cost > 0 && (
                    <span className="mt-3 text-xs font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full">
                      Затраты на ПО: -{formatMoney(results.cost)} ₸
                    </span>
                  )}
                </div>

                <motion.div key={results.diff} initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                  className={`mt-6 rounded-2xl p-5 border-2 flex items-center justify-center ${results.diff >= 0 ? 'bg-[#1FCC59]/10 border-[#1FCC59]/30 text-[#0CB055]' : 'bg-red-50 border-red-200 text-red-600'}`}
                >
                  <div className="text-center">
                    <span className="text-sm font-bold uppercase tracking-wider block mb-1">Чистая выгода</span>
                    <span className="text-2xl font-black">{results.diff > 0 ? '+' : ''}{formatMoney(results.diff)} ₸</span>
                  </div>
                </motion.div>

                <p className="mt-6 text-[10px] text-gray-400 text-center leading-relaxed">
                  *Расчет является прогнозным. Эффективность зависит от уровня вовлечения персонала и трафика.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
