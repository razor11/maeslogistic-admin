import { AddressTypesComponent } from './../../address-types/address-types.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersLayoutComponent } from '../../parameters-layout/parameters-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ParametersLayoutComponent,

    children: [
      {
        path:'address-types',
        component: AddressTypesComponent
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forChild(routes)]],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
