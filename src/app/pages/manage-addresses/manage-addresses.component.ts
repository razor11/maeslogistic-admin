import { MatDialog } from '@angular/material/dialog';
import { Addresses } from './../../models/addresses';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataAddressesService } from 'src/app/core/services/addresses/data-addresses.service';
import { Location } from '@angular/common';
import { AddressesDialogComponent } from 'src/app/components/addresses-dialog/addresses-dialog.component';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css'],
})
export class ManageAddressesComponent implements OnInit {
  id: number;
  customerName: any;
  customerLastName: any;
  addresses: Addresses[];
  isLoading: boolean = true;

  constructor(
    private addressesService: DataAddressesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerName = this.route.snapshot.queryParamMap.get('customerName');
    this.customerLastName =
      this.route.snapshot.queryParamMap.get('customerLastName');
    this.loadAddresses();
  }

  loadAddresses() {
    this.isLoading = true;
    this.addressesService
      .getByAccount(this.id)
      .pipe(first())
      .subscribe((data) => {
        this.addresses = data;
        this.isLoading = false;
      });
  }


  addDialog(id:any): void {
    const dialogRef = this.dialog.open(AddressesDialogComponent, {
      width: '480',
      data:id
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadAddresses();
      }
    });
  }


  updateDialog(param: any): void {
    const dialogRef = this.dialog.open(AddressesDialogComponent, {
      width: '480',
      data: param,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadAddresses();
      }
    });
  }

  deleteAddr(id: any){
    const addr = this.addresses.find(x => x.id === id);
    if(!addr) return;
    this.addressesService.delete(id).pipe(first()).subscribe(() => {
      this.addresses.filter(x => x.id !== id)
      this.loadAddresses()
    })

  }



  goBack() {
    this.location.back();
  }
}
