import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoLayoutComponent } from "../pages/logistic-operators/lo-layout/lo-layout.component";
import { LogisticOperatorsComponent } from "../pages/logistic-operators/logistic-operators/logistic-operators.component";


const routes: Routes = [{path: '',
component:LoLayoutComponent,

children:[
    {
        path: '', component:LogisticOperatorsComponent
    },

]

}];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogisticOperatorRoutingmodule{}