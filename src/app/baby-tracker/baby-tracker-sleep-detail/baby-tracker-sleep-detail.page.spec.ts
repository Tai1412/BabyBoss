import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyTrackerSleepDetailPage } from './baby-tracker-sleep-detail.page';

describe('BabyTrackerSleepDetailPage', () => {
  let component: BabyTrackerSleepDetailPage;
  let fixture: ComponentFixture<BabyTrackerSleepDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyTrackerSleepDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyTrackerSleepDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
