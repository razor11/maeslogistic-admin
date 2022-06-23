import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbarcationsComponent } from 'src/app/pages/embarcations/embarcations.component';
import { EmbarcationRoutingModule } from 'src/app/routes/embarcation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmLayoutComponent } from 'src/app/pages/embarcations/em-layout/em-layout.component';
import { EmAdUpdateComponent } from 'src/app/pages/embarcations/em-ad-update/em-ad-update.component';
import { EmAddComponent } from 'src/app/pages/embarcations/dialogs/em-add/em-add.component';
import { EmbarcationsFormComponent } from 'src/app/components/embarcations-form/embarcations-form.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    EmLayoutComponent,
    EmAddComponent,
    EmbarcationsComponent,
    EmAdUpdateComponent,
    EmbarcationsFormComponent
  ],
  imports: [
    CommonModule,
    EmbarcationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule
  ],
})
export class EmbarcationsModule {}
