import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrueComponent } from './true/true.component';
import { FalseComponent } from './false/false.component';

@NgModule({
  declarations: [
    TrueComponent,
    FalseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrueComponent,
    FalseComponent
  ]
})
export class ComponentsModule { }
