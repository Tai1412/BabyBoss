import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { BabyTrackerPage } from '../baby-tracker/baby-tracker.page';
import { BabyRecipesPage } from '../baby-recipes/baby-recipes.page';
import { BabyMemoryPage } from '../baby-memory/baby-memory.page';
import {ProfilePage} from '../profile/profile.page';

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
          },
          {
            path:'tips-for-dad',
            children:[
              {
                path:'',
                loadChildren:'../home/tips-for-dad/tips-for-dad.module#TipsForDadPageModule'
              },
              {
                path:':id',
                loadChildren:'../home/tips-for-dad/tips-for-dad-detail/tips-for-dad-detail.module#TipsForDadDetailPageModule'
              }
          ]
          },
          {
            path:'tips-for-mom',
            children:[
              {
                path:'',
                loadChildren:'../home/tips-for-mom/tips-for-mom.module#TipsForMomPageModule'
              },
              {
                path:':id',
                loadChildren:'../home/tips-for-mom/tips-for-mom-detail/tips-for-mom-detail.module#TipsForMomDetailPageModule'
              }
          ]
          },
          {
            path:'baby-tips',
            children:[
              {
                path:'',
                loadChildren:'../home/baby-tips/baby-tips.module#BabyTipsPageModule'
              },
              {
                path:':id',
                loadChildren:'../home/baby-tips/baby-tips-detail/baby-tips-detail.module#BabyTipsDetailPageModule'
              }
          ]
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
          },
          {
            path: ':id',
            loadChildren: '../baby-recipes/baby-recipes-detail/baby-recipes-detail.module#BabyRecipesDetailPageModule'
          }
        ]
      },
      {
        path: 'baby-memory',
        children: [
          {
            path: '',
            loadChildren: '../baby-memory/baby-memory.module#BabyMemoryPageModule'
          },
          {
            path: 'new-baby-memory',
            loadChildren: '../baby-memory/new-baby-memory/new-baby-memory.module#NewBabyMemoryPageModule'
          },
          {
            path: ':id',
            loadChildren: '../baby-memory/baby-memory-detail/baby-memory-detail.module#BabyMemoryDetailPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          },
          {
            path: 'terms-and-condition',
            loadChildren: '../profile/terms-and-condition/terms-and-condition.module#TermsAndConditionPageModule'
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
