// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CheckCircle2, RefreshCcw, 
  Smartphone, CreditCard, Star, Zap, ScanQrCode,
  MousePointer2, UtensilsCrossed, Truck, Heart, SmartphoneNfc, Monitor, FileSearch,
  Users, TrendingDown, Box
} from 'lucide-react';

const PRODUCT_INFO = {
  // ПРОДУКТ №3: SR DELIVERY (НОВЫЙ ДИЗАЙН)
  "p3": { 
    isDetailed: true,
    title: "SR Delivery", 
    price: "60 000 ₸", 
    icon: <Truck size={40}/>, 
    desc: "Забудьте о высоких комиссиях сторонних сервисов. Мы объединяем все службы доставки в одном окне, позволяя вам экономить на каждом заказе и сохранять прямой контакт с вашим клиентом.",
    benefits: [
      { title: "Агрегатор служб", text: "Мгновенная интеграция с Яндекс Доставка, Wolt Drive и Choco Доставка в одном интерфейсе.", icon: <Box className="text-orange-400" /> },
      { title: "Умный подбор курьера", text: "Алгоритм в реальном времени выбирает самый выгодный и быстрый тариф среди всех служб.", icon: <Zap className="text-yellow-400" /> },
      { title: "Экономия на комиссиях", text: "Переводите заказы в свой канал и экономьте до 30% с каждого чека, увеличивая чистую прибыль.", icon: <TrendingDown className="text-green-400" /> },
      { title: "Сохранение базы", text: "Все данные о заказчиках остаются у вас для повторных продаж и аналитики.", icon: <Users className="text-blue-400" /> },
      { title: "Полная синхронизация", text: "Автоматическая отправка заказов в iiko/r-keeper без участия оператора.", icon: <RefreshCcw className="text-purple-400" /> }
    ],
    res: "0%",
    resLabel: "Комиссия сервису",
    images: [
      { url: "/assets/delivery_1.jpg", desc: "Брендированное меню" },
      { url: "/assets/delivery_2.jpg", desc: "Прозрачная корзина" },
      { url: "/assets/delivery_3.jpg", desc: "Удобная оплата" }
    ],
    qrImage: { url: "/assets/delivery_qr.png", desc: "Отсканируйте этот QR, чтобы увидеть реальную работу доставки" }
  },

  // ПРОДУКТ №7: АВТОПОДТЯГИВАНИЕ (УЖЕ СДЕЛАННЫЙ)
  "p7": { 
    isDetailed: true,
    title: "Автоподтягивание счета", 
    price: "60 000 ₸", 
    icon: <RefreshCcw size={40}/>, 
    desc: "Освободите официантов от рутины с ношением терминала пречека — гость платит сам по QR-коду в чеке за 1 минуту.",
    benefits: [
      { title: "Мгновенная оплата", text: "Гостю достаточно отсканировать QR в чеке и оплатить заказ в 2 клика.", icon: <Zap className="text-yellow-400" /> },
      { title: "Детализация", text: "Прозрачный интерфейс — гость видит все позиции и сумму обслуживания.", icon: <Smartphone className="text-blue-400" /> },
      { title: "Любые способы", text: "Интеграция с Kaspi.kz, Apple Pay, Google Pay и картами.", icon: <CreditCard className="text-purple-400" /> }
    ],
    res: "-15 мин",
    resLabel: "Экономия времени",
    images: [
      { url: "/assets/bill_1.jpg", desc: "Просмотр счета" },
      { url: "/assets/pay_2.jpg", desc: "Выбор оплаты" }
    ],
    qrImage: { url: "/assets/qr_3.png", desc: "Отсканируйте этот QR, чтобы увидеть реальную работу продукта" }
  },

  // ОСТАЛЬНЫЕ (СТАНДАРТНЫЙ ВИД)
  "p1": { title: "Заказ «Без кассира»", price: "84 000 ₸", icon: <MousePointer2 />, desc: "Автоматизация кассовой зоны.", benefits: ["Нет очередей", "Рост чека"], res: "+16%" },
  "p2": { title: "Заказ «Без официанта»", price: "120 000 ₸", icon: <UtensilsCrossed />, desc: "QR-заказы со столов.", benefits: ["Меньше штата", "Быстрый оборот"], res: "+25%" },
  "p4": { title: "Мобильное приложение", price: "420 000 ₸", icon: <Smartphone />, desc: "Свой бренд в App Store.", benefits: ["Push-уведомления", "Лояльность"], res: "+40%" },
  "p5": { title: "Программа лояльности", price: "60 000 ₸", icon: <Heart />, desc: "Бонусы и кэшбэк.", benefits: ["Возвратность", "RFM-анализ"], res: "+25%" },
  "p6": { title: "App Clip", price: "35 000 ₸", icon: <SmartphoneNfc />, desc: "Замена пейджерам.", benefits: ["Без установки", "Скорость"], res: "Modern" },
  "p8": { title: "Киоск самообслуживания", price: "60 000 ₸", icon: <Monitor />, desc: "Терминалы заказа.", benefits: ["Работа 24/7", "Визуал"], res: "+20%" },
  "p9": { title: "Guest 360", price: "64 000 ₸", icon: <FileSearch />, desc: "Аналитика гостей.", benefits: ["Все чеки", "Отзывы"], res: "100%" }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCT_INFO[productId];

  if (!product) return <div className="p-20 text-center font-black uppercase tracking-widest">Продукт не найден</div>;

  if (product.isDetailed) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pb-32">
        {/* Навигация */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] transition-all font-bold text-xs uppercase tracking-widest">
              <ChevronLeft size={18} /> Вернуться назад
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-black">SR</div>
              <span className="font-black tracking-tight">Smart Restaurant</span>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 pt-12">
          {/* Hero */}
          <section className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-blue-900/5 border border-gray-50 mb-12">
            <div className="flex flex-col lg:flex-row gap-12 items-start text-left">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-green-50 text-[#1FCC59] px-5 py-2 rounded-full mb-8 font-bold text-xs uppercase tracking-wider">
                  <Star size={14} fill="currentColor" /> Решение Smart Restaurant
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter uppercase">
                  {product.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">{product.desc}</p>
              </div>
              <div className="bg-[#1FCC59] text-white p-12 rounded-[56px] text-center min-w-[280px] shadow-2xl shadow-[#1FCC59]/30">
                <div className="text-7xl font-black mb-2 tracking-tighter">{product.res}</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-90">{product.resLabel}</div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.benefits.map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm flex gap-6 items-start">
                <div className="p-4 bg-gray-50 rounded-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Визуал (3 фото в ряд) */}
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-black mb-12 tracking-tight uppercase">Интерфейс решения</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.images.map((img, i) => (
                <div key={i} className="group">
                  <div className="relative rounded-[40px] overflow-hidden shadow-2xl mb-6 transition-transform group-hover:scale-[1.02]">
                    <img src={img.url} alt="" className="w-full h-auto object-cover" />
                  </div>
                  <p className="text-gray-900 font-black text-lg tracking-tight">{img.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* QR Блок (Отдельно ниже) */}
          {product.qrImage && (
            <section className="mb-24">
              <div className="bg-white rounded-[48px] p-12 border-4 border-[#1FCC59] flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-green-900/10">
                <div className="w-full md:w-1/3">
                  <img src={product.qrImage.url} alt="QR" className="w-full h-auto rounded-3xl" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="bg-green-50 text-[#1FCC59] inline-block px-4 py-1 rounded-full text-xs font-black uppercase mb-4">Живой тест-драйв</div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase">{product.qrImage.desc}</h2>
                  <p className="text-gray-500 font-bold text-lg italic">Наведите камеру смартфона, чтобы пройти путь вашего клиента прямо сейчас.</p>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-gray-900 rounded-[56px] p-12 md:p-20 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none uppercase">Добавить в предложение?</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <div className="text-3xl font-black text-[#1FCC59]">{product.price}</div>
               <button onClick={() => navigate('/products')} className="bg-[#1FCC59] hover:bg-[#1bb34e] text-white px-12 py-6 rounded-[28px] font-black text-xl transition-all">
                ВЫБРАТЬ ПРОДУКТ
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Стандартный дизайн для остальных
  return (
    <div className="min-h-screen bg-[#F4F7F9] p-12 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-[48px] p-16 shadow-sm border border-gray-100 text-center">
        <button onClick={() => navigate(-1)} className="mb-12 flex items-center gap-2 text-gray-300 hover:text-gray-900 transition-all font-black uppercase text-xs">
          <ChevronLeft size={16} /> Назад
        </button>
        <div className="flex justify-center mb-8">
           <div className="p-8 bg-gray-50 rounded-[40px] text-gray-900">{product.icon}</div>
        </div>
        <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">{product.title}</h1>
        <p className="text-2xl text-gray-400 font-medium mb-12">{product.desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {product.benefits.map((b, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-3xl flex items-center gap-4 font-bold border border-gray-100">
              <CheckCircle2 className="text-[#1FCC59]" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
