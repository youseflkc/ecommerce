export interface SimpleProduct {
  id: number;
  title: string;
  unit_price: string;
  images: { id: number; image: string }[];
}

export const DEFAULT_SIMPLE_PRODUCT = {
  id: 0,
  title: '',
  unit_price: '',
  images: [],
};
