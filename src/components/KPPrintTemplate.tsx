// @ts-nocheck
import React from 'react';
import { ProductIcon } from './ProductIcon';

export const KPPrintTemplate = ({ selectedProducts, clientName, managerName, managerPhone }) => {
  const total = selectedProducts.reduce((sum, p) => sum + p.monthlyPrice, 0);

  return (
    <div className="print-only text-black bg-white font-sans">
      {/* Лого Freedom в углу */}
      <img src="/assets/freedom_logo.jfif" className="fixed top-8 right-8 w-24 opacity-80" alt="" />

      <div className="p-12">
        {/* Шапка */}
        <div className="flex justify-between items-start border-b-4 border-[#1FCC59] pb-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1FCC59] rounded-xl flex items-center justify-center text-white font-black text-xl">SR</div>
              <span className="text-2xl font-black uppercase">Smart Restaurant</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Коммерческое предложение</h1>
            {clientName && (
              <div className="text-2xl font-bold text-gray-600 italic">Специально для: {clientName}</div>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Дата</p>
            <p className="font-bold">{new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>

        {/* Продукты */}
        <div className="space-y-12">
          {selectedProducts.map((product, index) => (
            <div key={product.id} className="break-inside-avoid border-b border-gray-100 pb-10">
              <div className="flex items-start justify-between gap-8 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-[#1FCC59] bg-green-50 p-2 rounded-xl"><ProductIcon name={product.iconName} size={28} /></div>
                    <h3 className="text-3xl font-black uppercase">{index + 1}. {product.title}</h3>
                  </div>
                  <p className="text-gray-700 text-xl leading-relaxed mb-6">{product.fullDescription}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {product.benefits?.map((b, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="font-black text-sm uppercase mb-1">{b.title}</p>
                        <p className="text-gray-500 text-sm">{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-40 bg-[#1FCC59] text-white p-6 rounded-[32px] text-center shadow-md">
                  <div className="text-3xl font-black">{product.res}</div>
                  <div className="text-[10px] font-bold uppercase opacity-80">{product.resLabel}</div>
                </div>
              </div>
              {product.images && (
                <div className="flex gap-4 h-40">
                  {product.images.map((img, i) => (
                    <img key={i} src={img.url} className="flex-1 object-cover rounded-2xl border border-gray-100" />
                  ))}
                  {product.qrImage && (
                    <div className="w-40 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center">
                      <img src={product.qrImage.url} className="w-20 h-20 mb-1" />
                      <span className="text-[8px] font-bold text-gray-400 uppercase">Попробовать</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Этапы внедрения */}
        <div className="mt-16 break-inside-avoid">
          <h4 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">!</span>
            Этапы внедрения
          </h4>
          <div className="grid grid-cols-3 gap-6">
            {[
              { day: "1 день", title: "Подписание договора", desc: "Юридическое оформление и фиксация условий." },
              { day: "2-3 дня", title: "Интеграция", desc: "Настройка обмена данными с iiko или r-keeper." },
              { day: "1 день", title: "Запуск", desc: "Обучение персонала и старт приема заказов." }
            ].map((step, i) => (
              <div key={i} className="relative p-6 bg-gray-50 rounded-3xl">
                <div className="text-[#1FCC59] font-black mb-1">{step.day}</div>
                <div className="font-bold mb-2">{step.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Итого и Контакты */}
        <div className="mt-12 p-10 bg-gray-900 rounded-[40px] text-white break-inside-avoid">
          <div className="flex justify-between items-end">
            <div>
              <h4 className="text-2xl font-black mb-1 uppercase tracking-tight">Итоговое решение</h4>
              <p className="text-white/40 mb-8">Сервисное обслуживание выбранных модулей</p>
              
              <div className="space-y-1">
                <p className="text-sm text-white/60 uppercase font-bold tracking-widest">Ваш менеджер:</p>
                <p className="text-xl font-bold">{managerName || "____________________"}</p>
                <p className="text-[#1FCC59] font-bold">{managerPhone || ""}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black text-[#1FCC59] mb-1">
                {new Intl.NumberFormat("ru-RU").format(total)} ₸
              </div>
              <p className="text-xs text-white/30 uppercase font-bold">ежемесячно</p>
            </div>
          </div>
        </div>

        {/* Финальное большое лого */}
        <div className="mt-20 flex flex-col items-center justify-center break-before-page min-h-[80vh]">
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] mb-12 text-sm">Технологический партнер</p>
          <img src="/assets/freedom_logo.jfif" className="w-full max-w-2xl opacity-90" alt="" />
        </div>
      </div>
    </div>
  );
};
