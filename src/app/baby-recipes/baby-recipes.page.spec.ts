import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyRecipesPage } from './baby-recipes.page';

describe('BabyRecipesPage', () => {
  let component: BabyRecipesPage;
  let fixture: ComponentFixture<BabyRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BabyRecipesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
