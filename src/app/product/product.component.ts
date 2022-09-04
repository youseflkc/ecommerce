import { CartService } from './../services/cart.service';
import { ProductService } from './../services/product.service';
import { default_product, default_image } from './../models/product';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AOS from 'aos';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  default_image = default_image;
  @Input('product') product: any = default_product;

  recommended_products: any = [];

  quantity_input = new Object() as HTMLInputElement;

  faPlus = faPlus;
  faMinus = faMinus;

  param: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private product_service: ProductService,
    private cart_service: CartService
  ) {}

  async ngOnInit() {
    AOS.init();
    this.param = this.route.snapshot.paramMap.get('id');
    this.product = await this.product_service.getProduct(Number(this.param));

    let res = await this.product_service.getFilteredOrSortedProducts({
      collection_id: this.product.collection.toString(),
    });

    this.recommended_products = res.results;

    this.quantity_input = document.getElementById(
      'quantity'
    ) as HTMLInputElement;

    this.route.params.subscribe(async (params) => {
      this.param = this.route.snapshot.paramMap.get('id');
      this.product = await this.product_service.getProduct(Number(this.param));

      let res = await this.product_service.getFilteredOrSortedProducts({
        collection_id: this.product.collection.toString(),
      });

      this.recommended_products = res.results;

      this.quantity_input = document.getElementById(
        'quantity'
      ) as HTMLInputElement;
    });
  }

  addToCart() {
    this.cart_service.getCart();
    this.cart_service.addItem(
      Number(this.param),
      Number(this.quantity_input.value)
    );
  }

  addQuantity() {
    this.quantity_input.value = (
      Number(this.quantity_input.value) + 1
    ).toString();
  }

  subtractQuantity() {
    let new_quantity = Number(this.quantity_input.value) - 1;
    if (new_quantity >= 1) {
      this.quantity_input.value = new_quantity.toString();
    }
  }

  resetQuantity() {
    if (Number(this.quantity_input.value) < 1) {
      this.quantity_input.value = '1';
    }
  }
}
