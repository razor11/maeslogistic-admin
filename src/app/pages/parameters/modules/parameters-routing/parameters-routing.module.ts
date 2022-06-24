import { CountriesComponent } from './../../countries/countries.component';
import { AddressTypesComponent } from './../../address-types/address-types.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersLayoutComponent } from '../../parameters-layout/parameters-layout.component';
import { TrackingStatesComponent } from '../../tracking-states/tracking-states.component';
import { PackagesTypesComponent } from '../../packages-types/packages-types.component';

const routes: Routes = [
  {
    path: '',
    component: ParametersLayoutComponent,

    children: [
      {
        path: 'address-types',
        component: AddressTypesComponent,
      },
      {
        path: 'countries',
        component: CountriesComponent,
      },
      {
        path:'tracking-status',
        component: TrackingStatesComponent
      },
      {
        path:'packages-types',
        component: PackagesTypesComponent
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forChild(routes)]],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
