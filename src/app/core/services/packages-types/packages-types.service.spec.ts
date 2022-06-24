import { TestBed } from '@angular/core/testing';

import { PackagesTypesService } from './packages-types.service';

describe('PackagesTypesService', () => {
  let service: PackagesTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagesTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
