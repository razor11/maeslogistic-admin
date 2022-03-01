import { Addresses } from './../../models/addresses';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataAddressesService } from 'src/app/core/services/addresses/data-addresses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css'],
})
export class ManageAddressesComponent implements OnInit {
  id: number;
  addresses: Addresses[];

  constructor(
    private addressesService: DataAddressesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressesService
      .getByAccount(this.id)
      .pipe(first())
      .subscribe((data) => {
        this.addresses = data;
        console.log(data);
      });
  }

  goBack() {
    this.location.back();
  }
}
