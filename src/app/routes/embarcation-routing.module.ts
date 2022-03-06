import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmAdUpdateComponent } from "../pages/embarcations/em-ad-update/em-ad-update.component";
import { EmbarcationsComponent } from "../pages/embarcations/embarcations.component";

const routes: Routes = [{path: '',
component:EmbarcationsComponent,
children:[
    {
        path:'',component: EmbarcationsComponent
    },
    {
        path:'add', component:EmAdUpdateComponent
    }
]
}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class EmbarcationRoutingModule{}