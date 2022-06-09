import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  form: FormGroup;
  id: string;
  submited = false;
  customer: any;
  dataLoad = false;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: DataCustomersService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      companyName: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
      addresses: this.fb.array([]),
      // confirmPassword: ['', this.isAddMode ? Validators.required : ''],
    });

    this.loadData();
    this.form.disable();
  }

  loadData() {
    this.customerService
      .getById(this.id)
      .pipe(first())
      .subscribe((data) => {
        this.form.patchValue(data);
        this.dataLoad = false;
        this.customer = data;
        this.dataLoad = true;
      });
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '480',
    });
  }

  confirmDialog(): void {
    const message = `Are you sure you want to apply the changes?`;
    const dialogData = new ConfirmDialogModel('Confirm Changes', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.onSubmit();
      } else {
        this.loadData();
      }
    });
  }

  private updateCustomer() {
    this.customerService
      .updateClient(Number(this.id), this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.loadData();
      });
  }

  editCustomer() {
    this.form.enable();
    this.hide = false;
  }

  cancel() {
    this.form.disable();
    this.hide = true;
  }

  onSubmit() {
    this.submited = true;

    if (this.form.invalid) {
      return;
    } else {
      this.updateCustomer();
    }
  }
}
