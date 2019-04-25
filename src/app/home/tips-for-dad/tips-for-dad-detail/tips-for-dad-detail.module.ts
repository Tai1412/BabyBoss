import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipsForDadDetailPage } from './tips-for-dad-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TipsForDadDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipsForDadDetailPage]
})
export class TipsForDadDetailPageModule {}
