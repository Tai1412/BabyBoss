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
          },
          {
            path:'baby-tracker-menu',
            children:[
              {
                path:'',
                loadChildren:'../baby-tracker/baby-tracker-menu/baby-tracker-menu.module#BabyTrackerMenuPageModule'
              },
              {
                path:'baby-tracker-sleep',
                loadChildren:'../baby-tracker/baby-tracker-menu/baby-tracker-sleep/baby-tracker-sleep.module#BabyTrackerSleepPageModule'
              },
              {
                path:'baby-tracker-diaper',
                loadChildren:'../baby-tracker/baby-tracker-menu/baby-tracker-diaper/baby-tracker-diaper.module#BabyTrackerDiaperPageModule'
              },
              {
                path:'baby-tracker-feeding',
                loadChildren:'../baby-tracker/baby-tracker-menu/baby-tracker-feeding/baby-tracker-feeding.module#BabyTrackerFeedingPageModule'
              },
              {
                path:'baby-tracker-health',
                loadChildren:'../baby-tracker/baby-tracker-menu/baby-tracker-health/baby-tracker-health.module#BabyTrackerHealthPageModule'
              },
          ]
          },
          {
            path:'baby-tracker-health/:RecordId',
            loadChildren:'../baby-tracker/baby-tracker-health-detail/baby-tracker-health-detail.module#BabyTrackerHealthDetailPageModule'
          },
          {
            path:'baby-tracker-diaper/:DiaperId',
            loadChildren:'../baby-tracker/baby-tracker-diaper-detail/baby-tracker-diaper-detail.module#BabyTrackerDiaperDetailPageModule'
          },
          {
            path:'baby-tracker-feeding/:FeedingId',
            loadChildren:'../baby-tracker/baby-tracker-feeding-detail/baby-tracker-feeding-detail.module#BabyTrackerFeedingDetailPageModule'
          },
          {
            path:'baby-tracker-sleep/:SleepId',
            loadChildren:'../baby-tracker/baby-tracker-sleep-detail/baby-tracker-sleep-detail.module#BabyTrackerSleepDetailPageModule'
          },
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
          },
          {
            path: 'privacy',
            loadChildren: '../profile/privacy/privacy.module#PrivacyPageModule'
          },
          {
            path: ':id',
            loadChildren: '../profile/baby-detail/baby-detail.module#BabyDetailPageModule'
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
