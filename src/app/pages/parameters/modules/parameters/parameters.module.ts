import { ServiceTypesComponent } from './../../service-types/service-types.component';
import { ShippingTypesComponent } from './../../shipping-types/shipping-types.component';
import { PackagesTypesComponent } from './../../packages-types/packages-types.component';
import { CountriesComponent } from './../../countries/countries.component';
import { ParametersLayoutComponent } from './../../parameters-layout/parameters-layout.component';
import { CommomModulesModule } from './../../../../shared/modules/material/commom-modules/commom-modules/commom-modules.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersRoutingModule } from '../parameters-routing/parameters-routing.module';
import { ParamsDataTableComponent } from 'src/app/components/params-data-table/params-data-table.component';
import { AddressTypesComponent } from '../../address-types/address-types.component';
import { TrackingStatesComponent } from '../../tracking-states/tracking-states.component';

@NgModule({
  declarations: [
    ParametersLayoutComponent,
    ParamsDataTableComponent,
    AddressTypesComponent,
    CountriesComponent,
    TrackingStatesComponent,
    PackagesTypesComponent,
    ShippingTypesComponent,
    ServiceTypesComponent
  ],
  imports: [CommonModule, CommomModulesModule, ParametersRoutingModule],
})
export class ParametersModule {}
