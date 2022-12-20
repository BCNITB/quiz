import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimariaPage } from './primaria.page';

const routes: Routes = [
  {
    path: '',
    component: PrimariaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimariaPageRoutingModule {}
