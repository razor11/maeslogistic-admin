import { ActivatedRoute } from '@angular/router';
import { AddressTypesService } from './../../core/services/address-types/address-types.service';
import { DataAddressesService } from './../../core/services/addresses/data-addresses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Addresses } from 'src/app/models/addresses';
import { first, forkJoin, of } from 'rxjs';
import { Parameters } from 'src/app/models/parameters';
import { CountriesService } from 'src/app/core/services/countries/countries.service';
import { GoogleAddressService } from 'src/app/core/services/google-address/google-address.service';

@Component({
  selector: 'app-addresses-dialog',
  templateUrl: './addresses-dialog.component.html',
  styleUrls: ['./addresses-dialog.component.css'],
})
export class AddressesDialogComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  isAddMode!: boolean;
  customerId: any;
  title: string = 'Add';
  countries: Parameters[];
  addrTypes: Parameters[];

  formattedAddress: string;
  autocomplete: google.maps.places.Autocomplete;
  place!: any;

  @ViewChild('addressField') addressField: any;
  @ViewChild('addressType') addressType: any;

  constructor(
    public dialogRef: MatDialogRef<AddressesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private addrService: DataAddressesService,
    private countriesDataService: CountriesService,
    private addrTypeService: AddressTypesService,
    private googleAddressService: GoogleAddressService
  ) {
    this.loadParams();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.getPlaceAutomplete();
  }

  buildForm() {
    this.data
      ? ((this.isAddMode = false), (this.title = 'Update'))
      : ((this.isAddMode = true), (this.title = 'Add'));

    this.form = this.fb.group({
      contactName: ['', Validators.required],
      phoneNumber1: ['', Validators.required],
      phoneNumber2: ['', Validators.required],
      email: ['', Validators.email],
      street: ['', Validators.required],
      suite: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(5)]],
      country: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      addressType: this.fb.group({
        id: [''],
      }),
    });

    if (!this.isAddMode) {
      this.form.patchValue(this.data);
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

  private getPlaceAutomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressField.nativeElement,
      {
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.place = this.autocomplete.getPlace();
      this.formattedAddress = this.googleAddressService.getFormattedAddress(
        this.place
      );
      this.patchGoogleAddress();
    });
  }

  patchGoogleAddress() {
    const Street =
      this.googleAddressService.getStreetNumber(this.place) +
      ' ' +
      this.googleAddressService.getStreet(this.place);
    const ZipCode = this.googleAddressService.getPostCode(this.place);
    const City = this.googleAddressService.getLocality(this.place);
    const Country = this.googleAddressService.getCountry(this.place);
    const State = this.googleAddressService.getState(this.place);
    const Latitude = this.place.geometry!.location!.lat().toString();
    const Longitude = this.place.geometry!.location!.lng().toString();

    this.form.patchValue({
      street: Street,
      zipCode: ZipCode,
      city: City,
      country: Country,
      state: State,
      latitude: Latitude,
      longitude: Longitude,
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
      .addNewAddr(this.customerId, this.form.value)
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
