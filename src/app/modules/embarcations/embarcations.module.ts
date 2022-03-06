import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbarcationsComponent } from 'src/app/pages/embarcations/embarcations.component';
import { EmbarcationRoutingModule } from 'src/app/routes/embarcation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [EmbarcationsComponent],
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
