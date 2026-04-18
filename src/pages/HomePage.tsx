import { Link } from "react-router-dom";
import { Calculator, LayoutGrid, BarChart3, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HomePage() {
  const menuItems = [
    {
      id: "calculator",
      title: "Калькулятор выгоды",
      description: "Рассчитайте потенциальную прибыль от внедрения продуктов Smart Restaurant.",
      icon: <Calculator size={24} className="text-[#1FCC59]" />,
      link: "/calculator",
      isReady: true,
    },
    {
      id: "products",
      title: "Продукты",
      description: "Узнайте подробнее о каждом решении экосистемы Smart Restaurant.",
      icon: <LayoutGrid size={24} className="text-[#1FCC59]" />,
      link: "/products",
      isReady: true,
    },
    {
      id: "analytics",
      title: "Аналитика продаж",
      description: "Глубокий анализ чеков, активности официантов и тепловые карты.",
      icon: <BarChart3 size={24} className="text-gray-400" />,
      link: "#",
      isReady: false,
    },
    {
      id: "loyalty",
      title: "Программы лояльности",
      description: "Управление акциями, кешбэком и сегментацией клиентов.",
      icon: <Users size={24} className="text-gray-400" />,
      link: "#",
      isReady: false,
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-16 pb-12 px-4 font-sans text-gray-900">
      <div className="w-full max-w-4xl flex flex-col flex-grow">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">Меню инструментов</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Добро пожаловать в экосистему Smart Restaurant от Freedom Bank. Выберите нужный инструмент для работы с показателями вашего заведения.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {item.isReady ? (
                // Активная карточка
                <Link to={item.link} className="block h-full group outline-none">
                  <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#1FCC59]/30 transition-all duration-300 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-[#1FCC59]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                    <div className="mt-auto flex justify-end">
                       <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-[#1FCC59] group-hover:text-white transition-colors duration-300">
                          <ArrowRight size={20} strokeWidth={2.5} />
                       </div>
                    </div>
                  </div>
                </Link>
              ) : (
                // Неактивная карточка (В разработке)
                <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm opacity-60 h-full flex flex-col cursor-not-allowed">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                      В разработке
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-700">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Футер: Наши партнеры */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6 }}
          className="mt-auto pt-8 text-center"
        >
          <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Наши партнеры</span>
        </motion.div>

      </div>
    </div>
  );
}
