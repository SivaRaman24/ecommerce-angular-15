import { Component, OnInit, ViewChild } from '@angular/core';

import { Category } from '../../shared/model/category.interface';
import { Product } from '../../shared/model/product.interface';
import { ProductService } from '../../products/services/product.service';
import { CartService } from '../../shopping-cart/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { ToastService } from '../../toast/toast.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('featureCategoriesSlide') featuredCategoryCarousel: NgbCarousel;

  images = [
    'assets/carousel/image_v1.jpg',
    'assets/carousel/image_v2.jpg',
    'assets/carousel/image_v3.jpg',
  ];
  categories: Category[] = [];
  featuredCategories: Category[] = [];
  categoryChunks: Array<Category[]> = [];
  featuredProducts: Product[] = [];

  categoriesCarouselConfig = {
    showNavigationArrows: false,
    showNavigationIndicators: false,
    interval: 100000,
  };

  cardPagination = {
    from: 0,
    to: 3,
    defaultCount: 7,
  };

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

  goToPreviousSlide() {
    this.featuredCategoryCarousel.prev();
  }

  goToNextSlide() {
    this.featuredCategoryCarousel.next();
  }

  chunks(array: any, size: number) {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      this.featuredCategories = res;
      this.categoryChunks = this.chunks(
        this.featuredCategories,
        this.cardPagination.defaultCount,
      );
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
