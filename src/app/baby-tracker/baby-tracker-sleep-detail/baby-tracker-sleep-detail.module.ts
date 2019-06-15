import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerSleepDetailPage } from './baby-tracker-sleep-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerSleepDetailPage
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
  declarations: [BabyTrackerSleepDetailPage]
})
export class BabyTrackerSleepDetailPageModule {}
