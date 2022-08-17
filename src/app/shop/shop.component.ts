import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductService } from './../services/product.service';
import { Collection } from './../models/collection';
import { CollectionService } from './../services/collection.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('focus', { static: false }) input: ElementRef = new ElementRef('');

  faAngleDown = faAngleDown;
  sortExpanded: boolean = false;
  filterExpanded: boolean = false;

  collections: any = [];
  products: any = [];
  products_count = 0;

  constructor(
    private collectionService: CollectionService,
    private http: HttpClient,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.collections = await this.collectionService.getAll();

    // this.http.get('url').subscribe();
    let res: any = await this.productService.getAll();

    //store first 10 products from database
    this.products = res.results;

    //total products in database.
    this.products_count = res.count;
  }

  toggleSort() {
    this.sortExpanded = !this.sortExpanded;

    //prevents opening both toolbars at the same time.
    if (this.filterExpanded) this.filterExpanded = false;
  }

  toggleFilter() {
    this.filterExpanded = !this.filterExpanded;

    //prevents opening both toolbars at the same time.
    if (this.sortExpanded) this.sortExpanded = false;

    //focuses the min-price text box when the filter bar is expanded
    if (this.filterExpanded) {
      this.input.nativeElement.focus();
    } else {
      this.input.nativeElement.blur();
    }
  }
}
