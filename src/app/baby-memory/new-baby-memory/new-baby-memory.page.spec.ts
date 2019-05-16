import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBabyMemoryPage } from './new-baby-memory.page';

describe('NewBabyMemoryPage', () => {
  let component: NewBabyMemoryPage;
  let fixture: ComponentFixture<NewBabyMemoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBabyMemoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBabyMemoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
