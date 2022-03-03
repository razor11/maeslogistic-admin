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
import {MatStepperModule} from '@angular/material/stepper';


import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from './core/services/auth.service';
import { auth } from './core/interceptors/request.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './pages/customers/customers.component';
import { AppRoutingModule } from './core/router/app.routing';
import { HomeComponent } from './pages/home/home.component';
import { DataCustomersService } from './core/services/customers/data-customers.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { DataAddressesService } from './core/services/addresses/data-addresses.service';
import { AddressesDialogComponent } from './components/addresses-dialog/addresses-dialog.component';



export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    AddressesDialogComponent

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

  ],
  providers: [
    AuthService,
    DataCustomersService,
    DataAddressesService,
    SnackbarService,
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
