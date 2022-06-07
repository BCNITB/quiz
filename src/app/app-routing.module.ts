import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'geography',
    loadChildren: () => import('./pages/geography/geography.module').then( m => m.GeographyPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'tester',
    loadChildren: () => import('./pages/tester/tester.module').then( m => m.TesterPageModule)
  },
  {
    path: 'finish-game',
    loadChildren: () => import('./pages/finish-game/finish-game.module').then( m => m.FinishGamePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
