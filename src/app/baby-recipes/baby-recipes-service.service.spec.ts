import { TestBed } from '@angular/core/testing';

import { BabyRecipesServiceService } from './baby-recipes-service.service';

describe('BabyRecipesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BabyRecipesServiceService = TestBed.get(BabyRecipesServiceService);
    expect(service).toBeTruthy();
  });
});
