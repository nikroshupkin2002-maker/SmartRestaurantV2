// @ts-nocheck
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, RefreshCcw, 
  Smartphone, CreditCard, Star, Zap, Truck, 
  MousePointer2, UtensilsCrossed, Heart, SmartphoneNfc, Monitor, FileSearch,
  Users, TrendingDown, Box, Clock, BarChart3
} from 'lucide-react';

const PRODUCT_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"];

const PRODUCT_INFO = {
  "p1": { 
    isDetailed: true,
    title: "Заказ «Без кассира»", 
    price: "84 000 ₸", 
    icon: <MousePointer2 size={40}/>, 
    desc: "Система позволяет гостю самостоятельно оформить и оплатить заказ через смартфон, полностью исключая ожидание в очереди у кассы.",
    benefits: [
      { title: "Отсутствие очередей", text: "Весь процесс выбора и оплаты происходит в телефоне гостя, разгружая кассовую зону.", icon: <Users className="text-blue-400" /> },
      { title: "Рост среднего чека", text: "Умная система рекомендаций предлагает доп. товары, которые кассир может забыть озвучить.", icon: <TrendingDown className="text-green-400" /> },
      { title: "Анализ предпочтений", text: "Прозрачная статистика по популярным позициям и поведению ваших клиентов.", icon: <BarChart3 className="text-purple-400" /> }
    ],
    res: "+16%", resLabel: "Рост среднего чека",
    images: [
      { url: "/assets/basilic_1.jpg", desc: "Электронное меню" },
      { url: "/assets/basilic_2.jpg", desc: "Корзина заказа" },
      { url: "/assets/basilic_3.jpg", desc: "Быстрая оплата" }
    ],
    qrImage: { url: "/assets/basilic_qr.png", desc: "Тест-драйв заказа «Без кассира»" }
  },
  "p2": { 
    isDetailed: true,
    title: "Заказ «Без официанта»", 
    price: "120 000 ₸", 
    icon: <UtensilsCrossed size={40}/>, 
    desc: "Оцифруйте каждый стол. Гости сами делают заказы и дозаказы через QR-меню, не дожидаясь персонала.",
    benefits: [
      { title: "Минус 15 минут", text: "Среднее время обслуживания сокращается за счет мгновенного получения заказа кухней.", icon: <Clock className="text-orange-400" /> },
      { title: "Оборачиваемость столов", text: "Столы освобождаются на 30% быстрее, позволяя принимать больше гостей.", icon: <TrendingDown className="text-green-400" /> },
      { title: "Оцифровка каждого гостя", text: "Вы собираете базу данных и контакты даже тех, кто пришел к вам впервые.", icon: <Users className="text-blue-400" /> }
    ],
    res: "+30%", resLabel: "Оборачиваемость столов",
    images: [
      { url: "/assets/basilic_1.jpg", desc: "Меню за столом" },
      { url: "/assets/basilic_2.jpg", desc: "Мгновенный дозаказ" },
      { url: "/assets/basilic_3.jpg", desc: "Разделение счета" }
    ],
    qrImage: { url: "/assets/basilic_qr.png", desc: "Тест-драйв заказа «Без официанта»" }
  },
  "p3": { 
    isDetailed: true,
    title: "SR Delivery", price: "60 000 ₸", icon: <Truck size={40}/>, 
    desc: "Агрегатор курьерских служб в одном окне. Экономьте на комиссиях и управляйте своей доставкой эффективно.",
    benefits: [
      { title: "Агрегатор служб", text: "Яндекс, Wolt Drive и Choco в едином интерфейсе.", icon: <Box className="text-orange-400" /> },
      { title: "Умный подбор", text: "Выбор самого дешевого и быстрого курьера в моменте.", icon: <Zap className="text-yellow-400" /> },
      { title: "Своя база", text: "Данные клиентов принадлежат вам, а не агрегаторам.", icon: <Users className="text-blue-400" /> }
    ],
    res: "0%", resLabel: "Комиссия сервису",
    images: [
      { url: "/assets/delivery_1.jpg", desc: "Меню доставки" },
      { url: "/assets/delivery_2.jpg", desc: "Оформление заказа" },
      { url: "/assets/delivery_3.jpg", desc: "Статус курьера" }
    ],
    qrImage: { url: "/assets/delivery_qr.png", desc: "Тест-драйв доставки" }
  },
  "p7": { 
    isDetailed: true,
    title: "Автоподтягивание счета", price: "60 000 ₸", icon: <RefreshCcw size={40}/>, 
    desc: "Гость оплачивает счет по QR в чеке. Официанту больше не нужно носить терминал.",
    benefits: [
      { title: "Оплата в 2 клика", text: "Интеграция с Kaspi и Apple Pay.", icon: <Zap className="text-yellow-400" /> },
      { title: "Авто-закрытие стола", text: "Синхронизация с iiko/r-keeper.", icon: <RefreshCcw className="text-green-400" /> }
    ],
    res: "-15 мин", resLabel: "Экономия времени",
    images: [
      { url: "/assets/bill_1.jpg", desc: "Детализация счета" },
      { url: "/assets/pay_2.jpg", desc: "Выбор оплаты" }
    ],
    qrImage: { url: "/assets/qr_3.png", desc: "Тест-драйв оплаты" }
  },
  // Остальные продукты (p4, p5, p6, p8, p9) добавлены в базовом виде для краткости примера
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

  // Логика перелистывания
  const currentIndex = PRODUCT_KEYS.indexOf(productId);
  const prevProduct = PRODUCT_KEYS[currentIndex - 1];
  const nextProduct = PRODUCT_KEYS[currentIndex + 1];

  if (!product) return <div className="p-20 text-center font-black">Продукт не найден</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pb-40">
      {/* Навигация сверху */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] font-bold text-xs uppercase tracking-widest">
            <ChevronLeft size={18} /> К списку
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-black">SR</div>
            <span className="font-black tracking-tight uppercase">Smart Restaurant</span>
          </div>
          <div className="w-20"></div> {/* Заглушка для центровки */}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {product.isDetailed ? (
          <>
            {/* Hero Section */}
            <section className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-blue-900/5 border border-gray-50 mb-12 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-green-50 text-[#1FCC59] px-5 py-2 rounded-full mb-8 font-bold text-xs uppercase">
                     <Star size={14} fill="currentColor" /> Решение {productId.toUpperCase()}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter uppercase">{product.title}</h1>
                  <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">{product.desc}</p>
                </div>
                <div className="bg-[#1FCC59] text-white p-12 rounded-[56px] text-center min-w-[280px] shadow-2xl shadow-[#1FCC59]/30">
                  <div className="text-7xl font-black mb-2 tracking-tighter">{product.res}</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-90">{product.resLabel}</div>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.benefits.map((item, i) => (
                <div key={i} className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6">
                  <div className="p-4 bg-gray-50 rounded-2xl w-fit">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Screenshots */}
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {product.images.map((img, i) => (
                  <div key={i}>
                    <div className="rounded-[40px] overflow-hidden shadow-2xl mb-6 border border-gray-100">
                      <img src={img.url} alt="" className="w-full h-auto" />
                    </div>
                    <p className="text-center font-black uppercase tracking-tight text-gray-400">{img.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* QR Section */}
            {product.qrImage && (
              <section className="mb-24">
                <div className="bg-white rounded-[48px] p-12 border-4 border-[#1FCC59] flex flex-col md:flex-row items-center gap-12">
                  <img src={product.qrImage.url} alt="QR" className="w-48 h-48 rounded-3xl" />
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black mb-4 uppercase">{product.qrImage.desc}</h2>
                    <p className="text-gray-500 font-bold">Наведите камеру, чтобы протестировать решение в реальном времени.</p>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Стандартный дизайн для недоделанных страниц */
          <div className="bg-white rounded-[48px] p-20 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-8 text-[#1FCC59]">{product.icon}</div>
            <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">{product.title}</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-10">{product.desc}</p>
            <div className="text-4xl font-black text-[#1FCC59] mb-10">{product.price}</div>
          </div>
        )}

        {/* НИЖНЯЯ ПАНЕЛЬ ПЕРЕКЛЮЧЕНИЯ */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl p-4 rounded-[32px] flex items-center gap-8 shadow-2xl z-[100] border border-white/10">
          <button 
            disabled={!prevProduct}
            onClick={() => navigate(`/product/${prevProduct}`)}
            className={`p-4 rounded-2xl transition-all ${prevProduct ? 'text-white hover:bg-white/10' : 'text-gray-600 cursor-not-allowed'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="h-8 w-px bg-white/20"></div>
          
          <div className="text-white font-black text-sm uppercase tracking-widest px-4">
            {currentIndex + 1} <span className="text-gray-500">/ {PRODUCT_KEYS.length}</span>
          </div>

          <div className="h-8 w-px bg-white/20"></div>

          <button 
            disabled={!nextProduct}
            onClick={() => navigate(`/product/${nextProduct}`)}
            className={`p-4 rounded-2xl transition-all ${nextProduct ? 'text-white hover:bg-white/10' : 'text-gray-600 cursor-not-allowed'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </main>
    </div>
  );
}
