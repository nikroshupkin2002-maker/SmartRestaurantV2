import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Product } from "../data/products";

export const generatePDF = (selectedProducts: Product[]) => {
  const doc = new jsPDF();
  const greenColor = [31, 204, 89]; // Цвет Freedom #1FCC59

  // Заголовок
  doc.setFontSize(22);
  doc.setTextColor(33, 33, 33);
  doc.text("Коммерческое предложение", 20, 30);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("Экосистема Smart Restaurant", 20, 40);

  let cursorY = 60;

  // Описание продуктов
  selectedProducts.forEach((product, index) => {
    if (cursorY > 250) { doc.addPage(); cursorY = 20; }

    doc.setFontSize(16);
    doc.setTextColor(greenColor[0], greenColor[1], greenColor[2]);
    doc.text(`${index + 1}. ${product.title}`, 20, cursorY);
    
    cursorY += 10;
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const splitDesc = doc.splitTextToSize(product.fullDescription, 170);
    doc.text(splitDesc, 20, cursorY);
    
    cursorY += (splitDesc.length * 5) + 5;
    
    doc.setFontSize(10);
    doc.text("Преимущества:", 20, cursorY);
    cursorY += 5;
    product.benefits.forEach(benefit => {
        doc.text(`- ${benefit}`, 25, cursorY);
        cursorY += 5;
    });
    cursorY += 10;
  });

  // Таблица стоимости и ценности
  if (cursorY > 200) { doc.addPage(); cursorY = 20; }
  
  doc.setFontSize(18);
  doc.setTextColor(33, 33, 33);
  doc.text("Сводная таблица эффективности", 20, cursorY + 10);

  (doc as any).autoTable({
    startY: cursorY + 20,
    head: [['Продукт', 'Ориентировочная стоимость', 'Бизнес-ценность']],
    body: selectedProducts.map(p => [p.title, p.price, p.valueImpact]),
    headStyles: { fillColor: greenColor },
    styles: { fontSize: 9, cellPadding: 5 },
  });

  doc.save(`KP_Smart_Restaurant_${new Date().toLocaleDateString()}.pdf`);
};
