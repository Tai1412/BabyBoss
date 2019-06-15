import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyTrackerFeedingDetailPage } from './baby-tracker-feeding-detail.page';

describe('BabyTrackerFeedingDetailPage', () => {
  let component: BabyTrackerFeedingDetailPage;
  let fixture: ComponentFixture<BabyTrackerFeedingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyTrackerFeedingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyTrackerFeedingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
