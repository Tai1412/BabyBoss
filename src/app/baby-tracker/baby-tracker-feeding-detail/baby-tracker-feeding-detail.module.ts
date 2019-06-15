import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerFeedingDetailPage } from './baby-tracker-feeding-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerFeedingDetailPage
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
  declarations: [BabyTrackerFeedingDetailPage]
})
export class BabyTrackerFeedingDetailPageModule {}
