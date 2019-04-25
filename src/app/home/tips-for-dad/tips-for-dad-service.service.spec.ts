import { TestBed } from '@angular/core/testing';

import { TipsForDadServiceService } from './tips-for-dad-service.service';

describe('TipsForDadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsForDadServiceService = TestBed.get(TipsForDadServiceService);
    expect(service).toBeTruthy();
  });
});
