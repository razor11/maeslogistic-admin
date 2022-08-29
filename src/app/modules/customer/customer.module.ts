import { ManageAddressesComponent } from './../../pages/manage-addresses/manage-addresses.component';
import { UpdateCustomerComponent } from './../../pages/customers/update-customer/update-customer.component';
import { CustomersComponent } from './../../pages/customers/customers.component';
import { AddUpdateComponent } from './../../pages/customers/add-update/add-update.component';
import { LayoutComponent } from './../../pages/customers/layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from 'src/app/routes/customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChangePasswordComponent } from 'src/app/pages/customers/change-password/change-password.component';
import { AddressesDialogComponent } from 'src/app/components/addresses-dialog/addresses-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LayoutComponent,
    CustomersComponent,
    AddUpdateComponent,
    ChangePasswordComponent,
    UpdateCustomerComponent,
    AddressesDialogComponent,
    ManageAddressesComponent


  ],
})
export class CustomerModule {}
