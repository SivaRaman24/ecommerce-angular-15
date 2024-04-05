import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { CartService } from '../../../shopping-cart/services/cart.service';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/shared/model/category.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/auth/model/user.interface';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/products/services/product.service';
import { AppConstants } from '../../constants/app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  categories: Category[];
  cartItemsCount: number;
  totalCartItemSub$: Subscription;
  isUserAuthenticated = false;
  userInfo: UserInfo | null;
  userInfoSub$: Subscription;
  searchFormControl = new FormControl('');
  private querySubject$: Subject<string> = new Subject<string>();
  query: string;
  productSuggestions: any = [];
  showSuggestions: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private productService: ProductService) {}

  ngOnInit() {
    // Subscribe to user info
    this.userInfoSub$ = this.authService.userInfoSubject$.subscribe(
      (updatedUserInfo) => {
        this.getAuthUser();
      }
    );
    this.getCategories();

    // Subscribe to total cart item
    this.totalCartItemSub$ = this.cartService.totalCartItemUpdated$.subscribe((res) => {
      this.cartItemsCount = res;
    });

    this.subscribeQueryAction();
  }

  getAuthUser() {
    this.userInfo = this.authService.getAuthUserDetails();
    if(this.userInfo) {
      this.isUserAuthenticated = true;
    } else{
      this.isUserAuthenticated = false;
    }

  }

  signOut() {
    this.authService.signOut();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res.slice(0, 5);
      }
    )
  }

  trackByCategoryId(index: number, category: Category) {
    return category.id;
  }

  searchProducts(key: string) {
    this.querySubject$.next(key);
  }

  getProductSuggestions(query: string) {
    if(query === '') {
      this.productSuggestions = [];
      this.showSuggestions = false;
      return;
    }

    this.productService.getProducts({q: query, select: 'title'}, {limit: 10, skip: 0}).subscribe((res) => {
      this.productSuggestions = res?.products || [];
      this.showSuggestions = true;
    });
  }

  onSelectProductItem(selectedVal: any) {
    this.showSuggestions = false;
    this.router.navigate(['/products', selectedVal?.id]);
  }

  /**
   * subscribe to the subject emitting query values with debounce delay
   *
   * @private
   * @memberof HeaderComponent
   */
  private subscribeQueryAction() {
    this.querySubject$.pipe(
      distinctUntilChanged(),   // wait until query string has changed in input field (prevent trigger on non-value keys)
      debounceTime(400),
      switchMap(query => {
        this.query = query;
        this.getProductSuggestions(query)
        return query;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if(this.totalCartItemSub$) this.totalCartItemSub$.unsubscribe();
    if(this.userInfoSub$) this.userInfoSub$.unsubscribe();
    if(this.querySubject$) this.querySubject$.unsubscribe();
  }
}
