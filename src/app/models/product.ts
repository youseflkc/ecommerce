export interface Product {
  id: number;
  title: string;
  unit_price: string;
  category: string;
  images: string[];
  description: string;
  inventory: number;
  price_with_tax: number;
  slug: string;
}
