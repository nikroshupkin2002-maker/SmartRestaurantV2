import React from 'react';
import { MousePointer2, Clock, TrendingUp } from 'lucide-react';

export const noCashierContent = {
  title: "Заказ без кассира",
  icon: <MousePointer2 size={32} />,
  description: "Система быстрого заказа через настольные терминалы или QR, которая разгружает кассовую зону и ускоряет обслуживание.",
  price: "64 000 ₸ / лок.",
  qrUrl: "https://smart-order-demo.chocofood.kz",
  benefits: [
    { 
      title: "Пропускная способность", 
      icon: <Clock size={20} />, 
      items: [
        "Ускорение очереди на 20% за счет самостоятельного выбора блюд гостем.",
        "Сокращение нагрузки на персонал в пиковые часы."
      ]
    },
    { 
      title: "Увеличение выручки", 
      icon: <TrendingUp size={20} />, 
      items: [
        "Автоматические допродажи (Upsell) увеличивают средний чек на 16%.",
        "Визуальное меню стимулирует гостя заказывать больше позиций."
      ]
    }
  ],
  stats: [
    { label: "Очередь", value: "-20%", desc: "Сокращение времени ожидания." },
    { label: "Средний чек", value: "+16%", desc: "За счет алгоритмов допродаж." },
    { label: "Ошибки", value: "0%", desc: "Исключение человеческого фактора при приеме." }
  ]
};
