import { OfficesComponent } from './../offices.component';
import { CommomModulesModule } from './../../../shared/modules/material/commom-modules/commom-modules/commom-modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficesRoutingModule } from './offices-routing.module';



@NgModule({
  declarations: [OfficesComponent],
  imports: [
    CommonModule,
    CommomModulesModule,
    OfficesRoutingModule
  ]
})
export class OfficesModule { }
