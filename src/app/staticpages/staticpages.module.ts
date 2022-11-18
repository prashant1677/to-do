import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticpagesRoutingModule } from './staticpages-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    StaticpagesRoutingModule
  ]
})
export class StaticpagesModule { }
