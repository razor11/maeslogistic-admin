import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './../../../core/services/snackbar/snackbar.service';
import { OrderStatusService } from './../../../core/services/order-status/order-status.service';
import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { AddParameterDialogComponent } from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';
import {
  ParametersUpdateDialogComponent,
  updateDialogModel,
} from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';

@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.css'],
})
export class OrdersStatusComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'Actions'];
  isLoadingResults = true;
  data: Parameters[] = [];
  isAdded = true;

  constructor(
    private orderStatusService: OrderStatusService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true;
    this.orderStatusService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.isLoadingResults = false;
          this.data = data;
        },
        error: (e) => {
          this.snackBar.openSnackBar(e, 'dismiss');
        },
        complete: () => {},
      });
  }

  openAddDialog(): void {
    const title = `Add New Order Status Type`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.isAdded;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480px',
      data: { added, dialogBodyText },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.orderStatusService
          .createNewStatus(res)
          .pipe(first())
          .subscribe({
            next: () => {
              this.snackBar.openSnackBar(
                'The new record have been added succesfully',
                'dismiss'
              );
            },
            error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
            complete: () => {
              this.loadData();
            },
          });
      }
    });
  }

  openUpdateDialog(param: any): void {
    const title = `Update Order Status Type`;
    const messsage = `rewrite the field below with the new record that would you like to upgrade`;
    const dialogBodyText = new updateDialogModel(title, messsage);
    const dialogaRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480px',
      data: { param, dialogBodyText },
      disableClose: true,
    });

    dialogaRef.afterClosed().subscribe((res) => {
      if (res) {
        this.orderStatusService
          .updateStatus(param.id, res)
          .pipe(first())
          .subscribe({
            next: () => {
              this.snackBar.openSnackBar(
                'The changes have been saved succesfully',
                'dismiss'
              );
            },
            error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
            complete: () => {
              this.loadData();
            },
          });
      }
    });
  }

  deleteStatus(id: any) {
    const record = this.data.find((x) => x.id === id);
    if (!record) return;
    this.orderStatusService
      .delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'The record have been deleted succesfully',
            'dismiss'
          );
          this.data.filter((x) => x.id !== id);
        },
        error: (e) => this.snackBar.openSnackBar(e, 'dismiss'),
        complete: () => this.loadData(),
      });
  }
}
