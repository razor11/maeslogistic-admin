import { Addresses } from './../../../models/addresses';
import { GoogleAddressService } from './../../../core/services/google-address/google-address.service';
import { CountriesService } from './../../../core/services/countries/countries.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SnackbarService } from './../../../core/services/snackbar/snackbar.service';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/helpers/validators/must-match.validator';
import { first, forkJoin, map, Observable } from 'rxjs';
import {
  StepperOrientation,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { AddressTypesService } from 'src/app/core/services/address-types/address-types.service';
import { Parameters } from 'src/app/models/parameters';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddUpdateComponent implements OnInit, AfterViewInit {
  personalInfo: FormGroup;
  contactInfo: FormGroup;
  addressInfo: FormGroup;
  password: FormGroup;
  form: any;
  id: string;
  submited = false;
  error = '';
  countries: Parameters[];
  addressTypes: Parameters[];
  stepperOrientation: Observable<StepperOrientation>;
  autocomplete: google.maps.places.Autocomplete;
  formattedAddress: string;
  isplaceChange = false;

  isOptional = true;

  stepsErrorMessages: any = {
    personalInfo: 'Fill out the required fields',
    contactInfo: 'Complete the fields marks in red',
    address:
      'You have to select a verified address and complete the fields marks in red',
  };



  pInfoFormErrors: any = {
    firstName: '',
    lastName: '',
    userName: '',
  };

  validationMessages: any = {
    firstName: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastName: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    userName: {
      required: 'User Name is required.',
      minlength: 'User Name must be at least 2 characters long.',
      maxlength: 'User Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  place!: any;
  @ViewChild('addressField') addressField: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: DataCustomersService,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private addrTypeService: AddressTypesService,
    private countriesDataService: CountriesService,
    private googleAddressService: GoogleAddressService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(max-width: 1920px)')
      .pipe(map(({ matches }) => (matches ? 'vertical' : 'horizontal')));
    this.createForms();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadParams();
    const passwordValidator = [Validators.minLength(6)];

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword'),
    };
  }

  ngAfterViewInit(): void {
    this.getPlaceAutomplete();
  }

  createForms(): void {
    this.personalInfo = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      middleName: [''],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      userName: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.password = this.fb.group({
      password: [''],
      // confirmPassword: ['', this.isAddMode ? Validators.required : ''],
    });

    this.contactInfo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      companyName: ['', Validators.required],
    });

    this.addressInfo = this.fb.group({
      contactName: [''],
      phoneNumber1: [''],
      phoneNumber2: [''],
      email: ['', [Validators.required, Validators.email]],
      street: [''],
      suite: [''],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
      zipCode: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      addressType: this.fb.group({
        id: [''],
      }),
    });

    this.personalInfo.valueChanges.subscribe((data) =>
      this.pInfoFormOnValueChange(data)
    );

    this.pInfoFormOnValueChange();
  }

  private getPlaceAutomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressField.nativeElement,
      {
        componentRestrictions: { country: ['us', 'ca'] },
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

  enableFormsControls() {
    this.addressInfo.controls['city'].enable();
    this.addressInfo.controls['state'].enable();
    this.addressInfo.controls['zipCode'].enable();
    this.addressInfo.controls['country'].enable();
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

    this.addressInfo.patchValue({
      street: Street,
      zipCode: ZipCode,
      city: City,
      country: Country,
      state: State,
      latitude: Latitude,
      longitude: Longitude,
    });
  }

  pInfoFormOnValueChange(data?: any) {
    if (!this.personalInfo) {
      return;
    }
    const form = this.personalInfo;

    for (const field in this.pInfoFormErrors) {
      if (this.pInfoFormErrors.hasOwnProperty(field)) {
        this.pInfoFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.pInfoFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  loadParams() {
    const AddrsTypes = this.addrTypeService.getAll();
    const Countries = this.countriesDataService.getAll();

    forkJoin([AddrsTypes, Countries])
      .pipe(first())
      .subscribe((data) => {
        this.addressTypes = data[0];
        this.countries = data[1];
      });
  }

  onSubmit() {
    this.submited = true;

    if (this.personalInfo.invalid && this.password.invalid) {
      return;
    } else {
      this.createCustomer();
    }
  }

  private createCustomer() {
    const addresses = { addresses: [this.addressInfo.value] };
    const data = Object.assign(
      this.personalInfo.value,
      this.password.value,
      this.contactInfo.value,
      addresses
    );
    console.log(data);
    this.customerService
      .addCLient(data)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status === 202) {
            this.error = data.error;
            let actionText = 'Dismiss';
            this.snackBar.openSnackBar(this.error, actionText);
            return;
          } else {
            this.snackBar.openSnackBar('Customer created', 'Dismiss');
            this.router.navigate(['../'], { relativeTo: this.route });
          }
          //
        },
        (error) => {
          this.error = error;
          let actionText = 'Dismiss';
          this.snackBar.openSnackBar(this.error, actionText);
        }
      );
  }

  test() {
    this.form = Object.assign(
      this.personalInfo.value,
      this.password.value,
      this.contactInfo.value,
      this.addressInfo.value
    );
  }
}


