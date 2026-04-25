// @ts-nocheck
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  Clock, UtensilsCrossed, Smartphone, CheckCircle2, 
  Heart, Monitor, Megaphone, CreditCard, UserCheck, 
  SmartphoneNfc, FileSearch, RefreshCcw 
} from 'lucide-react';

const DATA = {
  "1": {
    title: "Заказ «Без кассира»",
    price: "84 000 ₸ / лок.",
    icon: <MousePointer2 size={40} className="text-[#1FCC59]" />,
    desc: "Быстрый процесс заказа через терминалы или QR без очередей. Идеально для фаст-фуда и зон самообслуживания.",
    benefits: ["Ускорение очереди на 20%", "Авто-предложение допов (Upsell)", "Снижение нагрузки на персонал"],
    results: { val: "+16%", label: "Средний чек" }
  },
  "2": {
    title: "Заказ «Без официанта»",
    price: "120 000 ₸ / лок.",
    icon: <UtensilsCrossed size={40} className="text-[#1FCC59]" />,
    desc: "Мгновенный заказ со стола и полная оцифровка каждого гостя. Позволяет обслуживать больше столов меньшим штатом.",
    benefits: ["Освобождение персонала от приема заказов", "Электронное меню с яркими фото", "Сокращение времени ожидания"],
    results: { val: "+25%", label: "Оборачиваемость" }
  },
  "3": {
    title: "SR Delivery",
    price: "60 000 ₸ / лок.",
    icon: <Truck size={40} className="text-[#1FCC59]" />,
    desc: "Собственная служба доставки с автоматизацией логистики и контролем курьеров.",
    benefits: ["Экономия на комиссиях агрегаторов", "Собственная база клиентов", "Умное распределение заказов"],
    results: { val: "0%", label: "Комиссия" }
  },
  "4": {
    title: "Мобильное приложение",
    price: "От 420 000 ₸",
    icon: <Smartphone size={40} className="text-[#1FCC59]" />,
    desc: "Ваше собственное приложение в сторах. Прямой доступ к клиенту 24/7.",
    benefits: ["Бесплатные Push-уведомления", "Рост повторных продаж", "Брендированный дизайн"],
    results: { val: "+40%", label: "Возвратность" }
  },
  "5": {
    title: "Программа лояльности",
    price: "60 000 ₸",
    icon: <Heart size={40} className="text-[#1FCC59]" />,
    desc: "Цифровой кэшбэк и персональные акции, которые заставляют гостей возвращаться.",
    benefits: ["Автоматизация маркетинга", "RFM-аналитика базы", "Рост базы контактов"],
    results: { val: "+25%", label: "Retention" }
  },
  "6": {
    title: "App Clip",
    price: "35 000 ₸ / лок.",
    icon: <SmartphoneNfc size={40} className="text-[#1FCC59]" />,
    desc: "Современная замена физическим пейджерам на смартфонах ваших гостей.",
    benefits: ["Работает мгновенно без установки", "Уведомление о готовности на экран", "Экономия на оборудовании"],
    results: { val: "Modern", label: "Сервис" }
  },
  "7": {
    title: "Автоподтягивание счета",
    price: "60 000 ₸ / лок.",
    icon: <RefreshCcw size={40} className="text-[#1FCC59]" />,
    desc: "Автоматическая синхронизация счета в iiko/r-keeper с QR-кодом на столе.",
    benefits: ["Оплата без участия официанта", "Всегда актуальный счет", "Интеграция с Kaspi QR"],
    results: { val: "-5 мин", label: "Время оплаты" }
  },
  "8": {
    title: "Киоск самообслуживания",
    price: "60 000 ₸ / ед.",
    icon: <Monitor size={40} className="text-[#1FCC59]" />,
    desc: "Интерактивный терминал для самостоятельного заказа и оплаты.",
    benefits: ["Работает без перерывов", "Исключает человеческий фактор", "Максимально увеличивает чек"],
    results: { val: "+20%", label: "Средний чек" }
  },
  "9": {
    title: "Guest 360",
    price: "64 000 ₸ / сеть",
    icon: <FileSearch size={40} className="text-[#1FCC59]" />,
    desc: "Единая панель управления данными о гостях и их предпочтениях.",
    benefits: ["Глубокая аналитика чеков", "Сбор обратной связи", "Прогноз поведения гостей"],
    results: { val: "100%", label: "Прозрачность" }
  }
};

// Создаем "зеркальные" ключи (теперь база понимает и "1" и "p1")
const EXTENDED_DATA = { ...DATA };
Object.keys(DATA).forEach(key => {
  EXTENDED_DATA[`p${key}`] = DATA[key];
});

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Отладка: выведет в консоль браузера, какой ID реально прилетел
  useEffect(() => {
    console.log("Current Product ID from URL:", productId);
  }, [productId]);

  const product = EXTENDED_DATA[productId];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10 text-center">
        <h2 className="text-3xl font-black text-gray-300 mb-2 uppercase italic">Data Missing</h2>
        <p className="text-gray-400 mb-6 font-medium">ID Продукта: <span className="text-red-400 font-mono">"{productId}"</span> не найден в базе.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-8 py-3 bg-[#1FCC59] text-white rounded-full font-black shadow-lg shadow-[#1FCC59]/30 active:scale-95 transition-all"
        >
          ВЕРНУТЬСЯ НАЗАД
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#2D3139] pb-10">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-10 hover:text-[#1FCC59] transition-all">
          <ChevronLeft size={16} strokeWidth={3} /> Назад
        </button>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Декор на фоне */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F9EE] rounded-bl-[100px] -mr-10 -mt-10 opacity-50" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 relative z-10">
            <div className="flex items-center gap-6">
              <div className="p-6 bg-[#E8F9EE] rounded-[28px] text-[#1FCC59]">
                {product.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-[#1A1D23] leading-tight">{product.title}</h1>
                <p className="text-[#1FCC59] font-black text-2xl mt-2">{product.price}</p>
              </div>
            </div>
            
            <div className="bg-[#1FCC59] text-white p-8 rounded-[35px] text-center min-w-[180px] shadow-xl shadow-[#1FCC59]/20">
              <div className="text-4xl font-black">{product.results.val}</div>
              <div className="text-[11px] font-black uppercase tracking-widest opacity-80 mt-1">{product.results.label}</div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12 max-w-2xl">
            {product.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[28px] border border-gray-100 hover:border-[#1FCC59]/30 transition-colors group">
                <div className="mt-1">
                  <CheckCircle2 className="text-[#1FCC59] group-hover:scale-110 transition-transform" size={24} strokeWidth={3} />
                </div>
                <span className="font-bold text-gray-700 leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-2 bg-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Choco Business • Solution Details 2026
          </div>
        </div>
      </div>
    </div>
  );
}
