import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';

import { CollectionService } from './collection.service';
import { environment } from 'src/environments/environment';

describe('CollectionService', () => {
  let service: CollectionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectionService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CollectionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#getAll should return all the collections', async () => {
    const mockData = [{ id: 1, title: 'Food', product_count: 22 }];

    service.getAll().then((res) => {
      let collections = res;
      expect(collections).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      environment.base_url + '/collections/'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
