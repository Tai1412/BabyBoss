import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyTipsDetailPage } from './baby-tips-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyTipsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyTipsDetailPage]
})
export class BabyTipsDetailPageModule {}
