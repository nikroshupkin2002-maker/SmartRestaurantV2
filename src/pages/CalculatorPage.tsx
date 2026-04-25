// @ts-nocheck
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Info, Check, Calculator as CalcIcon, Plus, 
  Settings2, ArrowRight, ChevronLeft 
} from "lucide-react";

import { PRODUCTS } from "../data/products";
import { ProductIcon } from "../components/ProductIcon";

const formatMoney = (val: number) => {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};

export function CalculatorPage() {
  const navigate = useNavigate();

  // Параметры бизнеса (храним как строки для удобного ввода)
  const [params, setParams] = useState({
    loc: "1",      // Локаций
    chd: "100",    // Чеков в зале/день
    avg: "5000",   // Ср. чек зал
    deli: "30",    // Доставок в день
    deliAvg: "7000", // Ср. чек доставки
    marg: "70",    // Маржа %
    aggr: "30",    // Комиссия агрегаторов %
    discount: "0", // Скидка %
  });

  const [selectedProducts, setSelectedProducts] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: false }), {})
  );

  const [appPrice, setAppPrice] = useState("420000"); 
  const [kioskCount, setKioskCount] = useState("1");   

  const handleParamChange = (field: string, value: string) => {
    // Разрешаем вводить только цифры, чтобы не ломать инпут
    const cleanValue = value.replace(/[^0-9]/g, "");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const results = useMemo(() => {
    const loc = parseFloat(params.loc) || 0;
    const marg = (parseFloat(params.marg) || 0) / 100;
    const aggr_rate = (parseFloat(params.aggr) || 0) / 100;
    const disc = (parseFloat(params.discount) || 0) / 100;
    
    // Данные Зала
    const chd = parseFloat(params.chd) || 0;
    const avg = parseFloat(params.avg) || 0;
    
    // Данные Доставки
    const deli = parseFloat(params.deli) || 0;
    const deliAvg = parseFloat(params.deliAvg) || 0;
    
    const days = 30;
    const penetration = 0.3; // 30% проникновения продуктов

    // --- РАСЧЕТ "СЕЙЧАС" ---
    const currentHallRev = (chd * avg * days * loc);
    const currentDeliRev = (deli * deliAvg * days * loc);
    
    // Комиссия агрегаторов берется ТОЛЬКО с доставки
    const currentAggrCost = currentDeliRev * aggr_rate;
    const now_profit = ((currentHallRev + currentDeliRev) * marg) - currentAggrCost;

    // --- РАСЧЕТ СТОИМОСТИ ПО ---
    let total_cost = 0;
    PRODUCTS.forEach(p => {
      if (selectedProducts[p.id]) {
        if (p.id === 'p4') total_cost += parseFloat(appPrice) || 0;
        else if (p.id === 'p8') total_cost += p.monthlyPrice * (parseFloat(kioskCount) || 0);
        else if (p.id === 'p5' || p.id === 'p9') total_cost += p.monthlyPrice;
        else total_cost += p.monthlyPrice * loc;
      }
    });
    const final_cost = total_cost * (1 - disc);

    // --- РАСЧЕТ "SMART RESTAURANT" ---
    
    // Эффект Автоподтягивания (p2): +30% к чекам в зале (на 30% базы)
    let smartChd = chd;
    if (selectedProducts.p2) {
        smartChd = (chd * (1 - penetration)) + (chd * 1.30 * penetration);
    }

    // Эффект SR Delivery (p3): +16% к чеку доставки и +20% к кол-ву доставок (на 30% базы)
    let smartDeli = deli;
    let smartDeliAvg = deliAvg;
    if (selectedProducts.p3) {
        smartDeli = (deli * (1 - penetration)) + (deli * 1.20 * penetration);
        smartDeliAvg = (deliAvg * (1 - penetration)) + (deliAvg * 1.16 * penetration);
    }

    const smartHallRev = (smartChd * avg * days * loc);
    const smartDeliRev = (smartDeli * smartDeliAvg * days * loc);
    
    let smart_profit = ((smartHallRev + smartDeliRev) * marg) - final_cost;

    // Если SR Delivery (p3) НЕ выбран — продолжаем платить комиссию агрегаторам
    if (!selectedProducts.p3) {
        smart_profit -= (smartDeliRev * aggr_rate);
    } else {
        // Если выбран p3, комиссия агрегаторов исчезает (своя доставка)
        // Но можно вычесть расходы на курьеров (условно 5-10%), если нужно, 
        // но по твоим данным мы считаем чистую выгоду от отказа от агрегаторов.
    }

    return { 
      now_profit, 
      smart_profit, 
      diff: smart_profit - now_profit, 
      cost: final_cost 
    };
  }, [params, selectedProducts, appPrice, kioskCount]);

  const InputField = ({ label, value, field, suffix = "" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => handleParamChange(field, e.target.value)}
          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#1FCC59]/30 focus:border-[#1FCC59] focus:bg-white transition-all"
        />
        {suffix && <span className="absolute right-4 text-gray-400 font-bold text-sm">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="container mx-auto px-4 pt-6 max-w-6xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-colors font-bold text-sm uppercase tracking-wider">
          <ChevronLeft size={20} /> В меню
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-[65%] flex flex-col gap-8">
            <header>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <CalcIcon size={32} className="text-[#1FCC59]" /> КАЛЬКУЛЯТОР ПРИБЫЛИ
              </h1>
            </header>

            {/* Блок 1: Зал */}
            <section className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={18} className="text-[#1FCC59]" /> Работа зала
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Локаций" value={params.loc} field="loc" />
                <InputField label="Чеков в день" value={params.chd} field="chd" />
                <InputField label="Ср. чек (зал)" value={params.avg} field="avg" suffix="₸" />
              </div>
            </section>

            {/* Блок 2: Доставка */}
            <section className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                <Plus size={18} className="text-[#1FCC59]" /> Доставка
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Доставок в день" value={params.deli} field="deli" />
                <InputField label="Ср. чек доставки" value={params.deliAvg} field="deliAvg" suffix="₸" />
                <InputField label="Комиссия агрегатора" value={params.aggr} field="aggr" suffix="%" />
              </div>
            </section>

            {/* Блок 3: Экономика */}
            <section className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2 text-gray-400">
                Маржинальность и скидки
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <InputField label="Общая маржа" value={params.marg} field="marg" suffix="%" />
                <InputField label="Скидка от Choco" value={params.discount} field="discount" suffix="%" />
              </div>
            </section>

            {/* Блок 4: Продукты */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col
                    ${selectedProducts[product.id] ? 'border-[#1FCC59] bg-[#1FCC59]/5' : 'border-transparent bg-white shadow-sm'}
                  `}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                       <ProductIcon name={product.iconName} size={20} className={selectedProducts[product.id] ? "text-[#1FCC59]" : "text-gray-400"} />
                       <span className="font-bold text-sm">{product.title}</span>
                    </div>
                    {selectedProducts[product.id] && <Check size={16} className="text-[#1FCC59]" />}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{product.price}</span>
                  
                  {/* Доп поля внутри карточек */}
                  {selectedProducts[product.id] && product.id === 'p4' && (
                    <input 
                      type="text" value={appPrice} onChange={e => setAppPrice(e.target.value.replace(/\D/g,''))}
                      className="mt-3 h-8 px-2 rounded border border-[#1FCC59]/30 text-xs font-bold" 
                      onClick={e => e.stopPropagation()}
                    />
                  )}
                  {selectedProducts[product.id] && product.id === 'p8' && (
                    <div className="flex items-center gap-2 mt-3" onClick={e => e.stopPropagation()}>
                       <button onClick={() => setKioskCount(String(Math.max(1, Number(kioskCount)-1)))} className="w-6 h-6 bg-white border rounded">-</button>
                       <span className="text-xs font-bold">{kioskCount} шт</span>
                       <button onClick={() => setKioskCount(String(Number(kioskCount)+1))} className="w-6 h-6 bg-white border rounded">+</button>
                    </div>
                  )}
                </div>
               ))}
            </section>
          </div>

          {/* Результаты */}
          <div className="w-full lg:w-[35%]">
            <div className="sticky top-6 bg-gray-900 rounded-[40px] p-8 text-white shadow-2xl">
              <h3 className="text-center text-white/50 text-xs font-bold uppercase tracking-widest mb-8">Результат за 30 дней</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/60 text-sm">Текущая прибыль</span>
                  <span className="text-xl font-bold">{formatMoney(results.now_profit)} ₸</span>
                </div>

                <div className="py-4">
                  <span className="text-[#1FCC59] text-xs font-bold uppercase tracking-widest block mb-2">Smart Прогноз</span>
                  <div className="text-4xl font-black text-white">{formatMoney(results.smart_profit)} ₸</div>
                </div>

                <div className="bg-[#1FCC59] p-6 rounded-3xl text-white text-center">
                   <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">Чистая доп. выгода в месяц</span>
                   <div className="text-3xl font-black">+{formatMoney(results.diff)} ₸</div>
                </div>

                {results.cost > 0 && (
                  <div className="text-center text-white/40 text-[10px] font-bold uppercase">
                    Инвестиции в ПО: {formatMoney(results.cost)} ₸ / мес
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
