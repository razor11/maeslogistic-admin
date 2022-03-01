import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.access_token;
        const isApiUrl = request.url.startsWith(environment.APIURL);
        const apiAuth = request.url.startsWith(`${environment.APIURL}/api/V1/authenticate`)

       if(!isLoggedIn && apiAuth){
        console.log(currentUser)
        request = request.clone({

          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'HTTP-X-API-KEY': `${environment.APIKEY}`


           })

        });

      }


        if (isLoggedIn && isApiUrl) {
          console.log(currentUser)
            request = request.clone({

              setHeaders:
              {

                  Authorization: `Bearer ${currentUser.access_token}`
              },

            });
        }

        return next.handle(request);
    }
 }


