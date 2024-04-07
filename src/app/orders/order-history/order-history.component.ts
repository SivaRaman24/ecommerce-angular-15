import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: any = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrderHistory();
  }

  getOrderHistory() {
    this.orderService.getOrderHistory().subscribe((res) => {
      this.orders = res;
    });
  }
}
