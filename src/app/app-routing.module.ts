import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/auth.guard';
import { LessonGuard } from './services/lesson.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',canActivate:[LessonGuard],},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule',canActivate:[LessonGuard], },
  { path: 'welcome-add-baby', loadChildren: './welcome-add-baby/welcome-add-baby.module#WelcomeAddBabyPageModule' ,canActivate:[AuthGuard]},
  { path: 'add-first-baby-form', loadChildren: './add-first-baby-form/add-first-baby-form.module#AddFirstBabyFormPageModule',canActivate:[AuthGuard] },
  { path: 'lesson', loadChildren: './lesson/lesson.module#LessonPageModule' },
  { path: 'choose-baby', loadChildren: './choose-baby/choose-baby.module#ChooseBabyPageModule',canActivate:[AuthGuard] },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' ,canActivate:[AuthGuard], },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
