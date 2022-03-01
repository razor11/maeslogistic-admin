import { MaterialModule } from './../../shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageAddressesRoutingModule } from './../../routes/manage-addresses.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAddressesComponent } from 'src/app/pages/manage-addresses/manage-addresses.component';



@NgModule({
  declarations: [ManageAddressesComponent],
  imports: [
    CommonModule,
    ManageAddressesRoutingModule,
    FlexLayoutModule,
    MaterialModule

  ]
})
export class ManageAddressesModule { }
