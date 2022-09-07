import { OrdersRoutingModule } from './orders-routing.module';
import { CommomModulesModule } from 'src/app/shared/modules/material/commom-modules/commom-modules/commom-modules.module';
import { OrdersComponent } from './../orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, CommomModulesModule, OrdersRoutingModule],
})
export class OrdersModule {}
