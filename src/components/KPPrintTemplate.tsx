// @ts-nocheck
import React from 'react';
import { ProductIcon } from './ProductIcon';

export const KPPrintTemplate = ({ selectedProducts }) => {
  const total = selectedProducts.reduce((sum, p) => sum + p.monthlyPrice, 0);

  return (
    <div className="print-only text-black bg-white font-sans">
      {/* Маленькое лого Freedom в углу КАЖДОЙ страницы (через fixed) */}
      <img 
        src="/assets/freedom_logo.jfif" 
        className="fixed top-8 right-8 w-24 object-contain opacity-80 z-50"
        alt="Freedom Logo Mini"
      />

      <div className="p-12">
        {/* Шапка */}
        <div className="flex justify-between items-start border-b-4 border-[#1FCC59] pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1FCC59] rounded-xl flex items-center justify-center text-white font-black text-xl">SR</div>
              <span className="text-2xl font-black tracking-tighter uppercase">Smart Restaurant</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              Коммерческое <br/> предложение
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Документ от</p>
            <p className="font-bold text-lg">{new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>

        {/* Список продуктов */}
        <div className="space-y-16">
          {selectedProducts.map((product, index) => (
            <div key={product.id} className="break-inside-avoid border-b border-gray-100 pb-12">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-[#1FCC59] bg-green-50 p-3 rounded-2xl">
                      <ProductIcon name={product.iconName} size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                      {index + 1}. {product.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 text-xl leading-relaxed mb-8">
                    {product.fullDescription}
                  </p>

                  {/* Выгоды в КП */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {product.benefits?.map((b, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="font-black text-sm uppercase mb-1 text-gray-900">{b.title}</p>
                        <p className="text-gray-500 text-sm">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Блок результата (зеленая плашка) */}
                <div className="w-48 bg-[#1FCC59] text-white p-6 rounded-[32px] text-center shadow-lg">
                  <div className="text-4xl font-black mb-1">{product.res}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">{product.resLabel}</div>
                </div>
              </div>

              {/* Фото продукта в КП (если есть) */}
              {product.images && (
                <div className="flex gap-4 mt-6 h-48 overflow-hidden">
                  {product.images.map((img, i) => (
                    <div key={i} className="flex-1 rounded-2xl overflow-hidden border border-gray-100">
                      <img src={img.url} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {product.qrImage && (
                    <div className="w-48 rounded-2xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center text-center">
                      <img src={product.qrImage.url} className="w-24 h-24 mb-2" />
                      <span className="text-[8px] font-bold uppercase text-gray-400">QR Тест-драйв</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Итоговый блок */}
        <div className="mt-12 p-10 bg-gray-900 rounded-[40px] text-white break-inside-avoid shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-3xl font-black mb-2 uppercase tracking-tight">Итоговое решение</h4>
              <p className="text-gray-400 font-medium">Сервисное обслуживание выбранных модулей</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black text-[#1FCC59] mb-1">
                {new Intl.NumberFormat("ru-RU").format(total)} ₸
              </div>
              <p className="text-sm font-bold text-white/40 uppercase tracking-widest">ежемесячный платеж</p>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="mt-16 pt-8 border-t-2 border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-2xl font-black text-gray-900">Freedom Bank x Choco</p>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Smart Restaurant Ecosystem</p>
          </div>
          <div className="text-right">
             <p className="font-black text-gray-900">smart.choco.kz</p>
          </div>
        </div>

        {/* Большое лого Freedom в самом конце по центру */}
        <div className="mt-32 flex flex-col items-center justify-center break-before-page">
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mb-8 text-sm text-center">Технологический партнер</p>
          <img 
            src="/assets/freedom_logo.jfif" 
            className="w-full max-w-2xl object-contain opacity-90"
            alt="Freedom Bank Full"
          />
        </div>
      </div>
    </div>
  );
};
