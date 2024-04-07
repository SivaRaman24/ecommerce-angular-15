import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {
  Product,
  ProductListParams,
} from '../../shared/model/product.interface';
import { CartService } from '../../shopping-cart/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppSort } from '../../shared/model/app-sort.interface';
import { ToastService } from '../../toast/toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  queryParams: ProductListParams = {};
  queryParams$: Subscription;
  selectedCatgory: string;
  selectedSortOption: string;
  sortBy: AppSort | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastsService: ToastService,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        if (
          Object.keys(queryParams).length &&
          Object.prototype.hasOwnProperty.call(queryParams, 'c')
        ) {
          this.queryParams['c'] = queryParams['c'];
          this.selectedCatgory = queryParams['c'];
        }

        if (
          Object.keys(queryParams).length &&
          Object.prototype.hasOwnProperty.call(queryParams, 's')
        ) {
          this.queryParams['s'] = queryParams['s'];
          this.selectedSortOption = queryParams['s'];
        }

        this.getProductList();
      },
    );
    // this.getProductList();
  }

  trackByProductId(index: number, product: Product) {
    return product.id;
  }

  getProductList() {
    this.productService.getProducts(this.queryParams).subscribe((res) => {
      this.productList = res?.products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ productInfo: product, quantity: 1 });
    this.toastsService.show('Item added to the cart!', {
      classname: 'text-light shadow-lg',
      styles: 'background-color: #f36218ed',
      delay: 1500,
    });
  }

  updateUrlWithParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
    });
  }

  categoryFilterChangeEventHandler(category: string) {
    this.queryParams = { ...this.queryParams, ...{ c: category } };
    if (category === '') {
      delete this.queryParams.c;
    }
    this.updateUrlWithParams();
  }

  onSortByChangeEventHandler(sortBy: AppSort | null) {
    this.sortBy = sortBy;
    if (!sortBy) {
      delete this.queryParams.s;
    } else {
      this.queryParams = { ...this.queryParams, ...{ s: sortBy?.value } };
    }
    this.updateUrlWithParams();
  }

  ngOnDestroy(): void {
    this.queryParams$.unsubscribe();
  }
}
