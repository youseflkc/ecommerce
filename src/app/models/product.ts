export interface Product {
  id: number;
  title: string;
  unit_price: string;
  category: string;
  images: { id: number; image: string }[];
  description: string;
  inventory: number;
  price_with_tax: number;
  slug: string;
}

export const DEFAULT_IMAGE = {
  id: 0,
  image: '/assets/images/default-placeholder-image.png',
};

export const DEFAULT_PRODUCT = {
  id: 1,
  title: 'title',
  unit_price: 'unit_price',
  category: 'category',
  images: [DEFAULT_IMAGE, DEFAULT_IMAGE],
  description: '',
  inventory: 0,
  price_with_tax: 0,
  slug: 'slug',
};
