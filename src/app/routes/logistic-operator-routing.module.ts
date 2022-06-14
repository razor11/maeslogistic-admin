import { LoDetailViewComponent } from './../pages/logistic-operators/lo-detail-view/lo-detail-view.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoAddUpdateComponent } from "../pages/logistic-operators/lo-add-update/lo-add-update.component";
import { LoLayoutComponent } from "../pages/logistic-operators/lo-layout/lo-layout.component";
import { LogisticOperatorsComponent } from "../pages/logistic-operators/logistic-operators/logistic-operators.component";


const routes: Routes = [{path: '',
component:LoLayoutComponent,

children:[
    {
        path: '', component:LogisticOperatorsComponent
    },
    {
        path: 'add', component:LoAddUpdateComponent
    },
    {
      path: 'detail-view/:id', component: LoDetailViewComponent
    }

]

}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogisticOperatorRoutingmodule{}
