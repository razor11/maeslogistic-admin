import { ParametersLayoutComponent } from './../../parameters-layout/parameters-layout.component';
import { CommomModulesModule } from './../../../../shared/modules/material/commom-modules/commom-modules/commom-modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from '../parameters-routing/parameters-routing.module';
import { ParamsDataTableComponent } from 'src/app/components/params-data-table/params-data-table.component';
import { AddressTypesComponent } from '../../address-types/address-types.component';

@NgModule({
  declarations: [ParametersLayoutComponent,ParamsDataTableComponent, AddressTypesComponent],
  imports: [CommonModule, CommomModulesModule, ParametersRoutingModule],
})
export class ParametersModule {}
