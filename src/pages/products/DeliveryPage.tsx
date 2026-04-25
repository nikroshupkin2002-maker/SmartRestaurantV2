// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, ShieldCheck, Zap, TrendingUp, BarChart3, QrCode } from 'lucide-react';

export function DeliveryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-sans text-[#2D3139] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* Навигация */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-1 text-gray-400 font-bold text-[11px] uppercase tracking-widest mb-6 hover:text-[#1FCC59] transition-colors"
        >
          <ChevronLeft size={14} /> Назад к продуктам
        </button>

        {/* Шапка продукта */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
            <div className="flex-1">
              <div className="w-16 h-16 bg-[#E8F9EE] rounded-2xl flex items-center justify-center text-[#1FCC59] mb-6">
                <Truck size={32} />
              </div>
              <h1 className="text-4xl font-black text-[#1A1D23] mb-4">SR Delivery</h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-6">
                Полноценная экосистема для запуска и автоматизации вашей собственной службы доставки без зависимости от агрегаторов.
              </p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-[#1FCC59] text-white rounded-xl font-black text-sm">60 000 ₸ / лок.</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Ежемесячная подписка</span>
              </div>
            </div>
            
            {/* Обязательный QR-код при открытии */}
            <div className="bg-[#F8FAFC] p-6 rounded-[24px] border border-gray-100 flex flex-col items-center shadow-inner">
              <div className="bg-white p-3 rounded-xl mb-3 shadow-sm">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://smart-delivery-demo.chocofood.kz" 
                  alt="QR Code Delivery"
                  className="w-[120px] h-[120px]"
                />
              </div>
              <span className="text-[10px] font-black text-[#1FCC59] uppercase tracking-tighter text-center">
                Отсканируйте для<br/>тест-драйва
              </span>
            </div>
          </div>
        </div>

        {/* Детальные блоки данных */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Блок 1: Автоматизация */}
          <div className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#1FCC59]">
              <Zap size={20} />
              <h3 className="font-black text-[15px] uppercase tracking-wide">Автоматизация</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#1FCC59] mt-0.5 shrink-0" />
                Интеграция всех курьерских служб: Яндекс Доставка, Wolt Drive, Choco Доставка.
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#1FCC59] mt-0.5 shrink-0" />
                Автоматический подбор курьера в режиме реального времени по скорости и цене.
              </li>
            </ul>
          </div>

          {/* Блок 2: Экономика */}
          <div className="bg-white p-8 rounded-[28px] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#1FCC59]">
              <TrendingUp size={20} />
              <h3 className="font-black text-[15px] uppercase tracking-wide">Экономия и рост</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#1FCC59] mt-0.5 shrink-0" />
                Экономия на комиссии агрегаторов (до 30% с каждого заказа).
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-[#1FCC59] mt-0.5 shrink-0" />
                Рост среднего чека на 16% за счет умных допродаж в интерфейсе.
              </li>
            </ul>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 bg-[#1A1D23] p-10 rounded-[32px] text-white">
          <div className="flex items-center gap-4 mb-8">
            <BarChart3 className="text-[#1FCC59]" />
            <h2 className="text-2xl font-black">Полная интеграция</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-[#1FCC59] font-black text-3xl mb-2">100%</div>
              <p className="text-gray-400 text-xs leading-relaxed">Синхронизация с вашей кассовой системой для мгновенной обработки.</p>
            </div>
            <div>
              <div className="text-[#1FCC59] font-black text-3xl mb-2">+20%</div>
              <p className="text-gray-400 text-xs leading-relaxed">Прирост количества заказов за счет удобства собственного сервиса.</p>
            </div>
            <div>
              <div className="text-[#1FCC59] font-black text-3xl mb-2">0 ₸</div>
              <p className="text-gray-400 text-xs leading-relaxed">Стоимость привлечения повторных клиентов через собственную базу.</p>
            </div>
          </div>
        </div>

        {/* Футер КП */}
        <div className="mt-12 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Предложение подготовлено для вашей сети</p>
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
             <QrCode size={16} className="text-[#1FCC59]" />
             <span className="text-sm font-bold">Сканируйте QR выше для просмотра примера</span>
          </div>
        </div>
      </div>
    </div>
  );
}
