import { SimpleProduct } from './simple-product';
export interface OrderItem {
  id: number;
  product: SimpleProduct;
  unit_price: number;
  quantity: number;
}
