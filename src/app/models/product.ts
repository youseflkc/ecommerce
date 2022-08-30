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

export const default_image = {
  id: 0,
  image: '/assets/images/default-placeholder-image.png',
};

export const default_product = {
  id: 1,
  title: 'title',
  unit_price: 'unit_price',
  category: 'category',
  images: [default_image, default_image],
  description: '',
  inventory: 0,
  price_with_tax: 0,
  slug: 'slug',
};
