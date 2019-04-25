import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsForDadDetailPage } from './tips-for-dad-detail.page';

describe('TipsForDadDetailPage', () => {
  let component: TipsForDadDetailPage;
  let fixture: ComponentFixture<TipsForDadDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsForDadDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsForDadDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
