import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirstBabyFormPage } from './add-first-baby-form.page';

describe('AddFirstBabyFormPage', () => {
  let component: AddFirstBabyFormPage;
  let fixture: ComponentFixture<AddFirstBabyFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirstBabyFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirstBabyFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
