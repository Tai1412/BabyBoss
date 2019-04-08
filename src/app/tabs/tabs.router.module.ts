import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { BabyTrackerPage } from '../baby-tracker/baby-tracker.page';
import { BabyRecipesPage } from '../baby-recipes/baby-recipes.page';
import { BabyMemoryPage } from '../baby-memory/baby-memory.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'baby-tracker',
        children: [
          {
            path: '',
            loadChildren: '../baby-tracker/baby-tracker.module#BabyTrackerPageModule'
          }
        ]
      },
      {
        path: 'baby-recipes',
        children: [
          {
            path: '',
            loadChildren: '../baby-recipes/baby-recipes.module#BabyRecipesPageModule'
          }
        ]
      },
      {
        path: 'baby-memory',
        children: [
          {
            path: '',
            loadChildren: '../baby-memory/baby-memory.module#BabyMemoryPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
