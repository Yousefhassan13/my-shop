import shirt1 from '../assets/product-image/f1.jpg';
import shirt2 from '../assets/product-image/f2.jpg';
import shoes1 from '../assets/product-image/f7.jpg';
import shirt3 from '../assets/product-image/f8.jpg';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  reviews: Review[];
}
export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface ProductResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}
export interface ApiResponse {
  products: ProductResponse[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Product1',
    description: 'This is the description for Product 1.',
    price: 19.99,
    image: shoes1,
    category: 'shoes',
    reviews: [],
  },
  {
    id: 2,
    name: 'Product2',
    description: 'This is the description for Product 2.',
    price: 29.99,
    image: shirt2,
    category: 'clothes',
    reviews: [],
  },
  {
    id: 3,
    name: 'Product3',
    description: 'This is the description for Product 3.',
    price: 39.99,
    image: shirt1,
    category: 'clothes',
    reviews: [],
  },
  {
    id: 4,
    name: 'Product4',
    description: 'This is the description for Product 3.',
    price: 10.99,
    image: shirt3,
    category: 'clothes',
    reviews: [],
  },
];
