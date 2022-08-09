import { ActivatedRoute } from '@angular/router';
import { AddressTypesService } from './../../core/services/address-types/address-types.service';
import { DataAddressesService } from './../../core/services/addresses/data-addresses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Addresses } from 'src/app/models/addresses';
import { first, forkJoin, of } from 'rxjs';
import { Parameters } from 'src/app/models/parameters';
import { CountriesService } from 'src/app/core/services/countries/countries.service';

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
  countries: Parameters[];
  addrTypes: Parameters[];

  constructor(
    public dialogRef: MatDialogRef<AddressesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private addrService: DataAddressesService,
    private countriesDataService: CountriesService,
    private addrTypeService: AddressTypesService,

  ) {}

  ngOnInit(): void {
  //  this.isAddMode = !isNaN(this.data)
    this.data ? this.isAddMode = false : this.isAddMode = true;
    this.loadParams();

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
      this.form.patchValue(this.data);
      this.title = 'Update'
    }
  }

  loadParams() {
    const AddrsTypes = this.addrTypeService.getAll();
    const Countries = this.countriesDataService.getAll();

    forkJoin([AddrsTypes, Countries])
      .pipe(first())
      .subscribe((data) => {
        this.addrTypes = data[0];
        this.countries = data[1];

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
