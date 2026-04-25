// @ts-nocheck
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, CheckCircle2, RefreshCcw, 
  Smartphone, CreditCard, Star, Zap, Truck, 
  MousePointer2, UtensilsCrossed, Heart, SmartphoneNfc, Monitor, FileSearch,
  Users, TrendingDown, Box, Clock, BarChart3
} from 'lucide-react';

// Строгий порядок ключей для корректной работы переключателя
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
    res: "+16%", resLabel: "Увеличение среднего чека",
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
      { title: "Оборачиваемость", text: "Столы освобождаются на 30% быстрее, позволяя принимать больше гостей.", icon: <TrendingDown className="text-green-400" /> },
      { title: "Оцифровка гостей", text: "Вы собираете базу данных и контакты каждого посетителя.", icon: <Users className="text-blue-400" /> }
    ],
    res: "+30%", resLabel: "К оборачиваемости столов",
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
      { url: "/assets/доставка1.jfif", desc: "Интерфейс выбора" },
      { url: "/assets/доставка2.jfif", desc: "Корзина доставки" },
      { url: "/assets/доставка3.jfif", desc: "Оплата" }
    ],
    qrImage: { url: "/assets/Доставка.png", desc: "Тест-драйв доставки" }
  },
  "p7": { 
    isDetailed: true,
    title: "Автоподтягивание счета", 
    price: "60 000 ₸", 
    icon: <RefreshCcw size={40}/>, 
    desc: "Технология автоматического формирования счета при сканировании QR-кода. Гость сам закрывает стол в один клик.",
    benefits: [
      { title: "Оплата в 2 клика", text: "Интеграция с Kaspi.kz, Apple Pay, Google Pay и картами.", icon: <CreditCard className="text-purple-400" /> },
      { title: "Авто-закрытие стола", text: "Мгновенная синхронизация с учетной системой iiko или r-keeper.", icon: <RefreshCcw className="text-green-400" /> }
    ],
    res: "-15 мин", resLabel: "При обслуживании гостя",
    images: [
      { url: "/assets/автоподтягивание 2.jfif", desc: "Детализация счета" },
      { url: "/assets/автоподтягивание 3.jfif", desc: "Выбор способа оплаты" }
    ],
    qrImage: { url: "/assets/Автоподтягивание.png", desc: "Тест-драйв оплаты по счету" }
  },
  "p4": { title: "Мобильное приложение", price: "420 000 ₸", icon: <Smartphone />, desc: "Ваш бренд в смартфонах гостей.", benefits: ["Push-уведомления", "Личный кабинет"], res: "+40%" },
  "p5": { title: "Программа лояльности", price: "60 000 ₸", icon: <Heart />, desc: "Бонусы, кэшбэк и RFM-анализ.", benefits: ["Возвратность гостей", "Акции"], res: "+25%" },
  "p6": { title: "App Clip", price: "35 000 ₸", icon: <SmartphoneNfc />, desc: "Замена пейджерам ожидания.", benefits: ["Без установки", "Скорость"], res: "Modern" },
  "p8": { title: "Киоск самообслуживания", price: "60 000 ₸", icon: <Monitor />, desc: "Автоматизация кассовой зоны.", benefits: ["Работа 24/7", "Красивый визуал"], res: "+20%" },
  "p9": { title: "Guest 360", price: "64 000 ₸", icon: <FileSearch />, desc: "Полная аналитика ваших гостей.", benefits: ["История чеков", "Отзывы"], res: "100%" }
};

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCT_INFO[productId];

  // Скролл вверх при смене продукта
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const currentIndex = PRODUCT_KEYS.indexOf(productId);
  const prevProduct = currentIndex > 0 ? PRODUCT_KEYS[currentIndex - 1] : null;
  const nextProduct = currentIndex < PRODUCT_KEYS.length - 1 ? PRODUCT_KEYS[currentIndex + 1] : null;

  if (!product) return <div className="p-20 text-center font-black">Продукт не найден</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] pb-40">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] font-bold text-xs uppercase tracking-widest transition-colors">
            <ChevronLeft size={18} /> К списку
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded-lg flex items-center justify-center text-white font-black">SR</div>
            <span className="font-black tracking-tight uppercase">Smart Restaurant</span>
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {product.isDetailed ? (
          <>
            <section className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl shadow-blue-900/5 border border-gray-50 mb-12">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1 text-left">
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

            <section className="mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.benefits.map((item, i) => (
                <div key={i} className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6 text-left">
                  <div className="p-4 bg-gray-50 rounded-2xl w-fit">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Секция скриншотов с центрированием */}
            <section className="mb-20">
              <div className={`flex flex-wrap justify-center gap-8`}>
                {product.images.map((img, i) => (
                  <div key={i} className="max-w-[320px] w-full">
                    <div className="rounded-[40px] overflow-hidden shadow-2xl mb-6 border border-gray-100 bg-gray-200 aspect-[9/19]">
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-black uppercase tracking-tight text-gray-400">{img.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {product.qrImage && (
              <section className="mb-24">
                <div className="bg-white rounded-[48px] p-12 border-4 border-[#1FCC59] flex flex-col md:flex-row items-center gap-12 shadow-inner">
                  <div className="w-48 h-48 bg-white p-2 rounded-3xl shrink-0">
                    <img src={product.qrImage.url} alt="QR" className="w-full h-full" />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black mb-4 uppercase">{product.qrImage.desc}</h2>
                    <p className="text-gray-500 font-bold">Отсканируйте QR-код, чтобы увидеть продукт в действии на вашем смартфоне.</p>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="bg-white rounded-[48px] p-20 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-8 text-[#1FCC59]">{product.icon}</div>
            <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">{product.title}</h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-10">{product.desc}</p>
            <div className="text-4xl font-black text-[#1FCC59]">{product.price}</div>
          </div>
        )}

        {/* ПАНЕЛЬ НАВИГАЦИИ */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-2xl p-4 rounded-[32px] flex items-center gap-6 shadow-2xl z-[100] border border-white/10">
          <button 
            onClick={() => prevProduct && navigate(`/product/${prevProduct}`)}
            className={`p-4 rounded-2xl transition-all ${prevProduct ? 'text-white hover:bg-white/10' : 'text-gray-600 opacity-30 cursor-not-allowed'}`}
          >
            <ChevronLeft size={28} />
          </button>
          
          <div className="h-8 w-px bg-white/20"></div>
          
          <div className="text-white font-black text-sm uppercase tracking-widest px-4 min-w-[100px] text-center">
            {currentIndex + 1} <span className="text-gray-500 mx-1">/</span> {PRODUCT_KEYS.length}
          </div>

          <div className="h-8 w-px bg-white/20"></div>

          <button 
            onClick={() => nextProduct && navigate(`/product/${nextProduct}`)}
            className={`p-4 rounded-2xl transition-all ${nextProduct ? 'text-white hover:bg-white/10' : 'text-gray-600 opacity-30 cursor-not-allowed'}`}
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </main>
    </div>
  );
}
