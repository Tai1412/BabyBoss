import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyTrackerHealthDetailPage } from './baby-tracker-health-detail.page';

describe('BabyTrackerHealthDetailPage', () => {
  let component: BabyTrackerHealthDetailPage;
  let fixture: ComponentFixture<BabyTrackerHealthDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyTrackerHealthDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyTrackerHealthDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
