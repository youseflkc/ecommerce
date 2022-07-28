import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#getAll should return the first 10 products', async () => {
    const mockData = [
      {
        id: 1,
        title: 'xxx',
        unit_price: 22,
        collection: 1,
        images: ['abc'],
        description: 'xyz',
        inventory: 1,
        price_with_tax: 27,
        slug: '-',
      },
    ];

    service.getAll().then((res) => {
      let products = res;
      expect(products).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      environment.base_url + '/products/'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
