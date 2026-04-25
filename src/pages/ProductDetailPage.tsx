// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

/**
 * БАЗА ДАННЫХ ПРОДУКТОВ
 * Когда мы будем готовы, мы вынесем это в отдельные файлы.
 * Но сейчас это здесь, чтобы у тебя ничего не "падало".
 */
const PRODUCT_CONTENT = {
  p3: { // SR Delivery
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
          "Автоматический подбор курьера по скорости и цене."
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
      { label: "Синхронизация", value: "100%", desc: "Полная интеграция с кассой." },
      { label: "Прирост заказов", value: "+20%", desc: "За счет удобства сервиса." },
      { label: "Комиссия", value: "0 ₸", desc: "Никаких процентов агрегаторам." }
    ]
  },
  p1: { // Заказ без кассира
    title: "Заказ без кассира",
    icon: <MousePointer2 size={32} />,
    description: "Система быстрого заказа через настольные терминалы или QR, которая разгружает кассовую зону.",
    price: "64 000 ₸ / лок.",
    qrUrl: "https://smart-order-demo.chocofood.kz",
    benefits: [
      { 
        title: "Скорость", 
        icon: <Clock size={20} />, 
        items: [
          "Ускорение очереди на 20% (на 30% проникновения).",
          "Гости сами выбирают и оплачивают заказ."
        ]
      },
      { 
        title: "Выгода", 
        icon: <TrendingUp size={20} />, 
        items: [
          "Средний чек выше на 16% за счет алгоритмов Upsell.",
          "Снижение нагрузки на персонал в часы пик."
        ]
      }
    ],
    stats: [
      { label: "Очередь", value: "-20%", desc: "Сокращение ожидания." },
      { label: "Средний чек", value: "+16%", desc: "Благодаря допродажам." },
      { label: "Ошибки", value: "0", desc: "Точность приема заказа." }
    ]
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const data = PRODUCT_CONTENT[productId];

  // Если данных нет, показываем заглушку, а не ошибку
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9] p-10 text-center">
        <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-widest">
          Продукт {productId} <br/> в процессе наполнения
        </h2>
        <button onClick={() => navigate(-1)} className="text-[#1FCC59] font-black border-b-2 border-[#1FCC59] pb-1">
          ВЕРНУТЬСЯ К СПИСКУ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6 hover:text-[#1FCC59] transition-colors">
          <ChevronLeft size={14} /> Назад
        </button>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="flex-1">
              <div className="w-16 h-16 bg-[#E8F9EE] rounded-2xl flex items-center justify-center text-[#1FCC59] mb-6">
                {data.icon}
              </div>
              <h1 className="text-4xl font-black text-[#1A1D23] mb-4">{data.title}</h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-6">{data.description}</p>
              <span className="px-4 py-2 bg-[#1FCC59] text-white rounded-xl font-black text-sm">{data.price}</span>
            </div>
            
            {/* Секция QR */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-gray-100 flex flex-col items-center shadow-inner">
              <div className="bg-white p-3 rounded-xl mb-3 shadow-sm">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrUrl)}`} 
                  alt="QR"
                  className="w-[120px] h-[120px]"
                />
              </div>
              <span className="text-[10px] font-black text-[#1FCC59] uppercase tracking-tighter text-center">
                Отсканируйте <br/> для примера
              </span>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-[#1FCC59]">
                {b.icon}
                <h3 className="font-black text-[15px] uppercase tracking-wide">{b.title}</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                {b.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ShieldCheck size={16} className="text-[#1FCC59] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="mt-8 bg-[#1A1D23] p-10 rounded-[32px] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.stats.map((s, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-[#1FCC59] font-black text-4xl mb-2">{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2">{s.label}</div>
                <p className="text-gray-400 text-[11px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
