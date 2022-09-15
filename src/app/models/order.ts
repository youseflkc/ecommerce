import { OrderItem } from './order-item';
export interface Order {
  id: number;
  placed_at: string;
  customer: number;
  payment_status: string;
  items: OrderItem[];
  total_price: number;
  total_price_with_tax: number;
  total_quantity: number;
}
