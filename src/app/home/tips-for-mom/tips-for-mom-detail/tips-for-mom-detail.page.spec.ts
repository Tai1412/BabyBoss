import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsForMomDetailPage } from './tips-for-mom-detail.page';

describe('TipsForMomDetailPage', () => {
  let component: TipsForMomDetailPage;
  let fixture: ComponentFixture<TipsForMomDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsForMomDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsForMomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
