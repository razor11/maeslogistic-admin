import { TestBed } from '@angular/core/testing';

import { PackageCatalogService } from './package-catalog.service';

describe('PackageCatalogService', () => {
  let service: PackageCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
