import { TestBed } from '@angular/core/testing';

import { EmbarcationsService } from './embarcations.service';

describe('EmbarcationsService', () => {
  let service: EmbarcationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbarcationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
