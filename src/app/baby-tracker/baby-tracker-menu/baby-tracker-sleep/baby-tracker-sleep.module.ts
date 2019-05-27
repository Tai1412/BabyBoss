import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerSleepPage } from './baby-tracker-sleep.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerSleepPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyTrackerSleepPage]
})
export class BabyTrackerSleepPageModule {}
