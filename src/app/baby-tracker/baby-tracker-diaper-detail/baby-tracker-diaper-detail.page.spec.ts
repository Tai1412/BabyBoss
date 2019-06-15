import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyTrackerDiaperDetailPage } from './baby-tracker-diaper-detail.page';

describe('BabyTrackerDiaperDetailPage', () => {
  let component: BabyTrackerDiaperDetailPage;
  let fixture: ComponentFixture<BabyTrackerDiaperDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyTrackerDiaperDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyTrackerDiaperDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
