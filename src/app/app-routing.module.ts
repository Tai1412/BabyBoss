import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'baby-tracker', loadChildren: './baby-tracker/baby-tracker.module#BabyTrackerPageModule' },
  { path: 'baby-memory', loadChildren: './baby-memory/baby-memory.module#BabyMemoryPageModule' },
  { path: 'baby-recipes', loadChildren: './baby-recipes/baby-recipes.module#BabyRecipesPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
