import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Customers } from './../../models/customers';
import { first, startWith, switchMap, catchError, map } from 'rxjs/operators';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataCustomersService } from 'src/app/core/services/customers/data-customers.service';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  customers: Customers[] = [];
  isDeleting: boolean = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageEvent: PageEvent;
  isLoading: boolean = true;
  isRateLimitReached = false;

  orderIcon= faBoxOpen;

  displayedColumns: string[] = ['Name', 'Email', 'User Name', 'Actions'];
  dataSource: MatTableDataSource<Customers> = new MatTableDataSource();

  constructor(
    private customersService: DataCustomersService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.customersService!.getAll(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          this.isLoading = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.totalRows = data.CustomerCant;
          return data.customers;
        })
      )
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (e) => console.log(e),
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.customersService
      .getByName(this.paginator.pageIndex, this.paginator.pageSize, filterValue)
      .subscribe((data) => {
        this.dataSource.data = data.customers;
        this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCustomers() {
    this.isLoading = true;

    this.customersService
      .getAll(this.currentPage, this.pageSize)
      .pipe(first())
      .subscribe((data) => {
        this.dataSource.data = data.customers;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = data.CustomerCant;
        });
        this.isLoading = false;
      });
  }

  confirmDialog(id: string): void {
    const message = `Are you want to delete this customer?`;
    const dialogData = new ConfirmDialogModel('Confirm Changes', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteClient(id);
      }
    });
  }

  deleteClient(id: any) {
    const client = this.dataSource.data.find((x) => x.id === id);
    if (!client) return;
    this.isDeleting = true;
    this.customersService
      .deleteClient(Number(id))
      .pipe(first())
      .subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(
            (x) => x.id !== id
          );
        },
        error: (e) => this.snackBar.openSnackBar(e, 'Dismiss'),
        complete: () => {
          this.snackBar.openSnackBar('Customer deleted succesfully', 'Dismiss');
          this.paginator.firstPage();
        },
      });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}
