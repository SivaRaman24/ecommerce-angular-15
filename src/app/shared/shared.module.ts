import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SortLocalPipe } from './pipes/sort-local.pipe';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { SuggestionListComponent } from './components/suggestion-list/suggestion-list.component';

@NgModule({
  declarations: [
    SortLocalPipe,
    ProductCardComponent,
    CategoryCardComponent,
    SuggestionListComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SortLocalPipe,
    ProductCardComponent,
    CategoryCardComponent,
    SuggestionListComponent,
  ],
})
export class SharedModule {}
