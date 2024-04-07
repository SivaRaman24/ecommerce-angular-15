import { Component, OnInit } from '@angular/core';

import { Category } from '../../shared/model/category.interface';
import { Product } from '../../shared/model/product.interface';
import { ProductService } from '../../products/services/product.service';
import { CartService } from '../../shopping-cart/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images = [
    'assets/carousel/image_v1.jpg',
    'assets/carousel/image_v2.jpg',
    'assets/carousel/image_v3.jpg',
  ];
  categories: Category[] = [];
  featuredCategories: Category[] = [];
  featuredProducts: Product[] = [];

  constructor(
    private toastsService: ToastService,
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getFeaturedProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      this.featuredCategories = res.slice(0, 7);
    });
  }

  getFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe((res) => {
      this.featuredProducts = res.products;
    });
  }

  trackByCategoryId(index: number, category: Category) {
    return category.id;
  }

  trackByProductId(index: number, product: Product) {
    return product.id;
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ productInfo: product, quantity: 1 });
    this.toastsService.show('Item added to the cart!', {
      classname: 'text-light shadow-lg',
      styles: 'background-color: #f36218ed',
      delay: 1500,
    });
  }
}
