import { ZonesComponent } from './../zones.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ZonesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, [RouterModule.forChild(routes)]],
  exports: [RouterModule],
})
export class ZonesRoutingModule {}
