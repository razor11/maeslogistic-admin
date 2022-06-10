import { CountriesService } from './../../../core/services/countries/countries.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SnackbarService } from './../../../core/services/snackbar/snackbar.service';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { Component, OnInit } from '@angular/core';
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
import { StepperOrientation } from '@angular/cdk/stepper';
import { AddressTypesService } from 'src/app/core/services/address-types/address-types.service';
import { Parameters } from 'src/app/models/parameters';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.css'],
})
export class AddUpdateComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: DataCustomersService,
    private fb: FormBuilder,
    private snackBar: SnackbarService,
    private addrTypeService: AddressTypesService,
    private countriesDataService: CountriesService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(max-width: 1920px)')
      .pipe(map(({ matches }) => (matches ? 'vertical' : 'horizontal')));
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadParams();
    const passwordValidator = [Validators.minLength(6)];

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'confirmPassword'),
    };

    this.personalInfo = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
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
      addresses: this.fb.array([]),
    });
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

  get addresses() {
    return this.addressInfo.get('addresses') as FormArray;
  }

  addNewShipmentAddr() {
    const add = this.addressInfo.get('addresses') as FormArray;
    add.push(
      this.fb.group({
        contactName: [''],
        phoneNumber1: [''],
        phoneNumber2: [''],
        email: ['', [Validators.required, Validators.email]],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
        addressType: this.fb.group({
          id: [''],
        }),
      })
    );
  }

  getShipment(
    contacName: string,
    tel1: string,
    tel2: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    addressType: number
  ) {
    const add = this.addressInfo.get('addresses') as FormArray;
    add.push(
      this.fb.group({
        contactName: contacName,
        phoneNumber1: tel1,
        phoneNumber2: tel2,
        email: email,
        street: street,
        city: city,
        state: state,
        zipCode: zipCode,
        country: country,
        addressType: addressType,
      })
    );
  }

  removeShipmentAddr(index: number) {
    const remove = this.addressInfo.get('addresses') as FormArray;
    remove.removeAt(index);
  }

  get f() {
    return this.form.controls;
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
    const data = Object.assign(
      this.personalInfo.value,
      this.password.value,
      this.contactInfo.value,
      this.addressInfo.value
    );
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
            this.snackBar.openSnackBar('Customer Created', 'Dismiss')
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
