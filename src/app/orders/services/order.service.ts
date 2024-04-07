import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../core/constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getOrderHistory() {
    return this.httpClient.get(AppConstants.apiBaseUrl + 'carts/user/1');
  }
}
