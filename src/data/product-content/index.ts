import { deliveryContent } from './delivery';
import { noCashierContent } from './no-cashier';

export const PRODUCT_DETAILS_MAP = {
  p1: noCashierContent, // Связываем ID p1 с контентом "Без кассира"
  p3: deliveryContent,  // Связываем ID p3 с контентом "Доставка"
};
