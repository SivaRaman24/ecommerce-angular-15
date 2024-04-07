import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFiltersComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, NgbToastModule],
})
export class ProductsModule {}
