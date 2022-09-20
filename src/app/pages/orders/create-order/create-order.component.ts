import { AddressBookDialogComponent } from './../address-book-dialog/address-book-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Customers } from './../../../models/customers';
import { ActivatedRoute } from '@angular/router';
import {
  Form,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { DataAddressesService } from 'src/app/core/services/addresses/data-addresses.service';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const today = new Date();
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit, AfterViewInit {
  order: Order;
  orderForm: FormGroup;
  generalForm: FormGroup;

  shippingInfoForm: FormGroup;
  embarcationForm: FormGroup;
  orderDetailsForm: FormGroup;

  customerId: any;
  customerName = new FormControl('');
  fromAddress = new FormControl('');
  toAddress = new FormControl('');
  customer: Customers;
  step = 0;

  addressBookIcon = faAddressBook;

  constructor(
    private customerService: DataCustomersService,
    private addressesService: DataAddressesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.buildForms();
  }

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    this.customerId = customerId;

    if (customerId) {
      this.getCustomer();
    }
  }

  ngAfterViewInit(): void {}

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

  buildForms() {
    this.orderForm = this.fb.group({
      general: new FormGroup({
        company: new FormControl(1),
        orderDate: new FormControl(today)

      }),
      shipper: new FormGroup({
        customer: new FormControl('', Validators.required),
        shippingAddress: new FormControl('', Validators.required),
        destinationAddress: new FormControl('', Validators.required),
      }),
    });
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
