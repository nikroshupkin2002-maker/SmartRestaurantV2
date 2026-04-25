// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Truck, MousePointer2, Zap, TrendingUp, 
  Clock, UtensilsCrossed, Smartphone, CheckCircle2, 
  Heart, Monitor, FileSearch, RefreshCcw, SmartphoneNfc 
} from 'lucide-react';

const DATA = {
  "1": {
    title: "Заказ «Без кассира»",
    price: "84 000 ₸ / лок.",
    icon: <MousePointer2 size={40} />,
    desc: "Быстрый процесс заказа через терминалы или QR без очередей.",
    benefits: ["Ускорение очереди на 20%", "Авто-предложение допов (Upsell)"],
    results: { val: "+16%", label: "Средний чек" }
  },
  "2": {
    title: "Заказ «Без официанта»",
    price: "120 000 ₸ / лок.",
    icon: <UtensilsCrossed size={40} />,
    desc: "Мгновенный заказ со стола и полная оцифровка каждого гостя.",
    benefits: ["Освобождение персонала", "Электронное меню"],
    results: { val: "+25%", label: "Оборачиваемость" }
  },
  "3": {
    title: "SR Delivery",
    price: "60 000 ₸ / лок.",
    icon: <Truck size={40} />,
    desc: "Собственная служба доставки с автоматизацией логистики.",
    benefits: ["Экономия на комиссиях", "Собственная база клиентов"],
    results: { val: "0%", label: "Комиссия" }
  },
  "4": {
    title: "Мобильное приложение",
    price: "От 420 000 ₸",
    icon: <Smartphone size={40} />,
    desc: "Ваше собственное приложение в сторах. Прямой доступ к клиенту 24/7.",
    benefits: ["Бесплатные Push-уведомления", "Рост повторных продаж"],
    results: { val: "+40%", label: "Возвратность" }
  },
  "5": {
    title: "Программа лояльности",
    price: "60 000 ₸",
    icon: <Heart size={40} />,
    desc: "Цифровой кэшбэк и персональные акции.",
    benefits: ["Автоматизация маркетинга", "RFM-аналитика"],
    results: { val: "+25%", label: "Retention" }
  },
  "6": {
    title: "App Clip",
    price: "35 000 ₸ / лок.",
    icon: <SmartphoneNfc size={40} />,
    desc: "Замена физическим пейджерам на смартфонах гостей.",
    benefits: ["Без установки приложения", "Уведомление на экран"],
    results: { val: "Modern", label: "Сервис" }
  },
  "7": {
    title: "Автоподтягивание счета",
    price: "60 000 ₸ / лок.",
    icon: <RefreshCcw size={40} />,
    desc: "Автоматическая синхронизация счета с QR-кодом.",
    benefits: ["Оплата без официанта", "Интеграция с Kaspi QR"],
    results: { val: "-5 мин", label: "Время оплаты" }
  },
  "8": {
    title: "Киоск самообслуживания",
    price: "60 000 ₸ / ед.",
    icon: <Monitor size={40} />,
    desc: "Интерактивный терминал для заказа и оплаты.",
    benefits: ["Работает 24/7", "Максимальный чек"],
    results: { val: "+20%", label: "Средний чек" }
  },
  "9": {
    title: "Guest 360",
    price: "64 000 ₸ / сеть",
    icon: <FileSearch size={40} />,
    desc: "Единая панель управления данными о гостях.",
    benefits: ["Аналитика чеков", "Сбор обратной связи"],
    results: { val: "100%", label: "Прозрачность" }
  }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Очищаем ID (убираем префикс 'p', если он есть)
  const id = productId ? productId.replace('p', '') : "";
  const product = DATA[id];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">ID: {productId} (Чистый: {id}) не найден</p>
        <button onClick={() => navigate('/')} className="text-[#1FCC59] font-bold underline">
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#2D3139] pb-10">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10">
          <ChevronLeft size={16} /> Назад
        </button>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
              <div className="p-6 bg-[#E8F9EE] rounded-[28px] text-[#1FCC59]">
                {product.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-[#1A1D23] leading-tight">{product.title}</h1>
                <p className="text-[#1FCC59] font-black text-2xl mt-2">{product.price}</p>
              </div>
            </div>
            <div className="bg-[#1FCC59] text-white p-8 rounded-[35px] text-center min-w-[180px]">
              <div className="text-4xl font-black">{product.results.val}</div>
              <div className="text-[11px] font-black uppercase tracking-widest opacity-80 mt-1">{product.results.label}</div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12">{product.desc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                <CheckCircle2 className="text-[#1FCC59]" size={24} />
                <span className="font-bold text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
