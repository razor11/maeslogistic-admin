import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticOperatorsComponent } from 'src/app/pages/logistic-operators/logistic-operators/logistic-operators.component';
import { LogisticOperatorRoutingmodule } from 'src/app/routes/logistic-operator-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoLayoutComponent } from 'src/app/pages/logistic-operators/lo-layout/lo-layout.component';




@NgModule({
  declarations: [LoLayoutComponent,
  LogisticOperatorsComponent],
  imports: [
    CommonModule,
    LogisticOperatorRoutingmodule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class LogisticOperatorModule { }

