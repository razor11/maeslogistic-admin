import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationRoutingModule } from '../navigation-routing/navigation-routing.module';



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NavigationRoutingModule
  ],

  declarations: []
})
export class NavigationModule { }
