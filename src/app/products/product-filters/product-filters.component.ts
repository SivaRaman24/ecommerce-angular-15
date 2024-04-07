import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoryService } from 'src/app/core/services/category.service';
import { AppSort } from 'src/app/shared/model/app-sort.interface';
import { Category } from 'src/app/shared/model/category.interface';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit {
  @Input() selectedCategory: string;
  @Input() selectedSortOption: string;
  @Output() categoryFilterChangeEvent = new EventEmitter<string>();
  @Output() sortByChangeEvent = new EventEmitter<AppSort | null>();

  categories: Category[] = [];
  sortByOptions: AppSort[] = [
    {
      key: 'price',
      orderBy: 'asc',
      value: 'price-asc',
      displayName: 'Price: Low to High',
    },
    {
      key: 'price',
      orderBy: 'desc',
      value: 'price-desc',
      displayName: 'Price: High to Low',
    },
    {
      key: 'rating',
      orderBy: 'asc',
      value: 'rating-asc',
      displayName: 'Rating: Low to High',
    },
    {
      key: 'rating',
      orderBy: 'desc',
      value: 'rating-desc',
      displayName: 'Rating: High to Low',
    },
    {
      key: 'title',
      orderBy: 'asc',
      value: 'title-asc',
      displayName: 'Name: Asc',
    },
    {
      key: 'title',
      orderBy: 'desc',
      value: 'title-desc',
      displayName: 'Name: Desc',
    },
  ];

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  trackByCategoryId(index: number, category: Category) {
    return category.id;
  }

  onCategoryFilterChange(event: Event) {
    this.categoryFilterChangeEvent.emit(
      (event.target as HTMLInputElement).value,
    );
  }

  onSortByChange(event: Event) {
    const sortByVal = (event.target as HTMLInputElement).value;
    const filteredSortOption = this.sortByOptions.filter(
      (option) => option.value === sortByVal,
    );
    this.sortByChangeEvent.emit(
      filteredSortOption ? filteredSortOption[0] : null,
    );
  }
}
