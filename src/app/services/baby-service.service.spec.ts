import { TestBed } from '@angular/core/testing';

import { BabyServiceService } from './baby-service.service';

describe('BabyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BabyServiceService = TestBed.get(BabyServiceService);
    expect(service).toBeTruthy();
  });
});
