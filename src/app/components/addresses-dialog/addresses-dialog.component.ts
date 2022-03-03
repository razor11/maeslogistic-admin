import { DataAddressesService } from './../../core/services/addresses/data-addresses.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Addresses } from 'src/app/models/addresses';

@Component({
  selector: 'app-addresses-dialog',
  templateUrl: './addresses-dialog.component.html',
  styleUrls: ['./addresses-dialog.component.css']
})
export class AddressesDialogComponent implements OnInit {

  constructor(
  /*    public dialogRef: MatDialogRef<AddressesDialogComponent>,
     @Inject(MAT_DIALOG_DATA)() public data: Addresses,
     private fb: FormBuilder,
     private addrService: DataAddressesService */

  ) { }

  ngOnInit(): void {
  }

}
