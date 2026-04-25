// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  ShieldCheck, Clock, UtensilsCrossed, Smartphone, 
  UserCheck, LayoutGrid, Monitor, CreditCard 
} from 'lucide-react';

/**
 * ЕДИНАЯ БАЗА ДАННЫХ КОНТЕНТА
 * Здесь собрана вся информация по продуктам, включая твой QR для доставки
 */
const PRODUCT_CONTENT = {
  // --- ДОСТАВКА (p3) ---
  p3: {
    title: "SR Delivery",
    icon: <Truck size={32} />,
    description: "Полноценная экосистема для запуска и автоматизации вашей собственной службы доставки без зависимости от агрегаторов.",
    price: "60 000 ₸ / лок.",
    // Используем QR-код из твоего примера (ссылка на изображение)
    customQr: "https://i.ibb.co/m5YfM8v/delivery-qr-example.jpg", 
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
          "Рост среднего чека на 16% за счет умных допродаж (на 30% проникновения)."
        ]
      }
    ],
    stats: [
      { label: "Синхронизация", value: "100%", desc: "Полная интеграция с кассовой системой." },
      { label: "Прирост заказов", value: "+20%", desc: "За счет удобства собственного сервиса." },
      { label: "Комиссия", value: "0 ₸", desc: "Никаких процентов сторонним сервисам." }
    ]
  },

  // --- ЗАКАЗ БЕЗ КАССИРА (p1) ---
  p1: {
    title: "Заказ без кассира",
    icon: <MousePointer2 size={32} />,
    description: "Система быстрого заказа через настольные терминалы или QR, которая полностью заменяет или разгружает живую очередь.",
    price: "64 000 ₸ / лок.",
    qrUrl: "https://smart-order-demo.chocofood.kz",
    benefits: [
      { 
        title: "Скорость обслуживания", 
        icon: <Clock size={20} />, 
        items: [
          "Ускорение очереди на 20% за счет самостоятельного заказа гостем.",
          "Исключение ошибок персонала при приеме заказа вручную."
        ]
      },
      { 
        title: "Увеличение чека", 
        icon: <TrendingUp size={20} />, 
        items: [
          "Автоматические рекомендации (Upsell) увеличивают чек на 16%.",
          "Гости заказывают на 10-15% больше, когда не чувствуют давления очереди."
        ]
      }
    ],
    stats: [
      { label: "Очередь", value: "-20%", desc: "Сокращение времени ожидания гостя." },
      { label: "Средний чек", value: "+16%", desc: "На 30% оцифрованного трафика." },
      { label: "Персонал", value: "0", desc: "Минимизация нагрузки на кассиров." }
    ]
  }
  // Остальные продукты (p2, p4, p5 и т.д.) будут добавляться сюда по такому же шаблону
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const data = PRODUCT_CONTENT[productId];

  // Заглушка, если данных по ID еще нет
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9] p-10">
        <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-widest">Информация наполняется...</h2>
        <button onClick={() => navigate(-1)} className="text-[#1FCC59] font-bold border-b-2 border-[#1FCC59]">Вернуться назад</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6 hover:text-[#1FCC59] transition-colors">
          <ChevronLeft size={14} /> Назад
        </button>

        {/* Главная карточка продукта */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="flex-1">
              <div className="w-16 h-16 bg-[#E8F9EE] rounded-2xl flex items-center justify-center text-[#1FCC59] mb-6 shadow-inner">
                {data.icon}
              </div>
              <h1 className="text-4xl font-black text-[#1A1D23] mb-4 tracking-tight">{data.title}</h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-6">{data.description}</p>
              <div className="inline-block px-4 py-2 bg-[#1FCC59] text-white rounded-xl font-black text-sm">
                {data.price}
              </div>
            </div>
            
            {/* Блок QR-кода (Твой пример) */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-gray-100 flex flex-col items-center shadow-inner">
              <div className="bg-white p-2 rounded-xl mb-3 shadow-md overflow-hidden">
                <img 
                  src={data.customQr || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrUrl || '')}`} 
                  alt="Product QR"
                  className="w-[140px] h-[140px] object-cover"
                />
              </div>
              <span className="text-[10px] font-black text-[#1FCC59] uppercase tracking-tighter text-center leading-none">
                Пример работы <br/> (отсканируйте)
              </span>
            </div>
          </div>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6 text-[#1FCC59]">
                <div className="p-2 bg-[#E8F9EE] rounded-lg">{benefit.icon}</div>
                <h3 className="font-black text-[15px] uppercase tracking-wide text-[#1A1D23]">{benefit.title}</h3>
              </div>
              <ul className="space-y-4">
                {benefit.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-gray-600 leading-tight">
                    <ShieldCheck size={18} className="text-[#1FCC59] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Темный блок статистики */}
        <div className="mt-8 bg-[#1A1D23] p-10 rounded-[32px] text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-[#1FCC59] font-black text-4xl mb-2">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">{stat.label}</div>
                <p className="text-gray-300 text-[11px] leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
