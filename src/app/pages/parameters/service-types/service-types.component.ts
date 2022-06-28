import { Component, OnInit } from '@angular/core';
import {
  ParametersUpdateDialogComponent,
  updateDialogModel,
} from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Parameters } from 'src/app/models/parameters';
import { AddParameterDialogComponent } from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';
import { ServicesTypesService } from './../../../core/services/services-types/services-types.service';


@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.css']
})
export class ServiceTypesComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'Actions'];
  isLoadingResults = true;
  data: Parameters[] = [];
  isAdded = true;

  constructor(
    private serviceTypeService: ServicesTypesService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true;
    this.serviceTypeService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.data = data;
          console.log(this.data);
        },
        error: (error) => {
          this.snackBar.openSnackBar(error, 'dismiss');
        },
        complete: () => {
          this.isLoadingResults = false;
        },
      });
  }

  openUpdateDialog(param: any): void {
    const title = `Update Service Type`;
    const messsage = `rewrite the field below with the new record that would you like to upgrade`;
    const dialogBodyText = new updateDialogModel(title, messsage);
    const dialogaRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480px',
      data: { param, dialogBodyText },
    });

    dialogaRef.afterClosed().subscribe((res) => {
      if (res) {
        this.serviceTypeService
          .update(param.id, res)
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

  openAddDialog(): void {
    const title = `Add New Service Type`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.isAdded;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480px',
      data: { added, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.serviceTypeService
          .addNew(res)
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

  deleteServiceType(id: any) {
    const record = this.data.find((x) => x.id === id);
    if (!record) return;
    this.serviceTypeService
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
