import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmAdUpdateComponent } from "../pages/embarcations/em-ad-update/em-ad-update.component";
import { EmLayoutComponent } from "../pages/embarcations/em-layout/em-layout.component";

import { EmbarcationsComponent } from "../pages/embarcations/embarcations.component";

const routes: Routes = [{
    path: '',
    component: EmLayoutComponent,
    children: [
        {
            path: '', component: EmbarcationsComponent
        },
        {
            path: 'detail-view/:id', component: EmAdUpdateComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmbarcationRoutingModule { }
