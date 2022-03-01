import { TestBed } from '@angular/core/testing';

import { DataCustomersService } from './data-customers.service';

describe('DataCustomersService', () => {
  let service: DataCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
