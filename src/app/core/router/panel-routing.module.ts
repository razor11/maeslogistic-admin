import { ParametersLayoutComponent } from './../../pages/parameters/parameters-layout/parameters-layout.component';
import { LayoutComponent } from './../../pages/customers/layout/layout.component';
import { NavigationComponent } from '../../navigation/navigation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAddressesComponent } from 'src/app/pages/manage-addresses/manage-addresses.component';
import { LoLayoutComponent } from 'src/app/pages/logistic-operators/lo-layout/lo-layout.component';
import { EmbarcationsComponent } from 'src/app/pages/embarcations/embarcations.component';
import { EmLayoutComponent } from 'src/app/pages/embarcations/em-layout/em-layout.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../modules/homePanel/homePanel.module').then(
                (m) => m.HomePanelModule
              ),
          },
        ],
      },

      {
        path: 'offices',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/offices/modules/offices.module').then(
                (o) => o.OfficesModule
              ),
          },
        ],
      },

      {
        path: 'zones',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/zones/modules/zones.module').then(
                (m) => m.ZonesModule
              ),
          },
        ],
      },

      {
        path: 'logistic-operators',
        children: [
          {
            path: '',
            component: LoLayoutComponent,
            loadChildren: () =>
              import(
                '../../modules/logistic-operators/logistic-operators.module'
              ).then((m) => m.LogisticOperatorModule),
          },
        ],
      },

      {
        path: 'parameters',
        children: [
          {
            path: '',
            component: ParametersLayoutComponent,
            loadChildren: () =>
              import(
                '../../pages/parameters/modules/parameters/parameters.module'
              ).then((m) => m.ParametersModule),
          },
        ],
      },

      {
        path: 'embarcations',
        children: [
          {
            path: '',
            component: EmLayoutComponent,
            loadChildren: () =>
              import('../../modules/embarcations/embarcations.module').then(
                (m) => m.EmbarcationsModule
              ),
          },
        ],
      },

      {
        path: 'customers',
        children: [
          {
            path: '',
            component: LayoutComponent,
            loadChildren: () =>
              import('../../modules/customer/customer.module').then(
                (m) => m.CustomerModule
              ),
          },
        ],
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
