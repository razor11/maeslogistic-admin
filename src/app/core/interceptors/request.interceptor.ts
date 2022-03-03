import { Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class auth implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(evt => {
        let evtMessage: any
        if (evt instanceof HttpResponse) {
          console.log('status = ', evt.status);
          if(evt.status === 202){
             evtMessage = evt.statusText
          }
        }



      }),
      catchError(error => {
        let errorMessage: any;

        if (error instanceof HttpErrorResponse) {
          console.error('error status = ', error.status);
          // console.log('---> filter:', req.params.get('filter'));

          if (error.status === 401) {
             errorMessage = 'Unauthorized';

          }

        }
        return throwError(errorMessage);
      })
    );;
  }
}
