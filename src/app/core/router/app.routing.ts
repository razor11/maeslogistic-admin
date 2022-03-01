
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [

  {
    path: 'login',
    loadChildren: () =>
      import('../../modules/login/login.module').then(
        m => m.LoginModule
      )
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./panel-routing.module').then(
        m => m.PanelRoutingModule
      )
  },

  { path: '**', redirectTo: '' },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
