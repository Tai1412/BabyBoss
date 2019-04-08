import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyMemoryPage } from './baby-memory.page';

describe('BabyMemoryPage', () => {
  let component: BabyMemoryPage;
  let fixture: ComponentFixture<BabyMemoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyMemoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyMemoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
