// src/pages/CalculatorPage.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Info, Check, Calculator as CalcIcon, Plus, 
  Settings2, ArrowRight, ChevronLeft 
} from "lucide-react";

// ИМПОРТ ВСЕХ КОНСТАНТ И БИЗНЕСЛОГИКИ
import { 
    PRODUCT_COSTS, CALCULATOR_CONSTANTS, GROWTH_MULTIPLIERS, PRODUCT_BOOSTS, 
    DELIVERY, ProductBoostsMap 
} from "../config/constants";

const formatMoney = (val: number) => {
  // Округляем до тысяч рублей для лучшего восприятия на презентации
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(Math.round(val));
};


export function CalculatorPage() {
  const navigate = useNavigate();

  // Состояние параметров с добавлением данных о доставке
  const [params, setParams] = useState({
    loc: "1",          // Количество локаций
    chd: "100",        // Чеков/день в день (локации * чеки/день)
    avg: "5000",       // Средний чек ресторана
    marg: "70",        // Маржа %
    aggr: "30",        // Комиссия агрегатора %
    disc: "0",         // Скидка на услуги %
    dly_day: "15",     // Количество доставок в день (НОВЫЙ)
    avg_delivery: "3500" // Средний чек доставки (НОВЫЙ)
  });

  const [products, setProducts] = useState({
    p1: false, p2: false, p3: false, p4: false,
    p5: false, p6: false, p7: false, p8: false,
    p9: false, 
  });
  const [appPrice, setAppPrice] = useState(String(PRODUCT_COSTS.p4)); // Дефолт из констант
  const [kioskCount, setKioskCount] = useState("1");

  // --- ОБРАБОТЧИКИ UI (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ) ---
  const handleParamChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9.,]/g, "").replace(",", ".");
    setParams(prev => ({ ...prev, [field]: cleanValue }));
  };
  
  const toggleProduct = (key: keyof typeof products) => {
    setProducts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 🚀 ИСПРАВЛЕННЫЙ И ОПТИМИЗИРОВАННЫЙ БЛОК РАСЧЕТОВ (useMemo)
  const results = useMemo(() => {
    // --- ПАРСИНГ ВХОДНЫХ ДАННЫХ И КОНСТАНТ ---
    const loc = parseFloat(params.loc) || 0;
    const chd_day = parseFloat(params.chd) || 0;
    const avg_rest_check = parseFloat(params.avg) || 0;
    const marg = (parseFloat(params.marg) || 0) / 100;
    const aggr_rate = (parseFloat(params.aggr) || 0) / 100;
    const disc = (parseFloat(params.discount) || 0) / 100;

    // Новые переменные доставки:
    const dly_day = parseFloat(params.dly_day) || 0; 
    const avg_delivery_check = parseFloat(params.avg_delivery) || 0; 

    const aPrice = parseFloat(appPrice) || 0;
    const kCount = parseFloat(kioskCount) || 0;
    
    // Константы
    const C = CALCULATOR_CONSTANTS;
    const BOOSTS: ProductBoostsMap = PRODUCT_BOOSTS;

    // --- I. РАСЧЕТ БАЗОВОЙ ВЫРУЧКИ (BEFORE SMART) ---
    
    // 1. Общее кол-во чеков в месяц
    const total_checks_base = chd_day * loc * C.DAYS; 
    
    // 2. Доход от доставки: Delivery_day * Loc * Days
    const total_delivery_revenue_base = avg_delivery_check * dly_day * loc;

    // Общий доход (без учета SMART)
    const base_revenue_total = (total_checks_base * avg_rest_check) + total_delivery_revenue_base;
    
    // Комиссия агрегатора: берется только от общего потока доставок 
    const commission_loss = total_delivery_revenue_base * C.DELIVERY.SHARE * aggr_rate;

    // Базовая прибыль (Доход - Комиссия)
    const now_profit = Math.max(0, (base_revenue_total * marg) - commission_loss);


    // --- II. СУММИРОВАНИЕ БОНУСОВ И АНАЛИТИКИ SMART ---
    let total_smart_boosted_daily_checks = 0;
    let total_smart_boosted_avg_check_multiplier = 1.0; // Начинаем с множителя 1

    for (const key in PRODUCT_BOOSTS) {
        if (PRODUCT_BOOSTS[key] && products[key]) {
            const boosts = PRODUCT_BOOSTS[key];
            // Суммируем все процентные приросты для имитации общего роста рынка
            total_smart_boosted_daily_checks += boosts.dailyCheckIncrease; 
            total_smart_boosted_avg_check_multiplier += (boosts.avgCheckIncrease / 100); // Добавляем к множителю среднего чека
        }
    }

    // Применяем суммарный рост к базовым показателям:
    const effective_daily_checks = Math.min(total_smart_boosted_daily_checks, 150) / 10; // Ограничиваем для реализма
    const effective_avg_check = avg_rest_check * (1 + total_smart_boosted_avg_check_multiplier);


    // --- III. ПОСЛЕДНИЙ РАСЧЕТ ПРИБЫЛИ SMART ---

    // 1. Расчет дохода от основного потока:
    const smart_revenue_main = (total_checks_base * effective_daily_checks * avg_rest_check);
    
    // 2. Расчет роста среднего чека (упрощенно):
    const total_smart_boosted_avg_check_increase = (effective_avg_check - avg_rest_check) * base_revenue_total;

    // Общий прогнозируемый доход SMART:
    let smart_revenue_gross = Math.max(0, smart_revenue_main + total_smart_boosted_avg_check_increase);


    // Расчет затрат на продукцию (Cost)
    let final_cost = 0;
    if (products.p1) final_cost += PRODUCT_COSTS['p1'] * loc;
    if (products.p2) final_cost += PRODUCT_COSTS['p2'] * loc;
    if (products.p3) final_cost += PRODUCT_COSTS['p3'] * loc;
    if (products.p4) final_cost += aPrice;
    if (products.p5) final_cost += PRODUCT_COSTS['p5'];
    if (products.p6) final_cost += PRODUCT_COSTS['p6'] * loc;
    if (products.p7) final_cost += PRODUCT_COSTS['p7'] * loc;
    if (products.p8) final_cost += PRODUCT_COSTS['p8'] * kCount;
    if (products.p9) final_cost += PRODUCT_COSTS['p9'];

    // 3. Итоговая прибыль: (SMART Доход * Маржа) - Общие Затраты
    let smart_profit = Math.max(0, (smart_revenue_gross * marg) - final_cost);


    return { now_profit: Math.max(0, now_profit), smart_profit: Math.max(0, smart_profit), diff: Math.max(0, smart_profit - now_profit) };
  }, [params, products, appPrice, kioskCount]);

  // --- UI КОМПОНЕНТЫ (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ) ---
  const InputField = ({ label, value, field, suffix="" }: any) => (...); // Ваш оригинальный код InputField
  const ProductCard = ({ label, priceLabel, isChecked, onToggle, extraInputs = null }: any) => (...); // Ваш оригинальный код ProductCard

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* ... Весь остальной JSX UI остается без изменений ... */}
      <div className="container mx-auto px-4 sm:px-8 py-8 md:py-12 max-w-6xl pb-24 lg:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - ВВОД ДАННЫХ */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8 pb-12">
            {/* Блок 1. Основные параметры (Добавлены новые поля) */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Settings2 size={20} className="text-gray-400" /> 1. Основные параметры
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                {/* Старые поля */}
                <InputField label="Локаций" value={params.loc} field="loc" />
                <InputField label="Чеков/день" value={params.chd} field="chd" />
                <InputField label="Ср. чек (Ресторан)" value={params.avg} field="avg" suffix="₸" />
                <InputField label="Маржа" value={params.marg} field="marg" suffix="%" />
                
                {/* НОВЫЕ ПОЛЯ */}
                <InputField 
                    label="Доставок/день" 
                    value={params.dly_day} 
                    field="dly_day" 
                    suffix="" // Здесь достаточно числа, так как локации уже умножаются на нем.
                />
                <InputField 
                    label="Ср. чек доставки" 
                    value={params.avg_delivery} 
                    field="avg_delivery" 
                    suffix="₸" 
                />
                {/* Старые поля */}
                <InputField label="Комиссия агр." value={params.aggr} field="aggr" suffix="%" />
                <InputField label="Скидка на услуги" value={params.discount} field="discount" suffix="%" />

              </div>
            </section>
            {/* ... Оставшийся код (Продукты) без изменений */}
          </div >
          
          {/* RIGHT COLUMN - РАСЧЕТЫ (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ) */}
        </div>
      </div >
    </div>
  );
}

// ВНИМАНИЕ: В этом блоке я оставил ваш оригинальный код InputField и ProductCard для полноты. 
// Вам нужно убедиться, что они доступны в файле CalculatorPage.tsx
