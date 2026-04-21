// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, calculator, Info } from 'lucide-react';

export function CalculatorPage() {
  // Состояния для ввода данных (теперь это простые числа, вводить легко)
  const [revenue, setRevenue] = useState(5000000); // Оборот
  const [deliveryShare, setDeliveryShare] = useState(30); // % доставки

  // КОНСТАНТЫ ДЛЯ РАСЧЕТА
  const PENETRATION = 0.30; // 30% проникновения продуктов
  const AGGREGATOR_COMMISSION = 0.35; // 35% комиссия агрегаторов
  const GUEST_360_PRICE = 64000; // Фикс цена Guest 360

  // ЛОГИКА РАСЧЕТА
  
  // 1. Оборот, который мы переводим из доставки в свое приложение (30% от общей доставки)
  const deliveryRevenue = revenue * (deliveryShare / 100);
  const transitionedRevenue = deliveryRevenue * PENETRATION;

  // 2. Экономия на комиссии агрегаторов (считается от всей переведенной суммы)
  const savingsOnCommission = transitionedRevenue * AGGREGATOR_COMMISSION;

  // 3. Дополнительная прибыль от Guest 360 (Smart Аналитика)
  // Допустим, аналитика дает еще +5% к выручке за счет удержания гостей
  const analyticsBenefit = revenue * 0.05; 

  // Итоговая выгода
  const totalBenefit = savingsOnCommission + analyticsBenefit - GUEST_360_PRICE;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 mb-8 hover:text-[#1FCC59]">
          <ArrowLeft size={20} /> Назад в меню
        </Link>

        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
          <h1 className="text-3xl font-black mb-8">Калькулятор выгоды</h1>

          <div className="space-y-6">
            {/* ВВОД ОБОРОТА */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Общий оборот заведения (₸)</label>
              <input 
                type="number" 
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl text-xl font-bold focus:ring-2 focus:ring-[#1FCC59] outline-none"
                placeholder="Введите сумму"
              />
            </div>

            {/* ВВОД ДОЛИ ДОСТАВКИ */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Доля агрегаторов (%)</label>
              <input 
                type="number" 
                value={deliveryShare}
                onChange={(e) => setDeliveryShare(Number(e.target.value))}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl text-xl font-bold focus:ring-2 focus:ring-[#1FCC59] outline-none"
                placeholder="Например: 30"
              />
            </div>

            <div className="pt-6 border-t border-gray-50">
               <div className="flex items-center gap-2 text-gray-400 mb-4">
                 <Info size={16} />
                 <span className="text-xs italic">Расчет ведется на 30% проникновения продукта</span>
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-gray-500">Экономия на комиссии (35%):</span>
                   <span className="font-bold">{Math.round(savingsOnCommission).toLocaleString()} ₸</span>
                 </div>
                 <div className="flex justify-between items-center text-[#1FCC59]">
                   <span className="font-bold text-sm text-gray-500">Guest 360 (Smart Аналитика):</span>
                   <span className="font-bold text-sm">- 64 000 ₸</span>
                 </div>
                 <div className="bg-[#1FCC59]/10 p-6 rounded-2xl mt-6">
                   <div className="text-xs text-[#1FCC59] font-bold uppercase mb-1">Итого чистая выгода в месяц</div>
                   <div className="text-3xl font-black text-[#1FCC59]">{Math.round(totalBenefit).toLocaleString()} ₸</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
