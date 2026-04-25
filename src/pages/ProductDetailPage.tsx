// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, MousePointer2, UtensilsCrossed, Truck, Smartphone, Heart, SmartphoneNfc, RefreshCcw, Monitor, FileSearch } from 'lucide-react';

// Эта база теперь внутри файла. Она никуда не денется.
const PRODUCT_DATA = {
  "p1": { title: "Заказ «Без кассира»", price: "84 000 ₸", icon: <MousePointer2 size={40}/>, desc: "Автоматизация кассовой зоны и устранение очередей.", benefits: ["Ускорение очереди на 20%", "Авто-апсейл допов"], res: "+16% чек" },
  "p2": { title: "Заказ «Без официанта»", price: "120 000 ₸", icon: <UtensilsCrossed size={40}/>, desc: "QR-меню и заказы прямо со стола гостя.", benefits: ["Оптимизация штата", "Визуальное меню"], res: "+25% оборот" },
  "p3": { title: "SR Delivery", price: "60 000 ₸", icon: <Truck size={40}/>, desc: "Управление собственной службой доставки.", benefits: ["0% комиссия агрегаторам", "Своя база гостей"], res: "Запуск 24ч" },
  "p4": { title: "Мобильное приложение", price: "420 000 ₸", icon: <Smartphone size={40}/>, desc: "Брендированное приложение в App Store и Google Play.", benefits: ["Бесплатные Push-уведомления", "Повторные продажи"], res: "+40% LTV" },
  "p5": { title: "Программа лояльности", price: "60 000 ₸", icon: <Heart size={40}/>, desc: "Система кэшбэка и мотивации возвращаться.", benefits: ["RFM-аналитика", "Авто-рассылки"], res: "+25% возврат" },
  "p6": { title: "App Clip", price: "35 000 ₸", icon: <SmartphoneNfc size={40}/>, desc: "Цифровая замена физическим пейджерам.", benefits: ["Без установки приложения", "Удобство для гостя"], res: "Modern" },
  "p7": { title: "Автоподтягивание счета", price: "60 000 ₸", icon: <RefreshCcw size={40}/>, desc: "Синхронизация кассы с QR-кодом оплаты.", benefits: ["Оплата без официанта", "Kaspi QR"], res: "-5 мин время" },
  "p8": { title: "Киоск самообслуживания", price: "60 000 ₸", icon: <Monitor size={40}/>, desc: "Терминал для самостоятельного заказа.", benefits: ["Работа 24/7", "Увеличение среднего чека"], res: "+20% чек" },
  "p9": { title: "Guest 360", price: "64 000 ₸", icon: <FileSearch size={40}/>, desc: "Глубокая аналитика и сбор отзывов.", benefits: ["Полная база чеков", "Контроль сервиса"], res: "100% данные" }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Ищем продукт. Если в ссылке p1, ищем p1. Если 1, превращаем в p1.
  const id = productId?.startsWith('p') ? productId : `p${productId}`;
  const product = PRODUCT_DATA[id];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-300 font-bold mb-4">ИНФОРМАЦИЯ НЕ НАЙДЕНА (ID: {productId})</p>
          <button onClick={() => navigate('/')} className="text-[#1FCC59] font-black uppercase tracking-widest text-xs border-b-2 border-[#1FCC59]">На главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#2D3139] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-12 hover:text-[#1FCC59] transition-all">
          <ChevronLeft size={16} strokeWidth={3} /> Вернуться
        </button>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
              <div className="p-6 bg-[#E8F9EE] rounded-[28px] text-[#1FCC59]">{product.icon}</div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-[#1A1D23] leading-tight">{product.title}</h1>
                <p className="text-[#1FCC59] font-black text-2xl mt-2">{product.price}</p>
              </div>
            </div>
            <div className="bg-[#1FCC59] text-white p-8 rounded-[35px] text-center min-w-[160px] shadow-lg shadow-[#1FCC59]/20">
              <div className="text-4xl font-black">{product.res}</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Результат</div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12">{product.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                <CheckCircle2 className="text-[#1FCC59] shrink-0" size={24} strokeWidth={3} />
                <span className="font-bold text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
