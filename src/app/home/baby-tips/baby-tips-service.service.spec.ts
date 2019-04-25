import { TestBed } from '@angular/core/testing';

import { BabyTipsServiceService } from './baby-tips-service.service';

describe('BabyTipsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BabyTipsServiceService = TestBed.get(BabyTipsServiceService);
    expect(service).toBeTruthy();
  });
});
