import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerDiaperDetailPage } from './baby-tracker-diaper-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerDiaperDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyTrackerDiaperDetailPage]
})
export class BabyTrackerDiaperDetailPageModule {}
