import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    CategoryCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
