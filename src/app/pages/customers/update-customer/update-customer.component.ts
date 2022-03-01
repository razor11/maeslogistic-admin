import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  form: FormGroup;
  id: string;
  submited = false;
  customer: any;
  dataLoad = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: DataCustomersService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email:['', Validators.required],
      telephone: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
      addresses: this.fb.array([]),
     // confirmPassword: ['', this.isAddMode ? Validators.required : ''],
   });


   this.customerService.getById(this.id).pipe(first())
   .subscribe(data => {  this.form.patchValue(data)
    this.dataLoad = false;
    this.customer =data
    this.dataLoad = true;
  })
  }



  openPasswordDialog(): void {
     const dialogRef = this.dialog.open(ChangePasswordComponent, {
       width: '480'
     });

  }


  private updateCustomer(){
    this.customerService.updateClient(Number(this.id), this.form.value)
    .pipe(first())
    .subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route});
    })

  }


  onSubmit(){
    this.submited = true;

    if(this.form.invalid){
      return
    }

   else{
      this.updateCustomer();
    }

}


}
