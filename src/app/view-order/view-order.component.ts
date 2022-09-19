import { Order } from './../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  //order to be displayed
  order: Order = {
    customer: 0,
    id: 0,
    items: [],
    payment_status: '',
    placed_at: '',
    total_price: 0,
    total_price_with_tax: 0,
    total_quantity: 0,
  };

  //the tax on the order total
  tax = 0;

  constructor(
    private order_service: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      let param = this.route.snapshot.paramMap.get('id');
      let res: any = await this.order_service.getOrder(Number(param));
      this.order = res;
      this.tax =
        Math.round(
          (this.order.total_price_with_tax - this.order.total_price) * 100
        ) / 100;
    } catch (error) {
      this.router.navigate(['**']);
    }
  }
}
