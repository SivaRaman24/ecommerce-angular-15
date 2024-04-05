export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export interface ProductListParams {
  q?: string;
  c?: string;
  s?: string;
  select?: string;
}
