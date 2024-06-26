import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [OrderHistoryComponent, OrderDetailsComponent],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
