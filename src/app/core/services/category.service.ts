import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constants/app-constants';
import { Observable, map, of } from 'rxjs';
import { Category } from '../../shared/model/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[] = [];
  featuredCategories: Category[] = [];

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    if (this.categories.length > 0) {
      return of(this.categories);
    }

    return this.httpClient
      .get<string[]>(AppConstants.apiBaseUrl + 'products/categories')
      .pipe(
        map((categories) => {
          const categoriesArr = categories.map((category, index) => {
            return {
              id: index,
              name: category,
              displayName: category.charAt(0).toUpperCase() + category.slice(1),
              thumbnail:
                category === 'laptops'
                  ? `https://cdn.dummyjson.com/product-images/${index * 5 + 5}/thumbnail.jpeg`
                  : `https://cdn.dummyjson.com/product-images/${index * 5 + 5}/thumbnail.jpg`,
            };
          }) as Category[];

          this.categories = [...categoriesArr];
          return categoriesArr;
        }),
      );
  }
}
