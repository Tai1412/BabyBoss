import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyTrackerPage } from './baby-tracker.page';

describe('BabyTrackerPage', () => {
  let component: BabyTrackerPage;
  let fixture: ComponentFixture<BabyTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyTrackerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
