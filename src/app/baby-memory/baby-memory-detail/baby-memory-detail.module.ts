import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyMemoryDetailPage } from './baby-memory-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyMemoryDetailPage
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
  declarations: [BabyMemoryDetailPage]
})
export class BabyMemoryDetailPageModule {}
