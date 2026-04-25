// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, CheckCircle2, MousePointer2, UtensilsCrossed, 
  Truck, Smartphone, Heart, SmartphoneNfc, RefreshCcw, 
  Monitor, FileSearch 
} from 'lucide-react';

// Внутренняя база данных (соответствует твоим PRODUCTS из data/products)
const PRODUCT_INFO = {
  "p1": { title: "Заказ «Без кассира»", price: "84 000 ₸", icon: <MousePointer2 size={40}/>, desc: "Быстрый процесс заказа через терминалы или QR без очередей. Идеально для фаст-фуда.", benefits: ["Ускорение очереди на 20%", "Автоматические допродажи"], res: "+16%" },
  "p2": { title: "Заказ «Без официанта»", price: "120 000 ₸", icon: <UtensilsCrossed size={40}/>, desc: "Мгновенный заказ со стола и полная оцифровка каждого гостя.", benefits: ["Освобождение персонала", "Электронное меню с фото"], res: "+25%" },
  "p3": { title: "SR Delivery", price: "60 000 ₸", icon: <Truck size={40}/>, desc: "Собственная служба доставки с автоматизацией логистики.", benefits: ["Экономия на комиссиях агрегаторов", "Собственная база клиентов"], res: "0%" },
  "p4": { title: "Мобильное приложение", price: "От 420 000 ₸", icon: <Smartphone size={40}/>, desc: "Ваше собственное брендированное приложение в App Store и Google Play.", benefits: ["Прямая связь через Push", "Повторные продажи"], res: "+40%" },
  "p5": { title: "Программа лояльности", price: "60 000 ₸", icon: <Heart size={40}/>, desc: "Цифровой кэшбэк и персональные предложения для гостей.", benefits: ["Автоматизация маркетинга", "RFM-аналитика базы"], res: "+25%" },
  "p6": { title: "App Clip", price: "35 000 ₸", icon: <SmartphoneNfc size={40}/>, desc: "Цифровая замена физическому пейджеру-оповещателю.", benefits: ["Работает без установки", "Уведомление о готовности"], res: "Modern" },
  "p7": { title: "Автоподтягивание счета", price: "60 000 ₸", icon: <RefreshCcw size={40}/>, desc: "Оплата по QR-коду без участия официанта напрямую из iiko.", benefits: ["Мгновенное обновление счета", "Интеграция с Kaspi QR"], res: "-5 мин" },
  "p8": { title: "Киоск самообслуживания", price: "60 000 ₸", icon: <Monitor size={40}/>, desc: "Профессиональные терминалы для приема заказов и оплаты.", benefits: ["Заменяет кассира 24/7", "Красивое визуальное меню"], res: "+20%" },
  "p9": { title: "Guest 360", price: "64 000 ₸", icon: <FileSearch size={40}/>, desc: "Глубокая аналитика чеков и поведения ваших гостей.", benefits: ["Контроль качества сервиса", "Данные для решений"], res: "100%" }
};

export function ProductDetailPage() {
  // productId — это то, что мы указали в App.tsx
  const { productId } = useParams();
  const navigate = useNavigate();

  // Находим данные. Если ID в PRODUCTS — это просто "p1", "p2", то поиск сработает идеально
  const product = PRODUCT_INFO[productId];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4 font-bold uppercase tracking-widest">Продукт не найден (ID: {productId})</p>
        <button onClick={() => navigate('/products')} className="text-[#1FCC59] font-black border-b-2 border-[#1FCC59]">Вернуться к списку</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-[#2D3139] pb-10">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest mb-10 hover:text-[#1FCC59] transition-all">
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
            
            <div className="bg-[#1FCC59] text-white p-8 rounded-[35px] text-center min-w-[160px] shadow-xl shadow-[#1FCC59]/20">
              <div className="text-4xl font-black">{product.res}</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1 font-sans">Эффект</div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed mb-12">
            {product.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                <CheckCircle2 className="text-[#1FCC59] shrink-0" size={24} strokeWidth={3} />
                <span className="font-bold text-gray-700 leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
