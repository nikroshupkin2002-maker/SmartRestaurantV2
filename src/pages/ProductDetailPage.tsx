// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  Clock, UtensilsCrossed, Smartphone, CheckCircle2, 
  Heart, Monitor, Megaphone, CreditCard, UserCheck, 
  SmartphoneNfc, FileSearch, RefreshCcw 
} from 'lucide-react';

/**
 * БАЗА ДАННЫХ ПРОДУКТОВ
 * Здесь собрано всё: цены из твоих скриншотов и описания.
 * Никаких внешних запросов, всё «зашито» внутри.
 */
const DATA = {
  p1: {
    title: "Заказ «Без кассира»",
    price: "84 000 ₸ / лок.",
    icon: <MousePointer2 size={40} className="text-[#1FCC59]" />,
    desc: "Быстрый процесс заказа через терминалы или QR без очередей.",
    benefits: ["Ускорение очереди на 20%", "Авто-предложение допов (Upsell)"],
    results: { val: "+16%", label: "Средний чек" }
  },
  p2: {
    title: "Заказ «Без официанта»",
    price: "120 000 ₸ / лок.",
    icon: <UtensilsCrossed size={40} className="text-[#1FCC59]" />,
    desc: "Мгновенный заказ со стола и полная оцифровка каждого гостя.",
    benefits: ["Освобождение персонала от приема заказов", "Электронное меню с фото"],
    results: { val: "+25%", label: "Оборачиваемость" }
  },
  p3: {
    title: "SR Delivery",
    price: "60 000 ₸ / лок.",
    icon: <Truck size={40} className="text-[#1FCC59]" />,
    desc: "Собственная служба доставки с автоматизацией логистики.",
    benefits: ["Экономия на комиссиях агрегаторов", "Собственная база клиентов"],
    results: { val: "0%", label: "Комиссия" }
  },
  p4: {
    title: "Мобильное приложение",
    price: "От 420 000 ₸",
    icon: <Smartphone size={40} className="text-[#1FCC59]" />,
    desc: "Брендированное приложение в App Store и Google Play.",
    benefits: ["Прямая связь через Push-уведомления", "Повторные продажи"],
    results: { val: "+40%", label: "Возвратность" }
  },
  p5: {
    title: "Программа лояльности",
    price: "60 000 ₸",
    icon: <Heart size={40} className="text-[#1FCC59]" />,
    desc: "Цифровой кэшбэк и персональные предложения для гостей.",
    benefits: ["Автоматизация маркетинга", "RFM-аналитика базы"],
    results: { val: "+25%", label: "Retention" }
  },
  p6: {
    title: "App Clip",
    price: "35 000 ₸ / лок.",
    icon: <SmartphoneNfc size={40} className="text-[#1FCC59]" />,
    desc: "Цифровая замена пейджеру-оповещателю на смартфоне.",
    benefits: ["Работает без установки приложения", "Уведомление о готовности"],
    results: { val: "Modern", label: "Сервис" }
  },
  p7: {
    title: "Автоподтягивание счета",
    price: "60 000 ₸ / лок.",
    icon: <RefreshCcw size={40} className="text-[#1FCC59]" />,
    desc: "Оплата по QR-коду без участия официанта.",
    benefits: ["Мгновенное обновление счета", "Kaspi QR интеграция"],
    results: { val: "-5 мин", label: "Время оплаты" }
  },
  p8: {
    title: "Киоск самообслуживания",
    price: "60 000 ₸ / ед.",
    icon: <Monitor size={40} className="text-[#1FCC59]" />,
    desc: "Профессиональные терминалы для приема заказов.",
    benefits: ["Заменяет кассира 24/7", "Красивое визуальное меню"],
    results: { val: "+20%", label: "Средний чек" }
  },
  p9: {
    title: "Guest 360 (Smart Аналитика)",
    price: "64 000 ₸ / сеть",
    icon: <FileSearch size={40} className="text-[#1FCC59]" />,
    desc: "Глубокая аналитика чеков и поведения гостей.",
    benefits: ["Контроль качества сервиса", "Данные для принятия решений"],
    results: { val: "100%", label: "Прозрачность" }
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Пытаемся найти продукт. Если ID пришел как "1", превращаем его в "p1"
  const cleanId = productId?.startsWith('p') ? productId : `p${productId}`;
  const product = DATA[cleanId];

  // Если вдруг ID совсем странный, показываем ошибку вместо пустоты
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Продукт не найден</h2>
          <button onClick={() => navigate(-1)} className="text-[#1FCC59] font-bold">Вернуться</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#2D3139] pb-10">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest mb-10">
          <ChevronLeft size={16} /> Назад
        </button>

        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-[#E8F9EE] rounded-[24px]">
                {product.icon}
              </div>
              <div>
                <h1 className="text-4xl font-black text-[#1A1D23]">{product.title}</h1>
                <p className="text-[#1FCC59] font-bold text-xl mt-1">{product.price}</p>
              </div>
            </div>
            
            <div className="bg-[#1FCC59] text-white p-6 rounded-[30px] text-center min-w-[160px]">
              <div className="text-3xl font-black">{product.results.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">{product.results.label}</div>
            </div>
          </div>

          <p className="text-2xl text-gray-400 leading-relaxed mb-12">
            {product.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((text, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-[24px] border border-gray-100">
                <CheckCircle2 className="text-[#1FCC59] shrink-0" size={24} />
                <span className="font-bold text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Хотите узнать подробнее о внедрении в вашу сеть? Свяжитесь с нами.
          </p>
        </div>
      </div>
    </div>
  );
}
