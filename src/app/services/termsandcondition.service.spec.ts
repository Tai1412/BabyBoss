import { TestBed } from '@angular/core/testing';

import { TermsandconditionService } from './termsandcondition.service';

describe('TermsandconditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermsandconditionService = TestBed.get(TermsandconditionService);
    expect(service).toBeTruthy();
  });
});
