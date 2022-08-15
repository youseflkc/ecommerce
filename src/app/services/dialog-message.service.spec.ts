import { TestBed } from '@angular/core/testing';

import { DialogMessageService } from './dialog-message.service';

describe('DialogMessageService', () => {
  let service: DialogMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
