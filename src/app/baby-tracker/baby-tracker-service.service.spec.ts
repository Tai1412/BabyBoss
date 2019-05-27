import { TestBed } from '@angular/core/testing';

import { BabyTrackerServiceService } from './baby-tracker-service.service';

describe('BabyTrackerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BabyTrackerServiceService = TestBed.get(BabyTrackerServiceService);
    expect(service).toBeTruthy();
  });
});
