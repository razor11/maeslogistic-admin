
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageAddressesComponent } from '../pages/manage-addresses/manage-addresses.component';



const routes: Routes = [{path: '',
component: ManageAddressesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageAddressesRoutingModule { }
