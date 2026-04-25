// @ts-nocheck
import React from 'react';
import { ProductIcon } from './ProductIcon';

export const KPPrintTemplate = ({ selectedProducts, clientName, managerName, managerPhone }) => {
  const total = selectedProducts.reduce((sum, p) => sum + p.monthlyPrice, 0);

  return (
    <div className="print-only text-black bg-white font-sans">
      
      {/* 1. ТИТУЛЬНАЯ СТРАНИЦА */}
      <div className="pdf-page flex flex-col justify-between p-20 border-[20px] border-gray-50 box-border">
        <div className="flex flex-col items-center mt-32 text-center">
          {/* Убрали лишние надписи, оставили чистый заголовок */}
          <h1 className="text-7xl font-black uppercase tracking-tighter leading-tight mb-8">
            Коммерческое <br/> предложение
          </h1>
          
          {clientName && (
            <div className="text-3xl font-medium text-gray-400 italic mt-4">
              подготовлено для {clientName}
            </div>
          )}
          
          <div className="w-24 h-2 bg-[#1FCC59] mt-12"></div>
        </div>

        {/* Лого посередине внизу (только здесь) */}
        <div className="flex flex-col items-center pb-10">
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mb-6 text-sm">Технологический партнер</p>
          <img 
            src="/assets/freedom_logo.jfif" 
            className="w-72 object-contain" 
            alt="Freedom Bank" 
          />
        </div>
      </div>

      {/* 2. СТРАНИЦЫ С ПРОДУКТАМИ */}
      {selectedProducts.map((product, index) => (
        <div key={product.id} className="pdf-page p-16 relative">
          {/* Лого справа сверху на внутренних страницах */}
          <img 
            src="/assets/freedom_logo.jfif" 
            className="absolute top-12 right-12 w-24 object-contain opacity-50" 
            alt="" 
          />

          <div className="flex items-center gap-4 mb-10 border-b-2 border-gray-100 pb-6">
            <div className="text-[#1FCC59] bg-green-50 p-4 rounded-2xl">
              <ProductIcon name={product.iconName} size={36} />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tight">
              {index + 1}. {product.title}
            </h3>
          </div>

          <p className="text-gray-700 text-xl leading-relaxed mb-12 max-w-4xl">
            {product.fullDescription}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            {product.benefits?.map((b, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                <p className="font-black text-lg uppercase mb-1 text-gray-900">{b.title}</p>
                <p className="text-gray-500 text-base leading-snug">{b.text}</p>
              </div>
            ))}
          </div>

          {/* Фото БЕЗ ОБРЕЗКИ */}
          {product.images && (
            <div className="flex gap-6 h-[350px] mt-8">
              {product.images.map((img, i) => (
                <div key={i} className="flex-1 rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center p-4">
                  <img src={img.url} className="max-w-full max-h-full object-contain shadow-sm" />
                </div>
              ))}
              {product.qrImage && (
                <div className="w-56 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center">
                  <img src={product.qrImage.url} className="w-24 h-24 mb-4" />
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">{product.qrImage.desc}</span>
                </div>
              )}
            </div>
          )}

          {/* Мягкая фиксация цены внизу страницы */}
          <div className="absolute bottom-12 left-16 right-16 flex justify-between items-center py-6 border-t border-gray-100">
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Стоимость сервиса</div>
            <div className="text-2xl font-black text-[#1FCC59]">{product.price} / мес</div>
          </div>
        </div>
      ))}

      {/* 3. ФИНАЛЬНАЯ СТРАНИЦА */}
      <div className="pdf-page p-20 flex flex-col justify-center">
        <h2 className="text-5xl font-black uppercase mb-16 text-center tracking-tighter">План внедрения и итоги</h2>
        
        <div className="grid grid-cols-3 gap-8 mb-20">
          {[
            { day: "1 день", title: "Подписание договора", desc: "Юридическое оформление сотрудничества." },
            { day: "2-3 дня", title: "Интеграция систем", desc: "Настройка обмена данными с iiko / r-keeper." },
            { day: "1 день", title: "Обучение и запуск", desc: "Инструктаж персонала и старт работы." }
          ].map((step, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
              <div className="text-[#1FCC59] font-black text-xl mb-2">{step.day}</div>
              <div className="font-bold text-xl mb-3">{step.title}</div>
              <div className="text-gray-500 text-sm leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-[50px] p-16 text-white shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#1FCC59] font-black uppercase tracking-[0.2em] mb-4 text-xs">Менеджер проекта</p>
              <div className="space-y-1 mb-8">
                <p className="text-4xl font-bold">{managerName || "____________________"}</p>
                <p className="text-2xl text-[#1FCC59] font-medium">{managerPhone || ""}</p>
              </div>
              <p className="text-white/20 text-xs uppercase font-bold tracking-widest">Smart Restaurant Ecosystem</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 font-bold uppercase tracking-widest mb-2 text-xs">Итого к оплате</p>
              <div className="text-7xl font-black text-[#1FCC59] mb-1">
                {new Intl.NumberFormat("ru-RU").format(total)} ₸
              </div>
              <p className="text-lg text-white/40 uppercase tracking-widest font-bold">в месяц</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
