// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Users, Zap, 
  TrendingUp, ShieldCheck, Clock, UtensilsCrossed 
} from 'lucide-react';

/**
 * ЦЕНТРАЛЬНАЯ БАЗА ДАННЫХ ПРОДУКТОВ
 * Мы заполняем её здесь, чтобы избежать ошибок импорта.
 */
const PRODUCT_CONTENT = {
  // --- ДОСТАВКА (p3) ---
  p3: {
    title: "SR Delivery",
    icon: <Truck size={32} />,
    description: "Собственная служба доставки: запуск за 1 день, интеграция с курьерами и полная независимость от агрегаторов.",
    price: "60 000 ₸ / лок.",
    qrUrl: "https://smart-delivery-demo.chocofood.kz",
    benefits: [
      { 
        title: "Автоматизация", 
        icon: <Zap size={20} />, 
        items: [
          "Авто-вызов курьеров (Яндекс, Wolt Drive, Choco).",
          "Интеграция с вашей кассой 100%."
        ]
      },
      { 
        title: "Эффект (на 30% заказов)", 
        icon: <TrendingUp size={20} />, 
        items: [
          "Экономия 30% комиссии агрегатора.",
          "Рост среднего чека на 16% за счет допродаж."
        ]
      }
    ],
    stats: [
      { label: "Комиссия", value: "0%", desc: "Никаких процентов сторонним сервисам." },
      { label: "Средний чек", value: "+16%", desc: "Благодаря умному меню." },
      { label: "Контроль", value: "100%", desc: "Ваша база клиентов остается у вас." }
    ]
  },

  // --- БЕЗ КАССИРА (p1) ---
  p1: {
    title: "Заказ без кассира",
    icon: <MousePointer2 size={32} />,
    description: "Терминалы самообслуживания и QR-заказы в зале, которые заменяют кассира и исключают очереди.",
    price: "64 000 ₸ / лок.",
    qrUrl: "https://smart-order-demo.chocofood.kz",
    benefits: [
      { 
        title: "Пропускная способность", 
        icon: <Clock size={20} />, 
        items: [
          "Ускорение очереди на 20% (эффект на 30% трафика).",
          "Работает 24/7 без перерывов и ошибок персонала."
        ]
      },
      { 
        title: "Увеличение выручки", 
        icon: <TrendingUp size={20} />, 
        items: [
          "Рост среднего чека на 16% за счет автоматических Upsell-предложений.",
          "Экономия на ФОТ (один терминал заменяет одного кассира)."
        ]
      }
    ],
    stats: [
      { label: "Очередь", value: "-20%", desc: "Сокращение времени ожидания." },
      { label: "Средний чек", value: "+16%", desc: "На оцифрованном трафике." },
      { label: "Персонал", value: "min", desc: "Снижение нагрузки на кассу." }
    ]
  },

  // --- БЕЗ ОФИЦИАНТА (p2) ---
  p2: {
    title: "Заказ без официанта",
    icon: <UtensilsCrossed size={32} />,
    description: "QR-меню на столах с возможностью мгновенного заказа и оплаты без ожидания персонала.",
    price: "8 000 ₸ / лок.",
    qrUrl: "https://smart-waiter-demo.chocofood.kz",
    benefits: [
      { 
        title: "Оборачиваемость", 
        icon: <Clock size={20} />, 
        items: [
          "Ускорение оборачиваемости столов на 25%.",
          "Гость не ждет меню и счет — всё в телефоне."
        ]
      },
      { 
        title: "Допродажи", 
        icon: <TrendingUp size={20} />, 
        items: [
          "Средний чек +16% за счет визуальных карточек блюд.",
          "Легкое добавление позиций в процессе трапезы."
        ]
      }
    ],
    stats: [
      { label: "Оборачиваемость", value: "+25%", desc: "Столы освобождаются быстрее." },
      { label: "Средний чек", value: "+16%", desc: "За счет удобства дозаказа." },
      { label: "Сервис", value: "Fast", desc: "Мгновенная передача заказа на кухню." }
    ]
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const data = PRODUCT_CONTENT[productId];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9] p-10 text-center">
        <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-widest leading-relaxed">
          Продукт {productId} <br/> Данные обновляются...
        </h2>
        <button onClick={() => navigate(-1)} className="text-[#1FCC59] font-black border-b-2 border-[#1FCC59] pb-1">
          ВЕРНУТЬСЯ НАЗАД
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6 hover:text-[#1FCC59] transition-all">
          <ChevronLeft size={14} /> Назад к списку
        </button>

        {/* Шапка продукта */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start relative z-10">
            <div className="flex-1">
              <div className="w-16 h-16 bg-[#E8F9EE] rounded-2xl flex items-center justify-center text-[#1FCC59] mb-6 shadow-inner">
                {data.icon}
              </div>
              <h1 className="text-4xl font-black text-[#1A1D23] mb-4 tracking-tight">{data.title}</h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">{data.description}</p>
              <div className="inline-block px-5 py-2 bg-[#1FCC59] text-white rounded-xl font-black text-sm shadow-lg shadow-[#1FCC59]/20">
                {data.price}
              </div>
            </div>
            
            {/* QR Блок */}
            <div className="bg-[#F8FAFC] p-6 rounded-[28px] border border-gray-100 flex flex-col items-center shadow-inner self-center md:self-start">
              <div className="bg-white p-3 rounded-xl mb-3 shadow-md">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrUrl)}`} 
                  alt="QR Code"
                  className="w-[130px] h-[130px]"
                />
              </div>
              <div className="flex items-center gap-2 text-[#1FCC59]">
                <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-none">
                  Отсканируйте <br/> для демо
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 text-[#1FCC59]">
                <div className="p-2 bg-[#E8F9EE] rounded-lg">{b.icon}</div>
                <h3 className="font-black text-[16px] uppercase tracking-wide text-[#1A1D23]">{b.title}</h3>
              </div>
              <ul className="space-y-4">
                {b.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 leading-tight">
                    <ShieldCheck size={18} className="text-[#1FCC59] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Статистика (Темный блок) */}
        <div className="mt-8 bg-[#1A1D23] p-10 rounded-[32px] text-white shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.stats.map((s, idx) => (
              <div key={idx} className="text-center md:text-left border-l border-white/10 pl-6 first:border-0">
                <div className="text-[#1FCC59] font-black text-4xl mb-2">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2 text-white/50">{s.label}</div>
                <p className="text-gray-400 text-[12px] leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
