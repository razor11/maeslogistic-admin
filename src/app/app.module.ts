import { SnackbarService } from './core/services/snackbar/snackbar.service';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './shared/modules/material/material.module';



import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from './core/services/auth.service';
import { auth } from './core/interceptors/request.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './core/router/app.routing';
import { HomeComponent } from './pages/home/home.component';
import { DataCustomersService } from './core/services/customers/data-customers.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { DataAddressesService } from './core/services/addresses/data-addresses.service';
import { LoAddUpdateComponent } from './pages/logistic-operators/lo-add-update/lo-add-update.component';
import { IdLogisticOperatorsAddComponent } from './pages/logistic-operators/dialogs/id-logistic-operators-add/id-logistic-operators-add.component';
import { CountriesService } from './core/services/countries/countries.service';
import { AddressTypesService } from './core/services/address-types/address-types.service';
import { ParametersUpdateDialogComponent } from './components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import { AddParameterDialogComponent } from './components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ChartsModule} from 'ng2-charts';
import { LoDetailViewComponent } from './pages/logistic-operators/lo-detail-view/lo-detail-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    LoAddUpdateComponent,
    IdLogisticOperatorsAddComponent,
    ParametersUpdateDialogComponent,
    AddParameterDialogComponent,
    ConfirmDialogComponent,
    LoDetailViewComponent


  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },

    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ChartsModule,
    FontAwesomeModule,


  ],
  providers: [
    AuthService,
    DataCustomersService,
    DataAddressesService,
    SnackbarService,
    DatePipe,
    AddressTypesService,
    CountriesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:auth,
      multi: true,
    }
   ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
