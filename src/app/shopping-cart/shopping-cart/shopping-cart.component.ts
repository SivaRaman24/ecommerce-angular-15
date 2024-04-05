import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from 'src/app/shared/model/cart.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  itemSubTotal: number;
  serviceFee: number = 5;
  successMessage: string;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getSubTotal();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
      }
    );
  }

  getSubTotal() {
    this.itemSubTotal = this.cartService.getSubTotal();
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProductFromCart(productId);
    this.getCartItems();
  }

  redirectToOrderHistory() {
    this.router.navigate(['/orders']);
  }

  checkoutCartItems(): any {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/signin']);
      return false;
    }

    this.cartService.checkoutCartItems().subscribe(
      (res) => {
        this.successMessage ='Your order has been placed! You will be redirected to order history page shortly!';
        setTimeout(() => {
          this.cartService.removeCartItems();
          this.redirectToOrderHistory();
        }, 5000);
      }
    )
  }
}
