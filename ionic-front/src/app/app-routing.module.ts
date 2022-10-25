import { GuardService } from './auth/guard.service';
import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    // canActivate: [GuardService],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'user-ads/:uid',
    loadChildren: () =>
      import('./pages/user-ads/user-ads.module').then(
        (m) => m.UserAdsPageModule
      ),
  },
  {
    path: 'ad-detail/:aid',
    loadChildren: () =>
      import('./pages/ad-detail/ad-detail.module').then(
        (m) => m.AdDetailPageModule
      ),
  },
  {
    path: 'my-ads/:uid',
    loadChildren: () =>
      import('./pages/my-ads/my-ads.module').then((m) => m.MyAdsPageModule),
  },
  {
    path: 'add-ad',
    loadChildren: () => import('./pages/add-ad/add-ad.module').then( m => m.AddAdPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
