import { OrderItem } from './order-item';
export interface Order {
  id: number;
  placed_at: string;
  customer: number;
  payment_status: string;
  items: OrderItem[];
}
