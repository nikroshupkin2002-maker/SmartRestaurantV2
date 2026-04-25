// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  ShieldCheck, Clock, UtensilsCrossed, Smartphone, 
  CheckCircle2, Heart, Monitor, Megaphone, CreditCard, 
  UserCheck, SmartphoneNfc, FileSearch, RefreshCcw
} from 'lucide-react';

const PRODUCTS_DATABASE = {
  // --- ЗАКАЗ БЕЗ КАССИРА (p1) ---
  p1: {
    title: "Заказ без кассира",
    icon: <MousePointer2 size={40} className="text-[#1FCC59]" />,
    price: "84 000 ₸ / лок.",
    qrUrl: "https://smart-order-demo.chocofood.kz",
    description: "Быстрый процесс заказа через терминалы или QR без очередей. Идеально для фаст-фуда и зон самообслуживания.",
    benefits: [
      { title: "Пропускная способность", desc: "Ускорение очереди на 20% в пиковые часы нагрузки.", icon: <Clock size={20} /> },
      { title: "Высокий чек", desc: "Автоматические предложения топпингов и напитков каждому гостю.", icon: <TrendingUp size={20} /> }
    ],
    features: ["Сокращение очередей", "Исключение ошибок персонала", "Поддержка Kaspi QR", "Автоматический Upsell"],
    results: [
      { label: "Очередь", value: "-20%", sub: "Время ожидания" },
      { label: "Средний чек", value: "+16%", sub: "На 30% трафика" },
      { label: "ФОТ", value: "min", sub: "Разгрузка кассы" }
    ]
  },

  // --- ЗАКАЗ БЕЗ ОФИЦИАНТА (p2) ---
  p2: {
    title: "Заказ без официанта",
    icon: <UtensilsCrossed size={40} className="text-[#1FCC59]" />,
    price: "120 000 ₸ / лок.",
    qrUrl: "https://qr-menu-demo.chocofood.kz",
    description: "Мгновенный заказ со стола и полная оцифровка каждого гостя. Позволяет обслуживать больше столов меньшим количеством персонала.",
    benefits: [
      { title: "Оборачиваемость столов", desc: "Ускорение обслуживания на 25%, так как гость не ждет меню и счет.", icon: <Zap size={20} /> },
      { title: "Визуальные продажи", desc: "Красивые фото блюд в телефоне гостя стимулируют дозаказы.", icon: <TrendingUp size={20} /> }
    ],
    features: ["Мгновенное QR-меню", "Вызов официанта одной кнопкой", "Разделение счета онлайн", "Прямая оплата"],
    results: [
      { label: "Оборачиваемость", value: "+25%", sub: "Быстрее сервис" },
      { label: "Средний чек", value: "+16%", sub: "За счет визуала" },
      { label: "Нагрузка", value: "-40%", sub: "На официантов" }
    ]
  },

  // --- ДОСТАВКА (p3) ---
  p3: {
    title: "SR Delivery",
    icon: <Truck size={40} className="text-[#1FCC59]" />,
    price: "60 000 ₸ / лок.",
    qrImage: "https://i.ibb.co/V9fPzYm/delivery-qr.jpg", // Твой QR код
    description: "Собственная служба доставки: запуск за 1 день, полная независимость от агрегаторов и экономия на комиссиях.",
    benefits: [
      { title: "Экономия на комиссиях", desc: "Заменяем 30% комиссии агрегаторов на фиксированную подписку.", icon: <TrendingUp size={20} /> },
      { title: "Умная логистика", desc: "Авто-подбор курьеров Яндекс, Wolt и Choco по лучшей цене в одном окне.", icon: <Zap size={20} /> }
    ],
    features: ["Интеграция с iiko / r_keeper", "Собственное веб-приложение", "Зоны доставки на карте", "Ваша база гостей"],
    results: [
      { label: "Комиссия", value: "0%", sub: "Никаких процентов" },
      { label: "Средний чек", value: "+16%", sub: "За счет апсейлов" },
      { label: "Запуск", value: "24ч", sub: "Быстрый старт" }
    ]
  },

  // --- МОБИЛЬНОЕ ПРИЛОЖЕНИЕ (p4) ---
  p4: {
    title: "Мобильное приложение",
    icon: <Smartphone size={40} className="text-[#1FCC59]" />,
    price: "от 420 000 ₸",
    qrUrl: "https://smart-app-demo.chocofood.kz",
    description: "Брендированное приложение в App Store и Google Play. Ваш личный канал продаж и база лояльных клиентов.",
    benefits: [
      { title: "LTV и возвратность", desc: "Собственная база клиентов, доступная для маркетинга 24/7.", icon: <Heart size={20} /> },
      { title: "Экономия на рассылках", desc: "Бесплатные Push-уведомления вместо платных SMS-рассылок.", icon: <Megaphone size={20} /> }
    ],
    features: ["Брендированный дизайн", "История заказов и профиль", "Трекинг статуса заказа", "Встроенная лояльность"],
    results: [
      { label: "Возвратность", value: "+40%", sub: "LTV клиентов" },
      { label: "Затраты", value: "0 ₸", sub: "На Push-маркетинг" },
      { label: "Статус", value: "Premium", sub: "Бренд в кармане" }
    ]
  },

  // --- ПРОГРАММА ЛОЯЛЬНОСТИ (p5) ---
  p5: {
    title: "Программа лояльности",
    icon: <Heart size={40} className="text-[#1FCC59]" />,
    price: "60 000 ₸",
    qrUrl: "https://loyalty-demo.chocofood.kz",
    description: "Цифровой кэшбэк и персональные предложения. Превратите случайного гостя в постоянного.",
    benefits: [
      { title: "Удержание гостей", desc: "Возвратность клиентов растет на 25% за счет накопления бонусов.", icon: <Zap size={20} /> },
      { title: "RFM-аналитика", desc: "Система сама подскажет, кто уходит, а кто ваш самый лояльный гость.", icon: <TrendingUp size={20} /> }
    ],
    features: ["Гибкий кэшбэк", "Реферальная система", "Авто-поздравления", "Анализ сегментов"],
    results: [
      { label: "Retention", value: "+25%", sub: "Возвратность" },
      { label: "База", value: "100%", sub: "Принадлежит вам" },
      { label: "Чек", value: "+12%", sub: "У лояльных гостей" }
    ]
  },

  // --- APP CLIP (p6) ---
  p6: {
    title: "App Clip",
    icon: <SmartphoneNfc size={40} className="text-[#1FCC59]" />,
    price: "35 000 ₸ / лок.",
    qrUrl: "https://app-clip-demo.chocofood.kz",
    description: "Цифровая замена пейджеру-оповещателю на смартфоне гостя. Работает без установки приложения.",
    benefits: [
      { title: "Удобство гостя", desc: "Гость получает уведомление о готовности заказа прямо на экран блокировки.", icon: <Zap size={20} /> },
      { title: "Экономия", desc: "Больше не нужно покупать и обслуживать физические пейджеры.", icon: <CreditCard size={20} /> }
    ],
    features: ["Мгновенный запуск", "NFC и QR поддержка", "Push-уведомления", "Интеграция с очередью"],
    results: [
      { label: "Затраты", value: "min", sub: "На оборудование" },
      { label: "Сервис", value: "Modern", sub: "Технологично" },
      { label: "Охват", value: "100%", sub: "Все смартфоны" }
    ]
  },

  // --- АВТОПОДТЯГИВАНИЕ СЧЕТА (p7) ---
  p7: {
    title: "Автоподтягивание счета",
    icon: <RefreshCcw size={40} className="text-[#1FCC59]" />,
    price: "60 000 ₸ / лок.",
    qrUrl: "https://auto-check-demo.chocofood.kz",
    description: "Оплата по QR-коду без участия персонала. Счет автоматически обновляется при добавлении блюд официантом.",
    benefits: [
      { title: "Скорость оплаты", desc: "Гость оплачивает счет в любую секунду, не дожидаясь официанта.", icon: <Clock size={20} /> },
      { title: "Точность", desc: "Сумма в QR всегда соответствует текущему заказу в кассовой системе.", icon: <CheckCircle2 size={20} /> }
    ],
    features: ["Синхронизация с iiko", "Kaspi QR интеграция", "Разделение чека", "Электронные фискальные чеки"],
    results: [
      { label: "Время оплаты", value: "-5 мин", sub: "Экономия на стол" },
      { label: "Лояльность", value: "High", sub: "Удобство оплаты" },
      { label: "Ошибки", value: "0", sub: "Человеческий фактор" }
    ]
  },

  // --- КИОСК (p8) ---
  p8: {
    title: "Киоск самообслуживания",
    icon: <Monitor size={40} className="text-[#1FCC59]" />,
    price: "60 000 ₸ / ед.",
    qrUrl: "https://kiosk-demo.chocofood.kz",
    description: "Профессиональные терминалы самообслуживания (ПО). Самый эффективный способ поднять средний чек.",
    benefits: [
      { title: "Замена персонала", desc: "Киоск работает 24/7, не болеет и всегда предлагает допы к заказу.", icon: <UserCheck size={20} /> },
      { title: "Максимальный Upsell", desc: "Красивое меню на большом экране повышает чек на 20% и более.", icon: <TrendingUp size={20} /> }
    ],
    features: ["Сенсорный экран", "Интеграция с кассой", "Визуальное меню", "Kaspi QR оплата"],
    results: [
      { label: "Средний чек", value: "+20%", sub: "Визуальный эффект" },
      { label: "Персонал", value: "-1чел", sub: "На смене" },
      { label: "Ошибки", value: "0", sub: "Точность заказа" }
    ]
  },

  // --- GUEST 360 (p9) ---
  p9: {
    title: "Guest 360 (Smart Аналитика)",
    icon: <FileSearch size={40} className="text-[#1FCC59]" />,
    price: "64 000 ₸ / сеть.",
    qrUrl: "https://analytics-demo.chocofood.kz",
    description: "Глубокая аналитика чеков, поведения гостей и отзывов. Позволяет принимать решения на основе данных.",
    benefits: [
      { title: "Понимание аудитории", desc: "Вы точно знаете, кто ваш гость, что он заказывает и как часто возвращается.", icon: <TrendingUp size={20} /> },
      { title: "Контроль качества", desc: "Сбор и анализ отзывов в реальном времени для улучшения сервиса.", icon: <ShieldCheck size={20} /> }
    ],
    features: ["Анализ чеков", "LTV отчеты", "Управление отзывами", "Маркетинговые воронки"],
    results: [
      { label: "Данные", value: "100%", sub: "Прозрачность" },
      { label: "Решения", value: "Data", sub: "Вместо интуиции" },
      { label: "Прибыль", value: "Up", sub: "За счет точности" }
    ]
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const data = PRODUCTS_DATABASE[productId];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9]">
        <h2 className="text-xl font-bold text-gray-400 mb-4 uppercase tracking-widest">Продукт в наполнении...</h2>
        <button onClick={() => navigate(-1)} className="text-[#1FCC59] font-black border-b-2 border-[#1FCC59]">Вернуться назад</button>
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
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-[#E8F9EE] rounded-2xl">
                  {data.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-black text-[#1A1D23] leading-none">{data.title}</h1>
                  <p className="text-[#1FCC59] font-bold mt-2 text-xl">{data.price}</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-500 leading-relaxed mb-10">{data.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.benefits.map((b, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-[24px] border border-gray-100">
                    <div className="flex items-center gap-3 mb-3 text-[#1FCC59]">
                      {b.icon}
                      <h3 className="font-black text-sm uppercase tracking-wide text-[#1A1D23]">{b.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1D23] rounded-[32px] p-10 text-white shadow-xl">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-[#1FCC59]" size={20} /> Технические возможности:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#1FCC59] rounded-full" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Пример работы</h3>
              <div className="p-3 bg-white rounded-2xl mb-6 shadow-md border border-gray-50">
                <img 
                  src={data.qrImage || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrUrl || '')}`} 
                  alt="QR" 
                  className="w-44 h-44 object-contain rounded-lg" 
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-tight leading-tight">
                Наведите камеру смартфона, <br /> чтобы увидеть демо
              </p>
            </div>

            <div className="bg-[#1FCC59] rounded-[32px] p-8 text-white shadow-xl shadow-[#1FCC59]/20">
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 opacity-80">Результат внедрения</h3>
              <div className="space-y-8">
                {data.results.map((r, i) => (
                  <div key={i} className="border-b border-white/20 pb-4 last:border-0">
                    <div className="text-4xl font-black">{r.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mt-1 leading-none">{r.label}</div>
                    <div className="text-[10px] opacity-60 italic mt-1">{r.sub}</div>
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
