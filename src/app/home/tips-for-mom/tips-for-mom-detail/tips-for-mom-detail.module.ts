import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipsForMomDetailPage } from './tips-for-mom-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TipsForMomDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipsForMomDetailPage]
})
export class TipsForMomDetailPageModule {}
