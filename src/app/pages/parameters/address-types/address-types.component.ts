import { MatDialog } from '@angular/material/dialog';
import { AddressTypesService } from './../../../core/services/address-types/address-types.service';
import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { first } from 'rxjs';
import {
  ParametersUpdateDialogComponent,
  updateDialogModel,
} from 'src/app/components/parameters-dialogs/parameters-update-dialog/parameters-update-dialog.component';
import {
  addDialogModel,
  AddParameterDialogComponent,
} from 'src/app/components/parameters-dialogs/add-parameter-dialog/add-parameter-dialog.component';

@Component({
  selector: 'app-address-types',
  templateUrl: './address-types.component.html',
  styleUrls: ['./address-types.component.css'],
})
export class AddressTypesComponent implements OnInit {
  isLoading: boolean = true;
  displayedColumns: string[] = ['Description', 'Actions'];
  data: Parameters[] = [];
  added = true;

  constructor(
    private addrTypeService: AddressTypesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  openUpdateDialog(param: any): void {
    const title = `Update Address Type`;
    const message = `rewrite the field below with the new record that would you like to upgrade`;
    const dialogBodyText = new updateDialogModel(title, message);
    const dialogRef = this.dialog.open(ParametersUpdateDialogComponent, {
      width: '480',
      data: { param, dialogBodyText },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.addrTypeService
          .update(param.id, res)
          .pipe(first())
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  addDialog(): void {
    const title = `Add New Address Type`;
    const message = `Fill the field below with the new record`;
    const dialogBodyText = new updateDialogModel(title, message);
    const added = this.added;
    const dialogRef = this.dialog.open(AddParameterDialogComponent, {
      width: '480',
      data: { added, dialogBodyText },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.addrTypeService
          .addNew(res)
          .pipe(first())
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  loadData() {
    this.isLoading = true;
    this.addrTypeService
      .getAll()
      .pipe(first())
      .subscribe((data) => {
        this.data = data;
        this.isLoading = false;
      });
  }

  deleteAddr(id: any) {
    const addr = this.data.find((x) => x.id === id);
    if (!addr) return;
    this.addrTypeService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.data.filter((x) => x.id !== id);
        this.loadData();
      });
  }
}
