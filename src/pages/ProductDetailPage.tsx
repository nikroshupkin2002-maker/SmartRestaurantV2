import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1FCC59] mb-12">
          <ArrowLeft size={20} /> Назад к списку
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-bold mb-6">{product.title}</h1>
          <p className="text-2xl text-gray-500 leading-relaxed mb-12">
            {product.fullDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#F8F9FA] p-8 rounded-[32px]">
              <h3 className="text-xl font-bold mb-6">Преимущества решения:</h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#1FCC59] mt-1 shrink-0" size={20} />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {product.stats && (
                <div className="flex flex-col gap-4">
                    {product.stats.map(s => (
                        <div key={s.label} className="border-2 border-gray-50 p-8 rounded-[32px] flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-[#1FCC59] mb-2">{s.value}</span>
                            <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">{s.label}</span>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
