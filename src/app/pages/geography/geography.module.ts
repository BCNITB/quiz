import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeographyPageRoutingModule } from './geography-routing.module';

import { GeographyPage } from './geography.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeographyPageRoutingModule
  ],
  declarations: [GeographyPage]
})
export class GeographyPageModule {}
