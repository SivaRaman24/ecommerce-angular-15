import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/model/product.interface';
import { CartService } from 'src/app/shopping-cart/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  productDetail!: Product;
  queryParams$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastsService: ToastService,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.queryParams$ = this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'] || '';
      console.log(params);
      this.getProductDetail();
    });
  }

  getProductDetail() {
    if (!this.productId) return;

    this.productService
      .getProductDetail(this.productId)
      .subscribe((res: Product) => {
        this.productDetail = res;
      });
  }

  addToCart() {
    const cartItem = {
      productInfo: this.productDetail,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem);
    this.toastsService.show('Item added to the cart!', {
      classname: 'text-light shadow-lg',
      styles: 'background-color: #f36218ed',
      delay: 1500,
    });
  }
}
