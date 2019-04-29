import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyRecipesDetailPage } from './baby-recipes-detail.page';

describe('BabyRecipesDetailPage', () => {
  let component: BabyRecipesDetailPage;
  let fixture: ComponentFixture<BabyRecipesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyRecipesDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyRecipesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
