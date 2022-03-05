import { TestBed } from '@angular/core/testing';

import { LogisticOperatorsService } from './logistic-operators.service';

describe('LogisticOperatorsService', () => {
  let service: LogisticOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
