import { embarcation } from './../../../models/embarcation';
import { EmbarcationsService } from './../../../core/services/embarcations/embarcations.service';
import { PackagesTypesService } from './../../../core/services/packages-types/packages-types.service';
import { ShippingTypesService } from './../../../core/services/shipping-types/shipping-types.service';
import { AddressBookDialogComponent } from './../address-book-dialog/address-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Customers } from './../../../models/customers';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Parameters } from 'src/app/models/parameters';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { DataAddressesService } from 'src/app/core/services/addresses/data-addresses.service';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { ServicesTypesService } from 'src/app/core/services/services-types/services-types.service';
import { forkJoin } from 'rxjs';

const today = new Date();
const embarcationStatusId = 15;
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit, AfterViewInit {
  order: Order;
  orderForm: FormGroup;

  shippingTypes: Parameters[];
  serviceTypes: Parameters[];
  packageTypes: Parameters[];
  embarcations: any[];

  customerId: any;
  customerName = new FormControl('');
  fromAddress = new FormControl('');
  toAddress = new FormControl('');
  customer: Customers;
  step = 0;



  // icons

  addressBookIcon = faAddressBook;

  displayedColumns = ['Description', 'weight','height','width','length','price','discount']

  constructor(
    private customerService: DataCustomersService,
    private addressesService: DataAddressesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private shippingTypeService: ShippingTypesService,
    private serviceTypesService: ServicesTypesService,
    private packageTypeService: PackagesTypesService,
    private embarcationService: EmbarcationsService
  ) {
    this.loadParams();
    this.buildForms();
  }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    this.customerId = customerId;

    if (customerId) {
      this.getCustomer();
    }
  }

  ngAfterViewInit(): void {
    this.addPackage();
  }

  ngOnDestroy(): void {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  loadParams(): void {
    const shippingTypes = this.shippingTypeService.getAll();
    const serviceTypes = this.serviceTypesService.getAll();
    const packageTypes = this.packageTypeService.getAll();
    const embarcations = this.embarcationService.getEmbarcationByStatus(embarcationStatusId,1,100);

    forkJoin([shippingTypes, serviceTypes, packageTypes, embarcations])
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.shippingTypes = data[0];
          this.serviceTypes = data[1];
          this.packageTypes = data[2];
          this.embarcations = data[3].embarcations;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  buildForms() {
    this.orderForm = this.fb.group({
      general: new FormGroup({
        company: new FormControl(1),
        orderDate: new FormControl(today),
      }),
      shipper: new FormGroup({
        customer: new FormControl('', Validators.required),
        shippingAddress: new FormControl('', Validators.required),
        destinationAddress: new FormControl('', Validators.required),
      }),
      shipping: new FormGroup({
        shippingType: new FormControl('', Validators.required),
        serviceType: new FormControl('', Validators.required),
        packageType: new FormControl('', Validators.required),
        packageContent: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
      }),
      embarcation: new FormGroup({
        embarcation: new FormControl('', Validators.required)
      }),
      orderDetail: this.fb.array([])
    });
  }

  packages() :FormArray{
     return this.orderForm.get("orderDetail") as FormArray;
  }

  newPackage(): FormGroup {
    return this.fb.group({
      description: "",
      weight: "",
      height: "",
      width: "",
      length: "",
      price:"",
      discount: "",
      taxes: "",
      subtotal:"",
    });
  }

 addPackage(){
  this.packages().push(this.newPackage());
 }

 removePackage(index: number){
  this.packages().removeAt(index);
 }

  getCustomer() {
    this.customerService
      .getById(this.customerId)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.customer = data;
          this.customerName.patchValue(
            this.customer.firstName + ' ' + this.customer.lastName
          );
          this.orderForm.get('shipper.customer')!.patchValue(data.id);
        },
      });
  }

  getFromAddress(id: number): void {
    const dialogRef = this.dialog.open(AddressBookDialogComponent, {
      width: '780px',
      data: id,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.fromAddress.patchValue(
          res.street + ', ' + res.city + ', ' + res.country
        );
        this.orderForm.get('shipper.shippingAddress')!.patchValue(res.id);
      }
    });
  }

  getDestinationAddress(id: number): void {
    const dialogRef = this.dialog.open(AddressBookDialogComponent, {
      width: '780px',
      data: id,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.toAddress.patchValue(
          res.street + ', ' + res.city + ', ' + res.country
        );
        this.orderForm.get('shipper.destinationAddress')!.patchValue(res.id);
      }
    });
  }
}
