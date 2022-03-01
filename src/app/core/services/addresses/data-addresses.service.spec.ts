import { TestBed } from '@angular/core/testing';

import { DataAddressesService } from './data-addresses.service';

describe('DataAddressesService', () => {
  let service: DataAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
