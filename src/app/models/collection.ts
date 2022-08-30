import { Product } from './product';
export interface Collection {
  id: number;
  title: string;
  products_count: number;
  featured_product: number;
}
