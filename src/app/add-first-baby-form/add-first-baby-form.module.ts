import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddFirstBabyFormPage } from './add-first-baby-form.page';

const routes: Routes = [
  {
    path: '',
    component: AddFirstBabyFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddFirstBabyFormPage]
})
export class AddFirstBabyFormPageModule {}
