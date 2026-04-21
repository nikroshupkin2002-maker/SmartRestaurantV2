// @ts-nocheck
import React from 'react';

export const KPPrintTemplate = ({ selectedProducts }) => {
  return (
    <div className="print-only p-10 text-black bg-white">
      {/* Шапка КП */}
      <div className="flex justify-between items-center border-b-2 border-[#1FCC59] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Коммерческое предложение</h1>
          <p className="text-gray-500 mt-1">Smart Restaurant – Решения для автоматизации</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[#1FCC59]">Choco</div>
          <p className="text-xs text-gray-400">Дата: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Список продуктов */}
      <div className="space-y-8">
        {selectedProducts.map((product, index) => (
          <div key={index} className="break-inside-avoid">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{index + 1}. {product.title}</h3>
            <p className="text-gray-700 mb-3">{product.fullDescription}</p>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <span className="text-xs uppercase text-gray-400 block">Ценность</span>
                <span className="font-semibold text-sm">{product.valueImpact}</span>
              </div>
              <div>
                <span className="text-xs uppercase text-gray-400 block">Стоимость</span>
                <span className="font-semibold text-sm">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Футер */}
      <div className="mt-20 pt-8 border-t border-gray-100 text-center">
        <p className="font-bold text-gray-800">Готовы обсудить внедрение?</p>
        <p className="text-sm text-gray-500 mt-1">Свяжитесь с вашим персональным менеджером</p>
      </div>
    </div>
  );
};
