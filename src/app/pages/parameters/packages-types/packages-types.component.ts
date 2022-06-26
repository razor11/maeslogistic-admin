import {
  ParametersUpdateDialogComponent,
  updateDialogModel,
} from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PackagesTypesService } from './../../../core/services/packages-types/packages-types.service';
import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { AddParameterDialogComponent } from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';
@Component({
  selector: 'app-packages-types',
  templateUrl: './packages-types.component.html',
  styleUrls: ['./packages-types.component.css'],
})
export class PackagesTypesComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'Actions'];
  isLoadingResults = true;
  data: Parameters[] = [];
  isAdded = true;

  constructor(
    private packageTypeService: PackagesTypesService,
    private snackBar: SnackbarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoadingResults = true;
    this.packageTypeService
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
    const title = `Update Package Type`;
    const messsage = `rewrite the field below with the new record that would you like to upgrade`;
    const dialogBodyText = new updateDialogModel(title, messsage);
    const dialogaRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480px',
      data: { param, dialogBodyText },
    });

    dialogaRef.afterClosed().subscribe((res) => {
      if (res) {
        this.packageTypeService
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
    const title = `Add New Package Type`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.isAdded;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480px',
      data: { added, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.packageTypeService
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
              console.log('k');
            },
          });
      }
    });
  }

  deletePackageType(id: any) {
    const record = this.data.find((x) => x.id === id);
    if (!record) return;
    this.packageTypeService
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
