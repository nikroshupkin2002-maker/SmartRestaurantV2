import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, LayoutGrid } from "lucide-react";

export function ProductsPage() {
  // Список прямо здесь, чтобы исключить ошибку импорта
  const products = [
    { id: 1, title: "Без кассира", desc: "Автоматизация оплаты." },
    { id: 2, title: "Без официанта", desc: "QR-меню и заказы." },
    { id: 3, title: "SR Delivery", desc: "Ваша доставка." }
  ];

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 font-sans">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] mb-8 transition-colors">
        <ArrowLeft size={20} />
        <span>Назад в меню</span>
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#1FCC59]/10 rounded-xl flex items-center justify-center text-[#1FCC59]">
          <LayoutGrid size={24} />
        </div>
        <h1 className="text-3xl font-bold">Наши продукты</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="p-8 bg-[#F8F9FA] rounded-[24px] border border-transparent hover:border-[#1FCC59]/20 transition-all">
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-gray-500 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
