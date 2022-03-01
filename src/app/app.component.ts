import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maeslogistic-admin-panel';

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthService

)
{
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

}



}
