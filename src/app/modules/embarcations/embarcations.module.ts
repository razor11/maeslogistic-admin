import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbarcationsComponent } from 'src/app/pages/embarcations/embarcations.component';
import { EmbarcationRoutingModule } from 'src/app/routes/embarcation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmLayoutComponent } from 'src/app/pages/embarcations/em-layout/em-layout.component';
import { EmAdUpdateComponent } from 'src/app/pages/embarcations/em-ad-update/em-ad-update.component';



@NgModule({
  declarations: [EmLayoutComponent,EmbarcationsComponent, EmAdUpdateComponent],
  imports: [
    CommonModule,
    EmbarcationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class EmbarcationsModule { }
