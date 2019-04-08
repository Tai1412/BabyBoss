import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerPage } from './baby-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyTrackerPage]
})
export class BabyTrackerPageModule {}
