import React from 'react';
import { Truck, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export const deliveryContent = {
  title: "SR Delivery",
  icon: <Truck size={32} />,
  description: "Полноценная экосистема для запуска и автоматизации вашей собственной службы доставки без зависимости от агрегаторов.",
  price: "60 000 ₸ / лок.",
  qrUrl: "https://smart-delivery-demo.chocofood.kz",
  benefits: [
    { 
      title: "Автоматизация", 
      icon: <Zap size={20} />, 
      items: [
        "Интеграция курьерских служб: Яндекс Доставка, Wolt Drive, Choco Доставка.",
        "Автоматический подбор курьера по скорости и цене в режиме реального времени."
      ]
    },
    { 
      title: "Экономия и рост", 
      icon: <TrendingUp size={20} />, 
      items: [
        "Экономия на комиссии агрегаторов (до 30% с каждого заказа).",
        "Рост среднего чека на 16% за счет умных допродаж."
      ]
    }
  ],
  stats: [
    { label: "Синхронизация", value: "100%", desc: "Полная интеграция с кассовой системой." },
    { label: "Прирост заказов", value: "+20%", desc: "За счет удобства собственного сервиса." },
    { label: "Комиссия", value: "0 ₸", desc: "Никаких процентов сторонним сервисам." }
  ]
};
