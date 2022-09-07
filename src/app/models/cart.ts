import { CartItem } from './cart-item';

export interface Cart {
  id: string;
  items: CartItem[];
  total_price: number;
  total_quantity: number;
}
