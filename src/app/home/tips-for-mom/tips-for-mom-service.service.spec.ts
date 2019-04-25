import { TestBed } from '@angular/core/testing';

import { TipsForMomServiceService } from './tips-for-mom-service.service';

describe('TipsForMomServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsForMomServiceService = TestBed.get(TipsForMomServiceService);
    expect(service).toBeTruthy();
  });
});
