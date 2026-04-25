import { deliveryContent } from './delivery';
import { noCashierContent } from './no-cashier';
// Сюда будем импортировать остальные файлы по мере их создания

export const PRODUCT_DETAILS_MAP = {
  p3: deliveryContent,
  p1: noCashierContent,
  // p2: noWaiterContent, и так далее
};
