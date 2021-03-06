import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerFeedingPage } from './baby-tracker-feeding.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerFeedingPage
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
  declarations: [BabyTrackerFeedingPage]
})
export class BabyTrackerFeedingPageModule {}
