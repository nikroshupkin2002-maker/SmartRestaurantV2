// @ts-nocheck
import React from 'react';
import { ProductIcon } from './ProductIcon';

export const KPPrintTemplate = ({ selectedProducts }) => {
  const total = selectedProducts.reduce((sum, p) => sum + p.monthlyPrice, 0);

  return (
    <div className="print-only p-12 text-black bg-white min-h-screen">
      {/* Шапка */}
      <div className="flex justify-between items-start border-b-2 border-[#1FCC59] pb-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#1FCC59] rounded flex items-center justify-center text-white font-bold">F</div>
            <span className="text-xl font-bold tracking-tight">Smart Restaurant</span>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900">Коммерческое предложение</h1>
          <p className="text-gray-500 font-medium mt-1">Решения для автоматизации и роста прибыли</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Дата документа:</p>
          <p className="font-bold">{new Date().toLocaleDateString('ru-RU')}</p>
        </div>
      </div>

      {/* Список выбранных продуктов */}
      <div className="space-y-10">
        {selectedProducts.map((product, index) => (
          <div key={product.id} className="break-inside-avoid">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-[#1FCC59]">
                <ProductIcon name={product.iconName} size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {index + 1}. {product.title}
              </h3>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-4 pl-9">
              {product.fullDescription}
            </p>

            <div className="grid grid-cols-2 gap-6 pl-9">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-widest">Ценность для бизнеса</span>
                <span className="font-bold text-gray-800">{product.valueImpact}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-widest">Стоимость решения</span>
                <span className="font-bold text-[#1FCC59] text-xl">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итоговый блок */}
      <div className="mt-16 p-8 bg-gray-900 rounded-[32px] text-white break-inside-avoid">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-bold mb-1">Итоговая стоимость внедрения</h4>
            <p className="text-gray-400 text-sm">Без учета индивидуальных скидок и акций</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-[#1FCC59]">
              {new Intl.NumberFormat("ru-RU").format(total)} ₸
            </div>
            <p className="text-xs text-white/50">сервисное обслуживание в месяц</p>
          </div>
        </div>
      </div>

      {/* Футер */}
      <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-end">
        <div>
          <p className="font-bold text-gray-900">Freedom Bank x Choco</p>
          <p className="text-sm text-gray-500">Ваш персональный менеджер: ____________________</p>
        </div>
        <div className="text-right text-[10px] text-gray-300 uppercase tracking-widest">
          smart.choco.kz
        </div>
      </div>
    </div>
  );
};
