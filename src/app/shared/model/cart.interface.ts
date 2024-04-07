import { Product } from './product.interface';

export interface CartItem {
  productInfo: Product;
  quantity: number;
}

export interface CartItems {
  userId: number;
  products: Product[];
}

export interface CartCheckoutResponse {
  id: number;
  products: Product[];
  userId: number;
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}
