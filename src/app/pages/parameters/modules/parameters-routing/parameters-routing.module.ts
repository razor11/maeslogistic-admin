import { CountriesComponent } from './../../countries/countries.component';
import { AddressTypesComponent } from './../../address-types/address-types.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersLayoutComponent } from '../../parameters-layout/parameters-layout.component';
import { TrackingStatesComponent } from '../../tracking-states/tracking-states.component';

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
