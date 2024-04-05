import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConstants } from "../../core/constants/app-constants";
import { Observable } from "rxjs";
import { Product, ProductListParams, ProductListResponse } from "../../shared/model/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  getProducts(params?: ProductListParams | null, pagination?: { limit: number; skip: number; }): Observable<ProductListResponse> {
    let apiUrl = AppConstants.apiBaseUrl + 'products';
    let isParamsAppliedAlready = false;

    if(params && Object.keys(params).length) {
      // Note: Since API doesnot support search a product inside a category of products we can support any one
      if(params.hasOwnProperty('c') && params.c !== '') {
        // API Endpoint for get products of category - https://dummyjson.com/products/category/smartphones
        apiUrl += `/category/${params.c}`;
        isParamsAppliedAlready = true;
      } else if(params.hasOwnProperty('q') && params.q !== '') {
        // API Endpoint for searching the product - https://dummyjson.com/products/search?q=phone&limit=2&skip=0
        apiUrl += `/search?q=${params.q}`;
        isParamsAppliedAlready = true;
      }

      if(params.hasOwnProperty('select') && params.select !== '') {
        apiUrl += `${(isParamsAppliedAlready) ? '&': '?'}select=${params.select}`
      }
    }

    if(pagination && pagination.hasOwnProperty('limit') && pagination.hasOwnProperty('skip')) {
      apiUrl += (isParamsAppliedAlready) ? '&': '?';
      apiUrl += `limit=${pagination.limit}&skip=${pagination.skip}`;
    }

    // TODO: Apply sorting internally
    return this.httpClient.get<ProductListResponse>(apiUrl);
  }

  getProductDetail(id: number): Observable<Product> {
    const apiUrl = AppConstants.apiBaseUrl + 'products/'+ id;

    return this.httpClient.get<Product>(apiUrl);
  }

  getFeaturedProducts() {
    return this.getProducts(null, { limit: 10, skip: 80});
  }
}
