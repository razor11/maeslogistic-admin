import { delay, first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Addresses } from './../../../models/addresses';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataAddressesService } from './../../../core/services/addresses/data-addresses.service';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AddressesDialogComponent } from 'src/app/components/addresses-dialog/addresses-dialog.component';


@Component({
  selector: 'app-address-book-dialog',
  templateUrl: './address-book-dialog.component.html',
  styleUrls: ['./address-book-dialog.component.css']
})
export class AddressBookDialogComponent implements OnInit, AfterViewInit {

  addressBook: Addresses[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    'Name',
    'Address',
    'City',
    'Country'
  ];
  id: number;
  dataSource: MatTableDataSource<Addresses> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    public dialogRef: MatDialogRef<AddressBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addressService : DataAddressesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData():void {

     this.isLoadingResults = true;
     this.addressService
     .getByAccount(this.data)
     .pipe(first())
     .subscribe({
      next: (data) => {
        this.isLoadingResults = false;
        this.id= this.data;
        this.dataSource.data = data;
      },
     });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  addAddress(id?:any): void {
    const dialogRef = this.dialog.open(AddressesDialogComponent, {
      width: '980px',
      data:id,
      disableClose: true,
    });
    dialogRef.afterClosed().pipe(delay(700)).subscribe((res) => {
      if (res) {
         this.loadData();

      }
    });
  }
}
