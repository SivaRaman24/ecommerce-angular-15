import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() productDetail: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  addToCart(productDetail: Product) {
    this.addToCartEvent.emit(productDetail);
  }
}
