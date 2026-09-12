export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  dozenPrice: number;
  description: string;
  image: string;
  isNew?: boolean;
  sizes?: string[];
}

export interface CartItemType {
  id: string;
  product: Product;
  quantity: number;
  isDozen: boolean;
}
