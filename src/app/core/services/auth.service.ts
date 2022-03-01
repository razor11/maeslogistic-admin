
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../enviroment';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { tokenGetter } from 'src/app/app.module';

const jwt = new JwtHelperService();
const tokenStatus = tokenGetter();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenAccess = new BehaviorSubject<any>(null);
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public userName : BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {

      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as string));
      console.log(this.currentUserSubject.value)
      this.userName = new BehaviorSubject<any>(
        localStorage.getItem('userName')
      )
      this.currentUser = this.currentUserSubject.asObservable();

      if(this.currentUserSubject != null){
        this.validateToken();


      }


  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

 public get getUserNameValue() {
    return this.userName.value;
  }


  validateToken(){
      if(jwt.isTokenExpired(tokenStatus as string)){
          this.logout();
      }
  }




  login(email: string, pwd: string) {
    const credentials = {
      username: email,
      password: pwd,
    };

    let headers = new HttpHeaders();

    return this.http
      .post<User>(`${environment.APIURL}/api/V1/authenticate`, credentials, {
        headers: headers,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const decode = jwt.decodeToken(user.access_token);
          this.userName.next(decode.username);
          localStorage.setItem('access_token', JSON.stringify(user.access_token))
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userName', decode.username);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    this.currentUserSubject.next(null);
    this.userName.next(null);
  }
}
