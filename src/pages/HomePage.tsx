import { Link } from "react-router-dom";
import { Calculator, LayoutGrid, BarChart3, Users, Settings } from "lucide-react";
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
      description: "Подробная информация о каждом решении экосистемы Smart Restaurant.",
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
    <div className="min-h-screen bg-white flex flex-col items-center pt-16 px-4 font-sans text-gray-900">
      <div className="w-full max-w-4xl">
        
        {/* Логотип и заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 bg-[#1FCC59] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">F</div>
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Freedom Bank</span>
                <span className="font-bold text-gray-900 leading-none">Smart Restaurant</span>
             </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Меню инструментов</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            Добро пожаловать в экосистему Smart Restaurant. Выберите нужный инструмент для работы с показателями вашего заведения.
          </p>
        </motion.div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
            >
              {item.isReady ? (
                <Link to={item.link} className="block h-full group outline-none">
                  <div className="bg-[#F8F9FA] rounded-[24px] p-8 border border-transparent hover:border-[#1FCC59]/30 hover:bg-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#1FCC59] transition-colors">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              ) : (
                <div className="bg-[#F8F9FA] rounded-[24px] p-8 opacity-50 h-full flex flex-col relative border border-transparent">
                  <div className="absolute top-6 right-6 bg-gray-200/50 px-2 py-1 rounded text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                    В разработке
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-700">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
