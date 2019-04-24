import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsForMomPage } from './tips-for-mom.page';

describe('TipsForMomPage', () => {
  let component: TipsForMomPage;
  let fixture: ComponentFixture<TipsForMomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsForMomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsForMomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
