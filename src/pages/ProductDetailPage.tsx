// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CheckCircle2, RefreshCcw, 
  Smartphone, CreditCard, Star, Zap, ScanQrCode,
  MousePointer2, UtensilsCrossed, Truck, Heart, SmartphoneNfc, Monitor, FileSearch
} from 'lucide-react';

// ОБЩАЯ БАЗА ДАННЫХ
const PRODUCT_INFO = {
  "p1": { title: "Заказ «Без кассира»", price: "84 000 ₸", icon: <MousePointer2 />, desc: "Автоматизация кассовой зоны.", benefits: ["Нет очередей", "Рост чека"], res: "+16%" },
  "p2": { title: "Заказ «Без официанта»", price: "120 000 ₸", icon: <UtensilsCrossed />, desc: "QR-заказы со столов.", benefits: ["Меньше штата", "Быстрый оборот"], res: "+25%" },
  "p3": { title: "SR Delivery", price: "60 000 ₸", icon: <Truck />, desc: "Собственная доставка.", benefits: ["Без комиссий", "Своя база"], res: "0%" },
  "p4": { title: "Мобильное приложение", price: "420 000 ₸", icon: <Smartphone />, desc: "Свой бренд в App Store.", benefits: ["Push-уведомления", "Лояльность"], res: "+40%" },
  "p5": { title: "Программа лояльности", price: "60 000 ₸", icon: <Heart />, desc: "Бонусы и кэшбэк.", benefits: ["Возвратность", "RFM-анализ"], res: "+25%" },
  "p6": { title: "App Clip", price: "35 000 ₸", icon: <SmartphoneNfc />, desc: "Замена пейджерам.", benefits: ["Без установки", "Скорость"], res: "Modern" },
  
  // НАШ ПРОРАБОТАННЫЙ ПРОДУКТ №7
  "p7": { 
    isDetailed: true, // Флаг, что для этого продукта используем расширенный дизайн
    title: "Автоподтягивание счета", 
    price: "60 000 ₸", 
    icon: <RefreshCcw size={40}/>, 
    desc: "Решение для ресторанов с высокой посадкой, где важна оборачиваемость столов. Освободите официантов от рутины с ношением терминала пречека — гость платит сам по QR-коду в чеке за 1 минуту.",
    benefits: [
      { title: "Мгновенная оплата в 2 клика", text: "Гостю достаточно отсканировать QR в чеке, чтобы открыть счет и оплатить его.", icon: <Zap className="text-yellow-400" /> },
      { title: "Детализация в смартфоне", text: "Прозрачный интерфейс — гость видит все позиции, сумму обслуживания и итого к оплате в реальном времени.", icon: <Smartphone className="text-blue-400" /> },
      { title: "Любые способы оплаты", text: "Интеграция с Kaspi.kz, Apple Pay, Google Pay и банковскими картами.", icon: <CreditCard className="text-purple-400" /> },
      { title: "Автоматическое закрытие стола", text: "Прямая синхронизация с iiko/r-keeper — стол закрывается в кассе сразу после успешной оплаты.", icon: <RefreshCcw className="text-green-400" /> },
      { title: "Сбор обратной связи", text: "Возможность для гостя оставить оценку сервиса и отзыв сразу после оплаты.", icon: <Star className="text-orange-400" /> }
    ],
    res: "-15 мин",
    images: [
      { url: "/assets/bill_1.jpg", desc: "Гость видит детализацию заказа, сумму обслуживания и итоговую сумму." },
      { url: "/assets/pay_2.jpg", desc: "Удобный выбор метода: Kaspi, Apple Pay или карта." },
      { url: "/assets/qr_3.png", desc: "Отсканируйте этот QR, чтобы увидеть реальную работу продукта.", isQR: true }
    ]
  },

  "p8": { title: "Киоск самообслуживания", price: "60 000 ₸", icon: <Monitor />, desc: "Терминалы заказа.", benefits: ["Работа 24/7", "Визуал"], res: "+20%" },
  "p9": { title: "Guest 360", price: "64 000 ₸", icon: <FileSearch />, desc: "Аналитика гостей.", benefits: ["Все чеки", "Отзывы"], res: "100%" }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCT_INFO[productId];

  if (!product) return <div className="p-20 text-center font-bold">Продукт не найден</div>;

  // Если это продукт с расширенным описанием (как наш p7)
  if (product.isDetailed) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pb-32">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-all font-bold text-xs uppercase tracking-widest">
              <ChevronLeft size={18} /> Назад
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-black">SR</div>
              <span className="font-black tracking-tight">Smart Restaurant</span>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 pt-12">
          <section className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-blue-900/5 border border-gray-50 mb-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-green-50 text-[#1FCC59] px-5 py-2 rounded-full mb-8 font-bold text-xs uppercase tracking-wider uppercase">
                   <Zap size={14} fill="currentColor" /> Решение №7
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter">
                  {product.title.toUpperCase()}
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">{product.desc}</p>
              </div>
              <div className="bg-[#1FCC59] text-white p-12 rounded-[56px] text-center min-w-[280px] shadow-2xl shadow-[#1FCC59]/30">
                <div className="text-7xl font-black mb-2 tracking-tighter">{product.res}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-90">Экономия времени</div>
              </div>
            </div>
          </section>

          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.benefits.map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm flex gap-6 items-start">
                <div className="p-4 bg-gray-50 rounded-2xl">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.images.map((img, i) => (
              <div key={i} className="flex flex-col">
                <div className={`relative rounded-[40px] overflow-hidden shadow-2xl mb-6 ${img.isQR ? 'bg-white p-6 border-4 border-[#1FCC59]' : ''}`}>
                  <img src={img.url} alt="" className="w-full h-auto object-cover rounded-2xl" />
                </div>
                <p className="px-4 text-gray-900 font-black text-lg leading-tight">{img.desc}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    );
  }

  // ОБЫЧНЫЙ ДИЗАЙН ДЛЯ ОСТАЛЬНЫХ (как было раньше)
  return (
    <div className="min-h-screen bg-[#F4F7F9] p-12">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-400 font-bold uppercase text-xs">
        <ChevronLeft size={16} /> Назад
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-12 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="p-6 bg-[#E8F9EE] rounded-3xl text-[#1FCC59]">{product.icon}</div>
          <h1 className="text-4xl font-black">{product.title}</h1>
        </div>
        <p className="text-2xl text-gray-400 mb-10">{product.desc}</p>
        <div className="grid grid-cols-2 gap-4">
          {product.benefits.map((b, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl flex items-center gap-3 font-bold">
              <CheckCircle2 className="text-[#1FCC59]" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
