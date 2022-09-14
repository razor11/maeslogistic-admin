import { OrdersLayoutComponent } from './../orders-layout/orders-layout.component';
import { CreateOrderComponent } from './../create-order/create-order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './../orders.component';
import { NgModule, Component } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: OrdersLayoutComponent,

    children: [
      {
        path: '',
        component: OrdersComponent,
      },
      {
        path: 'create-order',
        component: CreateOrderComponent,
      },
      {
        path: 'create-order/:customerId',
        component: CreateOrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
