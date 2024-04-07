import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CartCheckoutResponse,
  CartItem,
} from 'src/app/shared/model/cart.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppConstants } from '../../core/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalCartItems = 0;
  totalCartItemUpdated$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  getCartIndexByProductId(productId: number) {
    return this.cartItems.findIndex((obj) => obj.productInfo.id === productId);
  }

  addToCart(cartItem: CartItem) {
    const cartItemIndex = this.getCartIndexByProductId(cartItem.productInfo.id);
    if (cartItemIndex > -1) {
      // Checks if the product is already in the cart
      this.cartItems[cartItemIndex]['quantity'] =
        this.cartItems[cartItemIndex]['quantity'] + cartItem.quantity; // increase the quantity alone
    } else {
      this.cartItems.push(cartItem);
    }

    // Increase the total cart items count
    this.totalCartItems += cartItem.quantity;

    // Emit the cart items related events
    this.totalCartItemUpdated$.next(this.totalCartItems);
  }

  removeProductFromCart(productId: number) {
    const cartItemIndex = this.getCartIndexByProductId(productId);

    // Decrease the total cart items count
    this.totalCartItems -= this.cartItems[cartItemIndex].quantity;
    this.cartItems.splice(cartItemIndex, 1);

    // Emit the cart items related events
    this.totalCartItemUpdated$.next(this.totalCartItems);
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  getSubTotal() {
    const items = [...this.cartItems];
    const sum = items.reduce(
      (
        accumulator: number,
        cartItem: { productInfo: { price: number }; quantity: number },
      ) => {
        return (accumulator =
          accumulator + cartItem.quantity * cartItem.productInfo.price);
      },
      0,
    );
    return sum;
  }

  checkoutCartItems(): Observable<CartCheckoutResponse> {
    const apiUrl = AppConstants.apiBaseUrl + 'carts/add';
    const products = this.cartItems.map((item) => {
      return {
        id: item.productInfo.id,
        quantity: item.quantity,
      };
    });
    const reqBody = {
      userId: 1,
      products: products,
    };

    return this.httpClient.post<CartCheckoutResponse>(apiUrl, reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  removeCartItems() {
    this.cartItems = [];
  }
}
