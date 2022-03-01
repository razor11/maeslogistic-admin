import { LayoutComponent } from './../../pages/customers/layout/layout.component';
import { NavigationComponent } from '../../navigation/navigation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAddressesComponent } from 'src/app/pages/manage-addresses/manage-addresses.component';



const routes: Routes = [{
    path: '', component: NavigationComponent,
    children: [
        {
            path: 'home',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('../../modules/homePanel/homePanel.module').then(
                            m => m.HomePanelModule
                        )
                }
            ]
        },

        {
          path: 'customers',
          children: [
              {
                  path: '',
                  component: LayoutComponent,
                  loadChildren: () =>
                      import('../../modules/customer/customer.module').then(
                          m => m.CustomerModule
                      )
              }
          ]

      },

      {
        path:'manage-addresses',
        children: [
          {
            path: ':id',
            component: ManageAddressesComponent,
            loadChildren: () =>
              import('../../modules/manage-addresses/manage-addresses.module').then(
                m => m.ManageAddressesModule
              )
          }
        ]
      },


        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        }
    ]


},
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelRoutingModule { }
