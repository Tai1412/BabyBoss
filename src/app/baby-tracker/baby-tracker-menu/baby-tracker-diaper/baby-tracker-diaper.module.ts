import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerDiaperPage } from './baby-tracker-diaper.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerDiaperPage
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
  declarations: [BabyTrackerDiaperPage]
})
export class BabyTrackerDiaperPageModule {}
