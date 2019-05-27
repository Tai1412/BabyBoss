import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTrackerMenuPage } from './baby-tracker-menu.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTrackerMenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyTrackerMenuPage]
})
export class BabyTrackerMenuPageModule {}
