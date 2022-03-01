import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    if(this.authenticationService.tokenAccess){
      this.router.navigate(['/']);
    }
  }

  openSnackBar(message:string){
    let actionText = 'Dismiss'
    this._snackBar.open(message, actionText);
    setTimeout(() => {
      this._snackBar.dismiss()
    }, 3000
    )
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username:['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


   // convenience getter for easy access to form fields
   get username() { return this.loginForm.get('username'); }
   get password() { return this.loginForm.get('password'); }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.loginForm.invalid) {
           return;
       }

       this.loading = true;
       this.authenticationService.login(this.username?.value, this.password?.value)
           .pipe(first())
           .subscribe(
               data => {
                   this.router.navigate([this.returnUrl]);

               },
               error => {
                   this.error = error;
                   this.openSnackBar(this.error);
                   this.loading = false;
               });
   }
}
