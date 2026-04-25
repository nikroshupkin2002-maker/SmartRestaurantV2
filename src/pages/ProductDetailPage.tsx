// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  ShieldCheck, Clock, UtensilsCrossed, Smartphone, 
  CheckCircle2, Info, Star
} from 'lucide-react';

/**
 * ГЛОБАЛЬНЫЙ КОНТЕНТ ПРОДУКТОВ
 * Именно отсюда данные идут на экран и в PDF-генератор
 */
const PRODUCT_DATA = {
  // --- ДОСТАВКА ---
  p3: {
    title: "SR Delivery",
    icon: <Truck size={40} className="text-[#1FCC59]" />,
    description: "Собственная служба доставки: запуск за 1 день, полная независимость от агрегаторов и экономия на комиссиях.",
    price: "60 000 ₸ / лок.",
    // Твой QR код из вложения (пример работы продукта)
    qrImage: "https://i.ibb.co/V9fPzYm/delivery-qr.jpg", 
    features: [
      {
        title: "Автоматизация логистики",
        desc: "Интеграция с Яндекс, Wolt Drive и Choco. Система сама выберет курьера по лучшей цене и скорости.",
        icon: <Zap size={20} />
      },
      {
        title: "Экономика 30/16",
        desc: "Полная отмена 30% комиссии агрегаторов и рост среднего чека на 16% за счет апсейлов в меню.",
        icon: <TrendingUp size={20} />
      }
    ],
    details: [
      "Прямая интеграция с кассой (iiko, r_keeper)",
      "Собственное брендированное веб-приложение",
      "Управление зонами доставки на карте",
      "База гостей принадлежит только вам"
    ],
    stats: [
      { label: "Комиссия", value: "0%", sub: "Никаких процентов" },
      { label: "Средний чек", value: "+16%", sub: "На 30% заказов" },
      { label: "Запуск", value: "24ч", sub: "Быстрый старт" }
    ]
  },

  // --- БЕЗ КАССИРА ---
  p1: {
    title: "Заказ без кассира",
    icon: <MousePointer2 size={40} className="text-[#1FCC59]" />,
    description: "Терминалы самообслуживания и QR-заказы, которые разгружают очередь и увеличивают выручку в пиковые часы.",
    price: "64 000 ₸ / лок.",
    qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=demo-cashier",
    features: [
      {
        title: "Скорость обслуживания",
        desc: "Ускорение очереди на 20%. Гость заказывает сам, кассир только выдает заказ.",
        icon: <Clock size={20} />
      },
      {
        title: "Умные допродажи",
        desc: "Система предлагает топпинги и напитки к каждому заказу, повышая чек на 16%.",
        icon: <Star size={20} />
      }
    ],
    details: [
      "Интуитивный интерфейс для гостей",
      "Поддержка всех типов оплат (QR, Карта)",
      "Сокращение очередей в часы пик",
      "Автоматическое обновление стоп-листов"
    ],
    stats: [
      { label: "Очередь", value: "-20%", sub: "Время ожидания" },
      { label: "Средний чек", value: "+16%", sub: "На 30% трафика" },
      { label: "ФОТ", value: "min", sub: "Замена кассира" }
    ]
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCT_DATA[productId];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F9]">
        <div className="text-center">
          <Info size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-500">Данные по продукту {productId} еще не добавлены</h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-[#1FCC59] font-bold">Вернуться в калькулятор</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-8 hover:text-[#1FCC59] transition-all">
          <ChevronLeft size={16} /> Назад к расчету КП
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ЛЕВАЯ КОЛОНКА: Описание и Фишки */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-[#E8F9EE] rounded-2xl shadow-inner">
                  {product.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-black text-[#1A1D23] leading-none">{product.title}</h1>
                  <p className="text-[#1FCC59] font-bold mt-2">{product.price}</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((f, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-[24px] border border-gray-100">
                    <div className="flex items-center gap-3 mb-3 text-[#1FCC59]">
                      {f.icon}
                      <h3 className="font-black text-sm uppercase tracking-wide text-[#1A1D23]">{f.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Технические детали */}
            <div className="bg-[#1A1D23] rounded-[32px] p-10 text-white">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-[#1FCC59]" /> Что входит в продукт:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#1FCC59] rounded-full" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: QR и Цифры */}
          <div className="space-y-6">
            {/* Блок QR */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Пример интерфейса</h3>
              <div className="p-4 bg-[#F8FAFC] rounded-[24px] border-2 border-dashed border-gray-200 mb-6">
                <img 
                  src={product.qrImage} 
                  alt="QR Code" 
                  className="w-40 h-40 object-contain rounded-lg"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold text-center uppercase leading-tight">
                Отсканируйте камерой смартфона <br /> для тестирования продукта
              </p>
            </div>

            {/* Блок Статистики */}
            <div className="bg-[#1FCC59] rounded-[32px] p-8 text-white shadow-xl shadow-[#1FCC59]/20">
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 opacity-80">Прогноз выгоды</h3>
              <div className="space-y-8">
                {product.stats.map((s, i) => (
                  <div key={i} className="border-b border-white/20 pb-4 last:border-0">
                    <div className="text-4xl font-black">{s.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mt-1">{s.label}</div>
                    <div className="text-[10px] opacity-60 italic">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
