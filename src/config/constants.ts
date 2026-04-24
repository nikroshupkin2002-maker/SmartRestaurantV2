// src/config/constants.ts

/** КОНСТАНТЫ ПРОДУКТОВ И ЦЕН */
export const PRODUCT_PRICES = {
    p1: 84000, // Без кассира (за 1 локацию)
    p2: 120000, // Без официанта (за 1 локацию)
    p3: 60000, // SR Delivery (за 1 локацию)
    p4_appPriceDefault: 420000, // Цена приложения по умолчанию
    p5: 60000,       // Лояльность
    p6: 35000,       // AppClip (за 1 локацию)
    p7: 60000,       // Автосчет (за 1 локацию)
    p8: 60000,       // Киоск (базовая цена за единицу)
    p9: 64000,       // Guest 360 (за сеть)
};

/** ФИКСИРОВАННЫЕ ПАРАМЕТРЫ РАСЧЕТА */
export const CALCULATOR_CONSTANTS = {
    DAYS: 30,                 // Количество дней в расчете
    DELIVERY_SHARE: 0.3,      // Доля доставки в общем чеке агрегатора (30%)
    IMPACT_RATE: 0.3,         // Проникновение продукта (30% от дневных продаж и доставок)
};

/** КОНСТАНТЫ ПРОГРЕССА И РОСТА */
export const GROWTH_MULTIPLIERS = {
    AVG_CHEK_DEFAULT: 1.16, // Рост среднего чека по умолчанию (+16%)
};


/** СВОДНЫЕ ДАННЫЕ ПО ВЛИЯНИЮ ПРОДУКТОВ (КРИТИЧНО) */

// Формат: [ключ продукта]: { boostDailyChecks: %, boostAvgCheck: % }
export type ProductBoosts = Record<string, { dailyCheckIncrease: number; avgCheckIncrease: number }>;

const PRODUCT_BOOSTS: ProductBoosts = {
    p1: { dailyCheckIncrease: 0.20, avgCheckIncrease: 0.16 }, // Без кассира (+20% чеки, +16% чек)
    p2: { dailyCheckIncrease: 0.25, avgCheckIncrease: 0.16 }, // Без официанта (+25% чеки, +16% чек)
    p3: { dailyCheckIncrease: 0, avgCheckIncrease: 0.16 },   // SR Delivery (только по расчету доставки)
    p4: { dailyCheckIncrease: 0.30, avgCheckIncrease: 0.16 }, // Приложение (+30% чеки, +16% чек)
    p5: { dailyCheckIncrease: 0.30, avgCheckIncrease: 0.12 }, // Лояльность (+30% чеки, +12% чек)
    p7: { dailyCheckIncrease: 0.25, avgCheckIncrease: 0 };   // Автосчет (+25% чеки)
    p8: { dailyCheckIncrease: 0.20, avgCheckIncrease: 0.16 }, // Киоск (+20% чеки, +16% чек)
    p9: { dailyCheckIncrease: 0.30, avgCheckIncrease: 0 };  // Guest 360 (+30% чеки)
    // p6 (AppClip): Нет заданного % роста в требованиях -> пропускаем boost
};

/** ЦЕНА ПО ПРОДУКТУ */
export type ProductCosts = Record<string, number>;
export const PRODUCT_COSTS: ProductCosts = {
    p1: PRODUCT_PRICES.p1,
    p2: PRODUCT_PRICES.p2,
    p3: PRODUCT_PRICES.p3,
    p4: PRODUCT_PRICES.p4_appPriceDefault,
    p5: PRODUCT_PRICES.p5,
    p6: PRODUCT_PRICES.p6,
    p7: PRODUCT_PRICES.p7,
    p8: PRODUCT_PRICES.p8,
    p9: PRODUCT_PRICES.p9,
};

export type ProductBoostsMap = Record<string, { dailyCheckIncrease: number; avgCheckIncrease: number }>;
