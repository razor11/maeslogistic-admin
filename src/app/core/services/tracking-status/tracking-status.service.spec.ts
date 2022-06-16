import { TestBed } from '@angular/core/testing';

import { TrackingStatusService } from './tracking-status.service';

describe('TrackingStatusService', () => {
  let service: TrackingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
