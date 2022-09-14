import { first } from 'rxjs/operators';
import { Customers } from './../../../models/customers';
import { ActivatedRoute } from '@angular/router';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent implements OnInit, AfterViewInit {
  order: Order;
  generalForm: FormGroup;
  shipperInfoForm: FormGroup;
  shippingInfoForm: FormGroup;
  embarcationForm: FormGroup;
  orderDetailsForm: FormGroup;

  customerId: any;
  customer: Customers;

  constructor(
    private customerService: DataCustomersService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    this.customerId = customerId;

    if (customerId) {
      this.customerService
        .getById(this.customerId)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.customer = data;
            console.log(data);
          },
        });
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  buildForms() {
    this.shipperInfoForm = this.fb.group({
      customer: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      destinationAddress: ['', Validators.required],
    });
  }
}
