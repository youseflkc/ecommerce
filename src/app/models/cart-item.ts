import { SimpleProduct } from './simple-product';
export interface CartItem {
  id: number;
  product: SimpleProduct;
  quantity: number;
}
