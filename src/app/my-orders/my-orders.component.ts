import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private order_service: OrderService) {}

  async ngOnInit() {
    let res: any = await this.order_service.getOrders();
    this.orders = res;
  }
}
