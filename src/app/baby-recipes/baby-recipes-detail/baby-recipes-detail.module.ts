import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BabyRecipesDetailPage } from './baby-recipes-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BabyRecipesDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BabyRecipesDetailPage]
})
export class BabyRecipesDetailPageModule {}
