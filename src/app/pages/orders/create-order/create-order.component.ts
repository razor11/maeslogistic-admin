import { PackageCatalogService } from './../../../core/services/package-catalog/package-catalog.service';
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
import { forkJoin, Subscription } from 'rxjs';
import { Packages } from 'src/app/models/packages';

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
  packagesCatalog: Packages[];

  customerId: any;
  customerName = new FormControl('');
  fromAddress = new FormControl('');
  toAddress = new FormControl('');
  customer: Customers;
  step = 0;


  subtotal:number = 0;
  subscription: Subscription;
  weightTotal: number = 0;


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
    private embarcationService: EmbarcationsService,
    private packageCatalogService: PackageCatalogService
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

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
    const packageCatalog = this.packageCatalogService.getAll(1,100);

    forkJoin([shippingTypes, serviceTypes, packageTypes, embarcations, packageCatalog])
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.shippingTypes = data[0];
          this.serviceTypes = data[1];
          this.packageTypes = data[2];
          this.embarcations = data[3].embarcations;
          this.packagesCatalog = data[4].packages;
          console.log(this.packagesCatalog)

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

    this.subscription = this.packages().valueChanges.subscribe(data => {
      this.subtotal = data.reduce((a: any,b: any) => a + +b.amount, 0);
      this.weightTotal = data.reduce((a:any, b:any) => a + +b.weight, 0);
    })
  }

  packages() :FormArray{
     return this.orderForm.get("orderDetail") as FormArray;
  }

  newPackage(): FormGroup {

    return this.fb.group({
      description: ['', Validators.required],
      weight: "",
      height: "",
      width: "",
      length: "",
      amount: "",
    });
  }

 addPackage(){
  this.packages().push(this.newPackage());
 }

 patchPackage(index:number, parcel:any){
  console.log(parcel)
     this.packages().at(index).patchValue({
      description: parcel.description,
      weight: parcel.weigth,
      height: parcel.heigth,
      width: parcel.width,
      length: parcel.large,
      amount: parcel.price
     });
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
