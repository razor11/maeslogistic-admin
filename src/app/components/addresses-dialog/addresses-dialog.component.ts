import { ActivatedRoute } from '@angular/router';
import { AddressTypesService } from './../../core/services/address-types/address-types.service';
import { DataAddressesService } from './../../core/services/addresses/data-addresses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Addresses } from 'src/app/models/addresses';
import { first, of } from 'rxjs';
import { Parameters } from 'src/app/models/parameters';

@Component({
  selector: 'app-addresses-dialog',
  templateUrl: './addresses-dialog.component.html',
  styleUrls: ['./addresses-dialog.component.css'],
})
export class AddressesDialogComponent implements OnInit {
  form!: FormGroup;
  isAddMode!: boolean;
  customerId: any;
  title: string = 'Add';
  countries = [
    { value: 'USA', viewValue: 'USA' },
    { value: 'Honduras', viewValue: 'Honduras' },
    { value: 'El Salvador', viewValue: 'El Salvador' },
    { value: 'Guatemala', viewValue: 'Guatemala' },
  ];

  addrTypes: Parameters[];

  constructor(
    public dialogRef: MatDialogRef<AddressesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private addrService: DataAddressesService,
    private addrTypeService: AddressTypesService,

  ) {}

  ngOnInit(): void {
    this.isAddMode = !isNaN(this.data)
    this.loadData();

      this.customerId = this.data


    this.form = this.fb.group({
      contactName: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      phoneNumber2: ['', Validators.required],
      email: ['', Validators.email],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required],
      addressType: this.fb.group({
        id: [''],
      }),
    });

    if (!this.isAddMode) {
      console.log(this.data)
      this.form.patchValue(this.data);
      this.title = 'Update'
    }
  }

  loadData() {
    this.addrTypeService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.addrTypes = data;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.addAddress();
    } else {
      this.updateAddress();
    }
  }

  addAddress() {
    this.addrService
      .addNewAddr(this.customerId,this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  updateAddress() {
    this.addrService
      .updateAddr(this.data.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
