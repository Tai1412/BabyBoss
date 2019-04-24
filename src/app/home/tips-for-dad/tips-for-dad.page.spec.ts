import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsForDadPage } from './tips-for-dad.page';

describe('TipsForDadPage', () => {
  let component: TipsForDadPage;
  let fixture: ComponentFixture<TipsForDadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsForDadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsForDadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
