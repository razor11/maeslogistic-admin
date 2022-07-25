import { RouterModule } from '@angular/router';
import { OfficesComponent } from './../offices.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: OfficesComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
