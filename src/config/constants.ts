export const PRODUCT_COSTS = {
  p1: 84000,   // Без кассира
  p2: 120000,  // Без официанта
  p3: 60000,   // SR Delivery
  p4: 420000,  // Приложение
  p5: 60000,   // Лояльность
  p6: 35000,   // AppClip
  p7: 60000,   // Автосчет
  p8: 60000,   // Киоск
  p9: 64000    // Guest 360
};

export const PRODUCT_BENEFITS = {
  p1: { cat: "speed", checkInc: 0.20, avgInc: 0.16 },
  p2: { cat: "turnover", checkInc: 0.25, avgInc: 0.16 },
  p3: { cat: "delivery", checkInc: 0, avgInc: 0.16 }, // Только для доставки
  p4: { cat: "loyalty", checkInc: 0.30, avgInc: 0.16 },
  p5: { cat: "loyalty", checkInc: 0.30, avgInc: 0.12 },
  p6: { cat: "none", checkInc: 0, avgInc: 0 },
  p7: { cat: "turnover", checkInc: 0.25, avgInc: 0 },
  p8: { cat: "speed", checkInc: 0.20, avgInc: 0.16 },
  p9: { cat: "loyalty", checkInc: 0.30, avgInc: 0 }
};

export const CALCULATOR_CONSTANTS = {
  DAYS: 30,
  IMPACT_RATE: 0.30 // 30% проникновения
};
