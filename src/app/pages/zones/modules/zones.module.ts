import { ZonesRoutingModule } from './zones-routing.module';
import { ZonesComponent } from './../zones.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommomModulesModule } from 'src/app/shared/modules/material/commom-modules/commom-modules/commom-modules.module';



@NgModule({
  declarations: [ZonesComponent],
  imports: [
    CommonModule,
    CommomModulesModule,
    ZonesRoutingModule
  ]
})
export class ZonesModule { }
