import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  faCheck = faCheckCircle;

  constructor(private cart_service: CartService) {}

  async ngOnInit() {
    await this.cart_service.getCart();
  }
}
