import { ViewCustomerComponent } from './../pages/customers/view-customer/view-customer.component';
import { UpdateCustomerComponent } from './../pages/customers/update-customer/update-customer.component';
import { AddUpdateComponent } from './../pages/customers/add-update/add-update.component';
import { CustomersComponent } from './../pages/customers/customers.component';
import { LayoutComponent } from './../pages/customers/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path: '',
component: LayoutComponent,

children: [
  {
    path: '', component:CustomersComponent
  },
  {
    path:'add', component: AddUpdateComponent

  },
  {
    path: 'update/:id', component: UpdateCustomerComponent
  },
  {
    path: 'customer-detail', component:ViewCustomerComponent
  }
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
