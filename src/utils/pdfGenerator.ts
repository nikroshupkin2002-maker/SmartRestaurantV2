// @ts-nocheck
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Product } from "../data/products";

export const generatePDF = (selectedProducts: Product[]) => {
  const doc = new jsPDF();
  const greenColor = [31, 204, 89]; // Фирменный зеленый Freedom

  // 1. Титульная часть
  doc.setFontSize(22);
  doc.setTextColor(33, 33, 33);
  doc.text("Коммерческое предложение", 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("Экосистема Smart Restaurant", 20, 40);
  doc.setLineWidth(0.5);
  doc.setDrawColor(31, 204, 89);
  doc.line(20, 45, 190, 45);

  let cursorY = 60;

  // 2. Детализация по каждому продукту
  selectedProducts.forEach((product, index) => {
    if (cursorY > 240) { doc.addPage(); cursorY = 20; }

    doc.setFontSize(16);
    doc.setTextColor(31, 204, 89);
    doc.text(`${index + 1}. ${product.title}`, 20, cursorY);
    
    cursorY += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const splitDesc = doc.splitTextToSize(product.fullDescription, 170);
    doc.text(splitDesc, 20, cursorY);
    
    cursorY += (splitDesc.length * 5) + 5;
    
    doc.setFontSize(10);
    doc.setTextColor(33, 33, 33);
    doc.text("Ключевые преимущества:", 20, cursorY);
    cursorY += 6;
    
    product.benefits.forEach(benefit => {
        doc.text(`• ${benefit}`, 25, cursorY);
        cursorY += 5;
    });
    cursorY += 10;
  });

  // 3. Таблица стоимости и ценности
  if (cursorY > 180) { doc.addPage(); cursorY = 20; }
  
  doc.setFontSize(18);
  doc.setTextColor(33, 33, 33);
  doc.text("Сводный расчет эффективности", 20, cursorY + 10);

  (doc as any).autoTable({
    startY: cursorY + 20,
    head: [['Продукт', 'Ориентировочная стоимость', 'Бизнес-ценность']],
    body: selectedProducts.map(p => [p.title, p.price, p.valueImpact]),
    headStyles: { fillColor: greenColor },
    styles: { fontSize: 9, cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 50 },
      2: { cellWidth: 70 }
    }
  });

  doc.save(`KP_Smart_Restaurant.pdf`);
};
